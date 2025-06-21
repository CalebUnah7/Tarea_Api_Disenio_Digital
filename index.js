// importar express
import express, { json } from 'express'
//importamos la "base de datos", por decirlo de cierto modo
import productos from './productos.json' with { type: 'json' }

// crear aplicación express
const app = express()

// middleware para recibir JSON
app.use(express.json())


// ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de productos!')
})

//ruta para productos GET /productos
app.get('/productos',(req,res)=>{
    res.json(productos)
})

//Devuelve únicamente los productos que están 
//marcados como disponibles (disponible: true).
app.get('/productos/disponibles',(req,res)=>{
    
    const proDisponibles = productos.filter(({disponible})=>{
        return disponible===true
    })

    if(proDisponibles.length===0){
        return res.status(404).json({
            Message: "No hay productos disponibles"
        })
    }
    console.log(proDisponibles)
    res.json(proDisponibles)


})

//ruta con id específico
app.get('/productos/:id',(req,res)=>{
    const { id } = req.params
    const { query } = req

    const parseId = Number(id)

    const productosId = productos.find(({id}) =>{
        return id === parseId
    })

    if (!productosId){
       return res.status(404).json({
        error: "Producto no encontrado"
       }) 
    }

    res.json(productosId)
    //res.json({id,query})
})

//Permite agregar un nuevo producto.
app.post('/productos',(req,res)=>{
    const {body} = req
    const {nombre,precio,descripcion,disponible} = body
    
    //let casi = 'perdida'

    if(nombre.replace(/ /g, '')==''){
        return res.status(400).json({ error: `Faltan datos en el campo nombre` })
    }
    else if(precio<=0){
        return res.status(400).json({ error: `El precio tiene que ser mayor a cero` })
    } 
    else if(descripcion.length<10){
        return res.status(400).json({ error: `la descripción debe contener al menos 10 caracteres` })
    }
    else if(typeof disponible !== 'boolean'){
        return res.status(400).json({ error: `El disponible tiene que ser valor booleano` })
    }
    //generamos el id único
    body.id= Date.now()
    //fecha de ingreso
    body.fecha_ingreso= new Date()
    productos.push(body)
   // console.log(req.body)
    res.status(201).json({
        mensaje: 'Producto agregado correctamente'})
})

//Permite modificar los datos de un producto existente
app.put('/productos/:id',(req,res)=>{
    const { id } = req.params
    const { body } = req
    const parseId = Number(id)

    if(isNaN(parseId)){
        return res.status(404).json({error: 'Id incorrecto'})
    }

    //buscamos el producto por id
    const productoId = productos.findIndex(({id})=>{
        return id === parseId
    })

    if(productoId===-1){
        return res.status(404).json({error: 'Producto no encontrado'})
    }


    const {nombre,precio,descripcion,disponible} = body
    
    //let casi = 'perdida'

    if(nombre.replace(/ /g, '')==''){
        return res.status(400).json({ error: `Faltan datos en el campo nombre` })
    }
    else if(precio<=0){
        return res.status(400).json({ error: `El precio tiene que ser mayor a cero` })
    } 
    else if(descripcion.length<10){
        return res.status(400).json({ error: `la descripción debe contener al menos 10 caracteres` })
    }
    else if(typeof disponible !== 'boolean'){
        return res.status(400).json({ error: `El disponible tiene que ser valor booleano` })
    }

    //body.fecha_ingreso = new Date()
    body.id = parseId
    body.fecha_ingreso = productos[productoId].fecha_ingreso
    //console.log(productos[productoId].fecha_ingreso)
    productos[productoId] = body

    res.json({message:'Producto actualizado correctamente'})
    console.log(body)

})

//Elimina un producto con base en su ID
app.delete('/productos/:id',(req,res)=>{
    const {id} = req.params

    const parseId = Number(id)

    if(isNaN(parseId)){
        return res.status(400).json({
            error:"ID inválido"
        })
    }

    const productoId = productos.findIndex(({id})=>{
        return id === parseId
    })

    if(productoId === -1){
       return res.status(404).json({
            error: "Producto no encontrado"
        })
    }

    //aquí eliminamos el producto
    productos.splice(productoId,1)

    res.json({
        message: "Producto eliminado correctamente"
    })
})



// puerto,
const PORT = process.env.PORT || 3000

// iniciar servidor directamente con Express
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`)
})
