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
import React from "react";
import SlamXr from "@/ar/slam-xr/slam-xr-camera-tracker";
const store = createXRStore()

const BimCanvas = () => {
    const { cameraType, transform, setXrStore, ar } = useBimToolsStore()
    React.useEffect(() => {
        setXrStore(store)

    }, [])

    return (
        <Canvas
            camera={{
                position: [0, 0, 20],
                fov: 50,
            }}
            gl={{ alpha: true }}
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
                {transform !== 'none' && <BimSideClipping />}+
                {ar && <SlamXr />}

            </XR>
        </Canvas>
    )
}

export default BimCanvas



