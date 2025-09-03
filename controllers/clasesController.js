const fs = require("fs");
const path = require("path");

exports.getSubclase = (req, res) => {
  const { clase, subclase } = req.params;

  const clasePath = path.join(__dirname, `../data/clases/${clase}/${subclase}.json`);

  if (!fs.existsSync(clasePath)) {
    return res.status(404).json({ error: "Subclase no encontrada" });
  }

  try {
    const subclaseData = JSON.parse(fs.readFileSync(clasePath, "utf-8"));
    res.json(subclaseData);
  } catch (error) {
    res.status(500).json({ error: "Error al leer la subclase" });
  }
};
