import React, { useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { drawRect } from "../utilities";

const ObjectDetectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetectorContainer = styled.div`
  min-width: 200px;
  height: 700px;
  border: 3px solid;
  display: flex;
  align-itmes: center;
  justify-content: center;
  position: relative;
`;

const TargetImg = styled.img`
  height: 100%;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const SelectButton = styled.button`
  font-size: 16px;
  outline: none;
  margin-top: 2em;
  color: blue;
  cursor: pointer;
  transition: all 260ms ease-in-out;
  &:hover {
    background-color: transparent;
    color: cyan;
  }
`;

export function ObjectDetector(props) {
  const fileInputRef = useRef();
  const [imgData, setImgData] = useState(null);

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

const detectObjectsOnImage = async (imageElement) => {
    const model = await cocoSsd.load( {  } );
    const prediction = model.detect(imageElement, 5);
    console.log("Predictions:", prediction);
}

  const readImage = (file) => {
    return new Promise((rs, rj) => {
      const fileReader = new FileReader();
      fileReader.onload = () => rs(fileReader.result);
      fileReader.onerror = () => rj(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  };

  const onSelectImage = async (e) => {
    const file = e.target.files[0];
    const imgData = await readImage(file);
    setImgData(imgData);
  };

  const imageElement =  document.createElement('img');
  imageElement.src = imgData;

  imageElement.onload = async () => {
    await detectObjectsOnImage(imageElement);
  }

  canvasRef.current.width=videoWidth;
  canvasRef.current.height=videoHeight;
  const ctx = canvasRef.current.getContext("2D");
  drawRect(imgData, ctx);

  return (
    <ObjectDetectorContainer>
      <DetectorContainer> {imgData && <TargetImg src={imgData}/>}</DetectorContainer>
      <HiddenFileInput type="file" ref={fileInputRef} onChange={onSelectImage} />
      <SelectButton onClick={openFilePicker}>Select Image</SelectButton>
    </ObjectDetectorContainer>
  );
}
