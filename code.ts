figma.showUI(__html__, { width: 500, height: 500 });

// Variabili per salvare le classi
const savedClasses: { [key: string]: any } = JSON.parse(
  figma.root.getPluginData("savedClasses") || "{}"
);
const savedClassNames: string[] = JSON.parse(
  figma.root.getPluginData("savedClassNames") || "[]"
);

// Invia all'UI le classi salvate
function updateUI() {
  figma.ui.postMessage({
    type: "display-saved-classes",
    savedClasses,
    savedClassNames,
    validSelection: isValidSelection(),
  });
}

// Funzione per verificare una selezione valida
function isValidSelection(): boolean {
  const nodes = figma.currentPage.selection;
  return nodes.length === 1 && nodes[0].type === "FRAME";
}

// Funzione per estrarre le proprietà di un frame
function extractDesignProperties(node: FrameNode) {
  return {
    fills: node.fills || null,
    strokes: node.strokes || null,
    strokeWeight: node.strokeWeight || null,
    opacity: node.opacity || 1,
    blendMode: node.blendMode || "NORMAL",
    cornerRadius: node.cornerRadius || 0,
    layoutMode: node.layoutMode || "NONE",
    primaryAxisSizingMode: node.primaryAxisSizingMode || "AUTO",
    counterAxisSizingMode: node.counterAxisSizingMode || "AUTO",
    primaryAxisAlignItems: node.primaryAxisAlignItems || "MIN",
    counterAxisAlignItems: node.counterAxisAlignItems || "MIN",
  };
}

// Funzione per applicare proprietà salvate a un frame
function applyDesignProperties(node: FrameNode, properties: any) {
  if (properties.fills) node.fills = properties.fills;
  if (properties.strokes) node.strokes = properties.strokes;
  if (properties.strokeWeight) node.strokeWeight = properties.strokeWeight;
  if (properties.opacity) node.opacity = properties.opacity;
  if (properties.blendMode) node.blendMode = properties.blendMode;
  if (properties.cornerRadius) node.cornerRadius = properties.cornerRadius;
  if (properties.layoutMode) node.layoutMode = properties.layoutMode;
  if (properties.primaryAxisSizingMode)
    node.primaryAxisSizingMode = properties.primaryAxisSizingMode;
  if (properties.counterAxisSizingMode)
    node.counterAxisSizingMode = properties.counterAxisSizingMode;
  if (properties.primaryAxisAlignItems)
    node.primaryAxisAlignItems = properties.primaryAxisAlignItems;
  if (properties.counterAxisAlignItems)
    node.counterAxisAlignItems = properties.counterAxisAlignItems;
}

// Gestione dei messaggi dall'UI
figma.ui.onmessage = async (msg: { type: string; [key: string]: any }) => {
  if (msg.type === "save-class") {
    if (!isValidSelection()) {
      figma.notify("Please select a single frame to save a class.");
      return;
    }

    const frame = figma.currentPage.selection[0] as FrameNode;
    const className = msg.className.trim();

    if (!className) {
      figma.notify("Class name cannot be empty.");
      return;
    }

    if (savedClassNames.includes(className)) {
      figma.notify("Class name already exists. Choose another name.");
      return;
    }

    savedClasses[className] = extractDesignProperties(frame);
    savedClassNames.push(className);
    figma.root.setPluginData("savedClasses", JSON.stringify(savedClasses));
    figma.root.setPluginData(
      "savedClassNames",
      JSON.stringify(savedClassNames)
    );
    figma.notify(`Class "${className}" saved successfully!`);
    updateUI();
  } else if (msg.type === "delete-class") {
    const className = msg.className;

    if (!savedClassNames.includes(className)) {
      figma.notify(`Class "${className}" not found.`);
      return;
    }

    delete savedClasses[className];
    savedClassNames.splice(savedClassNames.indexOf(className), 1);
    figma.root.setPluginData("savedClasses", JSON.stringify(savedClasses));
    figma.root.setPluginData(
      "savedClassNames",
      JSON.stringify(savedClassNames)
    );
    figma.notify(`Class "${className}" deleted.`);
    updateUI();
  } else if (msg.type === "apply-class") {
    if (!isValidSelection()) {
      figma.notify("Please select a single frame to apply a class.");
      return;
    }

    const frame = figma.currentPage.selection[0] as FrameNode;
    const className = msg.className;

    if (!savedClasses[className]) {
      figma.notify(`Class "${className}" not found.`);
      return;
    }

    applyDesignProperties(frame, savedClasses[className]);
    figma.notify(`Class "${className}" applied successfully!`);
  } else if (msg.type === "rename-class") {
    const { oldClassName, newClassName } = msg;

    if (!savedClassNames.includes(oldClassName)) {
      figma.notify(`Class "${oldClassName}" not found.`);
      return;
    }

    if (savedClassNames.includes(newClassName)) {
      figma.notify(`Class "${newClassName}" already exists.`);
      return;
    }

    savedClasses[newClassName] = savedClasses[oldClassName];
    delete savedClasses[oldClassName];
    savedClassNames[savedClassNames.indexOf(oldClassName)] = newClassName;

    figma.root.setPluginData("savedClasses", JSON.stringify(savedClasses));
    figma.root.setPluginData(
      "savedClassNames",
      JSON.stringify(savedClassNames)
    );
    figma.notify(`Class "${oldClassName}" renamed to "${newClassName}".`);
    updateUI();
  }
};

// Aggiorna l'UI alla selezione del frame
figma.on("selectionchange", updateUI);

// Inizializza l'UI
updateUI();
