const express = require("express");
const productsRoutes = require("./routes/products.routes.js");
const categoriesRoutes = require("./routes/categories.routes.js");
const cors = require('cors');

const app = express();
app.use(express.json());

const corsOptions = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use("/api", productsRoutes);
app.use("/api", categoriesRoutes);

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});