const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize, Product, Cart, CartItem, Order } = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Sync DB
sequelize.authenticate()
    .then(() => {
        console.log('Connected to Render Postgres');
        return sequelize.sync({ alter: true });
    })
    .catch(err => console.error('DB Error:', err));

// Products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).send('Product not found');
        res.json(product);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Cart Logic (using guestId for demo)
app.get('/api/cart', async (req, res) => {
    const [cart] = await Cart.findOrCreate({ where: { guestId: 'default_guest' } });
    const fullCart = await Cart.findOne({
        where: { id: cart.id },
        include: [{ model: CartItem, as: 'items', include: [Product] }]
    });
    res.json(fullCart);
});

app.post('/api/cart', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const [cart] = await Cart.findOrCreate({ where: { guestId: 'default_guest' } });
        
        let item = await CartItem.findOne({ where: { CartId: cart.id, ProductId: productId } });
        if (item) {
            item.quantity = quantity !== undefined ? quantity : (item.quantity + 1);
            await item.save();
        } else {
            await CartItem.create({ CartId: cart.id, ProductId: productId, quantity: quantity || 1 });
        }

        const fullCart = await Cart.findOne({
            where: { id: cart.id },
            include: [{ model: CartItem, as: 'items', include: [Product] }]
        });
        res.json(fullCart);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/cart/:productId', async (req, res) => {
    try {
        const [cart] = await Cart.findOrCreate({ where: { guestId: 'default_guest' } });
        await CartItem.destroy({ where: { CartId: cart.id, ProductId: req.params.productId } });
        
        const fullCart = await Cart.findOne({
            where: { id: cart.id },
            include: [{ model: CartItem, as: 'items', include: [Product] }]
        });
        res.json(fullCart);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Order Placement
app.post('/api/orders', async (req, res) => {
    try {
        const { items, address, total } = req.body;
        const order = await Order.create({
            items,
            shippingAddress: address,
            totalAmount: total,
            guestId: 'default_guest',
            status: 'Placed'
        });
        
        // Clear Cart after order
        const [cart] = await Cart.findOrCreate({ where: { guestId: 'default_guest' } });
        await CartItem.destroy({ where: { CartId: cart.id } });

        res.json(order);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server at ${PORT}`));
