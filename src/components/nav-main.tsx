import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"
import BimCameraUi from "@/bim-tools/ui/bim-camera-ui"
import BimFindUi from "@/bim-tools/ui/bim-find-ui"
import BimExplodeUi from "@/bim-tools/ui/bim-explode-ui"
import { BimFileUploader } from "@/bim-tools/ui/bim-file-uploader"
import BimClippingUi from "@/bim-tools/ui/bim-cliping-ui"
import { useBimToolsStore } from "@/bim-tools/bim-tools-store"
import { Button } from "@base-ui/react"

export function NavMain() {
  const {xrStore}=useBimToolsStore()
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Main tools</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-4 rounded-2xl border border-sidebar-border/50 bg-sidebar/80 p-3 text-sm shadow-sm">
        <SidebarMenu className="flex flex-col gap-3">
          <BimFileUploader/>
          <BimFindUi />
          <BimCameraUi />
          <BimExplodeUi />
          <BimClippingUi/>
          <Button  onClick={()=>xrStore?.enterXR('immersive-ar')}>Start XR</Button>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
