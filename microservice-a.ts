import express, { Request, Response } from 'express';

const app = express();
const PORT = 3001;

const products = [
  { id: 1, name: 'T-Shirt', category: 'Clothing', price: 19.99 },
  { id: 2, name: 'Sneakers', category: 'Shoes', price: 59.99 },
  { id: 3, name: 'Coffee Mug', category: 'Home', price: 9.99 }
];

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Product Service!' });
});

app.get('/products', (_req: Request, res: Response) => {
  res.json(products);
});

app.get('/products/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  res.json(product || { error: 'Product not found' });
});

app.get('/categories', (_req: Request, res: Response) => {
  const categories = Array.from(new Set(products.map(p => p.category)));
  res.json(categories);
});

app.get('/products/search/:name', (req: Request, res: Response) => {
  const name = req.params.name.toLowerCase();
  const matches = products.filter(p => p.name.toLowerCase().includes(name));
  res.json(matches);
});

app.listen(PORT, () => {
  console.log(`Microservice A (Product Service) running at http://localhost:${PORT}`);
});
