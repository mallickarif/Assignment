const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const Category = require("./models/category.model.js");
const connectDB = require("./db/connection.js");

connectDB()
.then(() => {
    console.log("connection successful");
})
.catch((err) => {
    console.log("MongoDB connection error", err);
})

const categories = [
    { name: "Electronics", description: "Electronic devices and accessories" },
    { name: "Clothing", description: "Clothing items for men and women" },
    { name: "Books", description: "Books of various genres" }
  ];

  Category.insertMany(categories)
  .then((categoryDocs) => {
    console.log("Sample categories inserted:", categoryDocs);

const products = [
    { name: "Laptop", category_id: categoryDocs[0]._id, price: 1200 },
    { name: "Smartphone", category_id: categoryDocs[0]._id, price: 800 },
    { name: "T-shirt", category_id: categoryDocs[1]._id, price: 20 },
    { name: "Jeans", category_id: categoryDocs[1]._id, price: 50 },
    { name: "JavaScript: The Good Parts", category_id: categoryDocs[2]._id, price: 30 },
    { name: "Clean Code", category_id: categoryDocs[2]._id, price: 35 }
  ];

  return Product.insertMany(products);
})

.then((productDocs) => {
    console.log("Sample products inserted:", productDocs);
})
.catch((error) => {
    console.error("Error generating sample data:", error);
});

Product.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category_id", 
        foreignField: "_id", 
        as: "category_details",
      }
    },
    {
       $addFields: {
           category_details: {
            $arrayElemAt: ["$category_details", 0],
           }
       },
    },
])
.exec()
.then((result) => {
  console.log("Aggregation result:", result); 
})
.catch((error) => {
  console.error("Error executing aggregation:", error);
});


