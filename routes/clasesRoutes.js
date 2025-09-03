const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Ruta base de las clases
// const classesDir = path.join(__dirname, "../data/clases");

// Función auxiliar para leer clases o subclases
// const readClassFile = (filePath) => {
//   if (fs.existsSync(filePath)) {
//     return JSON.parse(fs.readFileSync(filePath, "utf-8"));
//   }
//   return null;
// };

// Ruta para obtener todas las clases básicas
router.get("/basicas", async (req, res) => {
  try {
    const db = req.app.locals.db;                // viene de index.js
    const col = db.collection("clases");         // colección "clases"

    const items = await col.find({}, {projection: {_id: 0, id: 1, imagen: 1, nombre: 1}}).toArray();

    res.json(items);
  } catch (error) {
    console.error("Error al leer las clases básicas:", error);
    res.status(500).json({ error: "Error al leer las clases básicas" });
  }
});

// Ruta para obtener una clase específica (básica o subclase)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = req.app.locals.db;                // viene de index.js
    const col = db.collection("clases");         // colección "clases"

    const filter = {id: id};
    const items = col.find(filter);
    const total = await col.countDocuments(filter);

    if (total > 0) {
      const arrayItems = await items.toArray()
      return res.json(arrayItems[0])
    }

    res.status(404).json({ error: "Clase o subclase no encontrada" });
  } catch (error) {
    console.error("Error al leer las clases:", error);
    res.status(500).json({ error: "Error al leer las clases" });
  }
});

// Ruta para obtener una subclase específica por idSubclase
router.get("/:id/subclases/:idSubclase", async (req, res) => {
  const { idSubclase } = req.params;

  // Validar ID de subclase
  if (!idSubclase || typeof idSubclase !== "string") {
    return res.status(400).json({ error: "ID de subclase no válido" });
  }

  // Verificar si ya está en el cache
  // if (cache.has(idSubclase)) {
  //   console.log(`Cache hit para la subclase: ${idSubclase}`);
  //   return res.json(cache.get(idSubclase));
  // }

  try {
    const db = req.app.locals.db;                // viene de index.js
    const col = db.collection("subclases");         // colección "subclases"

    const filter = {idSubclase: idSubclase}
    const items = col.find(filter);
    const total = await col.countDocuments(filter);

    if (total > 0) {
      const arrayItems = await items.toArray()
      // cache.set(idSubclase, arrayItems[0]);
      // console.log(`Subclase ${idSubclase} cargada y almacenada en cache.`);
      return res.json(arrayItems[0])
    }

    // const directories = fs.readdirSync(classesDir, { withFileTypes: true });

    // for (const dir of directories) {
    //   if (dir.isDirectory()) {
    //     const subClassPath = path.join(classesDir, dir.name, `${idSubclase}.json`);

    //     // Intentar leer el archivo
    //     try {
    //       const fileContent = fs.readFileSync(subClassPath, "utf-8");
    //       const subClassData = JSON.parse(fileContent);

    //       // Almacenar en cache antes de responder
    //       cache.set(idSubclase, subClassData);
    //       console.log(`Subclase ${idSubclase} cargada y almacenada en cache.`);
    //       return res.json(subClassData);
    //     } catch (error) {
    //       // Ignorar si no encuentra el archivo o está corrupto
    //       if (error.code !== "ENOENT") {
    //         console.error("Error al leer el archivo de subclase:", error);
    //         return res.status(500).json({ error: "Error al leer el archivo de subclase" });
    //       }
    //     }
    //   }
    // }

    // Si no se encontró en ningún directorio
    return res.status(404).json({ error: "Subclase no encontrada" });
  } catch (error) {
    console.error("Error al leer las subclases:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

module.exports = router;
