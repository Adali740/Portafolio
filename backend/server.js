// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/timeline', require('./routes/timeline'));
app.use('/api/admin', require('./routes/admin'));

// Export supabase for use in routes
module.exports.supabase = supabase;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});