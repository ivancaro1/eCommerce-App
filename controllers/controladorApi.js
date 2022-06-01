const clase = require('../databases/ProdutcsClass.js')

const productos = new clase('./productos_resultado.txt')


const productsController = {
    async getAll (req,res) {
        const allProducts = await productos.getAll();
        await res.json(allProducts)
    },
    async getRandom (req,res) {
        const randomProduct = await productos.getRandom();
        await res.json(randomProduct)
    },
    async save (req,res){
        const newProduct = await productos.save(req.body);
        await res.status(201).json(newProduct)
    },
    async getById (req,res) {
        const id = req.params.id;
        try {
        const requiredProduct = await productos.getById(parseInt(id));
            await res.json(requiredProduct)
        } catch (error) {
            if (error.tipo === 'db not found') {
                await res.status(404).json({ error: 'producto no encontrado' })
            } else {
                await res.status(500).json({ error: 'producto no encontrado' })
            }
        }
    },
    async deleteById (req,res){
        const id = req.params.id;
        try {
            await productos.deleteById(parseInt(id));
            await res.sendStatus(204)
        } catch (error) {
            if (error.tipo === 'db not found') {
                await res.status(404).json({ error: 'producto no encontrado' })
            } else {
                await res.status(500).json({ error: 'producto no encontrado' })
            }
        }
    },
    async replaceProduct (req,res){
        const id = req.params.id;
        const datos = req.body;
        try {
        const replacedProduct = await productos.replaceProduct(parseInt(id), datos);
            await res.json(replacedProduct)
        }catch (error) {
            if (error.tipo === 'db not found') {
                await res.status(404).json({ error: error.message })
            } else {
                await res.status(500).json({ error: error.message })
            }
        }
    }
}


module.exports = { productsController };