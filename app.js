const express = require('express');
const exhbs = require('express-handlebars');
const products = require('./products.json');

const PORT = process.env.PORT || 7799;

const app = express();

app.use(express.static('public'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exhbs({
    extname: 'hbs',
  }),
);

app.get('/', (req, res) => {
  // console.log('This is callback for app.get("/")');
  // console.log(req.url);
  // res.send('<h1>Hi, this is /</h1>')
  res.render('home');
});

app.get('/about', (req, res) => {
  // console.log('This is callback for app.get("/about")');
  // console.log(req.url);
  // res.send('<h1>Hi, this is /about</h1>')
  res.render('about', { cssFileName: 'about', pageTitle: 'О нас' });
});

app.get('/products', (req, res) => {
  res.render('products', {
    products,
    cssFileName: 'products',
    pageTitle: 'Наши продукты',
  });
});

app.get('/product/:productId', (req, res) => {
  console.log(req.params);

  const product = products.find(p => p.id === req.params.productId);
  res.render('product', { product });
});

app.listen(PORT, () => {
  console.log(`Application server is running on port ${PORT}`);
});