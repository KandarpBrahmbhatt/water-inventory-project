// import mongoose from "mongoose";

// const inventorySchema = new mongoose.Schema({   
//     productName:{
//         // type:String
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"WaterProduct"
//     },
//     sku:{
//         type:String
//     },
//     category:{
//         type:String
//     },
//     price:{
//         type:Number
//     },
//     quantity:{
//         type:String,
//         default: 0,
//     },
//     supplier:{
//         type:String
//     },
//     lowStockThreshold:{
//         type:Number,
//         default:5
//     }
// },{
//     timestamps:true
// })


// const Inventory = mongoose.model("Inventroy",inventorySchema)

// export default Inventory


import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    productName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WaterProduct",
      required: true,
    },

    rawWaterQuantity: {
      type: Number,
      default: 0,
    },

    emptyBottleStock: {
      type: Number,
      default: 0,
    },

    filledBottleStock: {
      type: Number,
      default: 0,
    },

    capStock: {
      type: Number,
      default: 0,
    },

    labelStock: {
      type: Number,
      default: 0,
    },

    lowStockAlert: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

 const Inventory = mongoose.model("Inventroy",inventorySchema)

export default Inventory