const express = require('express');
const { Router } = require('express')
const { productsController } = require('../controllers/controladorApi.js')
const adminManage = require('../admin/admin.js')
const routerProductos = new Router();

function checkAdmin (req, res, next) {
    if (adminManage.isAdmin) {
      next()
    } else {
      res.status(401).json({ status: 404, description: 'You are not authorized' })
    }
  }

routerProductos.use(express.json());
routerProductos.use(express.urlencoded({extended: true}));

routerProductos.get('/api/productos', productsController.getAll);
routerProductos.post('/api/productos', checkAdmin, productsController.save);
routerProductos.get('/api/productos/:id', productsController.getById);
routerProductos.delete('/api/productos/:id',checkAdmin , productsController.deleteById);
routerProductos.put('/api/productos/:id', checkAdmin ,productsController.replaceProduct);

module.exports = { routerProductos };