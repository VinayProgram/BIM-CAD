import { create } from 'zustand';

// Define the exact camera types you requested
type CameraType = "FP" | "orbit" | "none";

interface BimToolsState {
  cameraType: CameraType;
  setCameraType: (type: CameraType) => void;
}

export const useBimToolsStore = create<BimToolsState>((set) => ({
  cameraType: "orbit", // Default starter state

  setCameraType: (type) => set({ cameraType: type }),
}));