// Scans /papers and writes dist/ (site + papers.json). Run: node build.js
const fs = require("fs"), path = require("path");
const SRC = path.join(__dirname, "papers"), OUT = path.join(__dirname, "dist");
const FILE = /\.(pdf|png|jpe?g)$/i;
const ls = d => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }) : []);

function make(kind, subject, file, rel) {
  const year = (file.match(/(?:19|20)\d{2}/) || [null])[0];
  return {
    subject,
    year: year ? Number(year) : null,
    title: file.replace(FILE, "").replace(/_/g, " "),
    path: "papers/" + rel.split(path.sep).map(encodeURIComponent).join("/"),
    size: fs.statSync(path.join(SRC, rel)).size,
  };
}
function scan(kind) {
  const out = [];
  for (const e of ls(path.join(SRC, kind))) {
    if (e.name.startsWith(".")) continue;
    if (e.isDirectory()) {
      for (const f of ls(path.join(SRC, kind, e.name)))
        if (f.isFile() && FILE.test(f.name)) out.push(make(kind, e.name, f.name, path.join(kind, e.name, f.name)));
    } else if (e.isFile() && FILE.test(e.name)) out.push(make(kind, "General", e.name, path.join(kind, e.name)));
  }
  return out;
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.copyFileSync(path.join(__dirname, "index.html"), path.join(OUT, "index.html"));
if (fs.existsSync(SRC)) fs.cpSync(SRC, path.join(OUT, "papers"), { recursive: true });
const data = { pyq: scan("pyq"), mock: scan("mock") };
fs.writeFileSync(path.join(OUT, "papers.json"), JSON.stringify(data));
console.log(`Built: ${data.pyq.length} PYQs, ${data.mock.length} mock papers`);
