import {
    OrbitControls,
} from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import IfcMesh from "./mesh-loader";
import { useBimToolsStore } from "@/bim-tools/bim-tools-store";
import Player from "@/bim-tools/first-player";
const BimCanvas = () => {
      const {cameraType}=useBimToolsStore()
    
    return (
        <Canvas
            camera={{
                position: [0, 0, 20],
                fov: 50,
            }}
        >
            <ambientLight />

            {/* Optional */}
            <OrbitControls />
            {cameraType==='FP'&&<Player />}
            <IfcMesh />

        
        </Canvas>
    )
}

export default BimCanvas