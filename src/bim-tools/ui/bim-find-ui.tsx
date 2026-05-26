import { SidebarMenuItem } from '@/components/ui/sidebar'
import React from 'react'
import useFinder from '../bim-finder-hooks'

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { useBimToolsStore } from '../bim-tools-store'
const BimFindUi = () => {
  const { getResult, init } = useFinder()
  const {classesData}=useBimToolsStore()
  React.useEffect(() => {
    init()
  }, [init])

  return (
    <SidebarMenuItem key={'search'} className="space-y-2 rounded-lg border border-sidebar-border/50 bg-background/60 p-2" title='search'>
      <Combobox items={classesData}>
        <ComboboxInput placeholder="Search Walls Floors etc..." onChange={(e) => getResult(e.target.value)} />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem onClick={() => {   getResult(item.replaceAll('"'))}} key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </SidebarMenuItem>
  )
}

export default BimFindUi