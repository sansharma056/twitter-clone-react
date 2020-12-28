import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import {
  BackIcon,
  OrignalAspectRatioIcon,
  SquareAspectRatioIcon,
  WideAspectRatioIcon,
} from "./Icons";
import Slider from "./Slider";
import getCroppedImg from "./utils/getCroppedImage";

const EditPhoto = ({
  onClick: toggleModal,
  photo,
  orignalAspectRatio,
  onComplete: setCroppedPhoto,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(orignalAspectRatio);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const croppedPhoto = await getCroppedImg(photo, croppedAreaPixels);
    setCroppedPhoto(croppedPhoto);
    toggleModal();
  }

  return (
    <div className="edit-photo-form">
      <div className="edit-photo-header">
        <div className="btn-wrapper">
          <button onClick={toggleModal} className="btn btn--icon">
            <BackIcon />
          </button>
        </div>
        <h2>Edit photo</h2>
        <button onClick={handleSubmit} className="btn btn--blue">
          Save
        </button>
      </div>
      <div className="edit-photo-content">
        <Cropper
          image={photo}
          crop={crop}
          zoom={zoom}
          zoomSpeed={0.025}
          minZoom={1}
          maxZoom={3}
          aspect={aspectRatio}
          showGrid={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          classes={{ cropAreaClassName: "cropArea" }}
        />
      </div>
      <div className="edit-photo-controls">
        <div className="edit-photo-ar-options">
          <button
            className={`btn btn--icon ${
              aspectRatio != orignalAspectRatio ? `btn--icon--gray` : null
            }`}
            onClick={(e) => {
              e.preventDefault();
              setAspectRatio(orignalAspectRatio);
              e.currentTarget.blur();
            }}
          >
            <OrignalAspectRatioIcon />
          </button>
          <button
            className={`btn btn--icon ${
              aspectRatio != 16 / 9 ? `btn--icon--gray` : null
            }`}
            onClick={(e) => {
              e.preventDefault();
              setAspectRatio(16 / 9);
              e.currentTarget.blur();
            }}
          >
            <WideAspectRatioIcon />
          </button>
          <button
            className={`btn btn--icon ${
              aspectRatio != 1 ? `btn--icon--gray` : null
            }`}
            onClick={(e) => {
              e.preventDefault();
              setAspectRatio(1);
              e.currentTarget.blur();
            }}
          >
            <SquareAspectRatioIcon />
          </button>
        </div>
        <Slider
          min={1}
          max={3}
          step={0.003}
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
          showZoomIcons={true}
        />
      </div>
    </div>
  );
};

export default EditPhoto;
