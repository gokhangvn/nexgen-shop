const express = require('express');
const router = express.Router();

const products = [
  {
    id: 1,
    name: 'NexGen Quantum Watch',
    category: 'Aksesuar',
    price: 1299.99,
    description: 'Zamanın ötesinde bir teknoloji. Safir cam ve titanyum gövde.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9,
    reviews: 128
  },
  {
    id: 2,
    name: 'Ether Pro Headphones',
    category: 'Ses',
    price: 849.50,
    description: 'Gürültü engelleme teknolojisinde yeni bir devrim.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8,
    reviews: 256
  },
  {
    id: 3,
    name: 'Nova Smart Hub',
    category: 'Ev Otomasyonu',
    price: 499.00,
    description: 'Evinizin her köşesini tek bir merkezden yönetin.',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=1000&auto=format&fit=crop',
    rating: 4.7,
    reviews: 89
  },
  {
    id: 4,
    name: 'Shadow Slim Laptop',
    category: 'Bilgisayar',
    price: 2499.00,
    description: 'Ultra hafif, inanılmaz güçlü. Profesyoneller için tasarlandı.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop',
    rating: 5.0,
    reviews: 42
  }
];

// list categories
router.get('/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json(categories);
});

// list all products with optional filtering
router.get('/', (req, res) => {
  const { category } = req.query;
  let filtered = products;
  if (category) {
    filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  res.json(filtered);
});

// get trending products
router.get('/trending/list', (req, res) => {
  // Return more products to make the page look full
  const trending = products.map(p => ({ 
    ...p, 
    trendIndex: Math.floor(Math.random() * 50) + 50 // 50-100 range
  }));
  res.json(trending);
});

// get single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
});

module.exports = router;
