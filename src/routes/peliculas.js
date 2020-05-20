const express = require('express');
const router = express.Router();
const pool = require('../database');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

router.get('/agregar', async(req, res) => {
    const pelicula = await pool.query('SELECT * FROM  peliculas');
    res.render('peliculas/agregar', { pelicula });

});

router.post('/agregar', async(req, res) => {
    const { nombre, imagen, descripcion, fecha, tipos } = req.body;
    const estu = {
        nombre,
        imagen,
        descripcion,
        fecha,
        tipos
    };
    await pool.query('insert into peliculas set ?', [estu]);
    req.flash('mensaje', 'Peliculas guardado satisfactoriamente');
    res.redirect('/peliculas/agregar');

});
router.get('/delete/:id', async(req, res) => {
    const { id } = req.params;
    const estudiante = await pool.query('delete from peliculas where id=?', [id]);
    res.redirect('/peliculas/agregar');

});
router.get('/editar/:id', async(req, res) => {
    const { id } = req.params;
    const estudianteid = await pool.query('SELECT * FROM peliculas where id=?', [id]);
    res.render('peliculas/editar', { estudianteid });

});
router.post('/editar/:id', async(req, res) => {
    const { id } = req.params;
    const { nombre, edad, correo } = req.body;
    const updatestudiante = { nombre, edad, correo };
    await pool.query('UPDATE peliculas SET ? WHERE id = ?', [req.body, id]);
    res.redirect('/peliculas/agregar');
});


router.get('/consultar', (req, res) => {
    const primer = 'holaaa';
    res.render('peliculas/consultar');

    console.log(primer);

});

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const uploadImage = multer({
    storage,
    limits: { fileSize: 1000000 }
}).single('image');

router.get('/upload', async(req, res) => {
    res.render('peliculas/upload');

});
router.post('/upload', (req, res) => {
    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }
        console.log(req.file);
        res.send('uploaded');
    });
});

router.get('/images', (req, res) => {});



module.exports = router;