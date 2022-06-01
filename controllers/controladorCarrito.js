const clase = require('../databases/CarritoClass.js')

const carrito = new clase('./carrito.txt','./productos_resultado.txt')


const carritoController = {
    async getById (req,res) {
        const id = req.params.id;
        try {
        const requiredProduct = await carrito.getById(parseInt(id));
            await res.json(requiredProduct)
        } catch (error) {
            if (error.tipo === 'db not found') {
                await res.status(404).json({ error: 'Carrito no encontrado' })
            } else {
                await res.status(500).json({ error: 'Carrito no encontrado' })
            }
        }
    },
    async deleteById (req,res){
        const id_carrito = req.params.id_carrito;
        const id_producto = req.params.id_producto;
        try {
            await carrito.deleteAllByID(parseInt(id_carrito),parseInt(id_producto));
            await res.sendStatus(204)
        } catch (error) {
            if (error.tipo === 'db not found') {
                await res.status(404).json({ error: error.message })
            } else {
                await res.status(500).json({ error: error.message })
            }
        }
    },
    async createCarrito (req,res){
        try {
            const id = await carrito.createCarrito()
            res.status(201).json({ id })
          } catch (e) {
            res.status(500).json(e.message)
          }
    },
    async createProducto (req,res){
        try {
            const { id } = req.params
            const producto = req.body
            if (!producto) {
              const error = new Error('Field product is required')
              error.status = 400
              throw error
            }
            const cart = await carrito.saveAProduct(parseInt(id), producto)
            res.status(201).json(cart)
          } catch (e) {
            res.status(500).json(e.message)
          }
    },
    async deleteAllByID (req, res) {
        try {
          const { id } = req.params
          const cart = await carrito.deleteAll(parseInt(id))
          res.status(200).json(cart)
        } catch (e) {
          res.status(500).json(e.message)
        }
      }
}


module.exports = { carritoController };