import { useThree } from '@react-three/fiber'

const WebXrSupport = () => {
    const { gl } = useThree()

    const func = async () => {
        // 1. Fixed the logic check (it originally returned "supported" if it was false)
        if (!navigator.xr) {
            console.error('WebXR is not supported on this browser/device.');
            return;
        }

        try {
            // 2. Request the immersive AR session
            const session = await navigator.xr.requestSession("immersive-ar",{
                requiredFeatures: ['local'],
            });
            await session.requestReferenceSpace('local');

            // 3. Enable XR on the Three.js WebGLRenderer
            gl.xr.enabled = true;

            // 4. Hand the session over to Three.js
            // R3F and Three.js will now automatically handle the render loop,
            // framebuffer binding, and camera updates.
            await gl.xr.setSession(session);
            gl.autoClear = false; // Important for AR to prevent clearing the camera feed
        } catch (error) {
            console.error("Failed to start WebXR session:", error);
        }
    }

    return (
        <mesh onClick={func}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    )
}

export default WebXrSupport