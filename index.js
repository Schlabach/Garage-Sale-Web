import express from 'express';
import { db } from './db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.post('/checkout', async (req, res) => {
  const { name, price } = req.body;
  const datetime = new Date().toISOString();
  await db.execute(
    'INSERT INTO Gar_Reg (Name, Price, DateTime) VALUES (?, ?, ?)',
    [name, price, datetime]
  );
  res.json({ success: true });
});

app.get('/summary', async (req, res) => {
  const [rows] = await db.execute(
    'SELECT Name, SUM(Price) AS total FROM Gar_Reg GROUP BY Name'
  );
  res.json(rows);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
