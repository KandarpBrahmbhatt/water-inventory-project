const priceSchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true
    },

    price: { type: Number, required: true },

    effectiveFrom: { type: Date, default: Date.now },
    effectiveTo: { type: Date, default: null },
    isCurrent: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Price", priceSchema);