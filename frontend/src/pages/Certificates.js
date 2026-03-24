// Certificates.js
import { api } from '../utils/api.js';

export async function renderCertificates() {
    const app = document.getElementById('app');
    const certificates = await api.getCertificates();

    app.innerHTML = `
        <header>
            <h1>Mi Portafolio</h1>
            <nav>
                <a href="#" onclick="navigateTo('/')">Inicio</a> |
                <a href="#" onclick="navigateTo('/projects')">Proyectos</a> |
                <a href="#" onclick="navigateTo('/certificates')">Certificados</a> |
                <a href="#" onclick="navigateTo('/timeline')">Línea de Tiempo</a> |
                <a href="#" onclick="navigateTo('/admin')">Admin</a>
            </nav>
        </header>
        <main>
            <h2>Mis Certificados</h2>
            <div id="certificates-list">
                ${certificates.map(cert => `
                    <div class="card">
                        <h3>${cert.titulo}</h3>
                        <p>${cert.descripcion}</p>
                        ${cert.urlimage ? `<img src="${cert.urlimage}" alt="${cert.titulo}" style="max-width: 200px;">` : ''}
                    </div>
                `).join('')}
            </div>
        </main>
        <footer>
            <p>&copy; 2024 Mi Portafolio</p>
        </footer>
    `;
}