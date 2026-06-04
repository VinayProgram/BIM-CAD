import { useEffect } from "react";
import { useBim } from "./bim-context";
import { useLoadFragmentsModel, useLoadIfc } from "./bim-hooks";
import { useBimToolsStore } from "@/bim-tools/bim-tools-store";
import { useThree } from "@react-three/fiber";
const IfcMesh = () => {
    const loadIfc = useLoadIfc();
    const { ifcLoadUrl } = useBimToolsStore()
    const loadFragmentsModel =
        useLoadFragmentsModel();

    const { isFragmentLoader, components, ifcLoader, modelAccess, fragments, init } = useBim();
    const { scene } = useThree()

    const cleanup = () => {
        scene.remove(modelAccess?.object!)
        components?.dispose()
        fragments?.dispose()
        ifcLoader?.dispose()
    }
    useEffect(() => {
        cleanup()
        init()
    }, [ifcLoadUrl])

    useEffect(() => {
        if (isFragmentLoader) {
            console.log("Loading with fragments...");
            loadFragmentsModel(
                ifcLoadUrl
            );
        } else {
            console.log("Loading with IfcLoader...");
            loadIfc(
                ifcLoadUrl);
        }
    }, [isFragmentLoader, components, ifcLoader]);

   
    return (
        <>
            {/* {predictions?.map((pred, i) => {
      const [x, y, w, h] = pred.bbox;

      // Assuming you have access to the video/canvas dimensions
      // replace with actual height

      // Normalize to [-1, 1] range, flip Y axis
      const centerX = ((x + w / 2) / videoWidth  - 0.5) * 2;
      const centerY = -((y + h / 2) / videoHeight - 0.5) * 2;

      // Scale to your Three.js scene units
      const sceneWidth = 10;   // adjust to match your scene scale
      const sceneHeight = 7.5; // maintain aspect ratio

      return (
        <mesh
          key={i}
          position={[
            centerX * sceneWidth,
            centerY * sceneHeight,
            0
          ]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="red" />
        </mesh>
      );
    })} */}
        </>
    );
};

export default IfcMesh;