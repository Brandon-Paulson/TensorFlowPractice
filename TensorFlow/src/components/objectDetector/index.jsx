import React, { useRef, useState, useEffect } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import { drawRect } from "../utilities";
import Webcam from "react-webcam";


function ImageDetection() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
  
    // Main function
    const runCoco = async () => {
      // 3. TODO - Load network 
     const net = await cocossd.load();
      
      //  Loop and detect hands
      setInterval(() => {
        detect(net);
      }, 10);
    };
  
    const detect = async (net) => {
      // Check data is available
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;
  
        // Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;
  
        // Set canvas height and width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
  
        // 4. TODO - Make Detections
        const obj = await net.detect(video);
        console.log(obj);
        
        // Draw mesh
        const boundingBoxDimensions = canvasRef.current.getContext("2d");
  
        // 5. TODO - Update drawing utility
        drawRect(obj, boundingBoxDimensions);
    }
    };
  
    useEffect(()=>{runCoco()},[]);
  
    return (
      <div className="App">
        <header className="App-header">
          <Webcam
            ref={webcamRef}
            muted={true} 
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />
  
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 8,
              width: 640,
              height: 480,
            }}
          />
        </header>
      </div>
    );
  }
  
  export default ImageDetection;





// const ObjectDetectorContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const DetectorContainer = styled.div`
//   min-width: 200px;
//   height: 700px;
//   border: 3px solid;
//   display: flex;
//   align-itmes: center;
//   justify-content: center;
//   position: relative;
// `;

// const TargetImg = styled.img`
//   height: 100%;
// `;

// const HiddenFileInput = styled.input`
//   display: none;
// `;

// const SelectButton = styled.button`
//   font-size: 16px;
//   outline: none;
//   margin-top: 2em;
//   color: blue;
//   cursor: pointer;
//   transition: all 260ms ease-in-out;
//   &:hover {
//     background-color: transparent;
//     color: cyan;
//   }
// `;

// export function ObjectDetector(props) {
//   const fileInputRef = useRef();
//   const [imgData, setImgData] = useState(null);
//   const canvasRef= useRef(null);
//   const openFilePicker = () => {
//     if (fileInputRef.current) fileInputRef.current.click();
//   };

// const detectObjectsOnImage = async (imageElement) => {
//     const model = await cocoSsd.load( {  } );
//     const prediction = model.detect(imageElement, 5);
//     console.log("Predictions:", prediction);
// }

// const imageWidth =  fileInputRef.current.imageWidth;
// const imageHeight =  fileInputRef.current.imageHeight;

//   const readImage = (file) => {
//     return new Promise((rs, rj) => {
//       const fileReader = new FileReader();
//       fileReader.onload = () => rs(fileReader.result);
//       fileReader.onerror = () => rj(fileReader.error);
//       fileReader.readAsDataURL(file);
//     });
//   };

//   const onSelectImage = async (e) => {
//     const file = e.target.files[0];
//     const imgData = await readImage(file);
//     setImgData(imgData);
//   };

//   const imageElement =  document.createElement('img');
//   imageElement.src = imgData;

//   imageElement.onload = async () => {
//     await detectObjectsOnImage(imageElement);
//   }

//   canvasRef.current.width=videoWidth;
//   canvasRef.current.height=videoHeight;
//   const ctx = canvasRef.current.getContext("2D");
//   drawRect(imgData, ctx);

//   return (
//     <ObjectDetectorContainer>
//       <DetectorContainer> {imgData && <TargetImg src={imgData}/>}</DetectorContainer>
//       <HiddenFileInput type="file" ref={fileInputRef} onChange={onSelectImage} />
//       <SelectButton onClick={openFilePicker}>Select Image</SelectButton>
//     </ObjectDetectorContainer>
//   );
// }
