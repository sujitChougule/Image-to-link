import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Share = () => {
  const { view } = useSelector((state) => state.view);

  const params = useParams();
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  function addView() {
    dispatch({ type: "viewIncreamenr" });
  }
  useEffect(() => {
    addView();
  }, []);
  async function showImage(id) {
    await fetch(`http://localhost:5000/get-image/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.data.Image);
        console.log(data.data.Image);
      });
  }
  useEffect(() => {
    showImage(params.id);
  }, []);

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
  return (
    <div className="share">
      <div className="animated-div">
        {convertToBase64}

        <img className="img" src={image} />
        <p>views {view}</p>
      </div>
    </div>
  );
};

export default Share;
