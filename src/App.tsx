import {
  KeyboardControls,
  type KeyboardControlsEntry,
} from "@react-three/drei";

import { useMemo } from "react";
import BimContextProvider from "./bim-editor/bim-context";
import BimCanvas, { CameraComponent } from "./bim-editor/bim-canvas";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { TooltipProvider } from "./components/ui/tooltip";
import { useBimToolsStore } from "./bim-tools/bim-tools-store";
import { Loader } from "lucide-react";


//@ts-ignore

export enum ControlsType {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  up = 'up',
  down = 'down'
}

const App = () => {
  const {isLoading}=useBimToolsStore()
  const map = useMemo<KeyboardControlsEntry<ControlsType>[]>(
    () => [
      { name: ControlsType.forward, keys: ["ArrowUp", "KeyW"] },
      { name: ControlsType.back, keys: ["ArrowDown", "KeyS"] },
      { name: ControlsType.left, keys: ["ArrowLeft", "KeyA"] },
      { name: ControlsType.right, keys: ["ArrowRight", "KeyD"] },
      { name: ControlsType.up, keys: ["space", "KeyF"] },
      { name: ControlsType.down, keys: ["space", "KeyG"] }
    ],
    []
  );


  return (
    <div style={{ width: "98vw", height: "98vh" }}>
      <KeyboardControls map={map}>
        <BimContextProvider useFragments={false}>
          <TooltipProvider>
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "calc(var(--spacing) * 72)",
                  "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
              }
            >
              <AppSidebar variant="inset" />
              <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                  
                  {isLoading==0&&<span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                    <Loader scale={1000}   />
                    </span>}
                  <BimCanvas />
                </div>
                   <CameraComponent onFrame={(_video) => {}} />
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </BimContextProvider>
      </KeyboardControls>

    </div>
  );
};


export default App;
