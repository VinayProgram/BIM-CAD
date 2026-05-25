import { useBim } from '@/bim-editor/bim-context'
import { useEffect, useRef, useState } from 'react'
import { Box3, Vector3, Object3D } from 'three'
import { useBimToolsStore } from './bim-tools-store'

interface ExplodedPart {
  object: Object3D
  originalPosition: Vector3
  direction: Vector3 // Cached direction vector for stable exploding
}

const BimExplode = () => {
  const { modelAccess } = useBim()
  const { setExplodeFactor, explodeFactor } = useBimToolsStore()

  const partsRef = useRef<ExplodedPart[]>([])
  const rootObjectRef = useRef<Object3D | null>(null)
  const [_, setIsExploded] = useState<boolean>(false)

  const init = () => {
    const root = modelAccess?.object
    if (!root) return

    rootObjectRef.current = root
    partsRef.current = []

    // 1. Force matrix updates so world/local positions are exact before computing bounds
    root.updateMatrixWorld(true)

    // 2. Compute the stable global center point
    const globalBox = new Box3().setFromObject(root)
    const modelCenter = globalBox.getCenter(new Vector3())
    console.log(root)
    // 3. Traverse hierarchy and cache the base vectors
    root.traverse((child: any) => {
      if (child.isMesh) {
        // Calculate stable local mesh center right now while model is intact
        const localBox = new Box3().setFromObject(child)
        const objectCenter = localBox.getCenter(new Vector3())

        // Calculate and freeze the push direction
        const direction = objectCenter.clone().sub(modelCenter).normalize()

        partsRef.current.push({
          object: child,
          originalPosition: child.position.clone(),
          direction: direction,
        })
      }
    })
  }
  // 2. Explode logic using pre-calculated stable directions
  const handleExplode = (factor: number) => {

    console.log(partsRef)
    partsRef.current.forEach((part) => {
      const offset = part.direction.clone().multiplyScalar(factor)
      part.object.position.copy(part.originalPosition.clone().add(offset))
      part.object.updateMatrix()
      part.object.updateMatrixWorld()
    })

    setIsExploded(factor > 0)
    rootObjectRef.current&&rootObjectRef?.current.updateMatrixWorld(true) // Update parent, not scene

  }

  // 3. Reset positions
  const resetPositions = () => {
    partsRef.current.forEach((part) => {
      part.object.position.copy(part.originalPosition)
            part.object.updateMatrix()

      part.object.updateMatrixWorld()
    })
    setExplodeFactor(0)
    setIsExploded(false)
  }

  // 4. Handle slider movement
  const onSliderChange = (factor: number) => {
    setExplodeFactor(factor)
    console.log('try to explode')
    if (factor === 0) {
      resetPositions()
    } else {
      handleExplode(factor)
    }
  }

  useEffect(() => {
    console.log(explodeFactor)
    if(partsRef.current.length==0)init()
    onSliderChange(explodeFactor)
  }, [explodeFactor])

  return null
}

export default BimExplode