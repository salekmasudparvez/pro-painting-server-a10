const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.UserDB}:${process.env.PassDB}@cluster0.2gfcy7h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const paintingCollection = client.db("paintingDB").collection("painting");
    const subcategoryCollection = client
      .db("paintingDB")
      .collection("subcategory");
    const themeCollection = client.db("paintingDB").collection("theme");

    app.get("/painting", async (req, res) => {
      const cursor = paintingCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/subcategory", async (req, res) => {
      const cursor = subcategoryCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/theme", async (req, res) => {
      const cursor = themeCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/painting/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await paintingCollection.findOne(query);
      res.send(user);
    });
    app.get("/subcategory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await subcategoryCollection.findOne(query);
      res.send(user);
    });
    app.get("/theme/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await themeCollection.findOne(query);
      res.send(user);
    });

    app.post("/painting", async (req, res) => {
      const painting = req.body;
      console.log("new user", painting);
      const result = await paintingCollection.insertOne(painting);
      res.send(result);
    });

    app.put("/painting/:id", async (req, res) => {
      const id = req.params.id;
      const updateCard = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedPaintCard = {
        $set: {
          image: updateCard.image,
          item_name: updateCard.item_name,
          subcategory_Name: updateCard.subcategory_Name,
          short_description: updateCard.short_description,
          Price: updateCard.Price,
          rating: updateCard.rating,
          customization: updateCard.customization,
          processing_time: updateCard.processing_time,
          stockStatus: updateCard.stockStatus,
        },
      };
      const result = await paintingCollection.updateOne(
        filter,
        updatedPaintCard,
        options
      );
      res.send(result);
      console.log(result);
    });
    app.put("/painting/:id", async (req, res) => {
      const id = req.params.id;
      const updateCard = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedPaintCard = {
        $set: {
          image: updateCard.image,
          item_name: updateCard.item_name,
          subcategory_Name: updateCard.subcategory_Name,
          short_description: updateCard.short_description,
          Price: updateCard.Price,
          rating: updateCard.rating,
          customization: updateCard.customization,
          processing_time: updateCard.processing_time,
          stockStatus: updateCard.stockStatus,
        },
      };
      const result = await paintingCollection.updateOne(
        filter,
        updatedPaintCard,
        options
      );
      res.send(result);
      console.log(result);
    });

    app.delete("/painting/:id", async (req, res) => {
      const id = req.params.id;
      console.log("want to delete from database ", id);
      const query = { _id: new ObjectId(id) };
      const result = await paintingCollection.deleteOne(query);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("SIMPLE CRUD IS RUNNING");
});
app.listen(port, (req, res) => {
  console.log(`SIMPLE CRUD IS ON ${port}`);
});
