import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
const PORT = 4000;

app.get('/esb', async (req: Request, res: Response) => {
  const { orderId, userId, productId } = req.query;

  try {
    let result: any = {};

    if (orderId) {
      const orderRes = await axios.get(`http://localhost:3003/orders/${orderId}`);
      const order = orderRes.data;

      const userRes = await axios.get(`http://localhost:3002/users/${order.userId}`);
      const user = userRes.data;

      const productRes = await axios.get(`http://localhost:3001/products/${order.productId}`);
      const product = productRes.data;

      result = { order, user, product };
    }

    if (userId) {
      const userRes = await axios.get(`http://localhost:3002/users/${userId}`);
      const user = userRes.data;

      const ordersRes = await axios.get(`http://localhost:3003/orders/user/${userId}`);
      const orders = ordersRes.data;

      result = { user, orders };
    }

    if (productId) {
      const productRes = await axios.get(`http://localhost:3001/products/${productId}`);
      const product = productRes.data;

      const ordersRes = await axios.get(`http://localhost:3003/orders`);
      const orders = ordersRes.data.filter((o: any) => o.productId == productId);

      result = { product, orders };
    }

    if (!orderId && !userId && !productId) {
      return res.json({ message: 'Bitte einen Parameter angeben: orderId, userId oder productId' });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'ESB Error', details: err });
  }
});

app.listen(PORT, () => {
  console.log(`ESB listening on port ${PORT}`);
});
