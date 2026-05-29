import { useBim } from "@/bim-editor/bim-context"
import {  TransformControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useRef } from "react"
import { DoubleSide, Mesh, Vector3 } from "three"
import * as THREE from 'three'
import { useBimToolsStore } from "./bim-tools-store"
const BimSideClipping = () => {
    const meshRef = useRef<Mesh>(null)
    const { gl } = useThree()
    const { modelAccess } = useBim()
    const {transform}=useBimToolsStore()

    //@ts-ignore
    function clipping() {
        gl.localClippingEnabled = true
        const direction = new Vector3()

        meshRef.current?.getWorldDirection(direction)
        console.log(direction)

        const plane = new THREE.Plane();
        const worldPos = new THREE.Vector3();
        meshRef.current!.getWorldPosition(worldPos);
        plane.setFromNormalAndCoplanarPoint(
            direction,
            worldPos
        );

        modelAccess?.object.traverse((child) => {
             //@ts-ignore
            const mat = child?.material;
            console.log(mat)
            // Some meshes may have multi-material
            if (Array.isArray(mat)) {
                mat.forEach(m => {
                    (m.clippingPlanes = [plane])
                    m.needsUpdate = true
                });
                 //@ts-ignore
                mat.needsUpdate = true
            } else if (mat?.isMaterial) {
                mat.clippingPlanes = [plane]
                mat.needsUpdate = true
            }

        })
    }

    return (
        <TransformControls mode={transform as "translate" | "rotate"} >
                <mesh onClick={clipping} ref={meshRef}><planeGeometry args={[10, 10]} /><meshBasicMaterial color={'orange'} side={DoubleSide} /></mesh>
        </TransformControls>
    )
}

export default BimSideClipping