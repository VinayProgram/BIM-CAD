import { useBim } from "@/bim-editor/bim-context";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import * as THREE from "three";

const SPEED = 0.1;
const ROTATION_SPEED = 0.03;

const Player = () => {
    const playerRef = React.useRef<THREE.Mesh>(null);
    const [, getControls] = useKeyboardControls();
    const { modelAccess } = useBim()
    const { camera } = useThree()
    const direction = React.useMemo(() => new THREE.Vector3(), []);
    const cameraOffset = React.useMemo(
        () => new THREE.Vector3(0, 2, 5),
        []
    );


    useFrame((state) => {
        if (!playerRef.current) return;

        const { forward, back, left, right } = getControls();

        // Rotate player
        if (left) {
            playerRef.current.rotation.y += ROTATION_SPEED;
        }

        if (right) {
            playerRef.current.rotation.y -= ROTATION_SPEED;
        }

        // Get forward direction
        playerRef.current.getWorldDirection(direction);

        // Move forward/back
        if (forward) {
            playerRef.current.position.addScaledVector(direction, SPEED);
        }

        if (back) {
            playerRef.current.position.addScaledVector(direction, -SPEED);
        }

        // Camera follow
        const cameraPosition = playerRef.current.position
            .clone()
            .add(
                cameraOffset.clone().applyQuaternion(playerRef.current.quaternion)
            );

        state.camera.position.lerp(cameraPosition, 0.1);

        state.camera.lookAt(playerRef.current.position);
    });


    useEffect(() => {
        modelAccess?.useCamera(camera)
    }, [modelAccess])

    return (
        <mesh ref={playerRef} position={[0, 0, 0]}>
            <capsuleGeometry args={[0.4, 1, 8, 16]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
};

export default Player;