/* whatsapp.js — WhatsApp for iOS (2026) screens as the RECIPIENT sees them: chat with a business account, and the chat list.
   Exposes window.WA. Cells: { type:"chat", template:bool, header:string, body, footer, buttons:[{label,url}], day, time, replies:[...] } */
(function () {
  const C = window.CORE, esc = C.esc;
  const D = new Proxy({}, { get: (_, k) => C.D[k] });
  const I = {
    back: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a7cff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    video: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0a7cff" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="3"/><path d="M16 10l5-3v10l-5-3z"/></svg>',
    phone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a7cff" stroke-width="1.8" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    plus: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a7cff" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    sticker: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" stroke-width="1.6"><path d="M4 12a8 8 0 0 1 8-8h8v8a8 8 0 0 1-8 8H4z"/><path d="M20 12h-4a4 4 0 0 0-4 4v4"/></svg>',
    camera: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a7cff" stroke-width="1.8" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.2"/></svg>',
    mic: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a7cff" stroke-width="1.8" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>',
    lock: '<svg width="11" height="11" viewBox="0 0 24 24" fill="#54656f"><path d="M17 8h-1V6a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zm-7-2a2 2 0 0 1 4 0v2h-4z"/></svg>',
    ext: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a7cff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 13v6H5V6h6"/></svg>',
    reply: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a7cff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14l-4-4 4-4"/><path d="M5 10h9a5 5 0 0 1 0 10h-3"/></svg>',
    check2: '<svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="#53bdeb" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6l3 3 6-7"/><path d="M6 6l3 3 6-7"/></svg>',
    verified: '<svg width="16" height="16" viewBox="0 0 24 24"><path fill="#25d366" d="M12 1.5l2.6 2.1 3.3-.5 1.2 3.1 3 1.4-.6 3.3 2 2.7-2 2.7.6 3.3-3 1.4-1.2 3.1-3.3-.5L12 22.5l-2.6-2.1-3.3.5-1.2-3.1-3-1.4.6-3.3-2-2.7 2-2.7-.6-3.3 3-1.4 1.2-3.1 3.3.5z"/><path d="M7.5 12.2l3 3 6-6.4" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    cameraSm: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.8" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.2"/></svg>',
    compose: '<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',
    tabs: { updates: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" stroke-width="1.8"><circle cx="12" cy="12" r="8.5" stroke-dasharray="5 3"/><circle cx="12" cy="12" r="3.5" fill="#8e8e93" stroke="none"/></svg>', calls: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" stroke-width="1.8" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>', comm: '<svg width="26" height="26" viewBox="0 0 24 24" fill="#8e8e93"><circle cx="9" cy="8" r="3"/><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5z"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 13.6c3 .2 5.5 2.1 5.5 5.4h-4.5c0-2-.4-3.9-1.3-5.4z"/></svg>', chats: '<svg width="26" height="26" viewBox="0 0 24 24" fill="#0a7cff"><path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.4 1.2 4.6 3.1 6.1L4 21l4.2-1.7c1.2.4 2.5.6 3.8.6 5.5 0 10-3.8 10-8.4S17.5 3 12 3z"/></svg>', settings: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>' }
  };
  const biz = () => D.people.business;
  const av = (p, size) => `<span class="av" style="width:${size}px;height:${size}px;background:${p.color};font-size:${Math.round(size * .4)}px">${p.photo ? `<img src="${esc(p.photo)}" alt="">` : esc(p.initials)}</span>`;

  function bubble(m, incoming) {
    let txt = C.rich(m.body, "wa-link").replace(/\n/g, "<br>");
    // WhatsApp formatting: *bold* _italic_
    txt = txt.replace(/\*([^*\n]+)\*/g, "<b>$1</b>").replace(/_([^_\n]+)_/g, "<i>$1</i>");
    const first = C.firstUrl(m.body);
    const prev = (incoming && first && first.meta) ? `<a class="wa-prev" href="${esc(first.href)}" target="_blank" rel="noopener"><div class="wa-prev-img"></div><div class="wa-prev-t">${esc(first.meta.title)}</div><div class="wa-prev-d">${esc(first.meta.domain)}</div></a>` : "";
    const header = m.header ? `<div class="wa-hdr">${esc(C.fill(m.header, C.state.mode))}</div>` : "";
    const footer = m.footer ? `<div class="wa-ftr">${esc(C.fill(m.footer, C.state.mode))}</div>` : "";
    const meta = `<span class="wa-meta">${esc(C.ampm(m.time || "10:00 am"))}${incoming ? "" : I.check2}</span>`;
    const btns = (m.buttons || []).map(b => `<a class="wa-btn" href="${esc(C.sample(b.url || "#"))}" target="_blank" rel="noopener">${b.url ? I.ext : I.reply}${esc(b.label)}</a>`).join("");
    return `<div class="wa-row ${incoming ? "in" : "out"}"><div class="wa-bub">${header}${prev}<div class="wa-txt">${txt}${meta}</div>${footer}</div>${btns ? `<div class="wa-btns">${btns}</div>` : ""}</div>`;
  }

  function chatScreen(cell) {
    const b = biz();
    const msgs = (cell.messages || []).map(m => bubble(m, m.from !== "me")).join("");
    return `${C.statusBar()}
      <div class="wa-nav"><span class="wa-back">${I.back}<span class="wa-count">12</span></span>${av(b, 36)}<div class="wa-title"><div class="wa-name">${esc(b.name)} ${b.verified ? I.verified : ""}</div><div class="wa-sub">${esc(b.sub || "Business account")}</div></div><span class="wa-ic">${I.video}</span><span class="wa-ic">${I.phone}</span></div>
      <div class="scroll wa-body" data-scroll="bottom"><div class="wa-wall">
        <div class="wa-pill">${esc(cell.dayLabel || "Today")}</div>
        <div class="wa-sys">${I.lock} This business uses a secure service from Meta to manage this chat. Tap to learn more.</div>
        ${msgs}<div style="height:8px"></div></div></div>
      <div class="wa-composer"><span class="wa-ic">${I.plus}</span><div class="wa-input"><span></span>${I.sticker}</div><span class="wa-ic">${I.camera}</span><span class="wa-ic">${I.mic}</span></div>
      ${C.home()}`;
  }

  function listRow(r, unread) {
    return `<div class="wa-lrow">${av(r.p, 52)}<div class="wa-lmain"><div class="wa-l1"><span class="wa-lname">${esc(r.name)}</span><span class="wa-ltime${unread ? " un" : ""}">${esc(r.time)}</span></div><div class="wa-l2"><span class="wa-lsnip">${esc(r.snippet)}</span>${unread ? `<span class="wa-badge">${unread}</span>` : ""}</div></div></div>`;
  }
  function listScreen(cell) {
    const b = biz();
    const last = cell.messages[cell.messages.length - 1];
    const snip = C.sample(last.body).replace(/\s+/g, " ");
    const rows = [listRow({ p: b, name: b.name, time: C.ampm(last.time || "10:00 am"), snippet: snip }, 1)].concat((D.chatFiller || []).map(f => listRow(f, f.unread))).join("");
    return `${C.statusBar()}
      <div class="wa-lnav"><span class="wa-lmore">•••</span><span class="wa-sp"></span><span class="wa-ic">${I.cameraSm}</span><span class="wa-fabsm">${I.plus.replace(/#0a7cff/g, "#fff")}</span></div>
      <div class="wa-ltitle">Chats</div>
      <div class="wa-search"><span>🔍</span> Ask Meta AI or Search</div>
      <div class="wa-filters"><span class="on">All</span><span>Unread</span><span>Favourites</span><span>Groups</span><span>+</span></div>
      <div class="scroll wa-list">${rows}</div>
      <div class="wa-tabs"><div>${I.tabs.updates}<span>Updates</span></div><div>${I.tabs.calls}<span>Calls</span></div><div>${I.tabs.comm}<span>Communities</span></div><div class="on">${I.tabs.chats}<span>Chats</span></div><div>${I.tabs.settings}<span>Settings</span></div></div>
      ${C.home()}`;
  }
  window.WA = { chatScreen, listScreen, I, av };
})();
