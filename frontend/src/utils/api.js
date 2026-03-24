// api.js
const API_BASE = 'http://localhost:3000/api'; // Cambiar a URL de producción

export const api = {
    async getProjects() {
        const res = await fetch(`${API_BASE}/projects`);
        return res.json();
    },

    async getCertificates() {
        const res = await fetch(`${API_BASE}/certificates`);
        return res.json();
    },

    async getTimeline() {
        const res = await fetch(`${API_BASE}/timeline`);
        return res.json();
    },

    async login(username, password) {
        const res = await fetch(`${API_BASE}/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: username, contraseña: password })
        });
        return res.ok;
    },

    async addProject(data) {
        const res = await fetch(`${API_BASE}/projects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.ok;
    },

    async addCertificate(data) {
        const res = await fetch(`${API_BASE}/certificates`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.ok;
    },

    async addTimelineItem(data) {
        const res = await fetch(`${API_BASE}/timeline`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.ok;
    }
};