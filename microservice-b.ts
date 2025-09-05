import express, { Request, Response } from 'express';

const app = express();
const PORT = 3002;

const users = [
  { id: 1, username: 'alice', email: 'alice@example.com' },
  { id: 2, username: 'bob', email: 'bob@example.com' },
  { id: 3, username: 'carol', email: 'carol@example.com' }
];

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to the User Service!' });
});

app.get('/users', (_req: Request, res: Response) => {
  res.json(users);
});

app.get('/users/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  res.json(user || { error: 'User not found' });
});

app.get('/users/search/:username', (req: Request, res: Response) => {
  const username = req.params.username.toLowerCase();
  const matches = users.filter(u => u.username.toLowerCase().includes(username));
  res.json(matches);
});

app.get('/users/emails', (_req: Request, res: Response) => {
  const emails = users.map(u => u.email);
  res.json(emails);
});

app.listen(PORT, () => {
  console.log(`Microservice B (User Service) running at http://localhost:${PORT}`);
});
