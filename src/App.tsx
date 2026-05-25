import {
  Grid,
  KeyboardControls,
  OrbitControls,
  type KeyboardControlsEntry,
} from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { DoubleSide } from "three";
import Player from "./player";
import BimContextProvider from "./bim-editor/bim-context";
import IfcMesh from "./bim-editor/mesh-loader";


//@ts-ignore

export enum ControlsType {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
}

const App = () => {
  const map = useMemo<KeyboardControlsEntry<ControlsType>[]>(
    () => [
      { name: ControlsType.forward, keys: ["ArrowUp", "KeyW"] },
      { name: ControlsType.back, keys: ["ArrowDown", "KeyS"] },
      { name: ControlsType.left, keys: ["ArrowLeft", "KeyA"] },
      { name: ControlsType.right, keys: ["ArrowRight", "KeyD"] },
    ],
    []
  );


  return (
    <div style={{ width: "98vw", height: "98vh" }}>

      <KeyboardControls map={map}>
        <Canvas
          camera={{
            position: [0, 0, 20],
            fov: 50,
          }}
        >
          <ambientLight />

          {/* Optional */}
          <OrbitControls />
          <Player />
          <BimContextProvider useFragments={false}>
            <IfcMesh />
          </BimContextProvider>
          <Grid
            args={[100, 100]}
            sectionColor="#444"
            cellColor="#666"
            infiniteGrid
            side={DoubleSide}
          />
        </Canvas>
      </KeyboardControls>
    </div>
  );
};


export default App;
