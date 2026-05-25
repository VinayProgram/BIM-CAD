import { useEffect } from "react";
import { useBim } from "./bim-context";
import { useLoadFragmentsModel, useLoadIfc } from "./bim-hooks";
import useFinder from "./bim-finder-hooks";

const IfcMesh = () => {
    const loadIfc = useLoadIfc();
    
    const loadFragmentsModel =  
        useLoadFragmentsModel();

    const { isFragmentLoader, initialized } = useBim();
    const {getResult, init}=useFinder()

    useEffect(() => {
        if (isFragmentLoader) {
            console.log("Loading with fragments...");
                loadFragmentsModel(
                    "https://threejs.org/examples/models/ifc/rac_advanced_sample_project.ifc"
                );
        } else {
            console.log("Loading with IfcLoader...");
            loadIfc(
                "https://threejs.org/examples/models/ifc/rac_advanced_sample_project.ifc"
            );
            init();
        }
    }, [isFragmentLoader, initialized, loadFragmentsModel, loadIfc]);
    


    return <mesh onClick={async()=>{
        console.log('result',await getResult("Walls & Slabs"))
    }}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
    </mesh>;
};

export default IfcMesh;