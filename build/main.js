var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@create-figma-plugin/utilities/lib/events.js
function on(name, handler) {
  const id = `${currentId}`;
  currentId += 1;
  eventHandlers[id] = { handler, name };
  return function() {
    delete eventHandlers[id];
  };
}
function invokeEventHandler(name, args) {
  let invoked = false;
  for (const id in eventHandlers) {
    if (eventHandlers[id].name === name) {
      eventHandlers[id].handler.apply(null, args);
      invoked = true;
    }
  }
  if (invoked === false) {
    throw new Error(`No event handler with name \`${name}\``);
  }
}
var eventHandlers, currentId, emit;
var init_events = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/events.js"() {
    eventHandlers = {};
    currentId = 0;
    emit = typeof window === "undefined" ? function(name, ...args) {
      figma.ui.postMessage([name, ...args]);
    } : function(name, ...args) {
      window.parent.postMessage({
        pluginMessage: [name, ...args]
      }, "*");
    };
    if (typeof window === "undefined") {
      figma.ui.onmessage = function(args) {
        if (!Array.isArray(args)) {
          return;
        }
        const [name, ...rest] = args;
        if (typeof name !== "string") {
          return;
        }
        invokeEventHandler(name, rest);
      };
    } else {
      window.onmessage = function(event) {
        if (typeof event.data.pluginMessage === "undefined") {
          return;
        }
        const args = event.data.pluginMessage;
        if (!Array.isArray(args)) {
          return;
        }
        const [name, ...rest] = event.data.pluginMessage;
        if (typeof name !== "string") {
          return;
        }
        invokeEventHandler(name, rest);
      };
    }
  }
});

// node_modules/@create-figma-plugin/utilities/lib/ui.js
function showUI(options, data) {
  if (typeof __html__ === "undefined") {
    throw new Error("No UI defined");
  }
  const html = `<div id="create-figma-plugin"></div><script>document.body.classList.add('theme-${figma.editorType}');const __FIGMA_COMMAND__='${typeof figma.command === "undefined" ? "" : figma.command}';const __SHOW_UI_DATA__=${JSON.stringify(typeof data === "undefined" ? {} : data)};${__html__}</script>`;
  figma.showUI(html, __spreadProps(__spreadValues({}, options), {
    themeColors: typeof options.themeColors === "undefined" ? true : options.themeColors
  }));
}
var init_ui = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/ui.js"() {
  }
});

// node_modules/@create-figma-plugin/utilities/lib/index.js
var init_lib = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/index.js"() {
    init_events();
    init_ui();
  }
});

