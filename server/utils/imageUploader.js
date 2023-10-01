import cloudinary from "cloudinary"

const uploadImageToCloudinary = async (file, folder, height, quality) => {
  const option = { folder };
  if (height) {
    option.height = height;
  }
  if (height) {
    option.quality = quality;
  }
  option.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, option);
};

export default uploadImageToCloudinary;
