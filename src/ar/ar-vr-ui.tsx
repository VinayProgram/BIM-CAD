import { useBimToolsStore } from '@/bim-tools/bim-tools-store'
import { Button } from '@base-ui/react'

const BimArVrUi = () => {
    const { xrStore,ar,setAr } = useBimToolsStore()
  return (
    <div>
        <Button  onClick={()=>xrStore?.enterXR('immersive-ar')}>Start XR</Button> |  
    <Button  onClick={()=>setAr(!ar)}>Toggle AR</Button>
    </div>
  )
}

export default BimArVrUi