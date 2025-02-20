/// <reference types="@figma/plugin-typings" />
/// <reference types="@create-figma-plugin/utilities" />

// Base types for frame properties
export interface FrameProperties {
  name?: string;
  width: number;
  height: number;
  layoutMode: FrameNode['layoutMode'];
  minWidth?: number | null;
  maxWidth?: number | null;
  minHeight?: number | null;
  maxHeight?: number | null;
  layoutProperties?: {
    primaryAxisSizingMode: 'FIXED' | 'AUTO';
    counterAxisSizingMode: 'FIXED' | 'AUTO';
    primaryAxisAlignItems: FrameNode['primaryAxisAlignItems'];
    counterAxisAlignItems: FrameNode['counterAxisAlignItems'];
    layoutWrap: FrameNode['layoutWrap'];
    itemSpacing: number | null;
    counterAxisSpacing: number | null;
    padding: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    layoutPositioning: FrameNode['layoutPositioning'];
  };
  appearance?: AppearanceProperties;
  styleReferences?: StyleReferences;
  styles?: StyleProperties;
}

// Appearance properties
export interface AppearanceProperties {
  opacity: number;
  blendMode: BlendMode;
  cornerRadius: number | PluginAPI['mixed'];
  strokeWeight: number | PluginAPI['mixed'];
  strokeAlign: 'INSIDE' | 'OUTSIDE' | 'CENTER';
  dashPattern: number[];
}

// Style references
export interface StyleReferences {
  fillStyleId?: string | PluginAPI['mixed'];
  strokeStyleId?: string | PluginAPI['mixed'];
  effectStyleId?: string | PluginAPI['mixed'];
  gridStyleId?: string | PluginAPI['mixed'];
}

// Paint type
export interface Paint {
  type: 'SOLID';
  color: {
    r: number;
    g: number;
    b: number;
  };
  opacity?: number;
}

// Effect type
export interface Effect {
  type: 'DROP_SHADOW';
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  offset: {
    x: number;
    y: number;
  };
  radius: number;
  visible: boolean;
  blendMode: 'NORMAL';
}

// LayoutGrid type
export interface LayoutGrid {
  pattern: 'GRID' | 'COLUMNS' | 'ROWS';
  sectionSize: number;
  visible: boolean;
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

// Style properties
export interface StyleProperties {
  fills: Paint[] | string[];
  strokes: Paint[] | string[];
  effects: Effect[] | string[];
  layoutGrids: LayoutGrid[] | string[];
}

// Base class data
export interface ClassData {
  name: string;
  createdAt: number;
}

// Saved class combines frame properties with metadata
export interface SavedClass extends ClassData, Omit<FrameProperties, 'name'> {}

// Operation result types
export interface SuccessResult<T> {
  success: true;
  data: T;
}

export interface ErrorResult {
  success: false;
  error: string;
}

// Saved class operation result
export type SavedClassResult = SuccessResult<SavedClass> | ErrorResult;

// Import operation result
export interface ImportResult {
  success: boolean;
  importedClasses?: SavedClass[];
  skippedClasses?: string[];
  error?: string;
  message?: string;
}

// Export format
export interface ClassExportFormat {
  version: string;
  exportDate: string;
  classes: SavedClass[];
  metadata: {
    pluginVersion: string;
    figmaVersion: string;
    checksum: string;
    totalClasses: number;
    exportedBy: string;
  };
} 