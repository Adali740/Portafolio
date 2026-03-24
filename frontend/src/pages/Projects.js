// Projects.js
import { api } from '../utils/api.js';

export async function renderProjects() {
    const app = document.getElementById('app');
    const projects = await api.getProjects();

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
            <h2>Mis Proyectos</h2>
            <div id="projects-list">
                ${projects.map(project => `
                    <div class="card">
                        <h3>${project.titulo}</h3>
                        <p>${project.descripcion}</p>
                        ${project.url_github ? `<a href="${project.url_github}" target="_blank">Ver en GitHub</a>` : ''}
                    </div>
                `).join('')}
            </div>
        </main>
        <footer>
            <p>&copy; 2024 Mi Portafolio</p>
        </footer>
    `;
}