const express = require('express')
const { routerProductos } = require('./routers/routerProductos.js')
const { routerCarrito } = require('./routers/routerCarrito.js')
/* ------------------------------------------------------ */
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routerProductos)
app.use(routerCarrito)
let adminManage = require('./admin/admin.js')

/* ------------------------------------------------------ */
app.get('/login', (req, res) => {
  adminManage.login()
  res.status(200).send({ status: 200, description: 'Ahora estás logueado como admin' })
})

app.get('/logout', (req, res) => {
  adminManage.logout()
  res.status(200).json({ status: 200, description: 'Desconectado como admin' })
})

app.all('*', (req, res) => {
  res
    .status(404)
    .json({ error: 404, descripcion: `ruta ${req.url} no implementada y ${req.method} no autorizada`})
})

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`
  Server listening on port ${server.address().port}
  open http://localhost:${PORT} in your browser`)
  })