/* BigHammer.ai WHATSAPP messages — copy + sample merge data.
   Source of truth: Google Doc "UPDATED WhatsApp Reminder" tab (Invite, Reminder day before, Reminder 1 hour before), read 19 Sep 2026.
   The source hard-codes "30 July, 11am EST"; every date/time here is a {{webinar_date}} / {{webinar_time}} token.
   Rendered as the RECIPIENT sees it: BigHammer.ai is the business account, so its messages are incoming (white) bubbles.
   Edit copy here. SEP renders where the source had an em dash. Structure: campaigns → columns (messages in send order) → rows (paths) → cells. */
(function () {
  const SEP = " - ";
  const T = (s) => String(s).replace(/\s*—\s*/g, SEP);
  const WEBINAR = "https://webinar.bighammerai.com/";

  const people = {
    business: { name: "BigHammer.ai", sub: "Business account", verified: true, initials: "B", color: "#0d1b2a" },
    me: { name: "Sarah Mitchell", initials: "SM", color: "#0b6e4f" },
    sender: { name: "Srinath Reddy", initials: "SR", color: "#5b3fa0" }
  };
  const chatFiller = [
    { p: { initials: "JC", color: "#8a5a2b" }, name: "James Carter", time: "9:12 AM", snippet: "Moved the platform review to Thursday 👍", unread: 0 },
    { p: { initials: "EW", color: "#3d5a80" }, name: "Emily Watson", time: "Yesterday", snippet: "Sending the dbt renewal quote now", unread: 0 },
    { p: { initials: "F", color: "#c0392b" }, name: "Family", time: "Yesterday", snippet: "Mum: Dinner Sunday?", unread: 2 }
  ];

  const tokens = {
    first_name: "Sarah",
    webinar_date: "Thursday 15 October, 12pm ET",
    webinar_time: "12 PM ET",
    webinar_url: WEBINAR,
    join_url: WEBINAR   // no join link exists yet; falls back to the registration page so the button works
  };
  const previews = {
    "bighammer.ai": { title: "Big Hammer AI – AI data engineering platform", domain: "bighammer.ai" },
    "webinar.bighammerai.com": { title: "Reduce Databricks Costs — to 75% — Live Masterclass | BigHammer.ai", domain: "webinar.bighammerai.com" }
  };
  const linkChecks = [
    { url: WEBINAR, status: "warn", label: "200 · stale date in HTML", note: "Loads, but the served HTML still says \"June 18, 2026 · 11:00 AM ET\". WhatsApp link previews are built from that HTML, so the preview card under the invite shows a past date until the page is fixed." },
    { url: "{{join_url}}", status: "pending", label: "not live yet", note: "Both reminders need the webinar access link. None exists yet; the sample falls back to the registration page." }
  ];
  const linkCheckedAt = "19 Sep 2026";

  const kinds = {
    template: { label: "Template message (Marketing)", color: "#1daa61" },
    utility: { label: "Template message (Utility)", color: "#0a7cff" },
    session: { label: "Session message", color: "#54656f" }
  };

  /* ---------- copy ---------- */
  const INVITE = T(`Hi {{first_name}},
Srinath here from BigHammer.ai. Doing a free live session on {{webinar_date}} — all about getting your Databricks bill down.

Most teams are overpaying by a lot without realising it, and I'll show you exactly where it's going and how to cut it, up to 75%.

Worth 45 mins if Databricks cost is on your plate. First 5 who book a demo on the call get a $50 Amazon voucher.

Grab a seat: {{webinar_url}}`);

  const DAY_BEFORE = T(`Hi {{first_name}}, we're on tomorrow at {{webinar_time}} — the Databricks cost session.

Link: {{join_url}}

I'll walk through a real client that cut their bill 84%, and where most of that saving actually comes from. Come with questions — the best 3 on the call win a $50 voucher.

See you there.`);

  const HOUR_BEFORE = T(`Starting in an hour — {{join_url}}

Databricks cost session with me (Srinath). If you're only free for part of it, join the first 20 mins; that's where the good stuff is.

$50 voucher for the first 5 demo bookings today. See you soon.`);

  const OPT_OUT = "Reply STOP to opt out";   // Meta requires an opt-out path on Marketing templates; added as the template footer component, not in the doc copy

  let n = 0;
  const msg = (o) => Object.assign({ from: "business", time: "10:00 am" }, o);
  const cell = (o) => Object.assign({ id: "w" + (++n), type: "chat" }, o);

  const campaigns = [
    {
      id: "wa", title: "WhatsApp invite + reminders (3 messages)", kinds: ["template", "utility"],
      subtitle: "The buttons and the opt-out footer do NOT appear automatically from a link in the text: they are template components (URL button, quick-reply buttons, footer) that have to be defined when the template is created and approved in WhatsApp Manager, and they only exist on the WhatsApp Business Platform (Cloud API via a provider), not in the small-business WhatsApp Business app. A bare URL in the body renders as a tappable link only. First outbound must be an approved template (opt-in required; Marketing category; body ≤ 1,024 chars; opt-out needed). The two reminders are Utility templates if sent outside a 24-hour service window, which is the usual case. Bubbles are shown as the recipient sees them: the business's messages arrive as white incoming bubbles with a green verified tick on the business name.",
      columns: [
        { id: "m1", label: "Message 1", title: "invite", day: "Day 0 · 10 AM (cold or opted-in list)" },
        { id: "m2", label: "Message 2", title: "reminder, day before", day: "Webinar day −1 · 10 AM" },
        { id: "m3", label: "Message 3", title: "reminder, 1 hour before", day: "Webinar day · 11 AM" }
      ],
      rows: [
        { id: "wa-path", label: "Path 1 · every recipient (single path, no variations yet)", cells: [
          cell({ kinds: ["template"], day: 0, time: "10:00 am", dayLabel: "Today", messages: [msg({ body: INVITE, footer: OPT_OUT, buttons: [{ label: "Grab a seat", url: "{{webinar_url}}" }] })],
            footnote: "Opt-out footer (\"Reply STOP to opt out\") and the URL button are template components added for Meta review; the doc copy has neither. The body also repeats the link as text, which is how the doc wrote it." }),
          cell({ kinds: ["utility"], day: -1, time: "10:00 am", dayLabel: "Today", messages: [msg({ body: DAY_BEFORE, buttons: [{ label: "Join the session", url: "{{join_url}}" }] })],
            footnote: "Doc says \"tomorrow at 11 am EST\"; rendered with the {{webinar_time}} token (12 PM ET)." }),
          cell({ kinds: ["utility"], day: 0, time: "11:00 am", dayLabel: "Today", messages: [msg({ body: HOUR_BEFORE, time: "11:00 am", buttons: [{ label: "Join now", url: "{{join_url}}" }] })] })
        ] }
      ]
    }
  ];

  window.PREVIEW_DATA = { channel: "whatsapp", SEP, people, chatFiller, tokens, previews, linkChecks, linkCheckedAt, kinds, campaigns, defaultState: { view: "chat" } };
})();
