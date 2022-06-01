const fs = require('fs')      
const Math = require('mathjs')                                  // import file system module
// Star of class Contenedor
module.exports = class ContenedorArchivo {

    constructor(nombreArchivo, productosArchivo){
        this.nombreArchivo = nombreArchivo;
        this.productosArchivo = productosArchivo;
    }

    async save(producto){   
        let contenidoArchivo;                                   // creates contenidoArchivo variable
        contenidoArchivo = await this.getAll();
        producto.id = await this.generateID();
        contenidoArchivo.push(producto) ;
        await this.writeFile(contenidoArchivo);
        return producto
    }

    async createCarrito(){   
        let contenidoArchivo;                                   
        contenidoArchivo = await this.getAll();
        const id = await this.generateID();
        const newCarrrito = {
            id,
            producto: []
          }
        contenidoArchivo.push(newCarrrito) ;
        await this.writeFile(contenidoArchivo);
        return id
    }

    async getById(id_producto){
        let contenidoArchivo;                                   // creates contenidoArchivo variable

        contenidoArchivo = await this.getAll();
        const foundIndex = contenidoArchivo.findIndex(p => p.id  === id_producto);

        if (foundIndex === -1) {
            const error = new Error('producto no encontrado')
            error.tipo = 'db not found'
            throw error
        }  
        return contenidoArchivo[foundIndex];
    }

    async getByIdProd(id_producto){
        let contenidoArchivo;                                   // creates contenidoArchivo variable

        contenidoArchivo = await this.getAllProducts();
        const foundIndex = contenidoArchivo.findIndex(p => p.id  === id_producto);

        if (foundIndex === -1) {
            const error = new Error('producto no encontrado')
            error.tipo = 'db not found'
            throw error
        }  
        return contenidoArchivo[foundIndex];
    }

    async getAll(){
        let contenidoArchivo;                                   // creates contenidoArchivo variable
            try{
                contenidoArchivo = await fs.promises.readFile(this.nombreArchivo,'utf-8')
                return JSON.parse(contenidoArchivo) 
            }catch(err){
                throw err;
            }
    }

    async getAllProducts(){
        let contenidoArchivo;                                   // creates contenidoArchivo variable
            try{
                contenidoArchivo = await fs.promises.readFile(this.productosArchivo,'utf-8')
                return JSON.parse(contenidoArchivo) 
            }catch(err){
                throw err;
            }
    }
    
    async deleteAll (id) {
        try {
          const carts = await this.getAll()
          const cartIndex = carts.findIndex(cart => cart.id === id)
          if (cartIndex === -1) {
            const error = new Error('Cart not found')
            error.status = 404
            throw error
          }
          carts[cartIndex].producto = []
          await this.writeFile(carts);
          return carts[cartIndex].id
        } catch (e) {
          const error = new Error('Something went wrong')
          error.status = 500
          throw error
        }
      }

    async deleteAllByID (cartId, productId) {
        try {
          const carts = await this.getAll()
          const cartIndex = carts.findIndex(cart => cart.id === cartId)
          if (cartIndex === -1) {
            const error = new Error('Cart not found')
            error.status = 404
            throw error
          }
          const productIndex = carts[cartIndex].producto.findIndex(
            product => product.id === productId
          )
          if (productIndex === -1) {
            const error = new Error('Product not found')
            error.status = 404
            throw error
          }
          carts[cartIndex].producto.splice(productIndex, 1)
          await this.writeFile(carts);
          return carts[cartIndex]
        } catch (e) {
          throw e
        }
      }

    async writeFile(objeto){
        try{
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(objeto,null,2))
        }catch(err){
            throw err;              // if there is an error print a error message
        }
    }

    async generateID(){   
        return parseInt(`${Date.now()}`)
    }

    async saveAProduct (id, product) {

        try {
          const carts = await this.getAll()
          const cartIndex = carts.findIndex(cart => cart.id === id)
          if (cartIndex === -1) {
            const error = new Error('Carrito no encontrado')
            error.status = 404
            throw error
          }

        //   const producto = await this.getAllProducts()
        //   const productoIndex = producto.findIndex(producto => producto.id === parseInt(product.id))
        //   if (productoIndex === -1) {
        //     const error = new Error('Producto no encontrado')
        //     error.status = 404
        //     throw error
        //   }

        //console.log(product)

          const requiredProduct = await this.getByIdProd(parseInt(product.id));

          carts[cartIndex].producto.push(requiredProduct)
          await this.writeFile(carts);
          return carts[cartIndex]
        } catch (e) {
          throw e
        }
      }
 }