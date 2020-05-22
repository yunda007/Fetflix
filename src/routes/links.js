const express = require('express');
const router = express.Router();
const pool = require('../database');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

router.get('/listar', async(req, res) => {
    const pelicula = await pool.query('SELECT * FROM  peliculas where tipos="1"');
    res.render('links/accion', { pelicula });

});

router.get('/anime', async(req, res) => {
    const pelicula = await pool.query('SELECT * FROM  peliculas where tipos="2"');
    res.render('links/anime', { pelicula });

});




module.exports = router;