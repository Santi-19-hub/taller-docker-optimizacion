require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('✅ Shopping DB connected'))
    .catch((err) => console.error('❌ DB connection error', err));


const orderSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    items: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
    total: { type: Number, required: true },
    status: { type: String, default: 'pending' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

app.get('/', (req, res) => {
    res.send('Shopping service is running');
});


app.post('/orders', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 8003;
app.listen(PORT, () => {
    console.log(`🚀 Shopping service running on port ${PORT}`);
});