const fs = require('fs');
const path = require('path');

// Leer la variable de entorno de Render
const backendUrl = process.env.BACKEND_URL;

if (!backendUrl) {
    console.error('❌ ERROR: La variable BACKEND_URL no está definida');
    process.exit(1);
}

const apiUrl = `${backendUrl}/api`;
const indexPath = path.join(__dirname, 'index.html');

let content = fs.readFileSync(indexPath, 'utf8');
content = content.replace(/__API_URL__/g, apiUrl);
fs.writeFileSync(indexPath, content);

console.log(`✅ API_URL reemplazada con: ${apiUrl}`);
