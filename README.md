# Maze3D-2

A React + TypeScript + Vite-based BIM viewer and AR/VR proof-of-concept with Three.js, IFC model loading, and live camera integration.

## Features

- **3D BIM Model Viewer**
  - Loads IFC models using `web-ifc`, `web-ifc-three`, and a BIM context provider.
  - Renders IFC geometry in a Three.js scene via `@react-three/fiber`.
  - Supports model loading from a configurable IFC URL.

- **Orbit and First-Person Camera Modes**
  - `Orbit` camera mode lets users rotate and inspect the BIM model.
  - `First-person` mode enables keyboard-driven navigation inside the scene.
  - Keyboard controls support movement with `W/A/S/D`, `Arrow` keys, and vertical motion.

- **AR / XR Support**
  - Uses `@react-three/xr` to enable `Start XR` and `Toggle AR` flows.
  - Integrates a live camera background inside the Three.js scene.
  - Provides a foundation for AR visualization and immersive viewing.

- **SLAM-style Camera Tracking**
  - Captures device camera video using `navigator.mediaDevices.getUserMedia`.
  - Streams live video into the Three.js scene as a dynamic scene background.
  - Runs object detection with TensorFlow's `coco-ssd` model.
  - Uses detected objects to move the BIM model inside the camera view.

- **Exploded Model View**
  - `BimExplode` separates model parts outward from the center.
  - Allows users to inspect complex IFC assemblies by moving pieces apart.
  - Tracks original positions and resets cleanly.

- **Side Clipping / Section Plane**
  - `BimSideClipping` adds side-plane clipping to slice the model.
  - Enables visual sectioning of BIM geometry for interior investigation.

- **3D Scene Helpers**
  - Includes a viewcube and viewport gizmo for orientation.
  - Uses orbit controls, ambient light, and scalable XR origin.

- **Modern UI with Sidebar and Panels**
  - Sidebar navigation built from `shadcn`-style components.
  - Responsive UI components, tool menus, and visual controls.
  - Theme-ready design using Tailwind CSS and custom UI primitives.

- **State Management**
  - Uses `zustand` for global BIM tool state.
  - Centralizes camera mode, AR state, transform mode, explode factor, and loading state.
  - Tracks live camera and object detection predictions.

## Architecture Overview

- `src/App.tsx`
  - Sets up keyboard controls, BIM context, tooltips, sidebars, and the main canvas.

- `src/bim-editor/bim-canvas.tsx`
  - Hosts the Three.js `Canvas`, XR scene, model mesh, and tool components.

- `src/bim-editor/bim-context.tsx`
  - Initializes BIM loaders and fragments using `@thatopen/fragments` and `@thatopen/components`.

- `src/bim-tools/bim-tools-store.tsx`
  - Defines application state for camera mode, AR, explosion, and video detection.

- `src/ar/slam-xr/slam-xr-camera-tracker.tsx`
  - Mixes live video texture, TensorFlow detections, and model positioning in AR.

## Getting Started

### Install dependencies

```bash
pnpm install
```

If you prefer npm:

```bash
npm install
```

### Run the app

```bash
pnpm dev
```

Or with npm:

```bash
npm run dev
```

### Build for production

```bash
pnpm build
```

### Preview a production build

```bash
pnpm preview
```

## Notes

- The project is configured as an early-stage BIM/AR prototype.
- Live AR and camera tracking require a secure context (`https`) and camera permissions.
- IFC loading uses a default remote sample model but can be replaced with other valid IFC sources.

## Dependencies

Key libraries used in this project:

- `react`, `react-dom`
- `vite`
- `three`, `@react-three/fiber`, `@react-three/drei`
- `@react-three/xr`
- `web-ifc`, `web-ifc-three`
- `@tensorflow-models/coco-ssd`
- `zustand`
- `tailwindcss`
- `shadcn` UI primitives

## License

This repository does not declare a license file. Add one if you want to open source the project.
