const fs = require('fs');
const path = require('path');

const dir = './functions';
const files = fs.readdirSync(dir);
const sqlList = [];
const tableMap = {};

files.forEach(f => {
  if (!f.endsWith('.js')) return;
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  // Match db.prepare calls
  const regex = /db\.prepare\(([\s\S]*?)\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const rawSql = match[1].trim();
    sqlList.push({ file: f, sql: rawSql });

    // Look for table names after FROM, INTO, UPDATE, JOIN
    const tblRegex = /(?:FROM|INTO|UPDATE|JOIN)\s+([a-zA-Z0-9_]+)/gi;
    let tMatch;
    while ((tMatch = tblRegex.exec(rawSql)) !== null) {
      const tbl = tMatch[1].toLowerCase();
      if (!['select', 'where', 'set', 'values', 'order', 'group', 'limit'].includes(tbl)) {
        if (!tableMap[tbl]) tableMap[tbl] = [];
        tableMap[tbl].push(f);
      }
    }
  }
});

console.log('=== DETECTED DATABASE TABLES ===');
Object.keys(tableMap).sort().forEach(t => {
  console.log(`Table: ${t} (used in ${Array.from(new Set(tableMap[t])).join(', ')})`);
});

console.log('\n=== ALL SQL STATEMENTS ===');
sqlList.forEach(s => {
  console.log(`[${s.file}]: ${s.sql.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ')}`);
});
