const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/products', async (req, res) => {
    try {
      const products = await prisma.product.findMany();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  });
  
  router.get('/products/:id', async (req, res) => {
    try {
      const productFound = await prisma.product.findFirst({
        where: {
          id: parseInt(req.params.id),
        },
        include: {
          category: true,
        },
      });
  
      if (!productFound) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      res.json(productFound);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  });
  
  router.post('/products', async (req, res) => {
    try {
      const newProduct = await prisma.product.create({
        data: req.body,
      });
  
      res.json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  });
  
  router.delete('/products/:id', async (req, res) => {
    try {
      const productDeleted = await prisma.product.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
  
      if (!productDeleted) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      res.json(productDeleted);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  });
  
  router.put('/products/:id', async (req, res) => {
    try {
      const productUpdate = await prisma.product.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: req.body,
      });
  
      res.json(productUpdate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  });
  
  module.exports = router;