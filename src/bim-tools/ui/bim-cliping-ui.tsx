import { useBimToolsStore } from '../bim-tools-store'
import { SidebarMenuItem } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { ClipboardCheck } from 'lucide-react'

const BimClippingUi = () => {
     const {setTransform,transform}=useBimToolsStore()
  return (
     <SidebarMenuItem key={'explode'} className="space-y-2 rounded-lg border border-sidebar-border/50 bg-background/60 p-2">
            <div className="flex items-center gap-2 text-sm font-medium text-sidebar-foreground">
                <ClipboardCheck size={18} className="text-sidebar-foreground/80" />
                <span>Clipping view</span>
            </div>
            <div className="flex items-center gap-2">
                 <Button size="sm" variant="outline" onClick={()=>setTransform(transform=='rotate'?'translate':'rotate')}>
                    {transform}
                </Button>
                <Button size="sm" variant="outline" onClick={()=>setTransform('none')}>
                    Reset
                </Button>
            </div>
        </SidebarMenuItem>
  )
}

export default BimClippingUi
