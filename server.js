const express = require('express')
const { routerProductos } = require('./routers/routerProductos.js')
const { routerCarrito } = require('./routers/routerCarrito.js')
const { routerLogin } = require('./routers/routerLogin.js')
/* ------------------------------------------------------ */
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos',routerProductos)
app.use('/api/carritos',routerCarrito)
app.use(routerLogin)
/* ------------------------------------------------------ */
/* Server Listen */
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`
  Server listening on port ${server.address().port}
  open http://localhost:${PORT} in your browser`)
  })