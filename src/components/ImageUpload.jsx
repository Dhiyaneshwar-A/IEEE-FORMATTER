import React, { useState } from 'react';

const ImageUpload = ({ images, setImages }) => {
  const [imageFile, setImageFile] = useState(null);

  const onImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImageFile(file);
    }
  };

  const onImageUpload = () => {
    if (imageFile) {
      // Here you can perform further actions, like uploading to a server
      const newImages = [...images, imageFile];
      setImages(newImages);
      setImageFile(null); // Reset the file input after upload
    }
  };

  return (
    <div className="form-group">
      <label>Upload Images</label>
      <div className="input-group">
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="form-control"
        />
        <button type="button" className="btn btn-secondary" onClick={onImageUpload}>
          Upload Image
        </button>
      </div>
      <ul>
        {images.map((image, index) => (
          <li key={index}>{image.name}</li> // Display image names
        ))}
      </ul>
    </div>
  );
};

export default ImageUpload;
