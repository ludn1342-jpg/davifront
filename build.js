const fs = require('fs');
const path = require('path');

const backendUrl = process.env.BACKEND_URL;

if (!backendUrl) {
    console.error('❌ ERROR: La variable BACKEND_URL no está definida en Render');
    process.exit(1);
}

const apiUrl = `${backendUrl}/api`;

// Lista de archivos HTML que necesitan el reemplazo
const archivos = ['index.html', 'otp.html'];

archivos.forEach(archivo => {
    const filePath = path.join(__dirname, archivo);
    
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ No se encontró ${archivo}, se omite.`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('__API_URL__')) {
        console.warn(`⚠️ ${archivo} no contiene el placeholder __API_URL__`);
    }

    content = content.replace(/__API_URL__/g, apiUrl);
    fs.writeFileSync(filePath, content);
    
    console.log(`✅ ${archivo} → API_URL reemplazada con: ${apiUrl}`);
});

console.log('🚀 Build completado.');
