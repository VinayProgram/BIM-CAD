import { Input } from '@/components/ui/input'
import { SidebarMenuItem } from '@/components/ui/sidebar'
import { Maximize2 } from 'lucide-react'
import React, { useState } from 'react'
import { useBimToolsStore } from '../bim-tools-store'
import { Button } from '@/components/ui/button'

const BimExplodeUi = () => {
    const { setExplodeFactor } = useBimToolsStore()
    const [value, setValue] = useState<string>('0')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setValue(val)
        
        const num = parseFloat(val) || 0
        // Clamp between 0 and reasonable max (e.g., 50)
        const clamped = Math.max(0, Math.min(num, 100))
        setExplodeFactor(clamped)
        
    }

    const handleReset = () => {
        setValue('0')
        setExplodeFactor(0)
    }

    return (
        <SidebarMenuItem key={'explode'} className="space-y-2 rounded-lg border border-sidebar-border/50 bg-background/60 p-2">
            <div className="flex items-center gap-2 text-sm font-medium text-sidebar-foreground">
                <Maximize2 size={18} className="text-sidebar-foreground/80" />
                <span>Explode view</span>
            </div>
            <div className="flex items-center gap-2">
                <Input
                    title='Explode View'
                    type="number"
                    placeholder='0 - 50'
                    value={value}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.5"
                    className="w-24"
                />
                <Button size="sm" variant="outline" onClick={handleReset}>
                    Reset
                </Button>
            </div>
        </SidebarMenuItem>
    )
}

export default BimExplodeUi