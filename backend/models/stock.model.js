const stockSchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true,
      unique: true
    },

    quantity: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Stock", stockSchema);