// src/utils/validation.ts
var validateClassData, generateChecksum;
var init_validation = __esm({
  "src/utils/validation.ts"() {
    "use strict";
    validateClassData = (cls) => {
      if (!cls.name || typeof cls.name !== "string") return false;
      if (typeof cls.width !== "number" || typeof cls.height !== "number") return false;
      if (!["NONE", "HORIZONTAL", "VERTICAL"].includes(cls.layoutMode)) return false;
      if (cls.layoutProperties) {
        const {
          primaryAxisSizingMode,
          counterAxisSizingMode,
          primaryAxisAlignItems,
          counterAxisAlignItems,
          layoutWrap,
          padding
        } = cls.layoutProperties;
        if (!primaryAxisSizingMode || !counterAxisSizingMode) return false;
        if (!primaryAxisAlignItems || !counterAxisAlignItems) return false;
        if (!layoutWrap) return false;
        if (!padding || typeof padding.top !== "number" || typeof padding.right !== "number" || typeof padding.bottom !== "number" || typeof padding.left !== "number") return false;
      }
      if (cls.appearance) {
        const { opacity, blendMode, cornerRadius } = cls.appearance;
        if (typeof opacity !== "number" || opacity < 0 || opacity > 1) return false;
        if (!blendMode) return false;
        if (typeof cornerRadius !== "number" && !Array.isArray(cornerRadius)) return false;
      }
      return true;
    };
    generateChecksum = (data) => {
      const str = JSON.stringify(data);
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return hash.toString(16);
    };
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
function showNotification(message, options = {}) {
  const now = Date.now();
  const timeSinceLastNotification = now - lastNotificationTime;
  if (currentNotification) {
    currentNotification.cancel();
  }
  if (timeSinceLastNotification < NOTIFICATION_TIMEOUT.MINIMUM_INTERVAL) {
    setTimeout(() => {
      showNotificationImmediate(message, options);
    }, NOTIFICATION_TIMEOUT.MINIMUM_INTERVAL - timeSinceLastNotification);
    return;
  }
  showNotificationImmediate(message, options);
}
function showNotificationImmediate(message, options = {}) {
  currentNotification = figma.notify(message, __spreadValues({
    timeout: options.error ? NOTIFICATION_TIMEOUT.ERROR : NOTIFICATION_TIMEOUT.SUCCESS
  }, options));
  lastNotificationTime = Date.now();
}
async function getStyleColor(styleId) {
  try {
    const style = await figma.getStyleByIdAsync(styleId);
    if (!style || !("paints" in style)) return styleId;
    const paint = style.paints[0];
    if (paint.type === "SOLID") {
      const { r, g, b } = paint.color;
      const opacity = "opacity" in paint ? paint.opacity : 1;
      return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${opacity})`;
    }
    return styleId;
  } catch (error) {
    console.error("Error getting style color:", error);
    return styleId;
  }
}
function main_default() {
  const options = { width: 320, height: 480 };
  function checkSelection() {
    const selection = figma.currentPage.selection;
    const hasFrames = selection.length > 0 && selection.every((node) => node.type === "FRAME");
    emit("SELECTION_CHANGED", hasFrames);
    return hasFrames;
  }
  async function loadSavedClasses() {
    try {
      const savedClasses = await figma.clientStorage.getAsync(STORAGE_KEY) || [];
      emit("CLASSES_LOADED", savedClasses);
      return savedClasses;
    } catch (error) {
      console.error("Error loading classes:", error);
      showNotification("Failed to load saved classes", { error: true });
      return [];
    }
  }
  async function saveToStorage(classes, shouldNotify = false) {
    try {
      await figma.clientStorage.setAsync(STORAGE_KEY, classes);
      if (shouldNotify) {
        showNotification("Classes saved successfully");
      }
    } catch (error) {
      console.error("Error saving classes:", error);
      showNotification("Failed to save classes", { error: true });
    }
  }
  async function extractFrameProperties(frame) {
    console.log("Extracting properties from frame:", frame.name);
    console.log("Frame fills:", frame.fills);
    console.log("Frame strokes:", frame.strokes);
    const properties = {
      width: frame.width,
      height: frame.height,
      layoutMode: frame.layoutMode,
      minWidth: void 0,
      maxWidth: void 0,
      minHeight: void 0,
      maxHeight: void 0
    };
    if (frame.layoutMode === "HORIZONTAL" || frame.layoutMode === "VERTICAL") {
      console.log("Frame has auto-layout, extracting sizing properties");
      properties.minWidth = frame.minWidth;
      properties.maxWidth = frame.maxWidth;
      properties.minHeight = frame.minHeight;
      properties.maxHeight = frame.maxHeight;
      properties.layoutProperties = {
        primaryAxisSizingMode: frame.primaryAxisSizingMode,
        counterAxisSizingMode: frame.counterAxisSizingMode,
        primaryAxisAlignItems: frame.primaryAxisAlignItems,
        counterAxisAlignItems: frame.counterAxisAlignItems,
        layoutWrap: frame.layoutWrap,
        itemSpacing: typeof frame.itemSpacing === "number" ? frame.itemSpacing : null,
        counterAxisSpacing: typeof frame.counterAxisSpacing === "number" ? frame.counterAxisSpacing : null,
        padding: {
          top: frame.paddingTop,
          right: frame.paddingRight,
          bottom: frame.paddingBottom,
          left: frame.paddingLeft
        },
        layoutPositioning: frame.layoutPositioning
      };
      console.log("Extracted auto-layout properties:", {
        layoutWrap: frame.layoutWrap,
        itemSpacing: frame.itemSpacing,
        counterAxisSpacing: frame.counterAxisSpacing,
        padding: {
          top: frame.paddingTop,
          right: frame.paddingRight,
          bottom: frame.paddingBottom,
          left: frame.paddingLeft
        }
      });
    } else {
      console.log("Frame has no auto-layout, saving only fixed dimensions");
    }
    const appearance = {
      opacity: frame.opacity,
      blendMode: frame.blendMode,
      cornerRadius: frame.cornerRadius,
      strokeWeight: frame.strokeWeight,
      strokeAlign: frame.strokeAlign,
      dashPattern: [...frame.dashPattern]
      // Create a copy of the array
    };
    properties.appearance = appearance;
    const styleReferences = {
      fillStyleId: "",
      strokeStyleId: "",
      effectStyleId: "",
      gridStyleId: ""
    };
    let hasStyleReferences = false;
    async function getStyleInfo(styleId) {
      try {
        const style = await figma.getStyleByIdAsync(styleId);
        if (!style) return { id: styleId, name: styleId };
        let value;
        if ("paints" in style) {
          const paint = style.paints[0];
          if (paint.type === "SOLID") {
            const { r, g, b } = paint.color;
            const opacity = "opacity" in paint ? paint.opacity : 1;
            value = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${opacity})`;
          }
        }
        return {
          id: styleId,
          name: style.name,
          value
        };
      } catch (error) {
        console.error("Error getting style info:", error);
        return { id: styleId, name: styleId };
      }
    }
    if (frame.fillStyleId && typeof frame.fillStyleId === "string") {
      const { id } = await getStyleInfo(frame.fillStyleId);
      styleReferences.fillStyleId = id;
      hasStyleReferences = true;
      console.log("Found fill style ID:", id);
    }
    if (frame.strokeStyleId && typeof frame.strokeStyleId === "string") {
      const { id } = await getStyleInfo(frame.strokeStyleId);
      styleReferences.strokeStyleId = id;
      hasStyleReferences = true;
      console.log("Found stroke style ID:", id);
    }
    if (frame.effectStyleId && typeof frame.effectStyleId === "string") {
      const { name } = await getStyleInfo(frame.effectStyleId);
      styleReferences.effectStyleId = name;
      hasStyleReferences = true;
      console.log("Found effect style:", name);
    }
    if (frame.gridStyleId && typeof frame.gridStyleId === "string") {
      const { name } = await getStyleInfo(frame.gridStyleId);
      styleReferences.gridStyleId = name;
      hasStyleReferences = true;
    }
    if (hasStyleReferences) {
      properties.styleReferences = styleReferences;
    }
    const styles = {
      fills: [],
      strokes: [],
      effects: [],
      layoutGrids: []
    };
    let hasStyles = false;
    function paintToCSS(paint) {
      console.log("Converting paint to CSS:", paint);
      if (paint.type === "SOLID") {
        const { r, g, b } = paint.color;
        const opacity = "opacity" in paint ? paint.opacity : 1;
        const cssColor = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${opacity})`;
        console.log("Generated CSS color:", cssColor);
        return cssColor;
      }
      return null;
    }
    if (Array.isArray(frame.fills) && !styleReferences.fillStyleId) {
      console.log("Processing fills for frame:", frame.fills);
      const cssColors = frame.fills.map(paintToCSS).filter((color) => color !== null);
      if (cssColors.length > 0) {
        styles.fills = cssColors;
        hasStyles = true;
        console.log("Saved CSS colors for fills:", cssColors);
      }
    }
    if (Array.isArray(frame.strokes) && !styleReferences.strokeStyleId) {
      console.log("Processing strokes for frame:", frame.strokes);
      const cssColors = frame.strokes.map(paintToCSS).filter((color) => color !== null);
      if (cssColors.length > 0) {
        styles.strokes = cssColors;
        hasStyles = true;
        console.log("Saved CSS colors for strokes:", cssColors);
      }
    }
    if (Array.isArray(frame.effects) && !styleReferences.effectStyleId) {
      console.log("Processing effects:", frame.effects);
      const cssEffects = frame.effects.map((effect) => {
        if (effect.type === "DROP_SHADOW") {
          const { offset, radius, color } = effect;
          return `${offset.x}px ${offset.y}px ${radius}px rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${color.a})`;
        }
        return null;
      }).filter((effect) => effect !== null);
      if (cssEffects.length > 0) {
        styles.effects = cssEffects;
        hasStyles = true;
        console.log("Saved CSS shadows:", cssEffects);
      }
    }
    if (hasStyles) {
      console.log("Final styles object:", styles);
      properties.styles = styles;
    }
    console.log("Final properties object:", properties);
    return properties;
  }
  async function handleSaveClass(event) {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      showNotification("Please select a frame to save the class", { error: true });
      return null;
    }
    if (selection.length > 1) {
      showNotification("Please select only one frame to save the class. Multiple selection is not supported for class creation.", { error: true });
      return null;
    }
    const frame = selection[0];
    if (frame.type !== "FRAME") {
      showNotification("Please select a frame to save the class. Other element types are not supported.", { error: true });
      return null;
    }
    if (!event.name || event.name.trim() === "") {
      showNotification("Please enter a valid class name", { error: true });
      return null;
    }
    if (event.name.length > 64) {
      showNotification("Class name is too long. Maximum 64 characters allowed.", { error: true });
      return null;
    }
    try {
      const existingClasses = await loadSavedClasses();
      if (existingClasses.some((cls) => cls.name.toLowerCase() === event.name.trim().toLowerCase())) {
        showNotification("A class with this name already exists (names are case-insensitive)", { error: true });
        return null;
      }
      const frameProperties = await extractFrameProperties(frame);
      if (!frameProperties) {
        showNotification("Failed to extract frame properties", { error: true });
        return null;
      }
      const classData = __spreadProps(__spreadValues({}, frameProperties), {
        name: event.name.trim()
        // Manteniamo il case originale per la visualizzazione
      });
      const updatedClasses = [...existingClasses, classData];
      await saveToStorage(updatedClasses);
      emit("CLASS_SAVED", classData);
      showNotification(`Class "${event.name}" saved successfully from frame "${frame.name}"`);
      return frameProperties;
    } catch (error) {
      console.error("Error saving class:", error);
      showNotification("Failed to save class", { error: true });
      return null;
    }
  }
  async function handleApplyClass(classData, shouldNotify = true) {
    var _a, _b, _c;
    if (!checkSelection()) {
      showNotification("Please select at least one frame", { error: true });
      return false;
    }
    const frames = figma.currentPage.selection.filter((node) => node.type === "FRAME");
    if (frames.length === 0) {
      showNotification("Please select at least one frame", { error: true });
      return false;
    }
    try {
      let successCount = 0;
      for (const frame of frames) {
        frame.name = classData.name;
        console.log("Setting frame name to:", classData.name);
        frame.layoutMode = classData.layoutMode;
        console.log("Setting layout mode to:", classData.layoutMode);
        if (frame.layoutMode === "NONE") {
          console.log("Applying fixed dimensions:", { width: classData.width, height: classData.height });
          frame.resize(classData.width, classData.height);
        } else {
          frame.resize(classData.width, classData.height);
          if (classData.minWidth !== null && classData.minWidth !== void 0) {
            frame.minWidth = classData.minWidth;
          }
          if (classData.maxWidth !== null && classData.maxWidth !== void 0) {
            frame.maxWidth = classData.maxWidth;
          }
          if (classData.minHeight !== null && classData.minHeight !== void 0) {
            frame.minHeight = classData.minHeight;
          }
          if (classData.maxHeight !== null && classData.maxHeight !== void 0) {
            frame.maxHeight = classData.maxHeight;
          }
          console.log("Applied auto-layout dimensions:", {
            width: classData.width,
            height: classData.height,
            minWidth: frame.minWidth,
            maxWidth: frame.maxWidth,
            minHeight: frame.minHeight,
            maxHeight: frame.maxHeight
          });
          if (classData.layoutProperties) {
            frame.primaryAxisSizingMode = classData.layoutProperties.primaryAxisSizingMode;
            frame.counterAxisSizingMode = classData.layoutProperties.counterAxisSizingMode;
            frame.primaryAxisAlignItems = classData.layoutProperties.primaryAxisAlignItems;
            frame.counterAxisAlignItems = classData.layoutProperties.counterAxisAlignItems;
            frame.layoutWrap = classData.layoutProperties.layoutWrap;
            if (classData.layoutProperties.itemSpacing !== null) {
              frame.itemSpacing = classData.layoutProperties.itemSpacing;
            }
            if (classData.layoutProperties.counterAxisSpacing !== null) {
              frame.counterAxisSpacing = classData.layoutProperties.counterAxisSpacing;
            }
            frame.paddingTop = classData.layoutProperties.padding.top;
            frame.paddingRight = classData.layoutProperties.padding.right;
            frame.paddingBottom = classData.layoutProperties.padding.bottom;
            frame.paddingLeft = classData.layoutProperties.padding.left;
            console.log("Applied auto-layout properties:", {
              layoutWrap: frame.layoutWrap,
              itemSpacing: frame.itemSpacing,
              counterAxisSpacing: frame.counterAxisSpacing,
              padding: {
                top: frame.paddingTop,
                right: frame.paddingRight,
                bottom: frame.paddingBottom,
                left: frame.paddingLeft
              }
            });
            frame.layoutPositioning = classData.layoutProperties.layoutPositioning;
          }
        }
        if (classData.appearance) {
          frame.opacity = classData.appearance.opacity;
          frame.blendMode = classData.appearance.blendMode;
          frame.cornerRadius = classData.appearance.cornerRadius;
          if (classData.appearance.strokeWeight !== figma.mixed) {
            frame.strokeWeight = classData.appearance.strokeWeight;
          }
          frame.strokeAlign = classData.appearance.strokeAlign;
          frame.dashPattern = [...classData.appearance.dashPattern];
        }
        if (classData.styleReferences) {
          const { fillStyleId, strokeStyleId, effectStyleId, gridStyleId } = classData.styleReferences;
          try {
            if (fillStyleId && typeof fillStyleId === "string") {
              await frame.setFillStyleIdAsync(fillStyleId);
              console.log("Applied fill style ID:", fillStyleId);
            }
            if (strokeStyleId && typeof strokeStyleId === "string") {
              await frame.setStrokeStyleIdAsync(strokeStyleId);
              console.log("Applied stroke style ID:", strokeStyleId);
            }
            if (effectStyleId && typeof effectStyleId === "string") {
              await frame.setEffectStyleIdAsync(effectStyleId);
              console.log("Applied effect style ID:", effectStyleId);
            }
            if (gridStyleId && typeof gridStyleId === "string") {
              await frame.setGridStyleIdAsync(gridStyleId);
              console.log("Applied grid style ID:", gridStyleId);
            }
          } catch (error) {
            console.error("Error applying style references:", error);
          }
        }
        if (classData.styles) {
          if (!((_a = classData.styleReferences) == null ? void 0 : _a.fillStyleId) && classData.styles.fills !== figma.mixed) {
            if (Array.isArray(classData.styles.fills)) {
              if (typeof classData.styles.fills[0] === "string") {
                const newFills = classData.styles.fills.map((cssColor) => {
                  if (typeof cssColor !== "string") return null;
                  const matches = cssColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                  if (matches) {
                    const [_, r, g, b, a = "1"] = matches;
                    return {
                      type: "SOLID",
                      color: {
                        r: parseInt(r) / 255,
                        g: parseInt(g) / 255,
                        b: parseInt(b) / 255
                      },
                      opacity: parseFloat(a)
                    };
                  }
                  return null;
                }).filter((fill) => fill !== null);
                if (newFills.length > 0) {
                  frame.fills = newFills;
                }
              } else {
                frame.fills = classData.styles.fills;
              }
            }
          }
          if (!((_b = classData.styleReferences) == null ? void 0 : _b.strokeStyleId) && classData.styles.strokes !== figma.mixed) {
            if (Array.isArray(classData.styles.strokes)) {
              if (typeof classData.styles.strokes[0] === "string") {
                const newStrokes = classData.styles.strokes.map((cssColor) => {
                  if (typeof cssColor !== "string") return null;
                  const matches = cssColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                  if (matches) {
                    const [_, r, g, b, a = "1"] = matches;
                    return {
                      type: "SOLID",
                      color: {
                        r: parseInt(r) / 255,
                        g: parseInt(g) / 255,
                        b: parseInt(b) / 255
                      },
                      opacity: parseFloat(a)
                    };
                  }
                  return null;
                }).filter((stroke) => stroke !== null);
                if (newStrokes.length > 0) {
                  frame.strokes = newStrokes;
                }
              } else {
                frame.strokes = classData.styles.strokes;
              }
            }
          }
          if (!((_c = classData.styleReferences) == null ? void 0 : _c.effectStyleId) && classData.styles.effects !== figma.mixed) {
            if (Array.isArray(classData.styles.effects)) {
              if (typeof classData.styles.effects[0] === "string") {
                const newEffects = classData.styles.effects.map((cssShadow) => {
                  if (typeof cssShadow !== "string") return null;
                  const matches = cssShadow.match(/(-?\d+)px\s+(-?\d+)px\s+(-?\d+)px\s+rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
                  if (matches) {
                    const [_, x, y, blur, r, g, b, a] = matches;
                    return {
                      type: "DROP_SHADOW",
                      color: {
                        r: parseInt(r) / 255,
                        g: parseInt(g) / 255,
                        b: parseInt(b) / 255,
                        a: parseFloat(a)
                      },
                      offset: { x: parseInt(x), y: parseInt(y) },
                      radius: parseInt(blur),
                      visible: true,
                      blendMode: "NORMAL"
                    };
                  }
                  return null;
                }).filter((effect) => effect !== null);
                if (newEffects.length > 0) {
                  frame.effects = newEffects;
                }
              } else {
                frame.effects = classData.styles.effects;
              }
            }
          }
        }
        successCount++;
      }
      if (shouldNotify) {
        const message = frames.length === 1 ? "Class applied successfully" : `Class applied to ${successCount} frames successfully`;
        showNotification(message);
      }
      return true;
    } catch (error) {
      console.error("Error applying class:", error);
      showNotification("Failed to apply class", { error: true });
      return false;
    }
  }
  async function handleUpdateClass(classToUpdate) {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      showNotification("Please select a frame to update the class", { error: true });
      return null;
    }
    if (selection.length > 1) {
      showNotification("Please select only one frame to update the class. Multiple selection is not supported for class updates.", { error: true });
      return null;
    }
    const frame = selection[0];
    if (frame.type !== "FRAME") {
      showNotification("Please select a frame to update the class", { error: true });
      return null;
    }
    try {
      const frameProperties = await extractFrameProperties(frame);
      console.log("Extracted new properties:", frameProperties);
      const savedClasses = await loadSavedClasses();
      const updatedClasses = savedClasses.map(
        (cls) => cls.name === classToUpdate.name ? __spreadProps(__spreadValues({}, frameProperties), { name: classToUpdate.name }) : cls
      );
      await saveToStorage(updatedClasses);
      emit("CLASS_UPDATED", {
        name: classToUpdate.name,
        properties: frameProperties,
        updatedFrom: frame.name
      });
      showNotification(`Class "${classToUpdate.name}" updated successfully from frame "${frame.name}"`);
      return frameProperties;
    } catch (error) {
      console.error("Error updating class:", error);
      showNotification("Failed to update class", { error: true });
      return null;
    }
  }
  async function handleDeleteClass(classData) {
    try {
      const savedClasses = await loadSavedClasses();
      const updatedClasses = savedClasses.filter((cls) => cls.name !== classData.name);
      await saveToStorage(updatedClasses);
      showNotification("Class deleted successfully");
      emit("CLASS_DELETED", classData.name);
      return true;
    } catch (error) {
      console.error("Error deleting class:", error);
      showNotification("Failed to delete class", { error: true });
      return false;
    }
  }
  async function handleExportClasses(selectedClasses) {
    var _a;
    try {
      const savedClasses = await loadSavedClasses();
      const classesToExport = selectedClasses ? savedClasses.filter((cls) => selectedClasses.includes(cls.name)) : savedClasses;
      const invalidClasses = classesToExport.filter((cls) => !validateClassData(cls));
      if (invalidClasses.length > 0) {
        const invalidNames = invalidClasses.map((cls) => cls.name).join(", ");
        throw new Error(`Invalid class data found in: ${invalidNames}`);
      }
      const exportData = {
        version: "1.0.0",
        exportDate: (/* @__PURE__ */ new Date()).toISOString(),
        classes: classesToExport,
        metadata: {
          pluginVersion: "1.0.0",
          figmaVersion: figma.editorType,
          checksum: "",
          // Sarà aggiunto dopo
          totalClasses: classesToExport.length,
          exportedBy: "Unknown"
          // Default value
        }
      };
      try {
        exportData.metadata.exportedBy = ((_a = figma.currentUser) == null ? void 0 : _a.name) || "Unknown";
      } catch (error) {
        console.log("Current user information not available");
      }
      exportData.metadata.checksum = generateChecksum(exportData.classes);
      const timestamp = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const suggestedFileName = `class-action-export-${timestamp}.json`;
      const jsonString = JSON.stringify(exportData, null, 2);
      emit("SHOW_SAVE_DIALOG", {
        suggestedFileName,
        fileContent: jsonString,
        totalClasses: classesToExport.length
      });
      return jsonString;
    } catch (error) {
      console.error("Error exporting classes:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to export classes";
      showNotification(errorMessage, { error: true, timeout: 3e3 });
      return false;
    }
  }
  async function handleImportClasses(jsonString) {
    var _a;
    try {
      console.log("Starting import process with data:", jsonString.substring(0, 200) + "...");
      const importData = JSON.parse(jsonString);
      console.log("Parsed import data:", {
        version: importData.version,
        totalClasses: (_a = importData.classes) == null ? void 0 : _a.length,
        metadata: importData.metadata
      });
      if (!importData.version || !importData.classes || !Array.isArray(importData.classes)) {
        console.error("Validation failed:", {
          hasVersion: !!importData.version,
          hasClasses: !!importData.classes,
          isArray: Array.isArray(importData.classes)
        });
        emit("IMPORT_RESULT", {
          success: false,
          error: "Invalid file format"
        });
        return;
      }
      const existingClasses = await loadSavedClasses();
      console.log("Loaded existing classes:", existingClasses.length);
      const existingNames = new Set(existingClasses.map((cls) => cls.name));
      const newClasses = [];
      const alreadyExistingClasses = [];
      for (const importClass of importData.classes) {
        if (existingNames.has(importClass.name)) {
          alreadyExistingClasses.push(importClass.name);
        } else {
          newClasses.push(importClass);
        }
      }
      let notificationMessage = "";
      if (newClasses.length === 0 && alreadyExistingClasses.length > 0) {
        notificationMessage = `No classes imported - all ${alreadyExistingClasses.length} classes already exist`;
      } else if (newClasses.length > 0 && alreadyExistingClasses.length > 0) {
        notificationMessage = `Imported ${newClasses.length} classes, skipped ${alreadyExistingClasses.length} existing classes`;
      } else if (newClasses.length > 0) {
        notificationMessage = `Successfully imported ${newClasses.length} classes`;
      } else {
        notificationMessage = "No classes to import";
      }
      if (newClasses.length > 0) {
        const mergedClasses = [...existingClasses, ...newClasses];
        await saveToStorage(mergedClasses);
        console.log("Successfully saved merged classes");
      }
      showNotification(notificationMessage);
      emit("IMPORT_RESULT", {
        success: true,
        importedClasses: newClasses,
        skippedClasses: alreadyExistingClasses,
        message: notificationMessage
      });
    } catch (error) {
      console.error("Error importing classes:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      showNotification("Failed to import classes: " + errorMessage, { error: true });
      emit("IMPORT_RESULT", {
        success: false,
        error: errorMessage
      });
    }
  }
  async function handleApplyAllMatchingClasses() {
    try {
      const savedClasses = await loadSavedClasses();
      if (!savedClasses.length) {
        showNotification("No saved classes found");
        return false;
      }
      const frames = figma.currentPage.findAll((node) => node.type === "FRAME");
      if (!frames.length) {
        showNotification("No frames found in current page");
        return false;
      }
      let appliedCount = 0;
      let errorCount = 0;
      for (const frame of frames) {
        const matchingClass = savedClasses.find((cls) => cls.name === frame.name);
        if (matchingClass) {
          try {
            figma.currentPage.selection = [frame];
            await handleApplyClass(matchingClass, false);
            appliedCount++;
          } catch (error) {
            console.error(`Error applying class to frame ${frame.name}:`, error);
            errorCount++;
          }
        }
      }
      if (appliedCount > 0) {
        showNotification(`Applied ${appliedCount} classes successfully${errorCount > 0 ? ` (${errorCount} errors)` : ""}`);
        emit("CLASSES_APPLIED_ALL", { success: true, appliedCount, errorCount });
        return true;
      } else {
        showNotification("No matching classes found");
        return false;
      }
    } catch (error) {
      console.error("Error in apply all matching classes:", error);
      showNotification("Failed to apply matching classes", { error: true });
      emit("CLASSES_APPLIED_ALL", { success: false, error: String(error) });
      return false;
    }
  }
  async function handleAnalyzeApplyAll() {
    try {
      const savedClasses = await loadSavedClasses();
      if (!savedClasses.length) {
        showNotification("No saved classes found");
        return;
      }
      const frames = figma.currentPage.findAll((node) => node.type === "FRAME");
      if (!frames.length) {
        showNotification("No frames found in current page");
        return;
      }
      const matchingFrames = frames.filter(
        (frame) => savedClasses.some((cls) => cls.name === frame.name)
      ).length;
      emit("APPLY_ALL_ANALYSIS_RESULT", {
        totalFrames: frames.length,
        matchingFrames
      });
    } catch (error) {
      console.error("Error analyzing frames:", error);
      showNotification("Failed to analyze frames", { error: true });
    }
  }
  on("RENAME_CLASS", async ({ oldName, newName }) => {
    try {
      console.log("Attempting to rename class:", oldName, "to:", newName);
      if (!newName || newName.trim() === "") {
        throw new Error("New class name cannot be empty");
      }
      if (newName.length > 64) {
        throw new Error("New class name is too long. Maximum 64 characters allowed.");
      }
      const savedClasses = await loadSavedClasses();
      if (savedClasses.some(
        (cls) => cls.name.toLowerCase() === newName.toLowerCase() && cls.name.toLowerCase() !== oldName.toLowerCase()
      )) {
        throw new Error("A class with this name already exists");
      }
      const classIndex = savedClasses.findIndex((cls) => cls.name === oldName);
      if (classIndex === -1) {
        throw new Error("Original class not found");
      }
      const updatedClass = __spreadProps(__spreadValues({}, savedClasses[classIndex]), {
        name: newName.trim()
      });
      savedClasses[classIndex] = updatedClass;
      await saveToStorage(savedClasses);
      emit("CLASS_RENAMED", { oldName, newName: updatedClass.name });
      emit("CLASSES_LOADED", savedClasses);
      showNotification(`Class "${oldName}" renamed to "${updatedClass.name}" successfully`);
    } catch (error) {
      console.error("Error renaming class:", error);
      showNotification(error instanceof Error ? error.message : "Failed to rename class", { error: true });
    }
  });
  on("SAVE_CLASS", handleSaveClass);
  on("APPLY_CLASS", handleApplyClass);
  on("APPLY_ALL_MATCHING_CLASSES", handleApplyAllMatchingClasses);
  on("ANALYZE_APPLY_ALL", handleAnalyzeApplyAll);
  on("UPDATE_CLASS", handleUpdateClass);
  on("DELETE_CLASS", handleDeleteClass);
  on("EXPORT_CLASSES", handleExportClasses);
  on("IMPORT_CLASSES", handleImportClasses);
  on("SAVE_TO_STORAGE", saveToStorage);
  on("LOAD_CLASSES", loadSavedClasses);
  on("CHECK_SELECTION", checkSelection);
  on("SHOW_ERROR", (message) => {
    showNotification(message, { error: true });
  });
  on("SHOW_NOTIFICATION", (message) => {
    showNotification(message);
  });
  on("RESOLVE_STYLE_COLORS", async (msg) => {
    const resolvedColors = {};
    for (const [property, styleId] of Object.entries(msg.styleIds)) {
      if (typeof styleId === "string" && styleId.startsWith("S:")) {
        resolvedColors[property] = await getStyleColor(styleId);
      }
    }
    figma.ui.postMessage({
      type: "RESOLVED_STYLE_COLORS",
      resolvedColors
    });
  });
  figma.on("selectionchange", () => {
    checkSelection();
  });
  showUI(options);
  checkSelection();
}
var STORAGE_KEY, NOTIFICATION_TIMEOUT, currentNotification, lastNotificationTime;
var init_main = __esm({
  "src/main.ts"() {
    "use strict";
    init_lib();
    init_validation();
    STORAGE_KEY = "savedClasses";
    NOTIFICATION_TIMEOUT = {
      SUCCESS: 2e3,
      ERROR: 3e3,
      MINIMUM_INTERVAL: 500
      // Intervallo minimo tra le notifiche
    };
    currentNotification = null;
    lastNotificationTime = 0;
  }
});

// <stdin>
var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.ts--default" : figma.command;
modules[commandId]();
