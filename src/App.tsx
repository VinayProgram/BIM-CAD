import {
  KeyboardControls,
  type KeyboardControlsEntry,
} from "@react-three/drei";

import { useMemo } from "react";
import BimContextProvider from "./bim-editor/bim-context";
import BimCanvas from "./bim-editor/bim-canvas";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { SectionCards } from "./components/section-cards";
import { ChartAreaInteractive } from "./components/chart-area-interactive";
import { DataTable } from "./components/data-table";
import { TooltipProvider } from "./components/ui/tooltip";


//@ts-ignore

export enum ControlsType {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
}

const App = () => {
  const map = useMemo<KeyboardControlsEntry<ControlsType>[]>(
    () => [
      { name: ControlsType.forward, keys: ["ArrowUp", "KeyW"] },
      { name: ControlsType.back, keys: ["ArrowDown", "KeyS"] },
      { name: ControlsType.left, keys: ["ArrowLeft", "KeyA"] },
      { name: ControlsType.right, keys: ["ArrowRight", "KeyD"] },
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

                  <BimCanvas />
                </div>
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </BimContextProvider>
      </KeyboardControls>

    </div>
  );
};


export default App;
