const fs = require('fs')      
const Math = require('mathjs')                                  // import file system module
// Star of class Contenedor
module.exports = class ContenedorArchivo {

    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    async save(producto){   
        let contenidoArchivo;                                   // creates contenidoArchivo variable
        contenidoArchivo = await this.getAll();
        producto.id = await this.generateID();
        contenidoArchivo.push(producto) ;
        await this.writeFile(contenidoArchivo);
        return producto
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

    async getAll(){
        let contenidoArchivo;                                   // creates contenidoArchivo variable
            try{
                contenidoArchivo = await fs.promises.readFile(this.nombreArchivo,'utf-8')
                return JSON.parse(contenidoArchivo) 
            }catch(err){
                throw err;
            }
    }
    
    async deleteById(id_producto){                                    
        let contenidoArchivo;                                   // creates contenidoArchivo variable

        contenidoArchivo = await this.getAll();
        const foundIndex = contenidoArchivo.findIndex(p => p.id  === id_producto);

        if (foundIndex === -1) {
            const error = new Error('producto no encontrado')
            error.tipo = 'db not found'
            throw error
        }  

        contenidoArchivo.splice(foundIndex,1)
        await this.writeFile(contenidoArchivo);
    }

    async deleteAll(){
        let contenidoArchivo;                                   // creates contenidoArchivo variable
        contenidoArchivo = await this.getAll()
        contenidoArchivo = [];
        await this.writeFile(contenidoArchivo);
    }

    async writeFile(objeto){
        try{
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(objeto,null,2))
        }catch(err){
            throw err;              // if there is an error print a error message
        }
    }

    async getRandom(){
        let contenidoArchivo;
        contenidoArchivo = await this.getAll() 
        let keys = Object.keys(contenidoArchivo);
        return contenidoArchivo[keys[ keys.length * Math.random() << 0]];
    }

    async generateID(){   
        return parseInt(`${Date.now()}`)
    }

    async replaceProduct (id_producto,datos){
        let contenidoArchivo;

        contenidoArchivo = await this.getAll();

        const foundIndex = contenidoArchivo.findIndex(p => p.id  === id_producto);

        if (foundIndex === -1) {
            const error = new Error('producto no encontrado')
            error.tipo = 'db not found'
            throw error
        }

        const product = datos
        product.id = id_producto
        contenidoArchivo[foundIndex] = product
        await this.writeFile(contenidoArchivo);
        return product
    }
 }