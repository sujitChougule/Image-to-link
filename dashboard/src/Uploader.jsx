import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Uploader = (props) => {
  const { view } = useSelector((state) => state.view);

  const [image, setImage] = useState("");
  const [link, setLink] = useState("");

  ///

  //main function
  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  }

  //function to upload image
  async function uploadImage() {
    const response = await fetch("http://localhost:5000/upload-image", {
      method: "POST",
      crossDomain: true,

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        base64: image,
      }),
    })
      .then((res) => res.json())
      .then((data) => setLink(`http://localhost:3000/share/${data}`));
  }

  return (
    <>
      <div class="upload-page">
        <div class="upload-area">
          <label for="file-input" class="upload-label">
            Drag and drop files here or click to upload
          </label>
          <input
            class="animated-button"
            accept="image/*"
            type="file"
            onChange={convertToBase64}
          />
        </div>
        <div class="feedback">
          <span class="file-name"></span>
          <div className="custom">
            {image === "" || image === null ? (
              ""
            ) : (
              <>
                <img classname="img" width={100} height={100} src={image} />
                <button class="animated-button" onClick={uploadImage}>
                  Upload
                </button>

                <a href={link}>{link}</a>
                <div>views {view}</div>
              </>
            )}
          </div>
          <progress class="upload-progress" value="0" max="100"></progress>
          <span class="upload-message"></span>
        </div>
      </div>
    </>
  );
};

export default Uploader;
