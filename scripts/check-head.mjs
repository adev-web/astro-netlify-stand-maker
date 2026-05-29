import { readFileSync } from 'fs';
const html = readFileSync('dist/index.html', 'utf8');
const start = html.indexOf('<link rel="stylesheet"');
const end = html.indexOf('</head>') + 7;
const section = html.substring(Math.max(0, start - 200), end);
const hasScript = section.includes('<script>') || section.includes('<script ');
console.log('Has script in head near CSS:', hasScript);
console.log('Section:', section);
