const { Product } = require('./models');
const mongoose = require('mongoose');

// Using standard, reliable URLs for common products
const sampleProducts = [
  {
    name: "Apple iPhone 15 (128 GB) - Black",
    image: ["https://m.media-amazon.com/images/I/71657TiFeHL._SL1500_.jpg"],
    description: "iPhone 15 brings you Dynamic Island, a 48MP Main camera, and USB-C.",
    price: 89900,
    category: "Electronics",
    stock: 50
  },
  {
    name: "ASUS ROG Strix G16",
    image: ["https://m.media-amazon.com/images/I/8174YnTefkL._SX569_.jpg"],
    description: "Industry-leading noise cancellation with eight microphones for crystal clear voice calls.",
    price: 154998,
    category: "Electronics",
    stock: 30
  },
  {
    name: "Modern Home Smart Speaker",
    image: ["https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1000&auto=format&fit=crop"],
    description: "Smart speaker with deeper bass for high quality sound. Controlled by voice.",
    price: 4999,
    category: "Electronics",
    stock: 100
  },
  {
    name: "Stainless Steel Electric Kettle",
    image: ["https://m.media-amazon.com/images/I/515PJsfdvML._SX679_.jpg"],
    description: "Classic design with high-grade stainless steel body for safe and fast boiling.",
    price: 1245,
    category: "Home & Kitchen",
    stock: 200
  },
  {
    name: "Professional DSLR Camera with Lens",
    image: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"],
    description: "Capture the world in stunning detail with this leading professional camera.",
    price: 135000,
    category: "Electronics",
    stock: 10
  },
  {
    name: "Designer Leather Men's Watch",
    image: ["https://m.media-amazon.com/images/I/612-sVds7aL._SX679_.jpg"],
    description: "Timeless style meets modern engineering. A watch for every occasion.",
    price: 12000,
    category: "Fashion",
    stock: 45
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/amazon_clone');
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Sample Data Seeded Successfully with reliable images!');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
};

seedDB();
