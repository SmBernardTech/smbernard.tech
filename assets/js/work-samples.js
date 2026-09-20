/*=========== Work Samples Console ===========
Interactive facsimile of the irrigation console on work-samples.html.
All farms, fields & readings are invented fixture data.
© 2026 Susan M Bernard. All rights reserved. Not licensed for copying, reuse, or redistribution.
======================================*/

(function () {
  "use strict";

  // Fixture data: invented farms, fields & readings ##### ----->

  var SOURCES = ["North Well", "District Canal", "Reservoir 2"];
  var ABBREV_DAYS = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
  var FULL_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var VALVES = [
    { id: 41, zoneId: 101, name: "Cedar Bench N", crop: "Almonds-Nonpareil", cropAbbr: "ALM-NP", source: "North Well", tz: "PDT", tzId: 7,
      state: "Opened", paused: false, disabled: false, autoClose: true, stuck: false, wm: [25, 60],
      runtime: "3:00", elapsed: "0:42", remaining: "2:18",
      sched: [{ d: 1, s: "4a", e: "7:30a" }, { d: 3, s: "4a", e: "7:30a" }, { d: 5, s: "4a", e: "8a" }] },

    { id: 42, zoneId: 102, name: "Cedar Bench S", crop: "Almonds-Nonpareil", cropAbbr: "ALM-NP", source: "North Well", tz: "PDT", tzId: 7,
      state: "Closed", paused: false, disabled: false, autoClose: true, stuck: false, wm: [25, 60],
      runtime: "3:00", elapsed: "NA", remaining: "NA",
      sched: [{ d: 2, s: "5a", e: "8a" }, { d: 6, s: "5a", e: "8a" }] },

    { id: 47, zoneId: 104, name: "Dry Creek E", crop: "Pistachios-Kerman", cropAbbr: "PIS-KER", source: "District Canal", tz: "PDT", tzId: 7,
      state: "Closed", paused: false, disabled: false, autoClose: false, stuck: false, wm: [30, 70],
      runtime: "2:00", elapsed: "NA", remaining: "NA",
      sched: [{ d: 1, s: "11p", e: "1a" }, { d: 4, s: "11p", e: "1a" }] },

    { id: 48, zoneId: 108, name: "Dry Creek W", crop: "Pistachios-Kerman", cropAbbr: "PIS-KER", source: "District Canal", tz: "PDT", tzId: 7,
      state: "Closed", paused: true, disabled: false, autoClose: false, stuck: false, wm: [30, 70],
      runtime: "2:00", elapsed: "NA", remaining: "NA", sched: [] },

    { id: 53, zoneId: 110, name: "Two Rivers 1", crop: "Alfalfa-Ranger", cropAbbr: "ALF-RGR", source: "Reservoir 2", tz: "PDT", tzId: 7,
      state: "Opened", paused: false, disabled: false, autoClose: false, stuck: false, wm: [20, 55],
      runtime: "3:00", elapsed: "2:04", remaining: "0:56",
      sched: [{ d: 1, s: "3a", e: "6a" }, { d: 1, s: "6p", e: "8p" }, { d: 3, s: "3a", e: "6a" }, { d: 5, s: "3a", e: "6a" }] },

    { id: 54, zoneId: 112, name: "Two Rivers 2", crop: "Alfalfa-Ranger", cropAbbr: "ALF-RGR", source: "Reservoir 2", tz: "PDT", tzId: 7,
      state: "Opening", paused: false, disabled: false, autoClose: false, stuck: false, wm: [20, 55],
      runtime: "2:30", elapsed: "NA", remaining: "NA",
      sched: [{ d: 0, s: "4:30a", e: "7a" }] },

    { id: 60, zoneId: 115, name: "Alder Flat N", crop: "Table Grapes-Flame", cropAbbr: "TGR-FLM", source: "North Well", tz: "PDT", tzId: 7,
      state: "Error", paused: false, disabled: false, autoClose: false, stuck: true, wm: [35, 75],
      runtime: "1:30", elapsed: "NA", remaining: "NA", sched: [] },

    { id: 61, zoneId: 117, name: "Alder Flat S", crop: "Table Grapes-Flame", cropAbbr: "TGR-FLM", source: "North Well", tz: "PDT", tzId: 7,
      state: "Closed", paused: false, disabled: false, autoClose: false, stuck: false, wm: [35, 75],
      runtime: "1:30", elapsed: "NA", remaining: "NA", sched: [] },

    { id: 66, zoneId: 120, name: "Mill Corner", crop: "Walnuts-Chandler", cropAbbr: "WAL-CHA", source: "District Canal", tz: "MDT", tzId: 5,
      state: "Opened", paused: false, disabled: false, autoClose: true, stuck: false, wm: [28, 65],
      runtime: "5:00", elapsed: "1:12", remaining: "3:48",
      sched: [{ d: 2, s: "4a", e: "9a" }, { d: 4, s: "4a", e: "9a" }] },

    { id: 67, zoneId: 124, name: "Mill Corner W", crop: "Walnuts-Chandler", cropAbbr: "WAL-CHA", source: "District Canal", tz: "MDT", tzId: 5,
      state: "Closed", paused: false, disabled: true, autoClose: false, stuck: false, wm: [28, 65],
      runtime: "5:00", elapsed: "NA", remaining: "NA", sched: [] },

    { id: 72, zoneId: 131, name: "South Sixty", crop: "Cotton-Pima", cropAbbr: "COT-PMA", source: "Reservoir 2", tz: "PDT", tzId: 7,
      state: "Closing", paused: false, disabled: false, autoClose: false, stuck: false, wm: [40, 80],
      runtime: "4:00", elapsed: "NA", remaining: "NA",
      sched: [{ d: 3, s: "10p", e: "2a" }] },

    { id: 73, zoneId: 133, name: "South Sixty E", crop: "Tomatoes-Roma", cropAbbr: "TOM-ROM", source: "Reservoir 2", tz: "PDT", tzId: 7,
      state: "Closed", paused: false, disabled: false, autoClose: false, stuck: false, wm: [40, 80],
      runtime: "2:00", elapsed: "NA", remaining: "NA",
      sched: [{ d: 1, s: "5:15a", e: "7:15a" }, { d: 2, s: "5:15a", e: "7:15a" }, { d: 3, s: "5:15a", e: "7:15a" }, { d: 4, s: "5:15a", e: "7:15a" }, { d: 5, s: "5:15a", e: "7:15a" }] }
  ];

  // SORT_FIELDS: Full names, the way the mobile sort sheet lists them ##### ----->

  var SORT_FIELDS = [
    { key: "field",    label: "Zone / Field" },
    { key: "zoneId",   label: "Zone ID" },
    { key: "crop",     label: "Crop" },
    { key: "source",   label: "Water Source" },
    { key: "status",   label: "Valve Status" },
    { key: "wm",       label: "Watermark Thresholds" },
    { key: "schedule", label: "Schedule" },
    { key: "tz",       label: "Timezone" }
  ];

  var FACETS = [
    { key: "autoclose", label: "Auto",     word: "with auto-close enabled", icon: "cancel" },
    { key: "paused",    label: "Paused",   word: "paused",                  icon: "play_arrow" },
    { key: "disabled",  label: "Disabled", word: "disabled",                icon: "water_drop" },
    { key: "selected",  label: "Selected", word: "selected",                icon: "check_box" }
  ];

  var STORE_KEY = "smb-console-prefs";

  // State ##### ----->

  var state = {
    desc: false,
    facets: { autoclose: false, paused: false, disabled: false, selected: false },
    panelFor: null,
    query: "",
    searchOpen: false,
    selected: {},
    sort: "field",
    source: "",
    view: "cards"
  };

  var busy = {};
  var el = {};

  ["backdrop", "cards", "console", "consoleScroll", "dirBtn", "empty", "frame", "panel", "panelBody", "panelCancel",
   "panelSave", "panelTitle", "panelX", "qD", "qM", "rows", "rowsFrame", "searchToggle", "searchWrap",
   "selAll", "selBody", "selCaret", "selCount", "selFacets", "selHead", "selPanel", "sheet",
   "sheetList", "sortBtn", "sortLabel", "srcD", "srcM", "statPaused", "statOpen", "statSched",
   "tbody", "toast", "topFab"
  ].forEach(function (id) { el[id] = document.getElementById(id); });

  // Preferences: sort, direction & card-or-list survive the visit ##### ----->

  function loadPrefs() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(STORE_KEY) || "{}");
      if (saved.sort) { state.sort = saved.sort; }
      if (typeof saved.desc === "boolean") { state.desc = saved.desc; }
      if (saved.view) { state.view = saved.view; }
    } catch (e) { /* blocked storage: the defaults are correct */ }
  }

  function savePrefs() {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify({ sort: state.sort, desc: state.desc, view: state.view }));
    } catch (e) { /* preferences are a convenience, not state the page needs */ }
  }

  // Helpers ##### ----->

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function byId(id) {
    for (var i = 0; i < VALVES.length; i++) { if (VALVES[i].id === id) { return VALVES[i]; } }
    return null;
  }

  function displayState(v) { return busy[v.id] || v.state; }
  function stateClass(v) { return "b-" + displayState(v).toLowerCase(); }

  function selectedIds() {
    return Object.keys(state.selected).filter(function (k) { return state.selected[k]; }).map(Number);
  }

  function sortLabel(key) {
    for (var i = 0; i < SORT_FIELDS.length; i++) { if (SORT_FIELDS[i].key === key) { return SORT_FIELDS[i].label; } }
    return key;
  }

  // isCrossing: Stop at or before start means the window runs past midnight ##### ----->

  function toMinutes(t) {
    var m = /^(\d+)(?::(\d+))?([ap])$/.exec(t);
    if (!m) { return 0; }
    var h = parseInt(m[1], 10) % 12;
    if (m[3] === "p") { h += 12; }
    return h * 60 + (m[2] ? parseInt(m[2], 10) : 0);
  }

  function isCrossing(e) { return toMinutes(e.e) <= toMinutes(e.s); }

  // formattedSchedule: Group same-time days into one chip, keep midnight crossings separate ##### ----->

  function formattedSchedule(v) {
    var groups = {};
    var order = [];

    for (var d = 0; d < 7; d++) {
      v.sched.filter(function (e) { return e.d === d; }).forEach(function (e) {
        var timeKey = e.s + " - " + e.e;
        if (isCrossing(e)) {
          var uniq = ABBREV_DAYS[d] + "_midnight_" + timeKey;
          groups[uniq] = { days: [ABBREV_DAYS[d]], cross: true, next: ABBREV_DAYS[(d + 1) % 7], s: e.s, e: e.e };
          order.push(uniq);
        } else {
          if (!groups[timeKey]) { groups[timeKey] = { days: [], cross: false, s: e.s, e: e.e }; order.push(timeKey); }
          groups[timeKey].days.push(ABBREV_DAYS[d]);
        }
      });
    }

    var out = order.map(function (k) {
      var g = groups[k];
      if (g.cross) { return "<b>" + g.days.join("") + "</b>: " + g.s + " - <b>" + g.next + "</b>: " + g.e; }
      return "<b>" + g.days.join("") + "</b>: " + g.s + " - " + g.e;
    });

    return out.length ? out : ["None"];
  }

  function facetRows(key) {
    if (key === "selected") { return selectedIds().map(byId).filter(Boolean); }
    return VALVES.filter(function (v) {
      if (key === "autoclose") { return v.autoClose; }
      if (key === "paused") { return v.paused; }
      return v.disabled;
    });
  }

  // formatItem: One record as the Selected panel & the print sheet render it ##### ----->

  function formatItem(v) {
    var flag = v.disabled ? '<span class="item-red"><b>[DISABLED] </b></span>'
             : v.paused ? '<span class="item-blue"><b>[PAUSED] </b></span>'
             : "";

    return flag +
      "<b> " + esc(v.name) + "</b> (" + v.id + ")" +
      " | <b>Crop:</b> " + esc(v.cropAbbr) + " |" +
      " <b>Wtr Src:</b> " + esc(v.source) +
      " | <b>WM Start:</b> " + v.wm[0] + " | <b>Stop:</b> " + v.wm[1] +
      " | <b> " + v.tz + "</b> (" + v.tzId + ") " +
      ' | Valve: <b><span class="item-cap">' + displayState(v) + "</span></b>" +
      " | <b>Runtime:</b> " + v.runtime + " | <b>Elapsed:</b> " + v.elapsed + " | <b>Remaining:</b> " + v.remaining +
      '<br><span class="item-margin">SCHED: ' + formattedSchedule(v).join(" | ") + "</span>";
  }

  // revealConsoleTop: Tablet & phone overlays open at the top, so bring that edge into view ##### ----->

  function isNarrow() { return el.frame.clientWidth < 1024; }

  function revealConsoleTop() {
    var header = document.getElementById("header");
    var offset = (header ? header.offsetHeight : 70) + 10;
    var top = el.console.getBoundingClientRect().top;
    if (top < offset) { window.scrollBy({ top: top - offset, behavior: "smooth" }); }
  }

  // toast: Every action reports success or failure, the way the app does ##### ----->

  var toastTimer = null;

  function toast(msg, isError) {
    if (isNarrow()) { revealConsoleTop(); }
    el.toast.textContent = msg;
    el.toast.className = "c-toast show" + (isError ? " err" : "");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { el.toast.className = "c-toast"; }, 2800);
  }

  // visibleValves: Apply water source, search & sort ##### ----->

  function sortValue(v, key) {
    if (key === "zoneId") { return v.zoneId; }
    if (key === "crop") { return v.crop; }
    if (key === "source") { return v.source; }
    if (key === "status") { return displayState(v); }
    if (key === "wm") { return v.wm[0]; }
    if (key === "schedule") { return v.sched.length; }
    if (key === "tz") { return v.tz; }
    return v.name;
  }

  function visibleValves() {
    var q = state.query.trim().toLowerCase();

    var list = VALVES.filter(function (v) {
      if (state.source && v.source !== state.source) { return false; }
      if (!q) { return true; }
      return (v.name + " " + v.crop + " " + v.source + " " + v.zoneId + " " + displayState(v)).toLowerCase().indexOf(q) > -1;
    });

    var dir = state.desc ? -1 : 1;

    list.sort(function (a, b) {
      var x = sortValue(a, state.sort), y = sortValue(b, state.sort);
      if (typeof x === "string") { return x.localeCompare(y) * dir; }
      return (x - y) * dir;
    });

    return list;
  }

  // Fragments shared by every view ##### ----->

  function statusBadge(v) {
    return '<span class="c-badge ' + stateClass(v) + '">' + displayState(v) + "</span>";
  }

  function flagBadges(v) {
    return (v.stuck ? '<span class="c-badge b-stuck" title="Close failed, valve did not physically close">Stuck<span class="sr-only">: close failed, valve did not physically close</span></span>' : "") +
      (v.paused ? '<span class="c-badge b-paused">Paused</span>' : "") +
      (v.disabled ? '<span class="c-badge b-disabled">Disabled</span>' : "");
  }

  function valveButton(v, small) {
    var b = busy[v.id];
    var locked = v.disabled || v.stuck;
    var opening = displayState(v) !== "Opened";
    var label = b ? "&middot;&middot;&middot;" : (opening ? "Open" : "Close");
    var reason = v.disabled ? "Valve is disabled in configuration"
               : v.stuck ? "Clear the stuck fault before operating"
               : (opening ? "Open valve" : "Close valve");
    return '<button type="button" class="valve-btn ' + (opening ? "is-open" : "is-close") + (small ? " sm" : "") +
      '" data-act="toggle" data-id="' + v.id + '"' + (locked || b ? " disabled" : "") +
      ' title="' + esc(reason) + '" aria-label="' + esc(reason) + '">' + label + "</button>";
  }

  function schedChips(v) {
    var chips = formattedSchedule(v);
    if (chips[0] === "None") { return '<button type="button" class="sched-chip" disabled>None</button>'; }
    return chips.map(function (c, i) {
      return '<button type="button" class="sched-chip" data-act="delsched" data-id="' + v.id + '" data-i="' + i + '">' + c + "</button>";
    }).join("");
  }

  // Renderers ##### ----->

  function renderTable(list) {
    el.tbody.innerHTML = list.map(function (v) {
      return '<tr class="' + (state.selected[v.id] ? "is-sel" : "") + '">' +
        '<td><input type="checkbox" data-act="sel" data-id="' + v.id + '"' + (state.selected[v.id] ? " checked" : "") + ' aria-label="Select ' + esc(v.name) + '"></td>' +
        '<td style="white-space:nowrap">' + statusBadge(v) + " " + flagBadges(v) + '<div style="margin-top:4px">' + valveButton(v, true) + "</div></td>" +
        '<td><button type="button" class="field-btn" data-act="configs" data-id="' + v.id + '">' + esc(v.name) + "</button></td>" +
        '<td class="num muted">' + v.zoneId + "</td>" +
        '<td><a class="crop-btn" href="#">' + esc(v.crop) + "</a></td>" +
        '<td class="muted">' + esc(v.source) + "</td>" +
        '<td style="min-width:210px">' + schedChips(v) + "</td>" +
        '<td class="num">' + v.wm[0] + " | " + v.wm[1] + "</td>" +
        "<td style='white-space:nowrap'><div>Runtime: " + v.runtime + '</div><div class="stat-el">Elapsed: ' + v.elapsed + '</div><div class="stat-rm">Remaining: ' + v.remaining + "</div></td>" +
        '<td class="muted">' + v.tz + "</td>" +
      "</tr>";
    }).join("");
  }

  function renderCards(list) {
    el.cards.innerHTML = list.map(function (v) {
      return '<div class="zcard' + (state.selected[v.id] ? " is-sel" : "") + '">' +
        '<div class="zcard-top">' +
          '<div class="left">' +
            '<div class="badges">' +
              '<input type="checkbox" data-act="sel" data-id="' + v.id + '"' + (state.selected[v.id] ? " checked" : "") + ' aria-label="Select ' + esc(v.name) + '">' +
              statusBadge(v) +
              (v.stuck ? '<span class="c-badge b-stuck">Stuck</span>' : "") +
              (v.autoClose ? '<span class="msy" title="Auto-close in manual" style="font-size:20px;color:#278227">verified</span>' : "") +
            "</div>" +
            '<div class="zcard-meta">' +
              "<span>" + esc(v.source) + "</span><span class=\"sep\"></span>" +
              "<span>ZID: " + v.zoneId + "</span><span class=\"sep\"></span>" +
              "<span>ID: " + v.id + "</span><span class=\"sep\"></span>" +
              "<span>" + v.tz + "</span>" +
            "</div>" +
          "</div>" +
          '<div class="right">' +
            (v.paused || v.disabled ? '<div class="badges" style="padding-left:0">' + (v.paused ? '<span class="c-badge b-paused">Paused</span>' : "") + (v.disabled ? '<span class="c-badge b-disabled">Disabled</span>' : "") + "</div>" : "") +
            valveButton(v, false) +
          "</div>" +
        "</div>" +
        '<div class="zcard-body">' +
          '<div class="zcard-fieldrow">' +
            '<button type="button" class="field-btn" style="margin:8px" data-act="configs" data-id="' + v.id + '">' + esc(v.name) + "</button>" +
            '<a class="crop-btn" href="#">' + esc(v.crop) + "</a>" +
          "</div>" +
          '<div class="zcard-sched">' + schedChips(v) + "</div>" +
          '<div class="zcard-wm"><b>WM:</b><span>' + v.wm[0] + '</span><span class="sep"></span><span>' + v.wm[1] + "</span></div>" +
          '<div class="zcard-stats">' +
            "<span>Runtime: " + v.runtime + "</span>" +
            '<span class="stat-el">Elapsed: ' + v.elapsed + "</span>" +
            '<span class="stat-rm">Remaining: ' + v.remaining + "</span>" +
          "</div>" +
        "</div>" +
      "</div>";
    }).join("");
  }

  function condensedValue(v) {
    var k = state.sort;
    if (k === "status" || k === "field") { return statusBadge(v); }
    if (k === "zoneId") { return "ZID: " + v.zoneId; }
    if (k === "crop") { return esc(v.cropAbbr); }
    if (k === "source") { return esc(v.source); }
    if (k === "wm") { return v.wm[0] + " | " + v.wm[1]; }
    if (k === "tz") { return v.tz; }
    return "";
  }

  function renderRows(list) {
    var showSchedLine = state.sort === "schedule";

    el.rowsFrame.innerHTML = list.map(function (v) {
      var sched = formattedSchedule(v);
      return '<div class="row-item' + (state.selected[v.id] ? " is-sel" : "") + '">' +
          '<span class="cbx"><input type="checkbox" data-act="sel" data-id="' + v.id + '"' + (state.selected[v.id] ? " checked" : "") + ' aria-label="Select ' + esc(v.name) + '"></span>' +
          '<div class="row-name"><div class="nm">' + esc(v.name) + " (" + v.zoneId + ")</div>" +
            (flagBadges(v) ? '<div class="row-badges">' + flagBadges(v) + "</div>" : "") +
          "</div>" +
          '<div class="row-val">' + condensedValue(v) + "</div>" +
          valveButton(v, true) +
        "</div>" +
        (showSchedLine
          ? '<div class="row-sched">' + sched.map(function (c, i) {
              return (i > 0 ? '<span class="sep"></span>' : "") + "<span>" + c + "</span>";
            }).join("") + "</div>"
          : "") +
        '<div class="row-div"></div>';
    }).join("");
  }

  function renderBanner() {
    var open = 0, sched = 0, held = 0;
    VALVES.forEach(function (v) {
      if (v.state === "Opened") { open++; }
      if (v.sched.length) { sched++; }
      if (v.paused || v.disabled) { held++; }
    });
    el.statOpen.textContent = open;
    el.statSched.textContent = sched;
    el.statPaused.textContent = held;
  }

  function renderSelection() {
    var ids = selectedIds();
    var anySel = ids.length > 0;
    var activeFacets = FACETS.filter(function (f) { return state.facets[f.key]; });

    el.selPanel.hidden = !anySel && activeFacets.length === 0;
    el.selCount.textContent = ids.length + " of " + VALVES.length + " selected";

    el.selFacets.innerHTML = activeFacets.map(function (f) {
      return '<span class="facet-chip" data-facet="' + f.key + '">' + f.label + " <b>" + facetRows(f.key).length + "</b></span>";
    }).join("");

    var body = "";

    if (anySel) {
      body += ids.map(byId).filter(Boolean).map(function (v) {
        return '<div class="sel-line">' + formatItem(v) + "</div>";
      }).join("");
    }

    activeFacets.forEach(function (f) {
      if (f.key === "selected") { return; }
      var rows = facetRows(f.key);
      body += '<div class="sel-banner ' + f.key + '">' +
        '<div class="sel-banner-top">' +
          '<button type="button" class="restart-btn" data-restart="' + f.key + '" aria-label="Restart ' + f.label + '"><span class="msy" aria-hidden="true">' + f.icon + "</span></button>" +
          '<span class="count">' + rows.length + " of " + VALVES.length + " " + f.word + "</span>" +
        "</div>" +
        rows.map(function (v) { return '<div class="sel-line">' + formatItem(v) + "</div>"; }).join("") +
      "</div>";
    });

    el.selBody.innerHTML = body;

    document.querySelectorAll("[data-bulk]").forEach(function (b) {
      if (b.dataset.bulk !== "weekly") { b.disabled = !anySel; }
    });

    var vis = visibleValves();
    var allOn = vis.length > 0 && vis.every(function (v) { return state.selected[v.id]; });
    el.selAll.checked = allOn;
    el.selAll.indeterminate = !allOn && vis.some(function (v) { return state.selected[v.id]; });

    FACETS.forEach(function (f) {
      var b = document.querySelector('.facet[data-facet="' + f.key + '"]');
      if (b) { b.setAttribute("aria-pressed", String(!!state.facets[f.key])); }
      var t = document.querySelector('[data-toggle="' + f.key + '"]');
      if (t) { t.checked = !!state.facets[f.key]; }
    });
  }

  function render() {
    var list = visibleValves();
    renderTable(list);
    renderCards(list);
    renderRows(list);
    renderBanner();
    renderSelection();

    el.empty.hidden = list.length > 0;
    el.console.dataset.view = state.view;
    el.sortLabel.textContent = sortLabel(state.sort);
    el.dirBtn.querySelector(".msy").textContent = state.desc ? "arrow_downward" : "arrow_upward";
    el.dirBtn.setAttribute("aria-label", state.desc ? "Sorted descending" : "Sorted ascending");

    // Roving tabindex: One stop for the strip, arrows move between them
    document.querySelectorAll(".tabs button").forEach(function (b) {
      var on = b.dataset.tab === state.view;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
    });

    el.console.querySelectorAll("thead th[data-key]").forEach(function (th) {
      if (th.dataset.key === state.sort) {
        th.setAttribute("aria-sort", state.desc ? "descending" : "ascending");
      } else {
        th.removeAttribute("aria-sort");
      }
    });
  }

  // toggleValve: Drive one valve through its in-flight state ##### ----->

  function toggleValve(id) {
    var v = byId(id);
    if (!v || busy[id]) { return; }

    var opening = displayState(v) !== "Opened";
    busy[id] = opening ? "Opening" : "Closing";
    render();
    toast(v.name + " (" + v.id + ") — command sent");

    window.setTimeout(function () {
      v.state = opening ? "Opened" : "Closed";
      if (opening) { v.elapsed = "0:00"; v.remaining = v.runtime; } else { v.elapsed = "NA"; v.remaining = "NA"; }
      delete busy[id];
      render();
      toast(v.name + " is now " + v.state.toLowerCase());
    }, 1800);
  }

  // Panel: one side-panel shell every dialog fills ##### ----->

  var dlg = { kind: null, days: [], times: [], showTimes: false, wmStart: 25, wmStop: 60,
              delDays: [], pauseFrom: null, pauseTo: null, pin: "", pinTarget: "", cfgTab: "zac", cfgFor: null };

  // FOCUSABLE: What Tab can land on inside an open overlay ##### ----->

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  var returnFocusTo = null;

  function focusablesIn(box) {
    return Array.prototype.filter.call(box.querySelectorAll(FOCUSABLE), function (n) {
      return n.offsetWidth > 0 || n.offsetHeight > 0 || n === document.activeElement;
    });
  }

  function openOverlay() {
    // openOverlay: Remember the trigger, so closing can hand focus back
    returnFocusTo = document.activeElement;
  }

  function openPanel(kind, width) {
    openOverlay();
    dlg.kind = kind;
    el.panel.style.width = width || "420px";
    el.panel.hidden = false;
    el.backdrop.hidden = false;
    revealConsoleTop();
    drawPanel();
    el.panelX.focus();
  }

  function closeOverlays() {
    var wasOpen = !el.panel.hidden || !el.sheet.hidden;
    el.panel.hidden = true;
    el.sheet.hidden = true;
    el.backdrop.hidden = true;
    dlg.kind = null;

    // Focus: Back where it came from, not the top of the document
    if (wasOpen && returnFocusTo && document.contains(returnFocusTo)) {
      returnFocusTo.focus();
    }
    returnFocusTo = null;
  }

  // Trap: Tab cycles inside the overlay, never escapes behind the backdrop
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Tab" || el.backdrop.hidden) { return; }

    var box = !el.panel.hidden ? el.panel : (!el.sheet.hidden ? el.sheet : null);
    if (!box) { return; }

    var items = focusablesIn(box);
    if (!items.length) { return; }

    var first = items[0];
    var last = items[items.length - 1];

    if (!box.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  function selectedValves() { return selectedIds().map(byId).filter(Boolean); }

  // Sort sheet ##### ----->

  function openSheet() {
    openOverlay();
    el.sheetList.innerHTML = SORT_FIELDS.map(function (f) {
      return '<button type="button" data-sortkey="' + f.key + '" aria-current="' + (f.key === state.sort) + '">' + f.label + "</button>";
    }).join("");
    el.sheet.hidden = false;
    el.backdrop.hidden = false;
    revealConsoleTop();

    // Land on the current sort field, so the list opens where it was left
    var current = el.sheetList.querySelector('[aria-current="true"]') || el.sheetList.querySelector("button");
    if (current) { current.focus(); }
  }

  // Dialog bodies ##### ----->

  // buildWeekly: Automatic Irrigation Scheduler, one row per valve & a column per day
  function buildWeekly() {
    var head = '<tr><th style="text-align:left">Field</th><th>Tz</th>' +
      ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map(function (d) { return "<th>" + d + "</th>"; }).join("") + "</tr>";

    var body = VALVES.map(function (v) {
      var cells = "";
      for (var d = 0; d < 7; d++) {
        var e = v.sched.filter(function (x) { return x.d === d; })[0];
        cells += "<td>" + (e
          ? '<div class="wk-cell"><span class="st">' + e.s + '</span><span class="sp">' + e.e + "</span></div>"
          : '<div class="wk-cell"><span class="msy">schedule</span><span class="msy">schedule</span></div>') + "</td>";
      }
      return '<tr><td class="field">' + esc(v.name) + " (" + v.zoneId + ')</td><td class="muted">' + v.tz + "</td>" + cells + "</tr>";
    }).join("");

    return '<div class="wk-bar">' +
        '<button type="button" class="submit-btn" data-dlg="save">Save</button>' +
        '<button type="button" class="c-btn" data-dlg="close">Cancel</button>' +
        '<span class="grow"></span>' +
        '<button type="button" class="icon-btn" data-act="refresh" aria-label="Refresh"><span class="msy">refresh</span></button>' +
        '<button type="button" class="icon-btn" data-act="print" aria-label="Print"><span class="msy">print</span></button>' +
        '<button type="button" class="icon-btn" data-act="csv" aria-label="Export CSV"><span class="msy">download</span></button>' +
      "</div>" +
      '<table class="wk-table"><thead>' + head + "</thead><tbody>" + body + "</tbody></table>" +
      '<p class="dlg-note">A start with no stop, or a stop with no start, blocks save. Times are stored in the valve’s own timezone.</p>';
  }

  // buildScheduler: Days first, then times, then submit — the order the form enforces
  function buildScheduler() {
    var zones = selectedValves();
    var names = zones.map(function (v) { return v.name; });
    var current = zones.length === 1 ? formattedSchedule(zones[0]).join(" | ") : "";
    var overlap = dlg.times.length > 0 && dlg.days.indexOf(1) > -1 && zones.some(function (v) {
      return v.sched.some(function (e) { return e.d === 1; });
    });

    var sel = '<div class="dlg-selected">' +
      '<div class="line"><span>Scheduling for:</span><span class="zones">' + esc(names.join(", ")) + "</span></div>" +
      (current ? '<div class="line"><span>Current:</span><span><b>' + current + "</b></span></div>" : "") +
      '<div class="line"><span>Selected Days:</span><b>' + dlg.days.map(function (d) { return ABBREV_DAYS[d]; }).join("") + "</b></div>" +
      (dlg.times.length ? '<div class="line"><span>Selected Times:</span>' + dlg.times.map(function (t) {
        return "<span><b>" + t.s + "</b> to <b>" + t.e + "</b></span>";
      }).join("") + "</div>" : "") +
      (overlap ? '<div class="dlg-overlap" role="alert">&#9888; That window overlaps a schedule already on this valve. Adjust the time or drop the day.</div>' : "") +
    "</div>";

    var days = '<div class="day-picker"><span style="font-size:13px">Select:</span>' +
      '<label><input type="checkbox" data-dlg="allDays"' + (dlg.days.length === 7 ? " checked" : "") + "> All</label>" +
      ABBREV_DAYS.map(function (a, d) {
        return '<label><input type="checkbox" data-dlg="day" data-d="' + d + '"' + (dlg.days.indexOf(d) > -1 ? " checked" : "") + "> " + a + "</label>";
      }).join("") + "</div>";

    var times = "";
    if (dlg.days.length && !dlg.times.length && !dlg.showTimes) {
      times = '<div class="dlg-sect"><button type="button" class="full-btn" data-dlg="openTimes"><span class="msy">schedule</span>Set Schedule Times</button></div>';
    } else if (dlg.showTimes) {
      times = '<div class="dlg-sect" style="border:1px solid var(--rule);padding:8px">' +
        '<div class="time-cols">' +
          '<div class="time-col start"><label class="cap" for="tStart">START</label><input type="time" id="tStart" value="04:00"></div>' +
          '<div class="time-col stop"><label class="cap" for="tStop">STOP</label><input type="time" id="tStop" value="07:30"></div>' +
        "</div>" +
        '<button type="button" class="submit-btn" style="width:100%" data-dlg="setTimes">Set Times</button>' +
      "</div>";
    }

    return sel + days + times;
  }

  // buildWm: Bulk watermark thresholds for the selection
  function buildWm() {
    return '<div style="text-align:center"><span class="wm-badge">Irrigation Monitoring Levels</span></div>' +
      '<div class="fld"><label for="wmU">Upper Irrigation Monitor</label>' +
        '<input type="number" id="wmU" value="' + dlg.wmStart + '"><span class="hint">Enter value between -100 - 100 kPa</span></div>' +
      '<div class="fld"><label for="wmL">Lower Irrigation Monitor</label>' +
        '<input type="number" id="wmL" value="' + dlg.wmStop + '"><span class="hint">Enter value between -100 - 100 kPa</span></div>' +
      '<p class="dlg-note">Applies to ' + selectedIds().length + ' selected valve' + (selectedIds().length === 1 ? "" : "s") + ".</p>";
  }

  // buildReports: Zone multiselect, date range & the run log for the range
  function buildReports() {
    var zones = selectedValves();
    if (!zones.length) { zones = VALVES.slice(0, 3); }

    var rows = zones.map(function (v, i) {
      var runs = [
        { s: "Sep 1, 4:00a", e: "Sep 1, 7:30a", by: "auto", cl: "auto", psi: 38, rt: "3:30" },
        { s: "Aug 30, 4:00a", e: "Aug 30, 7:28a", by: "auto", cl: "s.bernard", psi: 41, rt: "3:28" },
        { s: "Aug 28, 6:05a", e: "Aug 28, 8:00a", by: "s.bernard", cl: "auto", psi: 36, rt: "1:55" }
      ][i % 3];
      return "<tr><td>" + esc(v.name) + " (" + v.zoneId + ")</td><td>" + esc(v.source) + "</td><td>" + runs.s +
        "</td><td>" + runs.e + "</td><td>" + runs.by + "</td><td>" + runs.cl + "</td><td>" + v.tz +
        '</td><td class="num">' + runs.psi + '</td><td class="num">' + runs.rt + "</td></tr>";
    }).join("");

    return '<div class="rp-chips">' + zones.map(function (v) {
        return '<span class="rp-chip">' + esc(v.name) + " (" + v.zoneId + ")</span>";
      }).join("") + "</div>" +
      '<div class="fld"><label for="rpRange">Date Range</label><select id="rpRange">' +
        "<option>Past 7 Days</option><option>Past 30 Days</option><option>This Month</option><option>Last Month</option><option>Custom</option>" +
      "</select></div>" +
      '<table class="rp-table"><thead><tr><th>Zone / Field</th><th>Water Src</th><th>Start</th><th>End</th>' +
      "<th>Opened By</th><th>Closed By</th><th>Tz</th><th>Avg PSI</th><th>Runtime</th></tr></thead><tbody>" +
      rows + "</tbody></table>";
  }

  // buildPause: Range calendar, today forward only
  function buildPause() {
    var now = new Date();
    var y = now.getFullYear(), m = now.getMonth();
    var first = new Date(y, m, 1).getDay();
    var days = new Date(y, m + 1, 0).getDate();
    var monthName = now.toLocaleString("en-US", { month: "long", year: "numeric" });

    var cells = "";
    for (var b = 0; b < first; b++) { cells += "<span></span>"; }
    for (var d = 1; d <= days; d++) {
      var past = d < now.getDate();
      var cls = "cal-day";
      if (dlg.pauseFrom && dlg.pauseTo && d > dlg.pauseFrom && d < dlg.pauseTo) { cls += " in"; }
      if (d === dlg.pauseFrom || d === dlg.pauseTo) { cls += " edge"; }
      cells += '<button type="button" class="' + cls + '" data-dlg="calday" data-d="' + d + '"' + (past ? " disabled" : "") + ">" + d + "</button>";
    }

    var range = dlg.pauseFrom ? (monthName.split(" ")[0] + " " + dlg.pauseFrom + (dlg.pauseTo ? " – " + dlg.pauseTo : "")) : "No dates chosen";

    return '<div class="cal"><div class="cal-head">' + monthName + "</div>" +
      '<div class="cal-grid">' + ["S", "M", "T", "W", "T", "F", "S"].map(function (x) { return '<span class="dow">' + x + "</span>"; }).join("") +
      cells + "</div></div>" +
      '<p class="dlg-note">Pause range: <b>' + range + "</b>. Irrigation resumes automatically the day after the end date.</p>";
  }

  // buildDelete: Delete-all path, then an exact-day-match pattern picker
  function buildDelete() {
    var chosen = dlg.delDays;
    var patterns = {};

    selectedValves().forEach(function (v) {
      v.sched.forEach(function (e) {
        if (chosen.indexOf(e.d) === -1) { return; }
        var key = e.s + " - " + e.e;
        if (!patterns[key]) { patterns[key] = { days: [], fields: [], s: e.s, e: e.e }; }
        if (patterns[key].days.indexOf(e.d) === -1) { patterns[key].days.push(e.d); }
        if (patterns[key].fields.indexOf(v.name) === -1) { patterns[key].fields.push(v.name); }
      });
    });

    var keys = Object.keys(patterns);
    var list;

    if (!chosen.length) {
      list = '<p class="dlg-note">Pick one or more days to see the schedules that match exactly.</p>';
    } else if (!keys.length) {
      list = '<p class="dlg-note">No schedule on the selected valves matches those days exactly.</p>';
    } else {
      list = '<div class="dlg-sect-title" style="margin:8px 4px 0">Matching patterns</div>' + keys.map(function (k) {
        var p = patterns[k];
        var lbl = p.days.sort().map(function (d) { return ABBREV_DAYS[d]; }).join("");
        return '<div class="pat-row">' +
          '<button type="button" class="pat-chip" data-dlg="pattern" data-k="' + esc(k) + '">' + lbl + " " + p.s + " - " + p.e + "</button>" +
          '<button type="button" class="pat-count" data-dlg="patfields" data-k="' + esc(k) + '">' + p.fields.length + " field" + (p.fields.length === 1 ? "" : "s") + "</button>" +
        "</div>";
      }).join("");
    }

    return '<div class="dlg-sect"><button type="button" class="danger-btn" data-dlg="deleteAll">Delete All Schedules</button>' +
        '<p class="dlg-note">Requires a 4 digit PIN. Removes every schedule on the selected valves.</p></div>' +
      '<div class="dlg-sep"></div>' +
      '<div class="dlg-sect"><div class="dlg-sect-title">Days &mdash; exact match' +
        '<button type="button" class="c-btn" style="float:right;min-height:0;padding:2px 8px" data-dlg="allDelDays">' +
        (chosen.length === 7 ? "Deselect All" : "Select All") + "</button></div>" +
        '<div class="day-picker">' + ABBREV_DAYS.map(function (a, d) {
          return '<label><input type="checkbox" data-dlg="delday" data-d="' + d + '"' + (chosen.indexOf(d) > -1 ? " checked" : "") + "> " + a + "</label>";
        }).join("") + "</div></div>" +
      '<div class="dlg-sep"></div>' + list;
  }

  // buildPin: Four-digit confirmation before a destructive write
  function buildPin() {
    return '<div class="pin-card"><h5>Enter 4 digit PIN to confirm</h5>' +
      '<div class="pin-num">' + dlg.pin + "</div>" +
      '<input type="number" id="pinInput" inputmode="numeric" aria-label="Confirmation PIN">' +
      '<div class="pin-acts"><button type="button" class="flat-btn pri" data-dlg="close">Cancel</button>' +
      '<button type="button" class="flat-btn neg" data-dlg="pinConfirm">Confirm</button></div></div>';
  }

  // buildConfigs: Valve configuration, the three real tabs
  function buildConfigs() {
    var v = dlg.cfgFor;
    var tabs = [{ n: "zac", l: "Timers" }, { n: "zat", l: "Configs" }, { n: "zaf", l: "Failsafes" }];

    // fld: Give every input an id, so its label & hint point at it
    var fldSeq = 0;

    function fld(label, val, hint, span) {
      var id = "cfg-" + (++fldSeq);
      var hintId = id + "-hint";
      return '<div class="fld' + (span ? " span2" : "") + '"><label for="' + id + '">' + label + "</label>" +
        '<input id="' + id + '" value="' + val + '"' + (hint ? ' aria-describedby="' + hintId + '"' : "") + ">" +
        (hint ? '<span class="hint" id="' + hintId + '">' + hint + "</span>" : "") + "</div>";
    }

    var body = "";
    if (dlg.cfgTab === "zac") {
      body = '<div class="cfg-grid">' + fld("Manual Duration", v.runtime, "HH:MM, max 18:12", true) + "</div>";
    } else if (dlg.cfgTab === "zat") {
      body = '<div class="dlg-sect-title" style="margin-top:10px">Optimal Soil Moisture Levels</div><div class="cfg-grid">' +
          fld("Wet Threshold", v.wm[0] - 10, "") + fld("Dry Threshold", v.wm[1] + 5, "") + "</div>" +
        '<div class="dlg-sect-title" style="margin-top:10px">Auto Soil Sensor Tension Monitoring</div><div class="cfg-grid">' +
          '<div class="fld"><label for="cfgStartWm">Start Auto Soil Sensor</label><select id="cfgStartWm"><option>WM1</option><option selected>WM2</option><option>WM3</option></select></div>' +
          '<div class="fld"><label for="cfgStopWm">Stop Auto Soil Sensor</label><select id="cfgStopWm"><option>WM1</option><option selected>WM2</option><option>WM3</option></select></div>' + "</div>" +
        '<div class="dlg-sect-title" style="margin-top:10px">Irrigation Monitoring Levels</div><div class="cfg-grid">' +
          fld("Start Threshold", v.wm[0], "") + fld("Stop Threshold", v.wm[1], "") + "</div>";
    } else {
      body = '<div class="cfg-grid">' + fld("Min. PSI", 22, "") + fld("Min. Battery Voltage", "11.8", "") +
        fld("Max. Runtime", "04:00", "HH:MM (00:00 = no failsafe limit)", true) + "</div>";
    }

    return '<div class="cfg-tabs" role="tablist" aria-label="Valve configuration">' + tabs.map(function (t) {
        var on = dlg.cfgTab === t.n;
        return '<button type="button" role="tab" data-dlg="cfgtab" data-t="' + t.n + '" aria-selected="' + on + '"' +
          (on ? "" : ' tabindex="-1"') + ">" + t.l + "</button>";
      }).join("") + '</div><div role="tabpanel">' + body + "</div>";
  }

  // drawPanel: Title, body & footer for whichever dialog is open ##### ----->

  var PANELS = {
    weekly:   { title: "Automatic Irrigation Scheduler", body: buildWeekly,   foot: "" },
    schedule: { title: "Irrigation Scheduler",           body: buildScheduler, foot: "submit" },
    wm:       { title: "Bulk Watermarks",                body: buildWm,        foot: "submit" },
    reports:  { title: "Irrigation Reports",             body: buildReports,   foot: "" },
    pause:    { title: "Pause Dates Selection",          body: buildPause,     foot: "pause" },
    del:      { title: "Bulk Delete Schedules",          body: buildDelete,    foot: "" },
    pin:      { title: "Confirm Delete",                 body: buildPin,       foot: "" },
    configs:  { title: "Configure:",                     body: buildConfigs,   foot: "update" }
  };

  function drawPanel() {
    var p = PANELS[dlg.kind];
    if (!p) { return; }

    el.panelTitle.textContent = dlg.kind === "configs" ? "Configure: " + dlg.cfgFor.name : p.title;
    el.panelBody.innerHTML = p.body();

    var foot = "";
    if (p.foot === "submit") {
      var ready = dlg.kind !== "schedule" || dlg.times.length > 0;
      foot = '<button type="button" class="c-btn" data-dlg="close">Cancel</button>' +
        '<button type="button" class="submit-btn" data-dlg="save"' + (ready ? "" : " disabled") + ">Submit</button>";
    } else if (p.foot === "pause") {
      foot = '<button type="button" class="submit-btn" style="width:100%" data-dlg="save"' +
        (dlg.pauseFrom ? "" : " disabled") + ">Set Pause Dates</button>";
    } else if (p.foot === "update") {
      foot = '<button type="button" class="c-btn" data-dlg="close">Close</button>' +
        '<button type="button" class="submit-btn" data-dlg="save">Update</button>';
    }
    document.getElementById("panelFoot").innerHTML = foot;
  }

  // Dialog actions ##### ----->

  function onDialogClick(t) {
    var k = t.dataset.dlg;

    if (k === "close") { closeOverlays(); return true; }

    if (k === "openTimes") { dlg.showTimes = true; drawPanel(); return true; }

    if (k === "setTimes") {
      var s = document.getElementById("tStart").value || "04:00";
      var e = document.getElementById("tStop").value || "07:30";
      dlg.times = [{ s: prettyTime(s), e: prettyTime(e) }];
      dlg.showTimes = false;
      drawPanel();
      return true;
    }

    if (k === "day") {
      var d = Number(t.dataset.d);
      var at = dlg.days.indexOf(d);
      if (at > -1) { dlg.days.splice(at, 1); } else { dlg.days.push(d); }
      dlg.days.sort();
      drawPanel();
      return true;
    }

    if (k === "allDays") { dlg.days = t.checked ? [0, 1, 2, 3, 4, 5, 6] : []; drawPanel(); return true; }

    if (k === "delday") {
      var dd = Number(t.dataset.d);
      var ai = dlg.delDays.indexOf(dd);
      if (ai > -1) { dlg.delDays.splice(ai, 1); } else { dlg.delDays.push(dd); }
      drawPanel();
      return true;
    }

    if (k === "allDelDays") { dlg.delDays = dlg.delDays.length === 7 ? [] : [0, 1, 2, 3, 4, 5, 6]; drawPanel(); return true; }

    if (k === "calday") {
      var day = Number(t.dataset.d);
      if (!dlg.pauseFrom || dlg.pauseTo) { dlg.pauseFrom = day; dlg.pauseTo = null; }
      else if (day < dlg.pauseFrom) { dlg.pauseFrom = day; }
      else { dlg.pauseTo = day; }
      drawPanel();
      return true;
    }

    if (k === "cfgtab") { dlg.cfgTab = t.dataset.t; drawPanel(); return true; }

    if (k === "deleteAll") { openPin("every schedule on the selection"); return true; }

    if (k === "pattern") { openPin("the " + t.dataset.k + " pattern"); return true; }

    if (k === "patfields") { toast("That pattern covers: " + t.dataset.k + ". Field list opens here."); return true; }

    if (k === "pinConfirm") {
      var typed = (document.getElementById("pinInput") || {}).value;
      if (String(typed) !== String(dlg.pin)) { toast("PIN does not match. Nothing was deleted.", true); return true; }
      closeOverlays();
      toast("Deleted " + dlg.pinTarget + ".");
      return true;
    }

    if (k === "save") {
      var kind = dlg.kind;
      closeOverlays();
      if (kind === "weekly")   { toast("Weekly schedule saved."); }
      if (kind === "schedule") { toast("Schedule saved for " + selectedIds().length + " valve" + (selectedIds().length === 1 ? "" : "s") + "."); }
      if (kind === "wm")       { toast("Watermark thresholds updated on the selection."); }
      if (kind === "pause")    { toast("Pause dates set. Irrigation resumes after the end date."); }
      if (kind === "configs")  { toast("Valve configuration updated."); }
      return true;
    }

    return false;
  }

  function prettyTime(hhmm) {
    var parts = hhmm.split(":");
    var h = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10);
    var ap = h < 12 ? "a" : "p";
    var hr = h % 12 || 12;
    return hr + (m ? ":" + String(m).padStart(2, "0") : "") + ap;
  }

  function openPin(target) {
    dlg.pin = String(Math.floor(1000 + Math.random() * 9000));
    dlg.pinTarget = target;
    openPanel("pin", "320px");
  }

  // Wiring ##### ----->

  el.console.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act], [data-bulk], [data-facet], [data-tab], [data-sortkey], [data-restart], [data-dlg]");
    if (!t) { return; }

    if (t.dataset.dlg && onDialogClick(t)) { return; }

    if (t.dataset.act === "toggle") { toggleValve(Number(t.dataset.id)); return; }

    if (t.dataset.act === "configs") {
      dlg.cfgFor = byId(Number(t.dataset.id));
      dlg.cfgTab = "zac";
      openPanel("configs", "460px");
      return;
    }

    if (t.dataset.act === "delsched") { toast("Deleting one schedule asks for confirmation first.", true); return; }
    if (t.dataset.act === "print")    { toast("Print sheet uses the same formatting as the Selected panel."); return; }
    if (t.dataset.act === "csvinfo")  { toast("CSV preview lists every exported column."); return; }
    if (t.dataset.act === "csv")      { toast("Export started. The file downloads when it is ready."); return; }
    if (t.dataset.act === "refresh")  { toast("Scheduler reloaded from the server."); return; }

    if (t.dataset.restart) {
      var f = t.dataset.restart;
      toast(f === "autoclose" ? "Auto-close cleared on those valves." : "Restarted the " + f + " valves.");
      return;
    }

    if (t.dataset.sortkey) { state.sort = t.dataset.sortkey; savePrefs(); closeOverlays(); render(); return; }
    if (t.dataset.tab) { state.view = t.dataset.tab; savePrefs(); render(); return; }

    if (t.hasAttribute("data-facet")) {
      var fk = t.dataset.facet;
      state.facets[fk] = !state.facets[fk];
      if (state.facets[fk]) { el.selBody.hidden = false; el.selHead.setAttribute("aria-expanded", "true"); el.selCaret.innerHTML = "&#9652;"; }
      render();
      return;
    }

    if (t.dataset.bulk) {
      var b = t.dataset.bulk;
      if (b === "weekly")   { openPanel("weekly", "880px"); return; }
      if (b === "schedule") { dlg.days = []; dlg.times = []; dlg.showTimes = false; openPanel("schedule", "460px"); return; }
      if (b === "wm")       { openPanel("wm", "400px"); return; }
      if (b === "reports")  { openPanel("reports", "820px"); return; }
      if (b === "pause")    { dlg.pauseFrom = null; dlg.pauseTo = null; openPanel("pause", "340px"); return; }
      if (b === "del")      { dlg.delDays = []; openPanel("del", "440px"); return; }
      if (b === "delete")   { dlg.delDays = []; openPanel("del", "440px"); return; }
      if (b === "auto")     { toast("Auto-close set on the selected valves."); return; }
      if (b === "disable")  { toast("Selected valves disabled."); return; }
    }
  });

  el.console.addEventListener("change", function (e) {
    var t = e.target;
    if (t.dataset && t.dataset.dlg) { onDialogClick(t); return; }
    if (t.dataset && t.dataset.act === "sel") { state.selected[t.dataset.id] = t.checked; render(); }
    if (t.dataset && t.dataset.toggle) { state.facets[t.dataset.toggle] = t.checked; render(); }
  });

  el.selAll.addEventListener("change", function () {
    var on = el.selAll.checked;
    visibleValves().forEach(function (v) { state.selected[v.id] = on; });
    render();
  });

  el.selHead.addEventListener("click", function (e) {
    if (e.target.closest("[data-facet]")) { return; }
    var open = el.selBody.hidden;
    el.selBody.hidden = !open;
    el.selHead.setAttribute("aria-expanded", String(open));
    el.selCaret.innerHTML = open ? "&#9652;" : "&#9662;";
  });

  [el.qD, el.qM].forEach(function (input) {
    input.addEventListener("input", function () {
      state.query = input.value;
      (input === el.qD ? el.qM : el.qD).value = input.value;
      render();
    });
  });

  [el.srcD, el.srcM].forEach(function (sel) {
    sel.addEventListener("change", function () {
      state.source = sel.value;
      (sel === el.srcD ? el.srcM : el.srcD).value = sel.value;
      render();
    });
  });

  el.searchToggle.addEventListener("click", function () {
    state.searchOpen = !state.searchOpen;
    el.searchWrap.dataset.open = String(state.searchOpen);
    if (state.searchOpen) {
      el.qM.focus();
    } else if (state.query) {
      state.query = "";
      el.qM.value = "";
      el.qD.value = "";
      render();
    }
  });

  // wireArrowKeys: Move between tabs, the pattern a tablist is expected to have
  function wireArrowKeys(strip) {
    strip.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") { return; }

      var tabs = Array.prototype.slice.call(strip.querySelectorAll('[role="tab"]'));
      var at = tabs.indexOf(document.activeElement);
      if (at === -1) { return; }

      e.preventDefault();
      var next = tabs[(at + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      next.focus();
      next.click();
    });
  }

  el.console.querySelectorAll(".tabs").forEach(wireArrowKeys);
  el.panelBody.addEventListener("keydown", function (e) {
    var strip = e.target.closest(".cfg-tabs");
    if (!strip || (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) { return; }

    var tabs = Array.prototype.slice.call(strip.querySelectorAll('[role="tab"]'));
    var at = tabs.indexOf(document.activeElement);
    if (at === -1) { return; }

    e.preventDefault();
    var next = tabs[(at + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    next.click();
    // Redrawn on click, so refocus the tab in its new position
    var redrawn = el.panelBody.querySelectorAll('.cfg-tabs [role="tab"]');
    if (redrawn[tabs.indexOf(next)]) { redrawn[tabs.indexOf(next)].focus(); }
  });

  el.sortBtn.addEventListener("click", openSheet);
  el.dirBtn.addEventListener("click", function () { state.desc = !state.desc; savePrefs(); render(); });

  el.console.querySelectorAll("thead th[data-key] button").forEach(function (b) {
    b.addEventListener("click", function () {
      var key = b.parentNode.dataset.key;
      if (state.sort === key) { state.desc = !state.desc; } else { state.sort = key; state.desc = false; }
      savePrefs();
      render();
    });
  });

  el.panelX.addEventListener("click", closeOverlays);
  el.backdrop.addEventListener("click", closeOverlays);

  // topFab: Only appears once the cards have scrolled down a bit
  el.consoleScroll.addEventListener("scroll", function () {
    el.topFab.classList.toggle("is-shown", el.consoleScroll.scrollTop > 200);
  });

  el.topFab.addEventListener("click", function () {
    el.consoleScroll.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !el.backdrop.hidden) { closeOverlays(); }
  });

  // Viewport switcher ##### ----->

  var WIDTHS = { desktop: "100%", tablet: "768px", phone: "390px" };

  document.querySelectorAll(".vp-switch button").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll(".vp-switch button").forEach(function (o) {
        o.setAttribute("aria-pressed", String(o === b));
      });
      el.frame.style.width = WIDTHS[b.dataset.vp];
    });
  });

  // Init ##### ----->

  loadPrefs();

  var srcOptions = '<option value="">All water sources</option>' +
    SOURCES.map(function (s) { return '<option value="' + esc(s) + '">' + esc(s) + "</option>"; }).join("");
  el.srcD.innerHTML = srcOptions;
  el.srcM.innerHTML = srcOptions;

  state.selected[41] = true;
  state.selected[53] = true;

  render();
}());
