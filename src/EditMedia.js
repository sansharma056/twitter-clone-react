import React, { useCallback, useState } from "react";
import { BackIcon } from "./Icons";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/getCroppedImage";
import Slider from "./Slider";

const EditMedia = ({
  onClick: toggleModal,
  media,
  aspect,
  onComplete: setCroppedMedia,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const croppedMedia = await getCroppedImg(media, croppedAreaPixels);
    setCroppedMedia(croppedMedia);
    toggleModal();
  }

  return (
    <div className="edit-media-form">
      <div className="edit-media-header">
        <div className="btn-wrapper">
          <button onClick={toggleModal} className="btn btn--icon">
            <BackIcon />
          </button>
        </div>
        <h2>Edit media</h2>
        <button onClick={handleSubmit} className="btn btn--blue">
          Apply
        </button>
      </div>
      <div className="edit-media-content">
        <Cropper
          image={media}
          crop={crop}
          zoom={zoom}
          zoomSpeed={0.025}
          aspect={aspect}
          showGrid={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          classes={{ cropAreaClassName: "cropArea" }}
        />
      </div>
      <div className="edit-media-controls">
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

export default EditMedia;
