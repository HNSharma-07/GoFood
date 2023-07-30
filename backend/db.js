const mongoose = require("mongoose");

const mongoURI = "mongodb://HNSharma-07:Harsh1502@ac-49wtrgh-shard-00-00.8bixtxl.mongodb.net:27017,ac-49wtrgh-shard-00-01.8bixtxl.mongodb.net:27017,ac-49wtrgh-shard-00-02.8bixtxl.mongodb.net:27017/GoFood?ssl=true&replicaSet=atlas-c9smez-shard-0&authSource=admin&retryWrites=true&w=majority";
  // "mongodb+srv://HNSharma-07:Harsh1502@cluster0.8bixtxl.mongodb.net/GoFood?retryWrites=true&w=majority";
  // try different version link for mongoos problem
  
  const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) console.log("---", err);
      else {
        console.log("connected");
        const fetched_data = await mongoose.connection.db.collection(
          "food_items"
        );
        fetched_data.find({}).toArray(async function (err, data) {
          const foodCategory = await mongoose.connection.db.collection(
            "food_category"
          );
          foodCategory.find({}).toArray(function(err, catData){
            if (err) console.log(err);
            else {
              global.food_items = data;
              global.food_category = catData;
            }
          })
        });
      }
    }
  );
};

module.exports = mongoDB;
