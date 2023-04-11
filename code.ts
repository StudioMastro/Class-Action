figma.showUI(__html__, { width: 400, height: 600 });

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
    // Add any other design properties you want to save here
  };
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
  }
};
