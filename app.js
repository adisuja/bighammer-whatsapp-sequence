/* app.js — WhatsApp channel renderer: every cell is one message as the recipient sees it in WhatsApp for iOS. */
(function () {
  window.RENDER = {
    screen(cell) { return window.PREVIEW_STATE.view === "list" ? window.WA.listScreen(cell) : window.WA.chatScreen(cell); },
    screenClass() { return "whatsapp"; },
    text(cell) {
      const m = cell.messages[cell.messages.length - 1];
      return `${m.header ? m.header + "\n" : ""}${m.body}${m.footer ? "\n" + m.footer : ""}${(m.buttons || []).map(b => `\n[button: ${b.label} → ${b.url || "quick reply"}]`).join("")}`;
    },
    meta(cell) {
      const core = window.CORE, m = cell.messages[cell.messages.length - 1];
      const body = core.sample(m.body);
      return `${core.words(body)} words · ${body.length}/1024 chars · Day ${cell.day} · ${core.ampm(m.time || cell.time || "10:00 am")}`;
    }
  };
})();
