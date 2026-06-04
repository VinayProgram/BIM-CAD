import { useBimToolsStore } from '@/bim-tools/bim-tools-store'
import { Button } from '@/components/ui/button'

const BimArVrUi = () => {
    const { xrStore,ar,setAr } = useBimToolsStore()
  return (
    <div>
        <Button  onClick={()=>xrStore.enterAR()}>Start XR</Button> |  
    <Button  onClick={()=>setAr(!ar)}>Toggle AR</Button>
    </div>
  )
}

export default BimArVrUi