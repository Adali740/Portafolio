// App.js - Punto de entrada principal
import { renderHome } from './pages/Home.js';
import { renderProjects } from './pages/Projects.js';
import { renderCertificates } from './pages/Certificates.js';
import { renderTimeline } from './pages/Timeline.js';
import { renderAdmin } from './pages/Admin.js';

const routes = {
    '/': renderHome,
    '/projects': renderProjects,
    '/certificates': renderCertificates,
    '/timeline': renderTimeline,
    '/admin': renderAdmin
};

function router() {
    const path = window.location.pathname;
    const render = routes[path] || renderHome;
    render();
}

window.addEventListener('load', router);
window.addEventListener('popstate', router);

// Función para navegar
window.navigateTo = (path) => {
    window.history.pushState({}, path, path);
    router();
};