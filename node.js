// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Load products
app.get('/api/products', (req, res) => {
  fs.readFile('./products.json', 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to load products' });
    res.json(JSON.parse(data));
  });
});

// Admin: Add a new product
app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  fs.readFile('./products.json', 'utf-8', (err, data) => {
    let products = JSON.parse(data || '[]');
    products.push(newProduct);
    fs.writeFile('./products.json', JSON.stringify(products, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Failed to save product' });
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ HyperCart running at http://localhost:${PORT}`);
});
