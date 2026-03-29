const { sequelize, Product } = require('./models');

const sampleProducts = [
    {
        name: 'Apple iPhone 15 Pro (128 GB) - Blue Titanium',
        image: ['/images/iphone.png'],
        description: 'iPhone 15 Pro. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system.',
        price: 134900,
        category: 'Electronics',
        rating: 4.6,
        reviewsCount: 2540
    },
    {
        name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        image: ['/images/sony.png'],
        description: 'Industry-leading noise cancellation with two processors and eight microphones. Magnificent Sound, engineered to perfection.',
        price: 29990,
        category: 'Electronics',
        rating: 4.8,
        reviewsCount: 8900
    },
    {
        name: 'Amazon Echo Pop | Smart speaker with Alexa - Midnight',
        image: ['/images/echo.png'],
        description: 'Introducing Echo Pop - This compact smart speaker with Alexa features full sound that’s great for bedrooms and small spaces.',
        price: 3999,
        category: 'Devices',
        rating: 4.4,
        reviewsCount: 15000
    }
];

async function seed() {
    try {
        await sequelize.authenticate();
        console.log('Syncing models...');
        await sequelize.sync({ force: true });
        
        console.log('Seeding products...');
        await Product.bulkCreate(sampleProducts);
        
        console.log('Seeding Success!');
        process.exit();
    } catch (err) {
        console.error('Seed Failed:', err);
        process.exit(1);
    }
}

seed();
