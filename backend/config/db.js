// // // config/db.js
// // const mongoose = require('mongoose');

// // const connectDB = async () => {
// //   try {
// //     await mongoose.connect(process.env.MONGODB_URI, {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //       useCreateIndex: true,
// //       useFindAndModify: false
// //     });

// //     console.log('MongoDB Connected...');
    
// //     // Create indexes for better search performance
// //     const Medicine = require('../models/Medicine');
// //     const Pharmacy = require('../models/Pharmacy');
    
// //     await Medicine.createIndexes();
// //     await Pharmacy.createIndexes();
    
// //     console.log('Database indexes created...');
// //   } catch (err) {
// //     console.error('MongoDB connection error:', err.message);
// //     // Exit process with failure
// //     process.exit(1);
// //   }
// // };

// // // Handle MongoDB connection errors after initial connection
// // mongoose.connection.on('error', err => {
// //   console.error('MongoDB connection error:', err);
// // });

// // // Handle MongoDB disconnection
// // mongoose.connection.on('disconnected', () => {
// //   console.log('MongoDB disconnected. Attempting to reconnect...');
// //   connectDB();
// // });

// // // Handle application termination
// // process.on('SIGINT', async () => {
// //   try {
// //     await mongoose.connection.close();
// //     console.log('MongoDB connection closed through app termination');
// //     process.exit(0);
// //   } catch (err) {
// //     console.error('Error during MongoDB connection closure:', err);
// //     process.exit(1);
// //   }
// // });

// // module.exports = connectDB;

// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     // await mongoose.connect(process.env.MONGODB_URI, {
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//       // useCreateIndex: true,
//       // useFindAndModify: false
//     // });
//     await mongoose.connect(process.env.MONGODB_URI);

//     console.log('MongoDB Connected...');

//     // Create indexes for better search performance
//     const Medicine = require('../models/Medicine');
//     const Pharmacy = require('../models/Pharmacy');

//     await Medicine.createIndexes();
//     await Pharmacy.createIndexes();

//     console.log('Database indexes created...');
//   } catch (err) {
//     console.error('MongoDB connection error:', err.message);
//     process.exit(1); // Exit process with failure
//   }
// };

// // Handle MongoDB connection errors
// mongoose.connection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });

// // Handle MongoDB disconnection
// mongoose.connection.on('disconnected', () => {
//   console.log('MongoDB disconnected. Retrying connection in 5 seconds...');
//   setTimeout(connectDB, 5000); // Retry connection after 5 seconds
// });

// // Handle application termination
// process.on('SIGINT', async () => {
//   try {
//     await mongoose.connection.close();
//     console.log('MongoDB connection closed through app termination');
//     process.exit(0);
//   } catch (err) {
//     console.error('Error during MongoDB connection closure:', err);
//     process.exit(1);
//   }
// });

// module.exports = connectDB;



const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB with the provided URI in the environment variables
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB Connected...');

    // Create indexes for better search performance
    const Medicine = require('../models/Medicine');
    const Pharmacy = require('../models/Pharmacy');

    await Medicine.createIndexes();
    await Pharmacy.createIndexes();

    console.log('Database indexes created...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Handle MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Handle MongoDB disconnection
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Retrying connection in 5 seconds...');
  setTimeout(connectDB, 5000); // Retry connection after 5 seconds
});

// Handle application termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during MongoDB connection closure:', err);
    process.exit(1);
  }
});

module.exports = connectDB;
