require("dotenv").config();
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

Category.insertMany([
    {  name: "Electronics", description: "Electronic devices and accessories" },
    {  name: "Clothing", description: "Clothing items for men and women" },
    { name: "Books", description: "Books of various genres" }
  ]).then((res) => {
    // console.log(res);
  })

  // Category.insertMany(categories)
  // .then((categoryDocs) => {
    // console.log("Sample categories inserted:", categoryDocs);

 Product.insertMany([
    { name: "Laptop", category_id: 100, price: 1200 },
    { name: "Smartphone", category_id: 200, price: 800 },
    { name: "T-shirt", category_id: 300, price: 20 },
    { name: "Jeans", category_id: 400, price: 50 },
    { name: "JavaScript: The Good Parts", category_id: 500, price: 30 },
    { name: "Clean Code", category_id: 600, price: 35 }
  ]).then((res) => {
    // console.log(res);
  })

  // return Product.insertMany(products);
// })

// .then((productDocs) => {
//     // console.log("Sample products inserted:", productDocs);
// })
// .catch((error) => {
//     console.error("Error generating sample data:", error);
// });

   aggregate([
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
    // {
      
    //     $unwind: "$joinedData",
      
    // }
])
.exec()
.then((result) => {
  console.log("Aggregation result:", result); 
})
.catch((error) => {
  console.error("Error executing aggregation:", error);
});


