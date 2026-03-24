// Admin.js
import { api } from '../utils/api.js';

let isLoggedIn = false;

export function renderAdmin() {
    const app = document.getElementById('app');

    if (!isLoggedIn) {
        app.innerHTML = `
            <header>
                <h1>Panel de Administrador</h1>
            </header>
            <main>
                <h2>Login</h2>
                <form id="login-form">
                    <input type="text" id="username" placeholder="Usuario" required>
                    <input type="password" id="password" placeholder="Contraseña" required>
                    <button type="submit" class="btn">Iniciar Sesión</button>
                </form>
            </main>
        `;

        document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const success = await api.login(username, password);
            if (success) {
                isLoggedIn = true;
                renderAdminPanel();
            } else {
                alert('Credenciales incorrectas');
            }
        });
    } else {
        renderAdminPanel();
    }
}

function renderAdminPanel() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <header>
            <h1>Panel de Administrador</h1>
            <nav>
                <a href="#" onclick="navigateTo('/')">Inicio</a> |
                <button onclick="logout()">Cerrar Sesión</button>
            </nav>
        </header>
        <main>
            <h2>Administrar Contenido</h2>
            <div>
                <h3>Agregar Proyecto</h3>
                <form id="project-form">
                    <input type="text" id="project-title" placeholder="Título" required>
                    <input type="url" id="project-github" placeholder="URL GitHub">
                    <textarea id="project-desc" placeholder="Descripción" required></textarea>
                    <button type="submit" class="btn">Agregar Proyecto</button>
                </form>
            </div>
            <div>
                <h3>Agregar Certificado</h3>
                <form id="cert-form">
                    <input type="text" id="cert-title" placeholder="Título" required>
                    <input type="url" id="cert-image" placeholder="URL Imagen">
                    <textarea id="cert-desc" placeholder="Descripción" required></textarea>
                    <button type="submit" class="btn">Agregar Certificado</button>
                </form>
            </div>
            <div>
                <h3>Agregar a Línea de Tiempo</h3>
                <form id="timeline-form">
                    <input type="url" id="timeline-photo" placeholder="URL Foto">
                    <input type="number" id="timeline-year" placeholder="Año" required>
                    <button type="submit" class="btn">Agregar</button>
                </form>
            </div>
        </main>
    `;

    // Event listeners para formularios
    document.getElementById('project-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            titulo: document.getElementById('project-title').value,
            url_github: document.getElementById('project-github').value,
            descripcion: document.getElementById('project-desc').value
        };
        await api.addProject(data);
        alert('Proyecto agregado');
    });

    document.getElementById('cert-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            titulo: document.getElementById('cert-title').value,
            urlimage: document.getElementById('cert-image').value,
            descripcion: document.getElementById('cert-desc').value
        };
        await api.addCertificate(data);
        alert('Certificado agregado');
    });

    document.getElementById('timeline-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            foto_mia: document.getElementById('timeline-photo').value,
            año: parseInt(document.getElementById('timeline-year').value)
        };
        await api.addTimelineItem(data);
        alert('Item agregado a línea de tiempo');
    });
}

function logout() {
    isLoggedIn = false;
    renderAdmin();
}