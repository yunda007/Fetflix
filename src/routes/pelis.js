const express = require('express');
const router = express.Router();
const pool = require('../database');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

router.get('/listar', async(req, res) => {
    const pelicula = await pool.query('SELECT * FROM  peliculas');
    res.render('pelis/pelis', { pelicula });

});



module.exports = router;