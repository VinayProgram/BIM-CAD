import React, { useRef } from "react";
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import { useBimToolsStore } from "@/bim-tools/bim-tools-store";
import { useSlamCamera } from "../camera-component";
import { useFrame } from "@react-three/fiber";
import { useBim } from "@/bim-editor/bim-context";
import * as THREE from 'three'
const SlamXr = () => {
    const { video: ve, videoRef } = useSlamCamera();
    const { predictions, setPredictions } = useBimToolsStore()
    const modelPromise = cocoSsd.load();
    const { modelAccess } = useBim()
    const videoTextureRef = useRef<THREE.VideoTexture | null>(null);

    React.useEffect(() => {
        if (ve) {
            const texture = new THREE.VideoTexture(ve); // 👈 VideoTexture, not Texture
            texture.colorSpace = THREE.SRGBColorSpace;   // 👈 correct color space
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            videoTextureRef.current = texture;
            setInterval(async () => {
                console.log(await modelPromise.then(model => {
                    model.detect(ve).then(predictions => {
                        console.log('Predictions: ', predictions);
                        setPredictions(predictions);
                    });
                }))
            }, 1000)
        }
    }, [ve])

    // Option 1: useFrame (best for continuous tracking)
    useFrame((gl) => {
        //    const texture = new THREE.Color('blue')
        //     gl.scene.background = texture;

        const chair=predictions?.find(pred => pred.class === "person");
        gl.scene.background = videoTextureRef.current;
        if (videoTextureRef.current && ve?.readyState === ve?.HAVE_ENOUGH_DATA) {
            videoTextureRef.current.needsUpdate = true; // 👈 required for live video
        }
        if (modelAccess?.object && chair?.bbox && videoRef.current) {
            const [x, y, w, h] = chair.bbox;

            const centerX = ((x + w / 2) / videoRef.current?.videoWidth - 0.5) * 2;
            const centerY = -((y + h / 2) / videoRef.current?.videoHeight - 0.5) * 2;

            const sceneWidth = 10;
            const sceneHeight = 7.5;

            modelAccess.object.position.set(
                centerX * sceneWidth,
                centerY * sceneHeight,
                0
            );

            modelAccess.object.visible = true;

            //  modelAccess?.object.scale.set(10, 10, 10);
        } else if (modelAccess?.object) {
            modelAccess.object.visible = false;

        }
    });
    return (
        <>
            {/* {predictions?.map((obj, index) => {
                const [x, y, width, height] = obj.bbox;

                return (
                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            left: `${x}px`,
                            top: `${y}px`,
                            width: `${width}px`,
                            height: `${height}px`,
                            border: "2px solid red",
                            pointerEvents: "none",
                            boxSizing: "border-box",
                        }}
                    >
                        <span
                            style={{
                                background: "red",
                                color: "white",
                                fontSize: "12px",
                                padding: "2px 4px",
                            }}
                        >
                            {obj.class || "Object"}
                        </span>
                    </div>
                );
            })} */}

        </>
    )
}

export default SlamXr