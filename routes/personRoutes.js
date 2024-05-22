const Person = require("../models/Person");
const router = require("express").Router();

// Criação de dados

router.post("/", async (req, res) => {
  const { sabor, marca } = req.body;

  if (!sabor) {
    res.status(422).json({ error: "Campos obrigatórios não preenchidos!" });
  }

  const person = {
    sabor,
    marca,
  };

  try {
    await Person.create(person);

    res.status(201).json({ message: "Essencia cadastrada com suceso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Leitura de todos os dados

router.get("/", async (req, res) => {
  try {
    const essencias = await Person.find();

    res.status(200).json(essencias);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
 
// Leitura baseada em sorteio

router.get("/random", async (req, res) => {
  try {
    const count = await Person.countDocuments();

    const randomIndex = Math.floor(Math.random() * count);

    const essenciaRandom = await Person.findOne().skip(randomIndex);

    res.status(200).json(essenciaRandom);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


// Leitura baseada em sorteio de dois 

router.get("/randomdois", async (req, res) => {
  try {
    const count = await Person.countDocuments();

    // Gere dois índices aleatórios únicos
    const randomIndexes = [];
    while (randomIndexes.length < 2) {
      const randomIndex = Math.floor(Math.random() * count);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }

    // Encontre os documentos correspondentes aos índices gerados
    const essenciasRandom = await Person.find().skip(randomIndexes[0]).limit(2);

    res.status(200).json(essenciasRandom);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


// busca por ID

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const essencia = await Person.findOne({ _id: id });

    if (!essencia) {
      res.status(422).json({ message: "Essencia não encontrada!" });
      return;
    }

    res.status(200).json(essencia);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


// Atualizaçao de dadados

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { sabor, marca } = req.body;
  const essencia = {
    sabor,
    marca,
  };
  try {
    const essenciaUpdate = await Person.updateOne({ _id: id }, essencia);

    if (essenciaUpdate.matchedCount === 0) {
      res.status(422).json({ message: 'Essencia não encontrada!' })
      return
    }

    res.status(200).json(essencia);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


// Deletar dados

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const essencia = await Person.findOne({ _id: id });

  if (!essencia) {
    res.status(422).json({ message: "Essencia não encontrada!" });
    return;
  }

  try {
    await Person.deleteOne({ _id: id });

    res.status(200).json({ message: "Essencia removida" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


module.exports = router;
