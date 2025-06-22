## Instrucciones para instalar las dependencias

1. Primero hay que clonar el repositorio :

```bash
git clone https://github.com/CalebUnah7/Tarea_Api_Disenio_Digital.git
```       
2. Luego instalar las siguientes dependencias necesarias, para que la 
API funcione correctamente:

```bash
npm install
npm install express
```
---

## Ejecutar la API

Para iniciar el servidor con recarga automática de archivos:

```bash
npm run dev
```

El servidor se ejecutará en:  
[http://localhost:3000](http://localhost:3000)

---

### Ejecutar las peticiones en el archivo -- api_productos.http

### Rutas disponibles
###  GET `/productos`
Devuelve la lista completa de productos.

###  GET `/productos/:id`
Devuelve un producto específico según su `id`.

###  POST `/productos`
Crea un nuevo producto.  
**OJOOO, Requiere:** un objeto JSON con los datos del producto (por ejemplo: nombre, precio, cantidad).

###  PUT `/productos/:id`
Actualiza un producto existente según su `id`.  
**Requiere:** los datos actualizados en el cuerpo de la solicitud.

###  DELETE `/productos/:id`
Elimina un producto por su `id`.

---

## Notas

- Los datos se almacenan en un archivo `productos.json`.
- El servidor utiliza `node --watch` para reiniciar automáticamente cuando se detectan cambios.

---

## 👤 Autor

**Caleb Ayala**  
GitHub: [@CalebUnah7](https://github.com/CalebUnah7)
