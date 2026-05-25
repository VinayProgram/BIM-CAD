import { Input } from '@/components/ui/input'
import { SidebarMenuItem } from '@/components/ui/sidebar'
import { Upload } from 'lucide-react'
import React, { useState } from 'react'
import { useBim } from '@/bim-editor/bim-context'
import { useBimToolsStore } from '../bim-tools-store'

const BimUploadFile = () => {
    const {setIfcLoadUrl}=useBimToolsStore()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleUpload = async (file: File | undefined) => {
        if (!file) return

        // Validate file type
        const validTypes = ['.glb', '.gltf', '.obj', '.fbx', '.ifc']
        const isValid = validTypes.some(type => file.name.toLowerCase().endsWith(type))
        
        if (!isValid) {
            setError('Invalid file format. Supported: GLB, GLTF, OBJ, FBX, IFC')
            return
        }

        // Validate file size (e.g., max 50MB)
        const maxSize = 500 * 1024 * 1024
        if (file.size > maxSize) {
            setError('File too large. Maximum 50MB allowed.')
            return
        }

        try {
            setLoading(true)
            setError(null)

            const fileUrl = URL.createObjectURL(file)
            
            // Pass to your loader (adjust based on your setup)
            // This assumes you have a loader function in your BIM context
            setIfcLoadUrl(fileUrl)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load model')
        } finally {
            setLoading(false)
        }
    }

    return (
        <SidebarMenuItem 
            key={'upload'} 
            className="space-y-2 rounded-lg border border-sidebar-border/50 bg-background/60 p-2"
        >
            <div className="flex items-center gap-2 text-sm font-medium text-sidebar-foreground">
                <Upload className="text-sidebar-foreground/80" size={16} />
                <span>Upload Model</span>
            </div>
            <Input
                type='file'
                placeholder="Select GLB, GLTF, OBJ, FBX, or IFC..."
                onChange={(e) => handleUpload(e.target.files?.[0])}
                className="w-full"
                accept=".glb,.gltf,.obj,.fbx,.ifc"
                disabled={loading}
            />
            {loading && (
                <p className="text-xs text-sidebar-foreground/60">Loading model...</p>
            )}
            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </SidebarMenuItem>
    )
}

export default BimUploadFile