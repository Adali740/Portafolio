// Home.js
export function renderHome() {
    const app = document.getElementById('app');
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
            <h2>Bienvenido a Mi Portafolio</h2>
            <p>Aquí puedes ver mis proyectos, certificados y mi trayectoria profesional.</p>
        </main>
        <footer>
            <p>&copy; 2024 Mi Portafolio</p>
        </footer>
    `;
}