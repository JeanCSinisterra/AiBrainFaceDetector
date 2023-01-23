import './FaceRecognition.css';

const FaceRecognition = ({ inputImageRef, imageUrl, box }) => {
  return (
    <div className='center ma absolute'>
      <div className='parentbox absolute'>
        <img id="inputttimage" alt="Face Detector" ref={inputImageRef} src={imageUrl} />
        <div className='bounding-box' style={{ position: 'absolute', top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;