const fs = require('fs');
const path = require('path');

const targets = [
  'اسرة الانبا موسي الاسود',
  'اسرة مارجرس',
  'اسرة الانبا كاراس',
  'الانبا موسي',
  'مارجرس',
  'الانبا كاراس'
];

function searchDir(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === '_backup_pre_redesign' || entry.name === 'node_modules') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      searchDir(fullPath, results);
    } else if (entry.isFile() && !entry.name.endsWith('.png') && !entry.name.endsWith('.jpg') && !entry.name.endsWith('.ico')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        targets.forEach(t => {
          if (line.includes(t)) {
            results.push({ file: fullPath, line: idx + 1, term: t, text: line.trim() });
          }
        });
      });
    }
  }
  return results;
}

const matches = searchDir('.');
console.log(`Found ${matches.length} references:`);
matches.forEach(m => {
  console.log(`[${m.file}:${m.line}] (${m.term}): ${m.text}`);
});
