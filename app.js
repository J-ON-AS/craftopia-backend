const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/writeCartToJson', (req, res) => {
  const cartData = req.body;
  res.send("Hi")
  const cartJson = JSON.stringify(cartData);
  fs.writeFile('cart.json', cartJson, (err) => {
    if (err) {
      console.error('Error writing cart data to JSON:', err);!~
      res.status(500).send('Error writing cart data to JSON');
    } else {
      console.log('Cart data written to JSON successfully');
      res.status(200).send('Cart data written to JSON successfully');
    }
  });
});

app.get('/cartData', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading cart data:', err);
      res.status(500).json({ error: 'Error reading cart data' });
    } else {
      const cartData = JSON.parse(data);
      res.json(cartData);
      console.log(cartData);
    }
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
