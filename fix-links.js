import fs from "fs";
import path from "path";

function walk(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      walk(filepath, callback);
    } else if (filepath.endsWith(".tsx") || filepath.endsWith(".jsx")) {
      callback(filepath);
    }
  });
}

function fixFile(file) {
  let content = fs.readFileSync(file, "utf8");

  content = content.replace(/<a href=/g, "<Link href=");
  content = content.replace(/<\/a>/g, "</Link>");

  if (!content.includes('import Link from "next/link"')) {
    content = 'import Link from "next/link";\n' + content;
  }

  fs.writeFileSync(file, content, "utf8");
  console.log("✔ Reparat:", file);
}

console.log("🔍 Caut fișiere...");
walk("./app", fixFile);
console.log("🎉 Gata! Toate <a href> au fost înlocuite cu <Link href>.");
