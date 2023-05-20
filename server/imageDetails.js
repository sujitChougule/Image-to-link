import mongoose from "mongoose";

const ImageDetailsSchema = new mongoose.Schema(
  {
    Image: String,
    views: [],
  },
  {
    collection: "ImageDetails",
  }
);

var Images = mongoose.model("ImageDetails", ImageDetailsSchema);
export default Images;
