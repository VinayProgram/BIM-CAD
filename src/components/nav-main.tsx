import useFinder from "@/bim-editor/bim-finder-hooks"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Camera, PersonStanding, Search } from "lucide-react"
import React from "react"
import { Input } from "./ui/input"
import { useBim } from "@/bim-editor/bim-context"
import { useBimToolsStore } from "@/bim-tools/bim-tools-store"

export function NavMain() {
  const {getResult,init}=useFinder()
  const {setCameraType,cameraType}=useBimToolsStore(state=>state)
  React.useEffect(()=>{
    init()
  },[init])
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
           <SidebarMenuItem key={'search'}>
              <SidebarMenuButton tooltip={'search models'}>
                <Search
                />
                 <Input placeholder='search Walls slabs etc...' onChange={(e)=>getResult(e.target.value)}/>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem  onClick={()=>{cameraType==='FP'?setCameraType('orbit'):setCameraType('FP')}}>
              <SidebarMenuButton tooltip={'Camera'}>
                {cameraType=='FP'?<PersonStanding/>:<Camera/>}
                <span>{cameraType+' Camera'}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
