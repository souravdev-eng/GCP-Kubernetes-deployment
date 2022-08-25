import mongoose from 'mongoose';

enum CategoryType {
  PHONE = 'phone',
  ELECTRONICS = 'electronics',
  BOOKS = 'books',
  CLOTHING = 'clothing',
  OTHER = 'other',
}

interface ProductAttars {
  name: string;
  price: number;
  userId: string;
}

interface ProductDoc extends mongoose.Document {
  name: string;
  price: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttars): ProductDoc;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

productSchema.statics.build = (attrs: ProductAttars) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };
