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

routerProductos.get('/', productsController.getAll);
routerProductos.post('/', checkAdmin, productsController.save);
routerProductos.get('/:id', productsController.getById);
routerProductos.delete('/:id',checkAdmin , productsController.deleteById);
routerProductos.put('/:id', checkAdmin ,productsController.replaceProduct);

module.exports = { routerProductos };