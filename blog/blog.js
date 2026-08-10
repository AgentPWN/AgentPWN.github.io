function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inlineMd(s) {
  s = escapeHtml(s);
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return s;
}

function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;

  const isBlank = (l) => /^\s*$/.test(l);
  const isHeading = (l) => /^#{1,4}\s/.test(l);
  const isFence = (l) => /^```/.test(l);
  const isQuote = (l) => /^>\s?/.test(l);
  const isUl = (l) => /^\s*[-*]\s+/.test(l);
  const isOl = (l) => /^\s*\d+\.\s+/.test(l);
  const isHr = (l) => /^(-{3,}|\*{3,}|_{3,})\s*$/.test(l);

  while (i < lines.length) {
    const line = lines[i];

    if (isFence(line)) {
      const buf = [];
      i++;
      while (i < lines.length && !isFence(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      out.push("<pre><code>" + escapeHtml(buf.join("\n")) + "</code></pre>");
      continue;
    }

    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const lvl = h[1].length;
      out.push("<h" + lvl + ">" + inlineMd(h[2]) + "</h" + lvl + ">");
      i++;
      continue;
    }

    if (isHr(line)) {
      out.push("<hr />");
      i++;
      continue;
    }

    if (isQuote(line)) {
      const buf = [];
      while (i < lines.length && isQuote(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out.push("<blockquote>" + inlineMd(buf.join(" ")) + "</blockquote>");
      continue;
    }

    if (isUl(line)) {
      const buf = [];
      while (i < lines.length && isUl(lines[i])) {
        buf.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      out.push("<ul>" + buf.map((t) => "<li>" + inlineMd(t) + "</li>").join("") + "</ul>");
      continue;
    }

    if (isOl(line)) {
      const buf = [];
      while (i < lines.length && isOl(lines[i])) {
        buf.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      out.push("<ol>" + buf.map((t) => "<li>" + inlineMd(t) + "</li>").join("") + "</ol>");
      continue;
    }

    if (isBlank(line)) {
      i++;
      continue;
    }

    const buf = [];
    while (
      i < lines.length &&
      !isBlank(lines[i]) &&
      !isHeading(lines[i]) &&
      !isFence(lines[i]) &&
      !isQuote(lines[i]) &&
      !isUl(lines[i]) &&
      !isOl(lines[i]) &&
      !isHr(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    out.push("<p>" + inlineMd(buf.join(" ")) + "</p>");
  }

  return out.join("\n");
}

function mdToText(md) {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, "")
    .replace(/[#>*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function fmtDate(iso) {
  const parts = String(iso).split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  if (parts.length === 3 && months[parts[1] - 1]) {
    return months[parts[1] - 1] + " " + parts[2] + ", " + parts[0];
  }
  return iso;
}

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
