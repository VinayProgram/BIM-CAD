import {
    Grid,
    OrbitControls,
} from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import { DoubleSide } from "three";
import IfcMesh from "./mesh-loader";
const BimCanvas = () => {
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
            {/* <Player /> */}
            <IfcMesh />
        
        </Canvas>
    )
}

export default BimCanvas