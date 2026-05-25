import { create } from 'zustand';

// Define the exact camera types you requested
type CameraType = "FP" | "orbit" | "none";

interface BimToolsState {
  cameraType: CameraType;
  setCameraType: (type: CameraType) => void;

  explodeFactor:number;
  setExplodeFactor:(n:number)=>void
}

export const useBimToolsStore = create<BimToolsState>((set) => ({
  cameraType: "orbit", // Default starter state
  explodeFactor:0,
  setExplodeFactor:(n)=>set({explodeFactor:n}),
  setCameraType: (type) => set({ cameraType: type }),
}));