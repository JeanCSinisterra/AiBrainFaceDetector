import "./App.css";
import { useState , useRef } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import ParticlesBackground from "./components/Particle/Particle";
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignIn/SignUp'

// tokens
const USER_ID = process.env.USER_ID;
const PAT = process.env.PAT; // Your PAT (Personal Access Token) can be found in the portal under Authentification
const APP_ID = process.env.APP_ID; // Change these to whatever model and image input you want to use
const MODEL_ID = process.env.MODEL_ID;

function App() {
  const inputImageRef = useRef(null);
  // state handling
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [route, setRoute] = useState("signin");
  const [box, setBox] = useState({});
  const [signedIn, setSignedIn] = useState(false);

  const getFaceLocation = (boxData) => {
    const clarifaiFace = JSON.parse(boxData, null, 2).outputs[0].data.regions[0].region_info.bounding_box;
    const width = inputImageRef.current.width;
    const height = inputImageRef.current.height;

    return {
      topRow: (clarifaiFace.top_row * height),
      leftCol: (clarifaiFace.left_col * width),
      rightCol: (width - (clarifaiFace.right_col * width)),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  }

  const displayFaceBox = (box) => { // sets the box 
    console.info(box.leftCol + " L");
    console.info(box.topRow + " T");
    console.info(box.rightCol + " R");
    console.info(box.bottomRow + " B");
    setBox(box);
  }

  const handleInputChange = (event) => {
    setInput(event.target.value);
  }

  const isSignedOut = (event) => {
    setRoute(event);
    setSignedIn(false);
  }

  const routeChange = (event) => {
    setRoute(event);
    setSignedIn(true);
  }

  const onButtonSubmit = (event) => { // submits url to clarifai face detection model
    setImgUrl(input);
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": input // image url
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Key " + PAT
      }, 
      body: raw
    };

    fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const data = JSON.parse(result);
        if (data.outputs[0].data.regions.length === 0) {
          alert("No face detected in the image, please try again with a different image.");
          return;
        }
        displayFaceBox(getFaceLocation(result));
      })
      .catch(error => {
        console.error("Error: ", error);
        alert("Sorry, there was an error processing your request. Please try again later.");
      });
  }

  return (
    <div className="App">
        <Navigation onSignOut={isSignedOut} isSignedIn={signedIn} />
          {route === 'home'
        ? <div>
          <ImageLinkForm onInputChange={handleInputChange} onBtnSubmit={onButtonSubmit} />
          <FaceRecognition inputImageRef={inputImageRef} imageUrl={imgUrl} box={box} />
        </div>
        : (route === 'signin' ? <SignIn asdad={routeChange} /> : <SignUp asdad={routeChange} />)
      }
      <ParticlesBackground />
    </div>
    );
  }

export default App;
