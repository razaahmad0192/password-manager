const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB, client } = require('./config/db');
const { ensureUserIndex } = require('./utils/indexSetup');

const authRoutes = require('./routes/authRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect DB
connectDB();

// Ensure indexes exist
ensureUserIndex();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);

// Graceful shutdown
process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

app.listen(port, () => console.log(`✅ Server running on http://localhost:${port}`));




// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { connectDB, client } = require('./config/db');
// const { ensureUserIndex } = require('./utils/indexSetup');

// const authRoutes = require('./routes/authRoutes');
// const passwordRoutes = require('./routes/passwordRoutes');

// dotenv.config();
// const app = express();

// // Middlewares
// app.use(cors());
// app.use(bodyParser.json());

// // Connect DB
// connectDB();

// // Ensure indexes exist
// ensureUserIndex();

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/passwords', passwordRoutes);

// // Graceful shutdown
// process.on('SIGINT', async () => {
//   await client.close();
//   console.log('MongoDB connection closed');
//   process.exit(0);
// });

// // ✅ Export the app (don’t start a listener)
// module.exports = app;
