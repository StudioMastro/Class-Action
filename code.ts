figma.showUI(__html__);

figma.ui.resize(500,500);

const savedClasses: { [key: string]: object } = JSON.parse(figma.root.getPluginData('savedClasses') || '{}');

figma.ui.postMessage({ type: 'display-saved-classes', savedClasses });

function extractDesignProperties(node: FrameNode) {
  return {
    fills: node.fills,
    strokes: node.strokes,
    strokeWeight: node.strokeWeight,
    strokeMiterLimit: node.strokeMiterLimit,
    strokeJoin: node.strokeJoin,
    strokeCap: node.strokeCap,
    dashPattern: node.dashPattern,
    blendMode: node.blendMode,
    effects: node.effects,
    layoutMode: node.layoutMode,
    primaryAxisSizingMode: node.primaryAxisSizingMode,
    counterAxisSizingMode: node.counterAxisSizingMode,
    primaryAxisAlignItems: node.primaryAxisAlignItems,
    counterAxisAlignItems: node.counterAxisAlignItems,
    paddingLeft: node.paddingLeft,
    paddingRight: node.paddingRight,
    paddingTop: node.paddingTop,
    paddingBottom: node.paddingBottom,
    itemSpacing: node.itemSpacing,
    horizontalPadding: node.horizontalPadding,
    verticalPadding: node.verticalPadding,
  };
}

function applyDesignProperties(node: FrameNode, properties: any) {
  node.fills = properties.fills;
  node.strokes = properties.strokes;
  node.strokeWeight = properties.strokeWeight;
  node.strokeMiterLimit = properties.strokeMiterLimit;
  node.strokeJoin = properties.strokeJoin;
  node.strokeCap = properties.strokeCap;
  node.dashPattern = properties.dashPattern;
  node.blendMode = properties.blendMode;
  node.effects = properties.effects;
  node.layoutMode = properties.layoutMode;
  node.primaryAxisSizingMode = properties.primaryAxisSizingMode;
  node.counterAxisSizingMode = properties.counterAxisSizingMode;
  node.primaryAxisAlignItems = properties.primaryAxisAlignItems;
  node.counterAxisAlignItems = properties.counterAxisAlignItems;
  node.paddingLeft = properties.paddingLeft;
  node.paddingRight = properties.paddingRight;
  node.paddingTop = properties.paddingTop;
  node.paddingBottom = properties.paddingBottom;
  node.itemSpacing = properties.itemSpacing;
  node.horizontalPadding = properties.horizontalPadding;
  node.verticalPadding = properties.verticalPadding;
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'save-class') {
    const nodes = figma.currentPage.selection;

    if (nodes.length === 1 && nodes[0].type === 'FRAME') {
      const frame = nodes[0] as FrameNode;
      const className = msg.className || frame.name;
      savedClasses[className] = extractDesignProperties(frame);
      figma.root.setPluginData('savedClasses', JSON.stringify(savedClasses));
      figma.ui.postMessage({ type: 'display-saved-classes', savedClasses });
    } else {
      figma.notify('Please select a single frame to save the class.');
    }
  } else if (msg.type === 'delete-class') {
    delete savedClasses[msg.className];
    figma.root.setPluginData('savedClasses', JSON.stringify(savedClasses));
    figma.ui.postMessage({ type: 'display-saved-classes', savedClasses });
  } else if (msg.type === 'rename-class') {
    const { oldName, newName } = msg;
    if (oldName !== newName) {
      savedClasses[newName] = savedClasses[oldName];
      delete savedClasses[oldName];
      figma.root.setPluginData('savedClasses', JSON.stringify(savedClasses));
      figma.ui.postMessage({ type: 'display-saved-classes', savedClasses });
    }
  } else if (msg.type === 'apply-class') {
    const className = msg.className;
    const nodes = figma.currentPage.selection;

    if (nodes.length === 0) {
      figma.notify('Please select one or more frames to apply the class.');
    } else {
      const classProperties = savedClasses[className];
      if (!classProperties) {
        figma.notify(`Class "${className}" not found.`);
      } else {
        nodes.forEach((node) => {
          if (node.type === 'FRAME') {
            applyDesignProperties(node as FrameNode, classProperties);
            node.name = className; // Rename the frame to the class name
          }
        });
        figma.notify(`Class "${className}" applied to ${nodes.length} frame(s).`);
      }
    }
  }
};
