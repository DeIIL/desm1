import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const router = express.Router();

router.post("/createOrder", async (request, response, next) => {
  const orderList = JSON.parse(await readFile(global.fileName));
});

router.post("/updateOrder/:id", async (request, response, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.post("/updateStatus/:id", async (request, response, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteOrder.:id", async (request, response, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.get("/findOrder/:id", async (request, response, next) => {
  try {
    const orderList = JSON.parse(await readFile(global.fileName));
  } catch (error) {
    next(error);
  }
});

router.get("/findTotalOrderCli/:id", async (request, response, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.get("/findTotalOrder/:id", async (request, response, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default router;
