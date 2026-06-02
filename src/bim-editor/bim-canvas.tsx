import {
    GizmoHelper,
    GizmoViewcube,
    GizmoViewport,
    OrbitControls,
} from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import IfcMesh from "./mesh-loader";
import { useBimToolsStore } from "@/bim-tools/bim-tools-store";
import Player from "@/bim-tools/first-player";
import BimExplode from "@/bim-tools/bim-explode";
import BimSideClipping from "@/bim-tools/bim-side-clipping";
import { createXRStore, XR } from "@react-three/xr";
import React, { useEffect, useRef } from "react";
const store = createXRStore()

const BimCanvas = () => {
    const { cameraType, transform ,setXrStore} = useBimToolsStore()
    React.useEffect(() => {
        setXrStore(store)
        
    }, [])
    
    return (
        <Canvas
            camera={{
                position: [0, 0, 20],
                fov: 50,
            }}
            style={{ width: "100%", height: "100%",position:'absolute',top:0,left:0 }}
        >
            <XR store={store}>
                <ambientLight />

                {/* Optional */}
                <OrbitControls enableRotate={transform == 'none'} />
                {cameraType === 'FP' && <Player />}
                <IfcMesh />
                {/* <GizmoHelper/> */}
                <GizmoHelper
                    alignment="bottom-right" // widget alignment within scene
                    margin={[80, 80]} // widget margins (X, Y)e helper from disappearing if there is another useFrame(..., 1)*/}
                >
                    <GizmoViewcube
                        faces={["Right", "Left", "Back", "Front", "Top", "Bottom"]}
                    />
                    <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
                    {/* alternative: <GizmoViewcube /> */}
                    {/* <CameraPlane/> */}
                </GizmoHelper>
                <BimExplode />
                {/* <Environment  preset="apartment" background/> */}
                {transform !== 'none' && <BimSideClipping />}
             
            </XR>
        </Canvas>
    )
}

export default BimCanvas

interface CameraComponentProps {
  onFrame: (video: HTMLVideoElement) => void;
}

export const CameraComponent: React.FC<CameraComponentProps> = ({ onFrame }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const setupCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {
        facingMode: 'environment', // Use rear camera if available
        width: { ideal: 1280 },
        height: { ideal: 720 }
      } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }
    };

    setupCamera();

    const interval = setInterval(() => {
      if (videoRef.current) {
        onFrame(videoRef.current);
      }
    }, 100); // Process frames every 100ms.

    return () => clearInterval(interval);
  }, [onFrame]);

  return <video ref={videoRef}  />;
};

