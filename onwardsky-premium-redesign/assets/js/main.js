/*
 * Onward Sky — homepage prototype behaviour.
 * Vanilla JS, no dependencies. Mirrors the production booking block's
 * client-side rules (trip types, 2–6 multi-city flights, 10-day minimum in the
 * Asia/Kolkata timezone, plugin error copy) and stops before the hand-off:
 * this prototype never contacts the booking wizard, checkout or payments.
 */
(function () {
  'use strict';

  var doc = document;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------------
   * Header: scrolled state + mobile menu (a disclosure, not a modal)
   * ------------------------------------------------------------------ */
  var header = doc.querySelector('[data-header]');
  var menuBtn = doc.querySelector('[data-menu-toggle]');
  var menu = doc.querySelector('[data-menu]');

  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 4);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open, returnFocus) {
    menuBtn.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    header.classList.toggle('is-menu-open', open);
    if (open) {
      var first = menu.querySelector('a');
      if (first) first.focus();
    } else if (returnFocus) {
      menuBtn.focus();
    }
  }
  menuBtn.addEventListener('click', function () {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) setMenu(false, true);
  });
  window.matchMedia('(min-width: 1080px)').addEventListener('change', function (e) {
    if (e.matches && !menu.hidden) setMenu(false);
  });

  /* ------------------------------------------------------------------
   * Booking console
   * ------------------------------------------------------------------ */
  var form = doc.querySelector('[data-booking]');
  if (!form) return;

  var CONFIG = { maxLegs: 6, minLegs: 2, minDays: 10, timezone: 'Asia/Kolkata' };

  // Copy is the plugin's own (onwardsky_itinerary v1.7.1) so errors read the same in production.
  var MSG = {
    from: 'Please select a departure city.',
    to: 'Please select a destination city.',
    same: 'Destination must be different from departure.',
    date: 'Please select a departure date.',
    minDate: 'Please choose a date on or after %1$s (at least %2$s days from today).',
    ret: 'Please select a return date.',
    retOrder: 'Return date must be after departure date.',
    legOrder: 'Each flight must depart on or after the previous one.',
    fix: 'Please check the highlighted fields.',
    results: '%s suggestions available. Use up and down arrows to choose.',
    noResults: 'No airports found.',
    unavailable: 'Online booking is temporarily unavailable. Please try again shortly.',
    legAdded: 'Flight %s added.',
    legRemoved: 'Flight %s removed.',
    depart: 'Depart date',
    travel: 'Travel date'
  };

  function fill(str) {
    var args = Array.prototype.slice.call(arguments, 1);
    return str
      .replace(/%(\d)\$s/g, function (_, n) { return args[n - 1]; })
      .replace('%s', args[0]);
  }

  // "Today" in the site timezone plus N days, as Y-m-d (same rule as the plugin).
  function earliestDate(timezone, days) {
    var parts = null;
    try {
      var out = {};
      new Intl.DateTimeFormat('en-US', { timeZone: timezone, year: 'numeric', month: 'numeric', day: 'numeric' })
        .formatToParts(new Date())
        .forEach(function (p) { out[p.type] = parseInt(p.value, 10); });
      if (out.year && out.month && out.day) parts = out;
    } catch (e) { /* fall back to the local date */ }
    if (!parts) {
      var now = new Date();
      parts = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    }
    return new Date(Date.UTC(parts.year, parts.month - 1, parts.day + days)).toISOString().slice(0, 10);
  }

  var dmy = function (iso) { return iso.split('-').reverse().join('/'); };
  var prettyDate = function (iso) {
    return new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
      .format(new Date(iso + 'T00:00:00Z'));
  };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var norm = function (s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  };

  /* Airports (demo dataset in prototype; plugin dataset in production) */
  var AIRPORTS = (window.OS_AIRPORTS || []).map(function (row) {
    return {
      cc: row[0], city: row[1], code: row[2], country: row[3],
      n: { city: norm(row[1]), country: norm(row[3]), alias: norm(row[4] || ''), code: row[2].toLowerCase() }
    };
  });
  var words = function (s) { return s.split(/[\s\-()]+/).filter(Boolean); };

  function search(query) {
    var q = norm(query);
    if (!q) return [];
    var picked = q.match(/\(([a-z]{3})\)$/); // a chosen label such as "New Delhi (DEL)"
    if (picked) q = picked[1];
    var scored = [];
    AIRPORTS.forEach(function (a) {
      var s = 0;
      if (a.n.code === q) s = 100;
      else if (a.n.city.indexOf(q) === 0) s = 80;
      else if (a.n.alias && words(a.n.alias).some(function (w) { return w.indexOf(q) === 0; })) s = 66;
      else if (words(a.n.city).some(function (w) { return w.indexOf(q) === 0; })) s = 62;
      else if (q.length >= 2 && a.n.code.indexOf(q) === 0) s = 58;
      else if (a.n.country.indexOf(q) === 0) s = 40;
      else if (q.length >= 3 && a.n.city.indexOf(q) > -1) s = 30;
      if (s) scored.push([s, a]);
    });
    scored.sort(function (x, y) { return y[0] - x[0] || x[1].city.localeCompare(y[1].city); });
    return scored.slice(0, 7).map(function (x) { return x[1]; });
  }

  /* State */
  var state = {
    trip: 'one_way',
    legCount: CONFIG.minLegs, // flights shown in multi-city
    fields: {},
    dates: {},
    pax: '1',
    errors: {},
    open: '',
    options: [],
    active: -1,
    minDate: earliestDate(CONFIG.timezone, CONFIG.minDays)
  };
  for (var i = 0; i < CONFIG.maxLegs; i++) {
    state.fields['from' + i] = { label: '', code: '', city: '', country: '' };
    state.fields['to' + i] = { label: '', code: '', city: '', country: '' };
    state.dates['date' + i] = '';
  }
  state.dates.ret = '';

  var legsWrap = form.querySelector('[data-legs]');
  var leg0 = legsWrap.querySelector('[data-leg="0"]');
  var addBtn = form.querySelector('[data-add-leg]');
  var statusEl = form.querySelector('[data-status]');
  var announcer = form.querySelector('[data-announcer]');
  var legTemplate = doc.getElementById('leg-template');

  function F(key) {
    var wrap = form.querySelector('[data-key="' + key + '"]');
    if (!wrap) return null;
    return {
      wrap: wrap,
      input: wrap.querySelector('input, select'),
      list: wrap.querySelector('.suggestions'),
      err: wrap.querySelector('.field-error')
    };
  }

  var announceTimer = 0;
  function announce(msg, delay) {
    clearTimeout(announceTimer);
    announceTimer = setTimeout(function () {
      announcer.textContent = '';
      requestAnimationFrame(function () { announcer.textContent = msg; });
    }, delay || 0);
  }

  /* Place display: the field turns into a chart identifier once an airport is chosen */
  function paintPlace(key) {
    var f = F(key);
    if (!f) return;
    var data = state.fields[key];
    f.input.value = data.label;
    f.wrap.classList.toggle('is-set', !!data.code);
    var place = f.wrap.querySelector('.place');
    place.querySelector('.place-code').textContent = data.code;
    place.querySelector('.place-city').textContent = data.city;
    place.querySelector('.place-country').textContent = data.country;
  }

  function updateRoutes() {
    form.querySelectorAll('[data-route]').forEach(function (route) {
      var i = route.getAttribute('data-route');
      var routed = !!(state.fields['from' + i].code && state.fields['to' + i].code);
      route.classList.toggle('is-routed', routed);
    });
  }

  /* Suggestions list */
  function renderList(key) {
    var f = F(key);
    if (!f || !f.list) return;
    var list = f.list;
    list.textContent = '';
    var label = state.fields[key] ? state.fields[key].label.trim() : '';
    var empty = state.open === key && !state.options.length && label.length > 1 && !state.fields[key].code;
    if (empty) {
      // Visible empty state; the same message is announced through the live region.
      list.innerHTML = '<li class="suggestion-empty" role="option" aria-disabled="true" aria-selected="false"><strong>' +
        esc(MSG.noResults) + '</strong>Try another spelling, a nearby city or a 3-letter airport code.</li>';
      list.hidden = false;
      f.wrap.classList.add('is-open');
      f.input.setAttribute('aria-expanded', 'true');
      f.input.removeAttribute('aria-activedescendant');
      return;
    }
    var open = state.open === key && state.options.length > 0;
    if (!open) {
      list.hidden = true;
      f.input.setAttribute('aria-expanded', 'false');
      f.input.removeAttribute('aria-activedescendant');
      f.wrap.classList.remove('is-open');
      return;
    }
    state.options.forEach(function (opt, idx) {
      var li = doc.createElement('li');
      li.id = 'osb-' + key + '-opt-' + opt.code;
      li.className = 'suggestion' + (idx === state.active ? ' is-active' : '');
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', idx === state.active ? 'true' : 'false');
      li.innerHTML = '<span class="ident" translate="no">' + esc(opt.code) + '</span>' +
        '<span class="suggestion-text"><span class="suggestion-city">' + esc(opt.city) + '</span>' +
        '<span class="suggestion-country">' + esc(opt.country) + '</span></span>';
      // mousedown + preventDefault keeps focus in the input (no blur race).
      li.addEventListener('mousedown', function (e) { e.preventDefault(); choose(key, opt); });
      li.addEventListener('mousemove', function () {
        if (state.active !== idx) { state.active = idx; renderList(key); }
      });
      list.appendChild(li);
    });
    list.hidden = false;
    f.wrap.classList.add('is-open');
    f.input.setAttribute('aria-expanded', 'true');
    var active = state.options[state.active];
    if (active) {
      f.input.setAttribute('aria-activedescendant', 'osb-' + key + '-opt-' + active.code);
      var el = list.querySelector('.is-active');
      if (el) el.scrollIntoView({ block: 'nearest' });
    } else {
      f.input.removeAttribute('aria-activedescendant');
    }
  }

  function refreshOptions(withAnnouncement) {
    var key = state.open;
    var data = state.fields[key];
    state.options = data && !data.code ? search(data.label) : [];
    state.active = state.options.length ? 0 : -1;
    renderList(key);
    if (withAnnouncement && data && data.label.trim()) {
      announce(state.options.length ? fill(MSG.results, String(state.options.length)) : MSG.noResults, 350);
    }
  }

  function closeList() {
    var key = state.open;
    state.open = '';
    state.options = [];
    state.active = -1;
    if (key) renderList(key);
  }

  function choose(key, opt) {
    Object.assign(state.fields[key], { label: opt.city + ' (' + opt.code + ')', code: opt.code, city: opt.city, country: opt.country });
    paintPlace(key);
    clearError(key);
    closeList();
    // The next flight starts where this one lands, unless already set.
    if (key.indexOf('to') === 0) {
      var next = state.fields['from' + (parseInt(key.slice(2), 10) + 1)];
      if (next && !next.code) {
        Object.assign(next, state.fields[key]);
        paintPlace('from' + (parseInt(key.slice(2), 10) + 1));
      }
    }
    updateRoutes();
  }

  // Typed an exact code or city and moved on: take it rather than flag an error.
  function autoResolve(key) {
    var data = state.fields[key];
    if (!data || data.code || !data.label.trim()) return;
    var q = norm(data.label);
    var exact = search(data.label).filter(function (o) { return o.n.code === q || o.n.city === q; });
    if (exact.length === 1) choose(key, exact[0]);
  }

  function swap() {
    var a = state.fields.from0;
    var b = state.fields.to0;
    var keep = Object.assign({}, a);
    Object.assign(a, b);
    Object.assign(b, keep);
    paintPlace('from0');
    paintPlace('to0');
    clearError('from0');
    clearError('to0');
    updateRoutes();
  }

  /* Dates */
  function dateMin(key) {
    if (key === 'ret') return state.dates.date0 > state.minDate ? state.dates.date0 : state.minDate;
    var leg = parseInt(key.slice(4), 10);
    var prev = leg > 0 ? state.dates['date' + (leg - 1)] : '';
    return prev && prev > state.minDate ? prev : state.minDate;
  }
  function refreshDateMins() {
    form.querySelectorAll('input[type="date"]').forEach(function (input) {
      var key = input.closest('[data-key]').getAttribute('data-key');
      input.min = dateMin(key);
    });
  }

  /* Trip type and multi-city flights */
  function setTrip(trip) {
    state.trip = trip;
    form.setAttribute('data-trip', trip);
    state.errors = {};
    form.querySelector('[data-date-label]').textContent = trip === 'round_trip' ? MSG.depart : MSG.travel;
    if (trip === 'multi_city') {
      leg0.setAttribute('role', 'group');
      leg0.setAttribute('aria-labelledby', 'leg-0-title');
    } else {
      leg0.removeAttribute('role');
      leg0.removeAttribute('aria-labelledby');
    }
    renderLegs();
    paintErrors();
    setStatus(null);
  }

  function renderLegs() {
    var multi = state.trip === 'multi_city';
    var wanted = multi ? state.legCount : 1;
    var existing = legsWrap.querySelectorAll('.leg');
    for (var j = existing.length - 1; j >= wanted; j--) existing[j].remove();
    for (var k = legsWrap.querySelectorAll('.leg').length; k < wanted; k++) {
      var html = legTemplate.innerHTML.replace(/__I__/g, String(k)).replace(/__N__/g, String(k + 1));
      legsWrap.insertAdjacentHTML('beforeend', html);
    }
    for (var m = 1; m < wanted; m++) {
      paintPlace('from' + m);
      paintPlace('to' + m);
      var d = F('date' + m);
      d.input.value = state.dates['date' + m];
    }
    var canRemove = multi && state.legCount > CONFIG.minLegs;
    legsWrap.querySelectorAll('[data-remove-leg]').forEach(function (btn) { btn.hidden = !canRemove; });
    addBtn.hidden = !(multi && state.legCount < CONFIG.maxLegs);
    refreshDateMins();
    updateRoutes();
  }

  function addLeg() {
    if (state.trip !== 'multi_city' || state.legCount >= CONFIG.maxLegs) return;
    var idx = state.legCount;
    var prev = state.fields['to' + (idx - 1)];
    if (prev.code && !state.fields['from' + idx].code) Object.assign(state.fields['from' + idx], prev);
    state.legCount = idx + 1;
    renderLegs();
    announce(fill(MSG.legAdded, String(idx + 1)));
    var target = state.fields['from' + idx].code ? 'to' + idx : 'from' + idx;
    var f = F(target);
    if (f) f.input.focus();
  }

  function removeLeg(leg) {
    var last = state.legCount - 1;
    for (var n = leg; n < last; n++) {
      Object.assign(state.fields['from' + n], state.fields['from' + (n + 1)]);
      Object.assign(state.fields['to' + n], state.fields['to' + (n + 1)]);
      state.dates['date' + n] = state.dates['date' + (n + 1)];
    }
    Object.assign(state.fields['from' + last], { label: '', code: '', city: '', country: '' });
    Object.assign(state.fields['to' + last], { label: '', code: '', city: '', country: '' });
    state.dates['date' + last] = '';
    state.legCount = last;
    state.errors = {};
    renderLegs();
    paintPlace('from0'); paintPlace('to0');
    F('date0').input.value = state.dates.date0;
    paintErrors();
    setStatus(null);
    announce(fill(MSG.legRemoved, String(leg + 1)));
    // The pressed button is gone: keep keyboard focus in the form.
    (addBtn.hidden ? F('to' + (state.legCount - 1)).input : addBtn).focus();
  }

  /* Validation (same rules as the plugin) */
  function validate() {
    var errors = {};
    var minMsg = fill(MSG.minDate, dmy(state.minDate), String(CONFIG.minDays));
    function checkRoute(n) {
      var from = state.fields['from' + n];
      var to = state.fields['to' + n];
      if (!from.code) errors['from' + n] = MSG.from;
      if (!to.code) errors['to' + n] = MSG.to;
      if (from.code && to.code && from.code === to.code) errors['to' + n] = MSG.same;
    }
    function checkDate(key, previous) {
      var value = state.dates[key];
      if (!value) errors[key] = MSG.date;
      else if (value < state.minDate) errors[key] = minMsg;
      else if (previous && value < previous) errors[key] = MSG.legOrder;
    }
    if (state.trip === 'multi_city') {
      for (var n = 0; n < state.legCount; n++) {
        checkRoute(n);
        checkDate('date' + n, n > 0 ? state.dates['date' + (n - 1)] : '');
      }
      return errors;
    }
    checkRoute(0);
    checkDate('date0', '');
    if (state.trip === 'round_trip') {
      if (!state.dates.ret) errors.ret = MSG.ret;
      else if (state.dates.date0 && state.dates.ret <= state.dates.date0) errors.ret = MSG.retOrder;
    }
    return errors;
  }

  function paintErrors() {
    form.querySelectorAll('[data-key]').forEach(function (wrap) {
      var key = wrap.getAttribute('data-key');
      var msg = state.errors[key] || '';
      var input = wrap.querySelector('input, select');
      var err = wrap.querySelector('.field-error');
      wrap.classList.toggle('is-invalid', !!msg);
      if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) {
        err.hidden = !msg;
        err.innerHTML = msg ? '<svg class="icon" aria-hidden="true"><use href="#b-warning-circle"/></svg><span>' + esc(msg) + '</span>' : '';
      }
    });
  }

  function clearError(key) {
    if (!state.errors[key]) return;
    delete state.errors[key];
    paintErrors();
    if (!Object.keys(state.errors).length) setStatus(null);
  }

  function setStatus(type, html) {
    statusEl.className = 'booking-status' + (type ? ' is-' + type : '');
    statusEl.hidden = !type;
    statusEl.innerHTML = type ? html : '';
  }

  function summary() {
    var count = state.trip === 'multi_city' ? state.legCount : 1;
    var codes = [state.fields.from0.code];
    for (var n = 0; n < count; n++) codes.push(state.fields['to' + n].code);
    if (state.trip === 'round_trip') codes.push(state.fields.from0.code);
    var dates = [prettyDate(state.dates.date0)];
    if (state.trip === 'round_trip') dates.push(prettyDate(state.dates.ret));
    if (state.trip === 'multi_city') dates = [prettyDate(state.dates.date0) + ' to ' + prettyDate(state.dates['date' + (count - 1)])];
    var pax = state.pax + (state.pax === '1' ? ' passenger' : ' passengers');
    return { route: codes.join(' → '), when: dates.join(' · return '), pax: pax };
  }

  function handOff() {
    var s = summary();
    // Production: handoff.js builds the wizard URL from these values. The prototype stops here.
    setStatus('ready',
      '<svg class="icon" aria-hidden="true"><use href="#b-check-circle"/></svg>' +
      '<span><strong>Search ready: ' + esc(s.route) + '</strong> · ' + esc(s.when) + ' · ' + esc(s.pax) +
      '<span class="status-note">On the live site this opens the secure booking wizard. This prototype stops here, so no booking or payment is made.</span></span>');
    announce('Search ready. ' + s.route.replace(/→/g, 'to') + ', ' + s.when + ', ' + s.pax + '. Prototype: no booking is made.');
  }

  /* Events */
  form.addEventListener('change', function (e) {
    var t = e.target;
    if (t.name === 'trip_type') { setTrip(t.value); return; }
    if (t.id === 'osb-pax') { state.pax = t.value; return; }
    if (t.type === 'date') {
      var key = t.closest('[data-key]').getAttribute('data-key');
      state.dates[key] = t.value;
      clearError(key);
      refreshDateMins();
    }
  });

  form.addEventListener('input', function (e) {
    var t = e.target;
    if (t.getAttribute('role') !== 'combobox') return;
    var key = t.closest('[data-key]').getAttribute('data-key');
    Object.assign(state.fields[key], { label: t.value, code: '', city: '', country: '' });
    t.closest('[data-key]').classList.remove('is-set');
    clearError(key);
    state.open = key;
    refreshOptions(true);
    updateRoutes();
  });

  form.addEventListener('focusin', function (e) {
    var t = e.target;
    if (t.getAttribute('role') !== 'combobox') return;
    var key = t.closest('[data-key]').getAttribute('data-key');
    state.open = key;
    if (state.fields[key].code) {
      t.select();
    } else {
      refreshOptions(false);
    }
  });

  form.addEventListener('focusout', function (e) {
    var t = e.target;
    if (t.getAttribute('role') !== 'combobox') return;
    var key = t.closest('[data-key]').getAttribute('data-key');
    if (state.open === key) closeList();
    autoResolve(key);
  });

  form.addEventListener('keydown', function (e) {
    var t = e.target;
    if (t.getAttribute('role') !== 'combobox') return;
    var key = t.closest('[data-key]').getAttribute('data-key');
    var open = state.open === key && state.options.length > 0;
    var count = state.options.length;
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        if (!open) { state.open = key; refreshOptions(true); return; }
        state.active = e.key === 'ArrowDown' ? (state.active + 1) % count : (state.active - 1 + count) % count;
        renderList(key);
        break;
      case 'Enter':
        if (open && state.active > -1) { e.preventDefault(); choose(key, state.options[state.active]); }
        break;
      case 'Escape':
        if (state.open === key) { if (open) e.preventDefault(); closeList(); }
        break;
    }
  });

  form.addEventListener('click', function (e) {
    var t = e.target;
    if (t.closest('[data-swap]')) { swap(); return; }
    if (t.closest('[data-add-leg]')) { addLeg(); return; }
    var remove = t.closest('[data-remove-leg]');
    if (remove) { removeLeg(parseInt(remove.getAttribute('data-remove-leg'), 10)); return; }
    // Open the native calendar from anywhere on a date field.
    var dateField = t.closest('.field-date');
    if (dateField) {
      var input = dateField.querySelector('input');
      if (t !== input) input.focus();
      if (typeof input.showPicker === 'function') { try { input.showPicker(); } catch (err) { /* not allowed here */ } }
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    closeList();
    if (!AIRPORTS.length) {
      setStatus('error', '<svg class="icon" aria-hidden="true"><use href="#b-warning-circle"/></svg><span>' + esc(MSG.unavailable) + '</span>');
      return;
    }
    state.errors = validate();
    paintErrors();
    var first = Object.keys(state.errors)[0];
    if (first) {
      setStatus('error', '<svg class="icon" aria-hidden="true"><use href="#b-warning-circle"/></svg><span>' + esc(MSG.fix) + '</span>');
      announce(MSG.fix);
      var f = F(first);
      if (f) f.input.focus();
      return;
    }
    handOff();
  });

  /* Init (also re-syncs after a back/forward cache restore) */
  function init() {
    form.querySelectorAll('input[type="date"]').forEach(function (input) { input.min = state.minDate; });
    var checked = form.querySelector('input[name="trip_type"]:checked');
    setTrip(checked ? checked.value : 'one_way');
  }
  init();
  window.addEventListener('pageshow', function (e) { if (e.persisted) init(); });

  /* ------------------------------------------------------------------
   * "#book" links scroll to the console and focus the first field
   * ------------------------------------------------------------------ */
  function headerOffset() {
    var pos = getComputedStyle(header).position;
    return (pos === 'sticky' || pos === 'fixed' ? header.offsetHeight : 0) + 16;
  }
  function scrollToForm() {
    var top = Math.max(0, form.getBoundingClientRect().top + window.scrollY - headerOffset());
    var smooth = !reduceMotion.matches;
    window.scrollTo({ top: top, behavior: smooth ? 'smooth' : 'auto' });
    setTimeout(function () {
      var f = F('from0');
      if (f) f.input.focus({ preventScroll: true });
    }, smooth ? 560 : 0);
  }
  doc.addEventListener('click', function (e) {
    var link = e.target.closest('a[href="#book"]');
    if (!link || e.defaultPrevented) return;
    e.preventDefault();
    if (!menu.hidden) setMenu(false);
    scrollToForm();
  });

  /* ------------------------------------------------------------------
   * Mobile sticky fare bar, shown once the console has scrolled away
   * ------------------------------------------------------------------ */
  var sticky = doc.querySelector('[data-sticky-cta]');
  if (sticky && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      var entry = entries[0];
      var show = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
      sticky.classList.toggle('is-visible', show);
      sticky.inert = !show;
    }).observe(form);
  }
})();
