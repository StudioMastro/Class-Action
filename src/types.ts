// Appearance properties interface
export interface AppearanceProperties {
  opacity: number
  blendMode: BlendMode
  cornerRadius: number | PluginAPI['mixed']
  strokeWeight: number | PluginAPI['mixed']
  strokeAlign: "INSIDE" | "OUTSIDE" | "CENTER"
  dashPattern: readonly number[]
}

export interface SavedClass {
  name: string
  width: number
  height: number
  minWidth: number | null | undefined
  maxWidth: number | null | undefined
  minHeight: number | null | undefined
  maxHeight: number | null | undefined
  layoutMode: FrameNode['layoutMode']
  // Layout properties (when AUTO)
  layoutProperties?: {
    primaryAxisSizingMode: 'FIXED' | 'AUTO'  // horizontal resizing
    counterAxisSizingMode: 'FIXED' | 'AUTO'  // vertical resizing
    primaryAxisAlignItems: 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN'  // horizontal layout
    counterAxisAlignItems: 'MIN' | 'MAX' | 'CENTER'  // vertical layout
    layoutWrap: 'NO_WRAP' | 'WRAP'
    itemSpacing: number | null  // horizontal gap
    counterAxisSpacing: number | null  // vertical gap (when wrap is enabled)
    padding: {
      top: number
      right: number
      bottom: number
      left: number
    }
    layoutPositioning: 'AUTO' | 'ABSOLUTE'  // canvas stacking
  }
  // Style properties
  appearance?: AppearanceProperties
  // References to styles (if available)
  styleReferences?: {
    fillStyleId: string | PluginAPI['mixed']
    strokeStyleId: string | PluginAPI['mixed']
    effectStyleId: string | PluginAPI['mixed']
    gridStyleId: string | PluginAPI['mixed']
  }
  // Direct values (if no style references)
  styles?: {
    fills: string[] | Paint[] | PluginAPI['mixed']  // Supporta sia valori CSS che Paint objects
    strokes: string[] | Paint[] | PluginAPI['mixed']  // Supporta sia valori CSS che Paint objects
    effects: string[] | Effect[] | PluginAPI['mixed']  // Supporta sia valori CSS che Effect objects
    layoutGrids: LayoutGrid[] | PluginAPI['mixed']
  }
}

export interface ClassData extends Omit<SavedClass, 'name'> {
  name: string
}

export interface SavedClassResult extends Omit<SavedClass, 'name'> {}

export interface SaveClassEvent {
  name: string
}

export interface ClassExportFormat {
  version: string
  exportDate: string
  classes: SavedClass[]
  metadata: {
    pluginVersion: string
    figmaVersion: string
    author?: string
    description?: string
    checksum: string
    totalClasses: number
    exportedBy: string
  }
}

export interface ImportResult {
  success: boolean
  error?: string
  importedClasses?: SavedClass[]
  skippedClasses?: string[]
  message?: string
  conflicts?: string[]
} 