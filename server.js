const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const notFound = require('./middleware/errorMiddleware');
const errorHandler = require('./middleware/errorMiddleware');

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();

connectDB();

const app = express();

if (process.env.NDOE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());

// Cors
app.use(cors());

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID),
);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV;

app.listen(
	8000,
	console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold),
);
