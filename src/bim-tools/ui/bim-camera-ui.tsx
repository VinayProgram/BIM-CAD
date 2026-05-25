import { Button } from '@/components/ui/button'
import { useBimToolsStore } from '../bim-tools-store'
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Camera, PersonStanding } from 'lucide-react'

const BimCameraUi = () => {
  const { setCameraType, cameraType } = useBimToolsStore((state) => state)
  const isFirstPerson = cameraType === 'FP'

  return (
    <SidebarMenuItem key="camera" className="space-y-2 rounded-lg border border-sidebar-border/50 bg-background/60 p-2">
      <div className="flex items-center gap-2 text-sm font-medium text-sidebar-foreground">
        {isFirstPerson ? <PersonStanding className="text-sidebar-foreground/80" /> : <Camera className="text-sidebar-foreground/80" />}
        <span>Camera mode</span>
      </div>
      <SidebarMenuButton
        tooltip="Toggle camera"
        onClick={() => setCameraType(isFirstPerson ? 'orbit' : 'FP')}
        className="w-full justify-between"
      >
        
        <Button>{isFirstPerson ? 'First person' : 'Orbit'}</Button  >
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default BimCameraUi