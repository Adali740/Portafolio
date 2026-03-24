// routes/admin.js
const express = require('express');
const router = express.Router();
const { supabase } = require('../server');

// POST /api/admin/login
router.post('/login', async (req, res) => {
    const { nombre, contraseña } = req.body;
    const { data, error } = await supabase.from('administrador').select('*').eq('nombre', nombre).eq('contraseña', contraseña).single();
    if (error || !data) return res.status(401).json({ error: 'Credenciales incorrectas' });
    res.json({ message: 'Login exitoso' });
});

module.exports = router;