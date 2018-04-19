const express = require('express');
const router = express.Router();

const Categoria = require('../models/categoria');

router.get('/', (req, res) => {

    let paginacion = req.query.paginacion || 0;
    paginacion = Number(paginacion);

    Categoria.find()
        .skip(paginacion)
        .limit(10)
        .exec(
            (err, categorias) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar las Categoría',
                        errors: err
                    });
                } else {

                    Categoria.count({}, (err, totalRegistros) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            categorias: categorias,
                            totalRegistros: totalRegistros,
                            paginacion: paginacion
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/buscar/:termino', (req, res) => {

    let termino = req.params.termino;
    var regex = new RegExp(termino, 'i');

    let paginacion = req.query.paginacion || 0;
    paginacion = Number(paginacion);

    Categoria.find()
        .or([{ 'name': regex }]) //arreglo de campos a tomar en cuenta para la busqueda
        .skip(paginacion)
        .limit(10)
        .exec(
            (err, categorias) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: 'No se encontrarón resultados',
                        errors: err
                    });
                } else {

                    Categoria.count({}, (err, totalRegistros) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            categorias: categorias,
                            totalRegistros: totalRegistros,
                            paginacion: paginacion
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.post('/', (req, res, next) => {
    let categoria = new Categoria({
        name: req.body.name,
        description: req.body.description
    });
    categoria.save((err, categoriaSave) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: 'No se puede crear la Categoría',
                errors: err
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                categoria: categoriaSave
            });
        }
    });
});

router.put('/:id', (req, res, next) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoria) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'No se puede actualizar la Categoría',
                errors: err
            });
        }

        if (!categoria) {
            res.status(400).json({
                success: false,
                message: 'No existe una Categoría con el id: ' + id,
                errors: { message: 'No se pudo encontrar la Categoría para actualizar' }
            });
        } else {
            categoria.name = req.body.name;
            categoria.description = req.body.description;

            categoria.save((err, categoriaSave) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar la Categoría',
                        errors: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        categoria: categoriaSave
                    });
                }
            });

        }
    })
});


router.delete('/:id', (req, res, next) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaRemove) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'No se puede eliminar la Categoría',
                errors: err
            });
        } else if (categoriaRemove) {
            res.status(200).json({
                success: true,
                message: 'Operación realizada de forma exitosa',
                categoria: categoriaRemove
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'No existe una Categoría con el id: ' + id,
                errors: { message: 'No se pudo encontrar la Categoría para eliminar' }
            });
        }
    })
});

module.exports = router;