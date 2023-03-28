import express from "express";
import orderRouter from "./routes/order.js";

global.fileName = "pedidos.json";

const app = express();
app.use(express.json());

app.use("/order", orderRouter);
app.use((error, request, response, next) => {
  response.status(400).send({ error: error.message });
});
app.listen(3333, () => {
  console.log("API Started");
});
