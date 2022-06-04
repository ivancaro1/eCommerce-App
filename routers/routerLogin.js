const express = require('express');
const { Router } = require('express')

const routerLogin = new Router();

routerLogin.use(express.json());
routerLogin.use(express.urlencoded({extended: true}));

let adminManage = require('../admin/admin.js')

/* ------------------------------------------------------ */
routerLogin.get('/login', (req, res) => {
    adminManage.login()
    res.status(200).send({ status: 200, description: 'Ahora estás logueado como admin' })
  })
  
routerLogin.get('/logout', (req, res) => {
    adminManage.logout()
    res.status(200).json({ status: 200, description: 'Desconectado como admin' })
  })
  
routerLogin.all('*', (req, res) => {
    res
      .status(404)
      .json({ error: 404, descripcion: `ruta ${req.url} método ${req.method} no autorizada`})
  })

module.exports = { routerLogin };