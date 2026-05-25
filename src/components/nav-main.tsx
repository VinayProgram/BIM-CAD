import useFinder from "@/bim-editor/bim-finder-hooks"
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CirclePlusIcon, MailIcon } from "lucide-react"
import React from "react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {
  const {getResult,init}=useFinder()
  React.useEffect(()=>{
    init()
  },[init])
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
           <SidebarMenuItem key={'search'}>
              <SidebarMenuButton tooltip={'search models'}>
                <CirclePlusIcon
                />
                 <span>Search Models <br/> <input onChange={(e)=>getResult(e.target.value)}></input></span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
