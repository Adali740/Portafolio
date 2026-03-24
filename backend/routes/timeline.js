// routes/timeline.js
const express = require('express');
const router = express.Router();
const { supabase } = require('../server');

// GET /api/timeline
router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('linea_de_tiempo').select('*').order('año', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// POST /api/timeline
router.post('/', async (req, res) => {
    const { foto_mia, año } = req.body;
    const { data, error } = await supabase.from('linea_de_tiempo').insert([{ foto_mia, año }]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
});

// PUT /api/timeline/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { foto_mia, año } = req.body;
    const { data, error } = await supabase.from('linea_de_tiempo').update({ foto_mia, año }).eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// DELETE /api/timeline/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('linea_de_tiempo').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(204).send();
});

module.exports = router;