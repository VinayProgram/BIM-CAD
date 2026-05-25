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
    useEffect(()=>{
        cleanup()
        init()
    },[ifcLoadUrl])

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

    return null
};

export default IfcMesh;