const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/categories', async (req, res) => {
    try {
      const categories = await prisma.category.findMany();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las categorías' });
    }
});

router.get('/categories/:id', async (req, res) => {
    try {
      const categoryFound = await prisma.category.findFirst({
        where: {
          id: parseInt(req.params.id),
        },
        include: {
          products: true,
        },
      });
  
      if (!categoryFound) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }
  
      res.json(categoryFound);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la categoría' });
    }
  });
  
  router.post('/categories', async (req, res) => {
    try {
      const newCategory = await prisma.category.create({
        data: req.body,
      });
      res.json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la categoría' });
    }
  });
  
  router.delete('/categories/:id', async (req, res) => {
    try {
      const categoryDeleted = await prisma.category.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
  
      if (!categoryDeleted) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }
  
      res.json(categoryDeleted);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
  });
  
  router.put('/categories/:id', async (req, res) => {
    try {
      const categoryUpdate = await prisma.category.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: req.body,
      });
  
      res.json(categoryUpdate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
  });
  
  module.exports = router;