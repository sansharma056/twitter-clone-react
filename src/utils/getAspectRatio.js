export default function getAspectRatio(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  const aspectRatio = image.naturalWidth / image.naturalHeight;

  return aspectRatio;
}
