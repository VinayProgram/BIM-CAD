import { Input } from '@/components/ui/input'
import { SidebarMenuItem } from '@/components/ui/sidebar'
import { Search } from 'lucide-react'
import React from 'react'
import useFinder from '../bim-finder-hooks'

const BimFindUi = () => {
      const {getResult,init}=useFinder()
  React.useEffect(() => {
    init()
  }, [init])

  return (
    <SidebarMenuItem key={'search'} className="space-y-2 rounded-lg border border-sidebar-border/50 bg-background/60 p-2">
      <div className="flex items-center gap-2 text-sm font-medium text-sidebar-foreground">
        <Search className="text-sidebar-foreground/80" />
        <span>Search models</span>
      </div>
      <Input
        placeholder="Search walls, slabs etc..."
        onChange={(e) => getResult(e.target.value)}
        className="w-full"
      />
    </SidebarMenuItem>
  )
}

export default BimFindUi