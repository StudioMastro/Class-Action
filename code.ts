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
  const validSelection = isValidSelection();
  console.log("Updating UI, valid selection:", validSelection); // Debug
  figma.ui.postMessage({
    type: "display-saved-classes",
    savedClasses,
    savedClassNames,
    validSelection
  });
}

// Funzione per verificare una selezione valida
function isValidSelection(): boolean {
  const nodes = figma.currentPage.selection;
  return nodes.length === 1 && nodes[0].type === "FRAME";
}

// Funzione per estrarre le proprietà di un frame
function extractDesignProperties(node: FrameNode) {
  const properties: any = {
    fills: node.fills || null,
    strokes: node.strokes || null,
    strokeWeight: node.strokeWeight || null,
    opacity: node.opacity || 1,
    blendMode: node.blendMode || "NORMAL",
    cornerRadius: node.cornerRadius || 0,
    layoutMode: node.layoutMode || "NONE",
  };

  // Se il frame ha l'autolayout, salva tutte le proprietà relative
  if (node.layoutMode !== "NONE") {
    properties.primaryAxisSizingMode = node.primaryAxisSizingMode;
    properties.counterAxisSizingMode = node.counterAxisSizingMode;
    properties.primaryAxisAlignItems = node.primaryAxisAlignItems;
    properties.counterAxisAlignItems = node.counterAxisAlignItems;
    properties.paddingTop = node.paddingTop;
    properties.paddingRight = node.paddingRight;
    properties.paddingBottom = node.paddingBottom;
    properties.paddingLeft = node.paddingLeft;
    properties.itemSpacing = node.itemSpacing;
    properties.layoutGrow = node.layoutGrow;
    properties.layoutAlign = node.layoutAlign;
  }

  console.log('Extracted properties:', properties); // Debug
  return properties;
}

// Funzione per applicare proprietà salvate a un frame
function applyDesignProperties(node: FrameNode, properties: any) {
  console.log('Applying properties:', properties); // Debug

  // Proprietà base
  if (properties.fills) node.fills = properties.fills;
  if (properties.strokes) node.strokes = properties.strokes;
  if (properties.strokeWeight) node.strokeWeight = properties.strokeWeight;
  if (properties.opacity) node.opacity = properties.opacity;
  if (properties.blendMode) node.blendMode = properties.blendMode;
  if (properties.cornerRadius) node.cornerRadius = properties.cornerRadius;
  
  // Imposta prima il layoutMode
  if (properties.layoutMode) {
    node.layoutMode = properties.layoutMode;
    
    // Se c'è l'autolayout, applica tutte le proprietà relative
    if (properties.layoutMode !== "NONE") {
      node.primaryAxisSizingMode = properties.primaryAxisSizingMode || "AUTO";
      node.counterAxisSizingMode = properties.counterAxisSizingMode || "AUTO";
      node.primaryAxisAlignItems = properties.primaryAxisAlignItems || "MIN";
      node.counterAxisAlignItems = properties.counterAxisAlignItems || "MIN";
      
      // Applica padding e gap solo se sono definiti
      if (typeof properties.paddingTop === 'number') node.paddingTop = properties.paddingTop;
      if (typeof properties.paddingRight === 'number') node.paddingRight = properties.paddingRight;
      if (typeof properties.paddingBottom === 'number') node.paddingBottom = properties.paddingBottom;
      if (typeof properties.paddingLeft === 'number') node.paddingLeft = properties.paddingLeft;
      if (typeof properties.itemSpacing === 'number') node.itemSpacing = properties.itemSpacing;
      
      if (properties.layoutGrow) node.layoutGrow = properties.layoutGrow;
      if (properties.layoutAlign) node.layoutAlign = properties.layoutAlign;
    }
  }

  // Salva il nome della classe come metadato
  node.setPluginData('className', properties.className);
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
      figma.notify("Seleziona un frame per applicare la classe.");
      return;
    }

    const frame = figma.currentPage.selection[0] as FrameNode;
    const className = msg.className;

    if (!savedClasses[className]) {
      figma.notify(`Classe "${className}" non trovata.`);
      return;
    }

    // Applica le proprietà
    const properties = {
      ...savedClasses[className],
      className: className
    };

    applyDesignProperties(frame, properties);
    
    // Sostituisci SEMPRE il nome del frame con il nome della classe
    frame.name = className;
    
    figma.notify(`Classe "${className}" applicata con successo!`);
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
  } else if (msg.type === "copy-to-clipboard") {
    // Since we can't access clipboard directly in Figma plugin,
    // we'll send a message to the UI to handle the copy operation
    figma.ui.postMessage({
      type: 'copy-to-clipboard',
      text: msg.text
    });
    figma.notify("Proprietà copiate negli appunti!");
  } else if (msg.type === "get-selection-properties") {
    if (!isValidSelection()) {
      figma.ui.postMessage({
        type: "selection-error",
        message: "Seleziona un frame per aggiornare la classe"
      });
      return;
    }
    const frame = figma.currentPage.selection[0] as FrameNode;
    const properties = extractDesignProperties(frame);
    figma.ui.postMessage({
      type: "selection-properties",
      properties
    });
  } else if (msg.type === "update-class") {
    if (!isValidSelection()) {
      figma.notify("Seleziona un frame per aggiornare la classe");
      return;
    }

    const frame = figma.currentPage.selection[0] as FrameNode;
    const properties = extractDesignProperties(frame);
    
    savedClasses[msg.className] = properties;
    figma.root.setPluginData("savedClasses", JSON.stringify(savedClasses));
    
    figma.notify(`Classe "${msg.className}" aggiornata con successo!`);
    updateUI();
  } else if (msg.type === "check-selection") {
    return isValidSelection();
  }
};

// Aggiorna l'UI alla selezione del frame
figma.on("selectionchange", () => {
  const validSelection = isValidSelection();
  console.log("Selection changed, valid:", validSelection); // Debug
  figma.ui.postMessage({
    type: "selection-changed",
    validSelection
  });
});

// Inizializza l'UI
updateUI();
