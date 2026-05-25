import { useEffect } from "react";
import { useBim } from "./bim-context";
import { useLoadFragmentsModel, useLoadIfc } from "./bim-hooks";
import useFinder from "./bim-finder-hooks";
import { useThree } from "@react-three/fiber";

const IfcMesh = () => {
    const loadIfc = useLoadIfc();
    
    const loadFragmentsModel =  
        useLoadFragmentsModel();

    const { isFragmentLoader, initialized } = useBim();
    useEffect(() => {
        if (isFragmentLoader) {
            console.log("Loading with fragments...");
                loadFragmentsModel(
                    "https://threejs.org/examples/models/ifc/rac_advanced_sample_project.ifc"
                );
        } else {
            console.log("Loading with IfcLoader...");
            loadIfc(
                "/BasicHouse.ifc"
            );
        }
    }, [isFragmentLoader, initialized, loadFragmentsModel, loadIfc]);
    
  

    return null
};

export default IfcMesh;