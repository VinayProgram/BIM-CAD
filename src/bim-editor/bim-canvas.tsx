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
const BimCanvas = () => {
    const { cameraType } = useBimToolsStore()

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
            </GizmoHelper>
            <BimExplode/>

        </Canvas>
    )
}

export default BimCanvas