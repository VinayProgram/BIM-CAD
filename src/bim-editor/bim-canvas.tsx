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
import { XR, XROrigin } from "@react-three/xr";
import SlamXr from "@/ar/slam-xr/slam-xr-camera-tracker";

const BimCanvas = () => {
    const { cameraType, transform, ar, xrStore } = useBimToolsStore()

    return (
        <>
            <Canvas
                camera={{
                    position: [0, 0, 20],
                    fov: 50,
                }}
                gl={{ alpha: true }}
            >
                <XR store={xrStore} >
                    <ambientLight />
                    <OrbitControls enableRotate={transform == 'none'} />
                    {cameraType === 'FP' && <Player />}
                    <XROrigin scale={30} position-y={1} frustumCulled={true} > 
                        <IfcMesh />
                    </XROrigin>

                    <GizmoHelper
                        alignment="bottom-right" // widget alignment within scene
                        margin={[80, 80]} // widget margins (X, Y)e helper from disappearing if there is another useFrame(..., 1)*/}
                    >
                        <GizmoViewcube
                            faces={["Right", "Left", "Back", "Front", "Top", "Bottom"]}
                        />
                        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
                    </GizmoHelper>
                    <BimExplode />
                    {/* <mesh position={[-10, 0, 0]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="orange" />
                </mesh> */}
                    {/* <WebXrSupport/> */}
                    {transform !== 'none' && <BimSideClipping />}+
                    {ar && <SlamXr />}

                </XR>
            </Canvas>
        </>
    )
}

export default BimCanvas



