const mongoose = require('mongoose');

const craftSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Craft title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required']
    },
    steps: {
      type: [String],
      validate: [steps => steps.length > 0, 'At least one step is required']
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    images: [String],
    videos: [String],
    dateCreated: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true } 
);

craftSchema.pre('save', function (next) {
  if (this.title) {
    this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
  }
  next();
});


craftSchema.post('save', function (doc) {
  console.log(`🎨 New craft uploaded: "${doc.title}"`);
});


craftSchema.pre('deleteOne', function (next) {
  console.log(`🗑️ Craft is being deleted: ${this.getQuery()._id}`);
  next();
});

module.exports = mongoose.model('Craft', craftSchema);
