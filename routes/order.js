import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const router = express.Router();

router.post('/createOrder', async (request, response, next) => {
  try {
    const orderList = JSON.parse(await readFile(global.fileName));
    const { cliente, produto, valor } = request.body;
    if (!cliente || !produto || !valor) {
      throw new Error('The fields Client, Product and Value are required.');
    }
    const order = {
      id: orderList.nextId++,
      cliente,
      produto,
      valor,
      entregue: false,
      timestamp: new Date(),
    };
    orderList.pedidos.push(order);
    await writeFile(global.fileName, JSON.stringify(orderList, null, 2));
    response.status(201).end();
  } catch (error) {
    next(error);
  }
});

router.put('/updateOrder/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const { cliente, produto, valor, entregue } = request.body;

    const orderList = JSON.parse(await readFile(global.fileName));
    const orderIndex = orderList.pedidos.findIndex((order) => order.id == id);

    if (orderIndex === -1) {
      throw new Error('Pass an existent customer Id');
    }
    orderList.pedidos[orderIndex].cliente = cliente;
    orderList.pedidos[orderIndex].produto = produto;
    orderList.pedidos[orderIndex].valor = valor;
    orderList.pedidos[orderIndex].entregue = entregue;
    await writeFile(global.fileName, JSON.stringify(orderList, null, 2));

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.patch('/updateStatus/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const { entregue } = request.body;

    const orderList = JSON.parse(await readFile(global.fileName));
    const orderIndex = orderList.pedidos.findIndex((order) => order.id == id);
    if (orderIndex === -1) {
      throw new Error('Pass an existent customer Id');
    }
    orderList.pedidos[orderIndex].entregue = entregue;
    await writeFile(global.fileName, JSON.stringify(orderList, null, 2));

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete('/deleteOrder/:id', async (request, response, next) => {
  try {
    const orderList = JSON.parse(await readFile(global.fileName));
    const { id } = request.params;
    const orderIndex = orderList.pedidos.findIndex((order) => order.id == id);
    if (orderIndex === -1) {
      throw new Error('Pass an existent customer Id');
    }
    orderList.pedidos.splice(orderIndex);
    await writeFile(global.fileName, JSON.stringify(orderList, null, 2));
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.get('/findOrder/:id', async (request, response, next) => {
  try {
    const orderList = JSON.parse(await readFile(global.fileName));
    const { id } = request.params;
    const order = orderList.pedidos.find((order) => order.id == id);
    response.send(order);
  } catch (error) {
    next(error);
  }
});

router.get('/findTotalOrderByCli/', async (request, response, next) => {
  try {
    const { cliente } = request.body;
    const orderList = JSON.parse(await readFile(global.fileName));
    const clientOrders = orderList.pedidos.filter(
      (client) => client.cliente === cliente
    );
    const filteredOrders = clientOrders.filter(
      (status) => status.entregue === true
    );
    const totalPrices = filteredOrders.reduce((acc, cur) => acc + cur.valor, 0);

    response.send(JSON.stringify(totalPrices));
  } catch (error) {
    next(error);
  }
});

router.get('/findTotalOrderProd/', async (request, response, next) => {
  try {
    const { produto } = request.body;
    const orderList = JSON.parse(await readFile(global.fileName));
    const prodOrders = orderList.pedidos.filter(
      (product) => product.produto === produto
    );
    const filteredOrders = prodOrders.filter(
      (status) => status.entregue === true
    );
    const totalPrices = filteredOrders.reduce((acc, cur) => acc + cur.valor, 0);

    response.send(JSON.stringify(totalPrices));
    // filter reduce
  } catch (error) {
    next(error);
  }
});

router.get('/findMoreOrder/', async (request, response, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default router;
