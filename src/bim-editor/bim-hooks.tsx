// hooks/useLoadIfc.ts

import { useCallback } from "react";
import { useBim } from "./bim-context";
import { useThree } from "@react-three/fiber";
import * as FRAGS from "@thatopen/fragments";
async function fetchModel(url: string) {
    const response = await fetch(url);

    const arrayBuffer = await response.arrayBuffer();

    return new Uint8Array(arrayBuffer);
}

export const useLoadIfc = () => {
    const { ifcLoader } = useBim();
    const {camera,scene}=useThree()
    const loadIfc = useCallback(
        async (url: string) => {
            const ifcBytes = await fetchModel(url);

            const model = await ifcLoader?.load(
                ifcBytes,
                false,
                "building",
                {
                    processData: {
                        progressCallback: (
                            progress: number
                        ) => {
                            console.log(progress);
                        },
                    },

                    instanceCallback: (
                        importer: any
                    ) => {
                        importer.addAllAttributes();

                        // importer.addAllRelations();

                        console.log(
                            importer.classes
                        );
                    },
                }
            );
            scene.add(model?.object!);
            model?.useCamera(camera);
            return model;
        },
        [ifcLoader]
    );

    return loadIfc;
};


// hooks/useLoadFragmentsModel.ts

export const useLoadFragmentsModel = () => {
    const { scene, camera } = useThree();

    const {
        serializer: serializerRef,
        fragments: fragmentsRef,
        initialized
    } = useBim();

    const loadFragmentsModel = useCallback(
        async (url: string) => {
            console.log("called");

            if (
                !serializerRef ||
                !fragmentsRef ||
                !(fragmentsRef instanceof
                    FRAGS.FragmentsModels)
            ) {
                console.log(
                    "NOT READY",
                    serializerRef,
                    fragmentsRef
                );

                return null;
            }

            const ifcBytes =
                await fetchModel(url);

            console.log(ifcBytes);

            // IFC -> FRAGMENTS
            const fragmentBytes =
                await serializerRef.process({
                    bytes: ifcBytes,

                    progressCallback: (
                        progress: number
                    ) => {
                        console.log(
                            "progress",
                            progress
                        );
                    },
                });

            // LOAD MODEL
            const model =
                await fragmentsRef.load(
                    fragmentBytes,
                    {
                        modelId:
                            crypto.randomUUID(),
                        camera,
                    }
                );

            // ADD TO SCENE
            scene.add(model?.object);

            // OPTIONAL
            // await fragmentsRef.update(true);

            return model.object;
        },
        [
            serializerRef,
            fragmentsRef,
            camera,
            scene,
            initialized
        ]
    );

    return loadFragmentsModel;
};