import express, { Request, Response } from 'express';

const app = express();
const PORT = 3003;

const orders = [
  { id: 1, userId: 1, productId: 1, quantity: 2, status: 'shipped' },
  { id: 2, userId: 2, productId: 2, quantity: 1, status: 'processing' },
  { id: 3, userId: 3, productId: 3, quantity: 4, status: 'delivered' }
];

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Order Service!' });
});

app.get('/orders', (_req: Request, res: Response) => {
  res.json(orders);
});

app.get('/orders/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const order = orders.find(o => o.id === id);
  res.json(order || { error: 'Order not found' });
});

app.get('/orders/status/:status', (req: Request, res: Response) => {
  const status = req.params.status.toLowerCase();
  const matches = orders.filter(o => o.status.toLowerCase() === status);
  res.json(matches);
});

app.get('/orders/user/:userId', (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const matches = orders.filter(o => o.userId === userId);
  res.json(matches);
});

app.listen(PORT, () => {
  console.log(`Microservice C (Order Service) running at http://localhost:${PORT}`);
});
