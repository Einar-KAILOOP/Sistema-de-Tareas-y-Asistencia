const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="/src/style.css" />');
html = html.replace(/<script>[\s\S]*?<\/script>/, '<script type="module" src="/src/main.js"></script>');
fs.writeFileSync('index.html', html, 'utf8');
