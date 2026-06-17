const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  {
    name: 'iPhone 15 Pro',
    price: 999,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    description: 'Latest iPhone with A17 Pro chip, titanium design, and 48MP camera system.',
    category: 'Electronics',
    stock: 50,
    featured: true,
    rating: 4.8,
    numReviews: 245,
  },
  {
    name: 'Samsung Galaxy S24',
    price: 799,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
    description: 'Flagship Android phone with Galaxy AI, 200MP camera, and Snapdragon 8 Gen 3.',
    category: 'Electronics',
    stock: 35,
    featured: true,
    rating: 4.6,
    numReviews: 189,
  },
  {
    name: 'MacBook Pro 14"',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    description: 'Powerful laptop with M3 Pro chip, Liquid Retina XDR display, and 18-hour battery.',
    category: 'Electronics',
    stock: 20,
    featured: true,
    rating: 4.9,
    numReviews: 312,
  },
  {
    name: 'Sony WH-1000XM5',
    price: 349,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    description: 'Industry-leading noise canceling headphones with 30-hour battery life.',
    category: 'Electronics',
    stock: 45,
    featured: true,
    rating: 4.7,
    numReviews: 567,
  },
  {
    name: 'Nike Air Max 270',
    price: 129,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    description: 'Lifestyle sneakers with the largest Air unit for all-day cushioning.',
    category: 'Sports',
    stock: 80,
    featured: true,
    rating: 4.5,
    numReviews: 423,
  },
  {
    name: 'Levi\'s 501 Jeans',
    price: 69,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    description: 'Original straight fit jeans. The original since 1873.',
    category: 'Clothing',
    stock: 120,
    featured: false,
    rating: 4.4,
    numReviews: 891,
  },
  {
    name: 'The Alchemist - Paulo Coelho',
    price: 14,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    description: 'A novel about following your dreams and listening to your heart.',
    category: 'Books',
    stock: 200,
    featured: false,
    rating: 4.9,
    numReviews: 2341,
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    price: 89,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400',
    description: 'Multi-use pressure cooker that replaces 7 kitchen appliances.',
    category: 'Home',
    stock: 60,
    featured: true,
    rating: 4.6,
    numReviews: 1245,
  },
  {
    name: 'Yoga Mat Premium',
    price: 45,
    image: 'https://images.unsplash.com/photo-1601925228517-f8c1c4b9c0e1?w=400',
    description: 'Non-slip, eco-friendly yoga mat with alignment lines.',
    category: 'Sports',
    stock: 90,
    featured: false,
    rating: 4.3,
    numReviews: 334,
  },
  {
    name: 'Dyson V15 Vacuum',
    price: 699,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Cordless vacuum with laser dust detection and 60-min battery.',
    category: 'Home',
    stock: 25,
    featured: false,
    rating: 4.8,
    numReviews: 678,
  },
  {
    name: 'Adidas Ultraboost 23',
    price: 189,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773d3028?w=400',
    description: 'Running shoes with BOOST midsole for incredible energy return.',
    category: 'Sports',
    stock: 55,
    featured: false,
    rating: 4.6,
    numReviews: 512,
  },
  {
    name: 'CeraVe Moisturizing Cream',
    price: 19,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
    description: 'Daily moisturizing cream with ceramides for dry to very dry skin.',
    category: 'Beauty',
    stock: 150,
    featured: false,
    rating: 4.7,
    numReviews: 3421,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    console.log('🗑️  Cleared existing data');

    // Insert products
    await Product.insertMany(products);
    console.log(`✅ Inserted ${products.length} products`);

    // Create admin user
    await User.create({
      name: 'Admin User',
      email: 'admin@ecommerce.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('✅ Admin user created: admin@ecommerce.com / admin123');

    // Create test user
    await User.create({
      name: 'Test User',
      email: 'user@ecommerce.com',
      password: 'user123',
      role: 'user',
    });
    console.log('✅ Test user created: user@ecommerce.com / user123');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();
