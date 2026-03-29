const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
});

const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.ARRAY(DataTypes.STRING) }, // Supports multiple image URLs
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    category: { type: DataTypes.STRING },
    stock: { type: DataTypes.INTEGER, defaultValue: 10 },
    rating: { type: DataTypes.FLOAT, defaultValue: 4.5 },
    reviewsCount: { type: DataTypes.INTEGER, defaultValue: 120 },
    specifications: { type: DataTypes.JSONB } // Flexible for varying product details
});

const Cart = sequelize.define('Cart', {
    userId: { type: DataTypes.INTEGER, allowNull: true },
    guestId: { type: DataTypes.STRING, defaultValue: 'guest' }
});

const CartItem = sequelize.define('CartItem', {
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
});

const Order = sequelize.define('Order', {
    userId: { type: DataTypes.INTEGER },
    items: { type: DataTypes.JSONB },
    totalAmount: { type: DataTypes.FLOAT },
    status: { type: DataTypes.STRING, defaultValue: 'Pending' }
});

// Relationships
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.hasMany(CartItem, { as: 'items', onDelete: 'CASCADE' });
CartItem.belongsTo(Product);

module.exports = { sequelize, User, Product, Cart, CartItem, Order };
