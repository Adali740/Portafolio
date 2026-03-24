// routes/projects.js
const express = require('express');
const router = express.Router();
const { supabase } = require('../server');

// GET /api/projects
router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('proyecto').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// POST /api/projects
router.post('/', async (req, res) => {
    const { titulo, url_github, descripcion } = req.body;
    const { data, error } = await supabase.from('proyecto').insert([{ titulo, url_github, descripcion }]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
});

// PUT /api/projects/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, url_github, descripcion } = req.body;
    const { data, error } = await supabase.from('proyecto').update({ titulo, url_github, descripcion }).eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('proyecto').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(204).send();
});

module.exports = router;