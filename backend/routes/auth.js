const express = require('express');
const router = express.Router();

// Simulated user database
const users = [
  { id: 1, email: 'demo@nexgen.com', password: 'password123', name: 'Gökhan NexGen' }
];

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({
      success: true,
      message: 'Giriş Başarılı',
      user: { id: user.id, email: user.email, name: user.name },
      token: 'fake-jwt-token-' + Math.random().toString(36).substr(2)
    });
  } else {
    res.status(401).json({ success: false, message: 'Geçersiz email veya şifre' });
  }
});

// Register route
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'Bu email zaten kayıtlı' });
  }
  
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  
  res.json({
    success: true,
    message: 'Kayıt Başarılı',
    user: { id: newUser.id, email: newUser.email, name: newUser.name },
    token: 'fake-jwt-token-' + Math.random().toString(36).substr(2)
  });
});

module.exports = router;
