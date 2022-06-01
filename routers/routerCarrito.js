const express = require('express');
const { Router } = require('express')
const { carritoController } = require('../controllers/controladorCarrito.js')

const routerCarrito = new Router();


routerCarrito.use(express.json());
routerCarrito.use(express.urlencoded({extended: true}));

routerCarrito.get('/api/carritos/:id/productos', carritoController.getById);
routerCarrito.post('/api/carritos/:id/productos', carritoController.createProducto);
routerCarrito.post('/api/carritos', carritoController.createCarrito);
routerCarrito.delete('/api/carritos/:id_carrito/productos/:id_producto',carritoController.deleteById);
routerCarrito.delete('/api/carritos/:id',carritoController.deleteAllByID);

module.exports = { routerCarrito };