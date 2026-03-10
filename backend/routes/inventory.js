const express = require('express');
const router = express.Router();

// Persisted inventory items for the session
let inventoryItems = [
  { id: 1, name: 'Quantum Watch', quantity: 15, category: 'Aksesuar' },
  { id: 2, name: 'Ether Pro Headphones', quantity: 8, category: 'Ses' },
  { id: 3, name: 'Nova Smart Hub', quantity: 24, category: 'Ev Otomasyonu' },
  { id: 4, name: 'Zenbook Pro 14', quantity: 5, category: 'Bilgisayar' }
];

// GET: All inventory items
router.get('/', (req, res) => {
  res.json({ items: inventoryItems });
});

// POST: Add new item
router.post('/', (req, res) => {
  const { name, quantity, category } = req.body;
  const newItem = { id: Date.now(), name, quantity: parseInt(quantity), category: category || 'Genel' };
  inventoryItems.push(newItem);
  res.json({ success: true, items: inventoryItems });
});

// DELETE: Remove item
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  inventoryItems = inventoryItems.filter(item => item.id !== parseInt(id));
  res.json({ success: true, items: inventoryItems });
});

module.exports = router;
