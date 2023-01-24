import './FaceRecognition.css';

const FaceRecognition = ({ inputImageRef, imageUrl, box = { topRow: 0, rightCol: 0, bottomRow: 0, leftCol: 0 } }) => {
  if (!inputImageRef) {
    console.log("inputImageRef is not defined yet")
  }
  return (
    <div className='center ma absolute'>
      <div className='parentbox absolute'>
        <img id="inputttimage" alt="Face" ref={inputImageRef} src={imageUrl} />
        <div className='bounding-box' style={{ position: 'absolute', top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;