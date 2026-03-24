// Timeline.js
import { api } from '../utils/api.js';

export async function renderTimeline() {
    const app = document.getElementById('app');
    const timeline = await api.getTimeline();

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
            <h2>Mi Línea de Tiempo</h2>
            <div id="timeline-list">
                ${timeline.map(item => `
                    <div class="card">
                        <h3>${item.año}</h3>
                        ${item.foto_mia ? `<img src="${item.foto_mia}" alt="Foto ${item.año}" style="max-width: 200px;">` : ''}
                    </div>
                `).join('')}
            </div>
        </main>
        <footer>
            <p>&copy; 2024 Mi Portafolio</p>
        </footer>
    `;
}