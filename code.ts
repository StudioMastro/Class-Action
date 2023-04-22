figma.showUI(__html__);

figma.ui.resize(500, 500);

const savedClasses: { [key: string]: object } = JSON.parse(figma.root.getPluginData('savedClasses') || '{}');
const savedClassNames: string[] = JSON.parse(figma.root.getPluginData('savedClassNames') || '[]');

figma.ui.postMessage({ type: 'display-saved-classes', savedClasses, savedClassNames });

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
      if (!savedClassNames.includes(className)) {
        savedClassNames.push(className);
      }
      figma.root.setPluginData('savedClasses', JSON.stringify(savedClasses));
      figma.root.setPluginData('savedClassNames', JSON.stringify(savedClassNames));
      figma.ui.postMessage({ type: 'display-saved-classes', savedClasses, savedClassNames });
    } else {
      figma.notify('Please select a single frame to save the class.');
    }
  } else if (msg.type === 'delete-class') {
    delete savedClasses[msg.className];
    const index = savedClassNames.indexOf(msg.className);
    if (index > -1) {
      savedClassNames.splice(index, 1);
    }
    figma.root.setPluginData('savedClasses', JSON.stringify(savedClasses));
    figma.root.setPluginData('savedClassNames', JSON.stringify(savedClassNames));
    figma.ui.postMessage({ type: 'display-saved-classes', savedClasses, savedClassNames });
  } else if (msg.type === 'apply-class') {
    const nodes = figma.currentPage.selection;
    if (nodes.length === 1 && nodes[0].type === 'FRAME') {
      const frame = nodes[0] as FrameNode;
      applyDesignProperties(frame, savedClasses[msg.className]);
    } else {
      figma.notify('Please select a single frame to apply the class.');
    }
  } else if (msg.type === 'rename-class') {
    const oldClassName = msg.className;
    const newClassName = msg.newClassName;
    if (newClassName === '') {
      figma.notify('Class name cannot be empty.');
      return;
    }
    if (savedClassNames.includes(newClassName)) {
      figma.notify(`The class name "${newClassName}" already exists.`);
      return;
    }
    savedClasses[newClassName] = savedClasses[oldClassName];
    delete savedClasses[oldClassName];
    const index = savedClassNames.indexOf(oldClassName);
    if (index > -1) {
      savedClassNames[index] = newClassName;
    }
    figma.root.setPluginData('savedClasses', JSON.stringify(savedClasses));
    figma.root.setPluginData('savedClassNames', JSON.stringify(savedClassNames));
    figma.ui.postMessage({ type: 'display-saved-classes', savedClasses, savedClassNames });
  } else if (msg.type === 'empty-class-name') {
    figma.notify('Class name cannot be empty.');
  }
};
     
