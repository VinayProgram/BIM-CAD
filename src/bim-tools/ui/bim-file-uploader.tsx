"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { SidebarMenuItem } from "@/components/ui/sidebar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { jsondata } from "./json-data"
import { useBimToolsStore } from "../bim-tools-store"

export function BimFileUploader() {
  const { setIfcLoadUrl } = useBimToolsStore()
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [mode, setMode] = React.useState<"choose" | "upload" | "existing">("choose")
  const [selectedProduct, setSelectedProduct] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const openDialog = () => {
    setMode("choose")
    setSelectedProduct(null)
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setMode("choose")
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileUrl = URL.createObjectURL(file)
    setIfcLoadUrl(fileUrl)
    closeDialog()
  }

  const handleExistingSelect = (item: string) => {
    setSelectedProduct(item)
     setIfcLoadUrl("https://raw.githubusercontent.com/youshengCode/IfcSampleFiles/refs/heads/main/"+item)
    closeDialog()
  }

  return (
    <SidebarMenuItem
      key={"search"}
      className="space-y-2 rounded-lg border border-sidebar-border/50 bg-background/60 p-2"
      title="search"
    >
      <Button className="w-full" onClick={openDialog}>
        Upload Choose
      </Button>
      <div >
      <Sheet  open={dialogOpen} onOpenChange={setDialogOpen} >
        <SheetContent >
          <SheetHeader>
            <SheetTitle>Upload or Choose Product</SheetTitle>
            <SheetDescription>
              Select a new IFC file to upload or choose an existing product from the JSON list.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 p-4">
            {mode === "choose" && (
              <div className="grid gap-3">
                <Button variant="secondary" onClick={() => setMode("upload")}>
                  Upload new IFC file
                </Button>
                <Button variant="secondary" onClick={() => setMode("existing")}> 
                  Choose existing product
                </Button>
              </div>
            )}

            {mode === "upload" && (
              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".ifc"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button onClick={() => fileInputRef.current?.click()}>
                  Pick IFC file
                </Button>
                <Button variant="ghost" onClick={() => setMode("choose")}>Back</Button>
              </div>
            )}

            {mode === "existing" && (
              <div className="space-y-3">
                <div className="grid max-h-72 gap-2 overflow-auto rounded-lg border border-muted/50 p-2">
                  {jsondata.map((item) => (
                    <Button
                      key={item}
                      variant="outline"
                      className="justify-start"
                      onClick={() => handleExistingSelect(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
                <Button variant="ghost" onClick={() => setMode("choose")}>Back</Button>
              </div>
            )}
          </div>

          <SheetFooter className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            {selectedProduct ? (
              <p className="text-sm text-muted-foreground">
                Selected: {selectedProduct}
              </p>
            ) : null}
          </SheetFooter>
        </SheetContent>
      </Sheet>
      </div>
    </SidebarMenuItem>
  )
}
