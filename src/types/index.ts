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
  aspectRatio?: {
    value: number | null;
    isLocked: boolean;
  };
  position?: PositionProperties;
  layoutProperties?: {
    // Sizing modes
    primaryAxisSizingMode: 'FIXED' | 'AUTO';
    counterAxisSizingMode: 'FIXED' | 'AUTO';

    // Alignment
    primaryAxisAlignItems: 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN';
    counterAxisAlignItems: 'MIN' | 'MAX' | 'CENTER';
    layoutAlign: 'INHERIT' | 'STRETCH' | 'MIN' | 'CENTER' | 'MAX';

    // Wrapping and spacing
    layoutWrap: 'NO_WRAP' | 'WRAP';
    itemSpacing: number | null;
    counterAxisSpacing: number | null;

    // Growth and shrinking
    layoutGrow: number;

    // Padding
    padding: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };

    // Positioning and behavior
    layoutPositioning: 'ABSOLUTE' | 'AUTO';
    itemReverseZIndex: boolean;
    clipsContent: boolean;
  };
  appearance?: AppearanceProperties;
  styleReferences?: StyleReferences;
  styles?: StyleProperties;
  variableReferences?: Record<string, string>;
  fills?: readonly Paint[] | PluginAPI['mixed'];
  strokes?: readonly Paint[] | PluginAPI['mixed'];
  effects?: readonly Effect[] | PluginAPI['mixed'];
  variableModes?: Record<string, string>;
}

// Appearance properties
export interface AppearanceProperties {
  opacity: number;
  blendMode: BlendMode;
  cornerRadius: number | PluginAPI['mixed'];
  topLeftRadius: number;
  topRightRadius: number;
  bottomLeftRadius: number;
  bottomRightRadius: number;
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

// Base Paint properties
type ScaleMode = 'FILL' | 'FIT' | 'CROP' | 'TILE';
type EffectType = 'DROP_SHADOW' | 'INNER_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface RGBA extends RGB {
  a: number;
}

interface BasePaint {
  type: string;
  visible?: boolean;
  opacity?: number;
  blendMode?: BlendMode;
}

// Solid Paint type
interface SolidPaint extends BasePaint {
  type: 'SOLID';
  color: RGB;
}

// Gradient Paint type
interface GradientPaint extends BasePaint {
  type: 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR' | 'GRADIENT_DIAMOND';
  gradientStops: ColorStop[];
  gradientTransform: Transform;
}

interface ColorStop {
  position: number;
  color: RGBA;
}

// Image Paint type
interface ImagePaint extends BasePaint {
  type: 'IMAGE';
  scaleMode: ScaleMode;
  imageHash: string | null;
  imageTransform: Transform;
  scalingFactor: number;
}

// Video Paint type
interface VideoPaint extends BasePaint {
  type: 'VIDEO';
  videoHash: string | null;
  videoTransform: Transform;
  scaleMode: ScaleMode;
}

// Combined Paint type
export type Paint = SolidPaint | GradientPaint | ImagePaint | VideoPaint;

// Effect type
interface BaseEffect {
  type: EffectType;
  visible: boolean;
}

interface ShadowEffect extends BaseEffect {
  type: 'DROP_SHADOW' | 'INNER_SHADOW';
  color: RGBA;
  offset: Vector;
  radius: number;
  spread?: number;
  blendMode: BlendMode;
}

interface DropShadowEffect extends ShadowEffect {
  type: 'DROP_SHADOW';
}

interface InnerShadowEffect extends ShadowEffect {
  type: 'INNER_SHADOW';
}

interface BlurEffect extends BaseEffect {
  type: 'LAYER_BLUR' | 'BACKGROUND_BLUR';
  radius: number;
}

interface LayerBlurEffect extends BlurEffect {
  type: 'LAYER_BLUR';
}

interface BackgroundBlurEffect extends BlurEffect {
  type: 'BACKGROUND_BLUR';
}

type Effect = DropShadowEffect | InnerShadowEffect | LayerBlurEffect | BackgroundBlurEffect;

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
interface StyleProperties {
  fills?: string[];
  strokes?: string[];
  effects?: Effect[];
  layoutGrids?: LayoutGrid[];
}

// Base class data
export interface ClassData {
  name: string;
  createdAt: number;
  sourceNodeType?: 'FRAME' | 'COMPONENT' | 'INSTANCE';
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

// Position properties
export interface PositionProperties {
  rotation: number;
  relativeTransform?: Transform;
  constraints: {
    horizontal: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'SCALE';
    vertical: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'SCALE';
  };
}

// Add Transform type definition
export type Transform = [[number, number, number], [number, number, number]];
