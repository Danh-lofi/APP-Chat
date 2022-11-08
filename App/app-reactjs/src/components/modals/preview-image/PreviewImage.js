import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageAction } from "../../../store/imageSlice";
import "./preview-image.scss";
const PreviewImage = (props) => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.image.url);
  const hidePreviewImageHandle = () => {
    dispatch(imageAction.setImage());
  };
  return (
    <div className="preview__image__container">
      <div className="preview__image__close" onClick={hidePreviewImageHandle}>
        <span>x</span>
      </div>
      <div className="preview__image__overlay"></div>
      <div className="preview__image__wrap">
        <img src={url} alt="" />
      </div>
    </div>
  );
};

export default PreviewImage;
