const express = require('express');
const { Router } = require('express')
const { carritoController } = require('../controllers/controladorCarrito.js')

const routerCarrito = new Router();


routerCarrito.use(express.json());
routerCarrito.use(express.urlencoded({extended: true}));

routerCarrito.get('/:id/productos', carritoController.getById);
routerCarrito.post('/:id/productos', carritoController.createProducto);
routerCarrito.post('/', carritoController.createCarrito);
routerCarrito.delete('/:id_carrito/productos/:id_producto',carritoController.deleteById);
routerCarrito.delete('/:id',carritoController.deleteAllByID);

module.exports = { routerCarrito };