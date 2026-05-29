import { create } from 'zustand';

// Define the exact camera types you requested
type CameraType = "FP" | "orbit" | "none";

interface BimToolsState {
  cameraType: CameraType;
  setCameraType: (type: CameraType) => void;

  explodeFactor: number;
  setExplodeFactor: (n: number) => void

  ifcLoadUrl: string,
  setIfcLoadUrl: (s: string) => void

  isLoading: number
  setIsLoading: (t: number) => void

  classesData: string[],
  setClassesData: (s: string[]) => void


  transform: "translate" | "rotate" | "none"
  setTransform: (s: "translate" | "rotate" | "none") => void


}

export const useBimToolsStore = create<BimToolsState>((set) => ({
  cameraType: "orbit", // Default starter state
  explodeFactor: 0,
  setExplodeFactor: (n) => set({ explodeFactor: n }),
  setCameraType: (type) => set({ cameraType: type }),
  ifcLoadUrl: "https://threejs.org/examples/models/ifc/rac_advanced_sample_project.ifc",
  setIfcLoadUrl: (s) => set({ ifcLoadUrl: s }),
  isLoading: 0,
  setIsLoading: (t) => set({ isLoading: t }),
  classesData: [],
  setClassesData: (s) => set({ classesData: s }),

  transform:"none",
  setTransform:(s)=>set({transform:s})
}));