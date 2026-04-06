const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const products = [
  {
    name: "Buttermilk",
    price: 40,
    image: "https://pngimg.com/d/milk_PNG12756.png",
  },
  {
    name: "Ghee",
    price: 40,
    image: "https://pngimg.com/d/honey_PNG86170.png",
  },
  {
    name: "Fertilizer",
    price: 40,
    image: "https://pngimg.com/d/rice_PNG17.png",
  },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(5000, () => console.log("Server running on port 5000"));