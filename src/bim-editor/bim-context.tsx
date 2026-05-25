import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import * as FRAGS from "@thatopen/fragments";
import * as OBC from "@thatopen/components";

interface BimContextType {
  fragments: OBC.FragmentsManager | FRAGS.FragmentsModels | null;
  components: OBC.Components | null;
  serializer: FRAGS.IfcImporter | null;
  initialized: boolean;
  ifcLoader: OBC.IfcLoader | null;
  isFragmentLoader?: boolean;
  setModelAccess: React.Dispatch<React.SetStateAction<FRAGS.FragmentsModel | null>> | null
  modelAccess: FRAGS.FragmentsModel | null
  init:()=>void

}

const BimContext = createContext<BimContextType>({
  fragments: null,
  components: null,
  serializer: null,
  initialized: false,
  ifcLoader: null,
  isFragmentLoader: false,
  modelAccess: null,
  setModelAccess: null,
  init:()=>{}
});

export const useBim = () => useContext(BimContext);

const BimContextProvider = ({
  children,
  useFragments = true,
}: {
  children: React.ReactNode;
  useFragments?: boolean;
}) => {
  // STATES
  const [components, setComponents] =
    useState<OBC.Components | null>(null);

  const [serializer, setSerializer] =
    useState<FRAGS.IfcImporter | null>(null);

  const [fragments, setFragments] =
    useState<OBC.FragmentsManager | FRAGS.FragmentsModels | null>(null);


  const [initialized, setInitialized] =
    useState(false);

  const [ifcLoader, setIfcLoader] = useState<OBC.IfcLoader | null>(null);

  const [modelAccess, setModelAccess] = useState<FRAGS.FragmentsModel | null>(null)

  const fragmentLoaderSetup = async () => {
    // SERIALIZER
    const importer = new FRAGS.IfcImporter();

    const workerUrl =
      await FRAGS.FragmentsModels.getWorker();
    importer.wasm = {
      absolute: true,
      path: "https://unpkg.com/web-ifc@0.0.77/",
    };
    const fragmentsModel =
      new FRAGS.FragmentsModels(workerUrl);
    fragmentsModel.models.materials.list.onItemSet.add(
      ({ value: material }) => {
        if (
          !(
            "isLodMaterial" in material &&
            material.isLodMaterial
          )
        ) {
          material.polygonOffset = true;
          material.polygonOffsetUnits = 1;
          material.polygonOffsetFactor =
            Math.random();

          material.needsUpdate = true;
        }
      }
    );
    return {
      serializer: importer,
      fragments: fragmentsModel,
    }
  }

  const ifcLoaderSetup = async () => {
    const comps = new OBC.Components();
    comps.init()
    // IFC LOADER
    const ifcLoader = comps.get(OBC.IfcLoader);
    const fragments = comps.get(OBC.FragmentsManager);
    await ifcLoader.setup({
      autoSetWasm: false,

      wasm: {
        path: "https://unpkg.com/web-ifc@0.0.77/",
        absolute: true,
      },
    });

    const workerUrl =
      await FRAGS.FragmentsModels.getWorker();
    // FRAGMENTS
    fragments.init(workerUrl);

    fragments.list.onItemSet.add(() => {
      fragments.core.update(true);
    });

    // Remove z fighting
    fragments.core.models.materials.list.onItemSet.add(({ value: material }) => {
      if (!("isLodMaterial" in material && material.isLodMaterial)) {
        material.polygonOffset = true;
        material.polygonOffsetUnits = 1;
        material.polygonOffsetFactor = Math.random();
      }
    });

    return { ifcLoader, fragments, components: comps };
  }

  const init = async () => {
    try {
      // COMPONENTS
      if (useFragments) {
        const fragmentsModel = await fragmentLoaderSetup();
        setFragments(fragmentsModel.fragments);
        setSerializer(fragmentsModel.serializer);
      } else {
        const { ifcLoader, fragments, components } = await ifcLoaderSetup();
        setIfcLoader(ifcLoader);
        setFragments(fragments);
        setComponents(components);
      }
      setInitialized(true);

      console.log("BIM Initialized");
    } catch (error) {
      console.error(
        "BIM Initialization Failed",
        error
      );
    }
  };

  useEffect(() => {


    if (initialized == false) {
      console.log('Initializing BIM...');
      init()
    };
  }, []);

  return (
    <BimContext.Provider
      value={{
        modelAccess,
        setModelAccess,
        fragments,
        components,
        serializer,
        initialized,
        ifcLoader,
        isFragmentLoader: useFragments,
        init
      }}
    >
      {children}
    </BimContext.Provider>
  );
};

export default BimContextProvider;