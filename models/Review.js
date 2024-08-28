const ReviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    changes: {
      name: String,
      description: String,
      price: Number,
      imageUrl: String,
    },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  }, { timestamps: true });
  
  export const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);