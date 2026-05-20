import mongoose from 'mongoose'

const productVariantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    variantName: { 
        type: String, 
        required: true 
    }, // 1L Bottle, 20L Jar
    volumeML: { 
        type: Number
     },                    // 1000, 20000
    packagingType: { 
        type: String 
    },              // bottle, jar
    isCold: {
         type: Boolean, 
         default: false 
        },
    isMineral: { 
        type: Boolean, 
        default: false 
    },

    sku: { type: String, unique: true }
  },
  { timestamps: true }
);

const ProductVeriant = mongoose.model("ProductVeriant",productVariantSchema)

export default ProductVeriant