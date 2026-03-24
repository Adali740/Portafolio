// routes/certificates.js
const express = require('express');
const router = express.Router();
const { supabase } = require('../server');

// GET /api/certificates
router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('certificado').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// POST /api/certificates
router.post('/', async (req, res) => {
    const { titulo, urlimage, descripcion } = req.body;
    const { data, error } = await supabase.from('certificado').insert([{ titulo, urlimage, descripcion }]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
});

// PUT /api/certificates/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, urlimage, descripcion } = req.body;
    const { data, error } = await supabase.from('certificado').update({ titulo, urlimage, descripcion }).eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// DELETE /api/certificates/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('certificado').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(204).send();
});

module.exports = router;