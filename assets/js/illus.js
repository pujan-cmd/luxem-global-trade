/* Luxem Global Trade — vector brass component illustrations (no external images) */
(function (root) {
  'use strict';
  var uid = 0;
  var EDGE = '#3d2a07';

  var DEFS =
    '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
    '<linearGradient id="bH" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#5a3d0f"/><stop offset=".07" stop-color="#9c7125"/><stop offset=".2" stop-color="#e6c274"/>' +
    '<stop offset=".33" stop-color="#fbe9b4"/><stop offset=".47" stop-color="#e2b55c"/><stop offset=".68" stop-color="#b98a33"/>' +
    '<stop offset=".88" stop-color="#85601a"/><stop offset="1" stop-color="#46300a"/></linearGradient>' +
    '<linearGradient id="bV" x1="0" y1="0" x2="1" y2="0">' +
    '<stop offset="0" stop-color="#5a3d0f"/><stop offset=".07" stop-color="#9c7125"/><stop offset=".2" stop-color="#e6c274"/>' +
    '<stop offset=".33" stop-color="#fbe9b4"/><stop offset=".47" stop-color="#e2b55c"/><stop offset=".68" stop-color="#b98a33"/>' +
    '<stop offset=".88" stop-color="#85601a"/><stop offset="1" stop-color="#46300a"/></linearGradient>' +
    '<linearGradient id="hT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbeab6"/><stop offset="1" stop-color="#e1b455"/></linearGradient>' +
    '<linearGradient id="hM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8c36c"/><stop offset=".55" stop-color="#c9983a"/><stop offset="1" stop-color="#a9791f"/></linearGradient>' +
    '<linearGradient id="hB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a47419"/><stop offset="1" stop-color="#5e400d"/></linearGradient>' +
    '<radialGradient id="bR" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="#fdf0c4"/><stop offset=".3" stop-color="#e4b85f"/>' +
    '<stop offset=".7" stop-color="#a97b27"/><stop offset="1" stop-color="#583b0d"/></radialGradient>' +
    '<radialGradient id="hole" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#0d0903"/><stop offset=".7" stop-color="#2a1c06"/><stop offset="1" stop-color="#6b4b12"/></radialGradient>' +
    '<linearGradient id="cutD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#120c03"/><stop offset="1" stop-color="#3a2807"/></linearGradient>' +
    '<linearGradient id="leverG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f7a52"/><stop offset=".5" stop-color="#1F5C3C"/><stop offset="1" stop-color="#0d3322"/></linearGradient>' +
    '<linearGradient id="cableG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4640"/><stop offset=".35" stop-color="#27322c"/><stop offset="1" stop-color="#0c120f"/></linearGradient>' +
    '<filter id="soft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>' +
    '</defs></svg>';

  /* ---------- primitives (horizontal axis at y = cy) ---------- */
  function cyl(x, cy, w, r, rx) {
    return '<rect x="' + x + '" y="' + (cy - r) + '" width="' + w + '" height="' + (2 * r) + '"' + (rx ? ' rx="' + rx + '"' : '') +
      ' fill="url(#bH)" stroke="' + EDGE + '" stroke-opacity=".45" stroke-width=".8"/>';
  }
  function cylV(cx, y, h, r) {
    return '<rect x="' + (cx - r) + '" y="' + y + '" width="' + (2 * r) + '" height="' + h +
      '" fill="url(#bV)" stroke="' + EDGE + '" stroke-opacity=".45" stroke-width=".8"/>';
  }
  function hexH(x, cy, w, R) {
    var a = R / 2;
    return '<g stroke="' + EDGE + '" stroke-opacity=".5" stroke-width=".8">' +
      '<rect x="' + x + '" y="' + (cy - R) + '" width="' + w + '" height="' + a + '" fill="url(#hT)"/>' +
      '<rect x="' + x + '" y="' + (cy - a) + '" width="' + w + '" height="' + R + '" fill="url(#hM)"/>' +
      '<rect x="' + x + '" y="' + (cy + a) + '" width="' + w + '" height="' + a + '" fill="url(#hB)"/></g>' +
      '<rect x="' + x + '" y="' + (cy - R) + '" width="3" height="' + (2 * R) + '" fill="#000" opacity=".2"/>' +
      '<rect x="' + (x + w - 3) + '" y="' + (cy - R) + '" width="3" height="' + (2 * R) + '" fill="#000" opacity=".3"/>' +
      '<rect x="' + (x + 3) + '" y="' + (cy - R) + '" width="1.2" height="' + (2 * R) + '" fill="#fff6d0" opacity=".55"/>';
  }
  function thread(x, cy, w, r, p) {
    var n = Math.max(2, Math.round(w / p)), step = w / (n * 2), d = Math.max(2.2, p * 0.3), i, top = [], bot = [], lines = '';
    for (i = 0; i <= n * 2; i++) {
      top.push((x + step * i).toFixed(1) + ',' + (cy - r + (i % 2 ? d : 0)).toFixed(1));
      bot.push((x + step * i).toFixed(1) + ',' + (cy + r - (i % 2 ? 0 : d)).toFixed(1));
    }
    bot.reverse();
    for (i = 0; i < n * 2; i += 2) {
      var x1 = x + step * i, x2 = x + step * (i + 1);
      lines += '<line x1="' + x1.toFixed(1) + '" y1="' + (cy - r) + '" x2="' + x2.toFixed(1) + '" y2="' + (cy + r) + '"/>';
    }
    return '<polygon points="' + top.concat(bot).join(' ') + '" fill="url(#bH)" stroke="' + EDGE + '" stroke-opacity=".45" stroke-width=".8" stroke-linejoin="round"/>' +
      '<g stroke="#4a3208" stroke-opacity=".5" stroke-width="1.1">' + lines + '</g>' +
      '<g stroke="#fff3c2" stroke-opacity=".38" stroke-width=".9" transform="translate(1.6 0)">' + lines + '</g>';
  }
  function knurl(x, cy, w, r) {
    var id = 'kc' + (uid++), s = 6, k, a = '', b = '';
    for (k = -2 * r; k < w + 2 * r; k += s) {
      a += '<line x1="' + (x + k) + '" y1="' + (cy - r) + '" x2="' + (x + k + 2 * r) + '" y2="' + (cy + r) + '"/>';
      b += '<line x1="' + (x + k + 2 * r) + '" y1="' + (cy - r) + '" x2="' + (x + k) + '" y2="' + (cy + r) + '"/>';
    }
    return cyl(x, cy, w, r) +
      '<clipPath id="' + id + '"><rect x="' + x + '" y="' + (cy - r) + '" width="' + w + '" height="' + (2 * r) + '"/></clipPath>' +
      '<g clip-path="url(#' + id + ')" stroke="#4a3208" stroke-opacity=".42" stroke-width=".9">' + a + b + '</g>' +
      '<rect x="' + x + '" y="' + (cy - r) + '" width="' + w + '" height="' + (2 * r) + '" fill="url(#bH)" opacity=".28"/>';
  }
  function ring(x, cy, w, r) { // dark groove ring
    return '<rect x="' + x + '" y="' + (cy - r) + '" width="' + w + '" height="' + (2 * r) + '" fill="#6f4d12" stroke="' + EDGE + '" stroke-opacity=".5" stroke-width=".8"/>' +
      '<rect x="' + x + '" y="' + (cy - r) + '" width="' + w + '" height="2" fill="#000" opacity=".25"/>';
  }
  function hidden(x1, x2, cy, r) { // hidden bore lines
    return '<g stroke="#2a1c05" stroke-opacity=".55" stroke-width="1.1" stroke-dasharray="6 4">' +
      '<line x1="' + x1 + '" y1="' + (cy - r) + '" x2="' + x2 + '" y2="' + (cy - r) + '"/>' +
      '<line x1="' + x1 + '" y1="' + (cy + r) + '" x2="' + x2 + '" y2="' + (cy + r) + '"/></g>';
  }
  function center(x1, x2, cy) {
    return '<line class="cl" x1="' + x1 + '" y1="' + cy + '" x2="' + x2 + '" y2="' + cy + '"/>';
  }
  /* rotate a horizontal sub-drawing to point up from (px,py) */
  function up(px, py, inner) { return '<g transform="translate(' + px + ' ' + py + ') rotate(-90)">' + inner + '</g>'; }

  /* ---------- dimensions ---------- */
  function dimH(x1, x2, yd, yp, label, gap) {
    var g = gap == null ? 4 : gap, d = yd < yp ? -1 : 1;
    return '<g class="dim">' +
      '<line x1="' + x1 + '" y1="' + (yp + d * g) + '" x2="' + x1 + '" y2="' + (yd + d * 6) + '"/>' +
      '<line x1="' + x2 + '" y1="' + (yp + d * g) + '" x2="' + x2 + '" y2="' + (yd + d * 6) + '"/>' +
      '<line x1="' + x1 + '" y1="' + yd + '" x2="' + x2 + '" y2="' + yd + '"/>' +
      '<path class="ar" d="M' + x1 + ',' + yd + ' l7,-3 v6 z"/><path class="ar" d="M' + x2 + ',' + yd + ' l-7,-3 v6 z"/>' +
      '<text x="' + ((x1 + x2) / 2) + '" y="' + (yd - 7) + '" text-anchor="middle">' + label + '</text></g>';
  }
  function dimV(xd, y1, y2, xp, label, gap) {
    var g = gap == null ? 4 : gap, d = xd < xp ? -1 : 1;
    return '<g class="dim">' +
      '<line x1="' + (xp + d * g) + '" y1="' + y1 + '" x2="' + (xd + d * 6) + '" y2="' + y1 + '"/>' +
      '<line x1="' + (xp + d * g) + '" y1="' + y2 + '" x2="' + (xd + d * 6) + '" y2="' + y2 + '"/>' +
      '<line x1="' + xd + '" y1="' + y1 + '" x2="' + xd + '" y2="' + y2 + '"/>' +
      '<path class="ar" d="M' + xd + ',' + y1 + ' l-3,7 h6 z"/><path class="ar" d="M' + xd + ',' + y2 + ' l-3,-7 h6 z"/>' +
      '<text x="' + (xd + (d < 0 ? -8 : 8)) + '" y="' + ((y1 + y2) / 2 + 4) + '" text-anchor="' + (d < 0 ? 'end' : 'start') + '">' + label + '</text></g>';
  }
  function leader(x1, y1, x2, y2, label, anchor) {
    return '<g class="dim"><line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/><circle class="ar" cx="' + x1 + '" cy="' + y1 + '" r="2.4"/>' +
      '<text x="' + (x2 + (anchor === 'end' ? -6 : 6)) + '" y="' + (y2 + 4) + '" text-anchor="' + (anchor || 'start') + '">' + label + '</text></g>';
  }

  /* ---------- compositions (600 x 440 frame, axis near y=230) ---------- */
  function turned(dims) {
    var cy = 235, s = '';
    s += center(40, 540, cy);
    s += thread(70, cy, 108, 28, 10) + ring(178, cy, 9, 21) + hexH(187, cy, 90, 52) + cyl(277, cy, 9, 56) +
      knurl(286, cy, 63, 40) + ring(349, cy, 9, 30) + thread(358, cy, 126, 28, 10) + cyl(484, cy, 18, 24, 4);
    s += hidden(70, 502, cy, 12);
    if (dims) {
      s += '<g class="dims">' +
        dimH(70, 502, 118, cy - 56, '48.00 ±0.02') +
        dimH(187, 277, 345, cy + 52, '10.00', 4) +
        leader(232, cy + 30, 150, 372, 'HEX AF 10', 'end') +
        leader(318, cy - 40, 370, 168, 'KNURL Ø8.90') +
        leader(420, cy + 24, 470, 338, 'M6 × 1.0 – 6g') +
        '</g>';
    }
    return s;
  }
  function tee(dims) {
    var cy = 270, x0 = 98, s = '', cx = 300;
    s += center(60, 540, cy);
    s += up(cx, cy - 44, cyl(0, 0, 12, 36) + hexH(12, 0, 32, 46) + thread(44, 0, 70, 30, 10));
    s += thread(x0, cy, 99, 32, 11) + hexH(x0 + 99, cy, 36, 50) + cyl(x0 + 135, cy, 135, 44) + hexH(x0 + 270, cy, 36, 50) + thread(x0 + 306, cy, 99, 32, 11);
    s += '<line class="cl" x1="' + cx + '" y1="60" x2="' + cx + '" y2="' + (cy + 8) + '"/>';
    if (dims) {
      s += '<g class="dims">' +
        dimH(x0, x0 + 405, 372, cy + 50, '45.00 ±0.05', 6) +
        dimV(214, 107, cy - 44, cx - 36, 'BRANCH 11.00') +
        leader(cx + 60, cy + 30, 440, 338, 'RUN G 1/4', 'start') +
        leader(cx + 40, 198, 420, 150, 'HEX AF 8.7', 'start') +
        '</g>';
    }
    return s;
  }
  function pin(dims) {
    var cy = 238, s = '';
    s += center(40, 540, cy);
    s += cyl(70, cy, 90, 18, 9) + ring(104, cy, 4, 18) + ring(116, cy, 4, 18) + ring(128, cy, 4, 18) +
      knurl(160, cy, 54, 30) + cyl(214, cy, 14, 44) + cyl(228, cy, 90, 34) + thread(318, cy, 117, 28, 11);
    s += hexH(345, cy, 36, 40);
    s += cyl(435, cy, 45, 26) + '<rect x="452" y="' + (cy - 26) + '" width="28" height="24" fill="url(#cutD)"/>' +
      '<rect x="452" y="' + (cy - 26) + '" width="28" height="24" fill="none" stroke="' + EDGE + '" stroke-opacity=".6"/>';
    s += hidden(228, 435, cy, 14);
    if (dims) {
      s += '<g class="dims">' +
        dimH(70, 480, 128, cy - 44, '45.60 ±0.05') +
        dimH(70, 160, 340, cy + 18, '10.00', 4) +
        leader(115, cy - 18, 90, 168, 'PIN Ø4.00 h6', 'start') +
        leader(272, cy + 34, 300, 345, 'BODY Ø7.60') +
        leader(458, cy - 26, 480, 168, 'SOLDER CUP', 'start') +
        '</g>';
    }
    return s;
  }
  function insertNut() {
    var s = '', cx = 190, cy = 235, R = 92, i, pts = [], rad;
    for (i = 0; i < 6; i++) { rad = Math.PI / 3 * i; pts.push((cx + R * Math.cos(rad)).toFixed(1) + ',' + (cy + R * Math.sin(rad)).toFixed(1)); }
    s += '<polygon points="' + pts.join(' ') + '" fill="url(#bR)" stroke="' + EDGE + '" stroke-opacity=".6" stroke-width="1.2" stroke-linejoin="round"/>';
    for (i = 0; i < 6; i++) { rad = Math.PI / 3 * i; s += '<line x1="' + (cx + 56 * Math.cos(rad)).toFixed(1) + '" y1="' + (cy + 56 * Math.sin(rad)).toFixed(1) + '" x2="' + (cx + R * Math.cos(rad)).toFixed(1) + '" y2="' + (cy + R * Math.sin(rad)).toFixed(1) + '" stroke="#4a3208" stroke-opacity=".35"/>'; }
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="80" fill="none" stroke="#fff3c2" stroke-opacity=".45" stroke-width="1.2"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="48" fill="url(#bR)" stroke="' + EDGE + '" stroke-opacity=".5"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="36" fill="url(#hole)"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="40" fill="none" stroke="#4a3208" stroke-opacity=".6" stroke-width="1.3" stroke-dasharray="3 2.6"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="44" fill="none" stroke="#fff3c2" stroke-opacity=".4" stroke-width="1"/>';
    s += cyl(334, cy, 16, 64) + knurl(350, cy, 150, 46) + hidden(334, 500, cy, 26);
    s += '<line class="cl" x1="316" y1="' + cy + '" x2="530" y2="' + cy + '"/>';
    return s;
  }
  function valve() {
    var cy = 250, cx = 300, s = '';
    s += center(50, 550, cy);
    s += thread(70, cy, 70, 30, 10) + hexH(140, cy, 46, 52) + cyl(186, cy, 40, 44) +
      cyl(374, cy, 40, 44) + hexH(414, cy, 46, 52) + thread(460, cy, 70, 30, 10);
    s += '<rect x="' + (cx - 36) + '" y="136" width="72" height="44" fill="url(#bV)" stroke="' + EDGE + '" stroke-opacity=".45" stroke-width=".8"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="84" fill="url(#bR)" stroke="' + EDGE + '" stroke-opacity=".5" stroke-width="1"/>' +
      '<ellipse cx="' + (cx - 28) + '" cy="' + (cy - 38) + '" rx="30" ry="14" fill="#fff" opacity=".22" transform="rotate(-24 ' + (cx - 28) + ' ' + (cy - 38) + ')"/>';
    s += '<rect x="' + (cx - 11) + '" y="96" width="22" height="42" fill="url(#bV)" stroke="' + EDGE + '" stroke-opacity=".45" stroke-width=".8"/>';
    s += '<rect x="' + (cx - 24) + '" y="86" width="48" height="14" rx="3" fill="url(#hM)" stroke="' + EDGE + '" stroke-opacity=".5"/>';
    s += '<rect x="' + (cx - 100) + '" y="68" width="200" height="16" rx="8" fill="url(#leverG)" stroke="#06180F" stroke-opacity=".6"/>' +
      '<rect x="' + (cx - 94) + '" y="71" width="188" height="3" rx="1.5" fill="#fff" opacity=".28"/>';
    return s;
  }
  function gland() {
    var cy = 238, s = '';
    s += center(40, 560, cy);
    s += '<rect x="352" y="' + (cy - 14) + '" width="190" height="28" fill="url(#cableG)" rx="2"/>';
    s += thread(70, cy, 96, 30, 10) + hexH(166, cy, 48, 50) + cyl(214, cy, 14, 40) + hexH(228, cy, 70, 58);
    s += '<path d="M298,' + (cy - 46) + ' C332,' + (cy - 46) + ' 350,' + (cy - 30) + ' 354,' + (cy - 14) + ' L354,' + (cy + 14) + ' C350,' + (cy + 30) + ' 332,' + (cy + 46) + ' 298,' + (cy + 46) + ' Z" fill="url(#bH)" stroke="' + EDGE + '" stroke-opacity=".5" stroke-width=".9"/>';
    s += '<rect x="352" y="' + (cy - 14) + '" width="190" height="28" fill="none" stroke="#000" stroke-opacity=".35"/>' +
      '<rect x="352" y="' + (cy - 12) + '" width="190" height="4" fill="#fff" opacity=".12"/>';
    s += hidden(70, 298, cy, 14);
    return s;
  }
  function nipple() {
    var cy = 235, s = '';
    s += center(40, 560, cy);
    s += thread(80, cy, 130, 34, 12) + hexH(210, cy, 80, 58) + thread(290, cy, 130, 34, 12);
    s += hidden(80, 420, cy, 18);
    return s;
  }
  function bush() {
    var cy = 235, s = '';
    s += center(60, 540, cy);
    s += cyl(110, cy, 28, 66) + knurl(138, cy, 230, 46) + ring(368, cy, 10, 40) + cyl(378, cy, 70, 40, 3);
    s += hidden(110, 448, cy, 28);
    return s;
  }


  /* ---- additional compositions: gas nozzle, auto sensor housing, tap spindle ---- */
  function nozzle(dims) {
    var cy = 235, s = '';
    s += center(40, 420, cy);
    s += thread(70, cy, 100, 26, 9) + hexH(170, cy, 56, 48) + cyl(226, cy, 14, 32) + thread(240, cy, 72, 21, 8);
    s += '<polygon points="312,' + (cy - 21) + ' 376,' + (cy - 9) + ' 376,' + (cy + 9) + ' 312,' + (cy + 21) + '" fill="url(#bH)" stroke="' + EDGE + '" stroke-opacity=".45" stroke-width=".8"/>' + cyl(376, cy, 10, 9, 2);
    s += hidden(70, 312, cy, 13) + '<g stroke="#2a1c05" stroke-opacity=".6" stroke-width="1.1" stroke-dasharray="5 4"><line x1="312" y1="' + (cy - 4) + '" x2="386" y2="' + (cy - 4) + '"/><line x1="312" y1="' + (cy + 4) + '" x2="386" y2="' + (cy + 4) + '"/></g>';
    if (dims) {
      s += '<g class="dims">' + dimH(70, 386, 128, cy - 48, '35.10 ±0.05') + leader(198, cy + 40, 150, 344, 'HEX AF 8.3', 'end') + leader(381, cy + 9, 400, 330, 'ORIFICE Ø0.90') + '</g>';
    }
    return s;
  }
  function sensor(dims) {
    var cy = 235, s = '';
    s += center(40, 440, cy);
    s += thread(70, cy, 84, 22, 8) + hexH(154, cy, 50, 44) + cyl(204, cy, 10, 50) + cyl(214, cy, 70, 30) + ring(284, cy, 8, 26) + cyl(292, cy, 80, 24) + cyl(372, cy, 28, 19, 4);
    s += hidden(70, 400, cy, 11);
    if (dims) {
      s += '<g class="dims">' + dimH(70, 400, 128, cy - 50, '33.00 ±0.05') + leader(112, cy + 22, 90, 340, 'M12 × 1.5', 'start') + leader(330, cy - 24, 360, 150, 'HOUSING Ø5.3') + '</g>';
    }
    return s;
  }
  function spindle(dims) {
    var cy = 235, s = '';
    s += center(40, 380, cy);
    s += knurl(70, cy, 64, 17) + ring(134, cy, 6, 15) + cyl(140, cy, 18, 32) + hexH(158, cy, 34, 40) + cyl(192, cy, 12, 28) + thread(204, cy, 84, 22, 9) + ring(288, cy, 5, 19) + cyl(293, cy, 26, 14, 3);
    s += hidden(204, 319, cy, 8);
    if (dims) {
      s += '<g class="dims">' + dimH(70, 319, 128, cy - 40, '27.70 ±0.05') + leader(102, cy + 17, 80, 340, 'SPLINE END Ø3.8', 'start') + leader(246, cy + 22, 290, 340, '1/2″ BSP') + '</g>';
    }
    return s;
  }

  var SCENES = { nozzle: nozzle, sensor: sensor, spindle: spindle, turned: turned, tee: tee, pin: pin, insert: insertNut, valve: valve, gland: gland, nipple: nipple, bush: bush };
  /* per-scene centring for thumbnails */
  var THUMB = { nozzle: [230, 235, .86], sensor: [235, 235, .84], spindle: [200, 235, .98], turned: [286, 235, .66], tee: [300, 215, .66], pin: [275, 238, .64], insert: [315, 235, .66], valve: [300, 195, .6], gland: [305, 238, .62], nipple: [250, 235, .66], bush: [279, 235, .72] };

  var HERO_VB = { turned: '24 92 552 300', tee: '36 36 528 380', pin: '24 100 552 284' };
  function hero(name) {
    return '<svg viewBox="' + (HERO_VB[name] || '0 0 600 440') + '" role="img" aria-label="Technical drawing of a brass ' + name + ' component" xmlns="http://www.w3.org/2000/svg">' + SCENES[name](true) + '</svg>';
  }
  function thumb(name, k) {
    var c = THUMB[name], sc = k || c[2] || 0.6, tx = 160 - c[0] * sc, ty = 100 - c[1] * sc;
    return '<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g transform="translate(' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ') scale(' + sc + ')">' + SCENES[name](false) + '</g></svg>';
  }

  var api = { DEFS: DEFS, hero: hero, thumb: thumb, SCENES: SCENES };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.LGTIllus = api;
})(typeof window !== 'undefined' ? window : this);
