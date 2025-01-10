figma.showUI(__html__, { width: 500, height: 500 });

// Variabili per salvare le classi
const savedClasses: { [key: string]: any } = {};
const savedClassNames: string[] = [];

// Carica i dati salvati all'avvio
try {
  const savedClassesData = figma.root.getPluginData("savedClasses");
  const savedClassNamesData = figma.root.getPluginData("savedClassNames");
  
  if (savedClassesData && savedClassNamesData) {
    Object.assign(savedClasses, JSON.parse(savedClassesData));
    savedClassNames.push(...JSON.parse(savedClassNamesData));
    console.log("Dati iniziali caricati:", { savedClasses, savedClassNames }); // Debug
  }
} catch (error) {
  console.error("Errore nel caricamento dei dati iniziali:", error);
}

// Aggiorna subito l'UI con i dati caricati
updateUI();

// Aggiungi struttura per le categorie
const savedCategories: { [key: string]: string[] } = JSON.parse(
  figma.root.getPluginData("savedCategories") || "{}"
);

// Invia all'UI le classi salvate
function updateUI() {
  const validSelection = isValidSelection();
  console.log("Updating UI"); // Debug
  console.log("Saved Classes:", savedClasses); // Debug
  console.log("Saved Class Names:", savedClassNames); // Debug
  console.log("Valid Selection:", validSelection); // Debug

  try {
    figma.ui.postMessage({
      type: "display-saved-classes",
      savedClasses,
      savedClassNames,
      validSelection
    });
  } catch (error) {
    console.error("Errore nell'aggiornamento UI:", error);
  }
}

// Funzione per verificare una selezione valida
function isValidSelection(): boolean {
  const nodes = figma.currentPage.selection;
  return nodes.length === 1 && nodes[0].type === "FRAME";
}

interface DesignProperties {
  [key: string]: any;
  fills?: ReadonlyArray<Paint> | null;
  fillStyleId?: string | null;
  strokes?: ReadonlyArray<Paint> | null;
  strokeStyleId?: string | null;
  strokeWeight?: number | null;
  opacity?: number;
  blendMode?: BlendMode;
  cornerRadius?: number | null;
  layoutMode?: "NONE" | "HORIZONTAL" | "VERTICAL";
  primaryAxisSizingMode?: "FIXED" | "AUTO";
  counterAxisSizingMode?: "FIXED" | "AUTO";
  primaryAxisAlignItems?: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";
  counterAxisAlignItems?: "MIN" | "CENTER" | "MAX" | "BASELINE";
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  itemSpacing?: number;
  layoutGrow?: number;
  layoutAlign?: "MIN" | "CENTER" | "MAX" | "INHERIT" | "STRETCH";
  className?: string;
}

// Helper functions per controllare i tipi
function isMixed(value: any): value is typeof figma.mixed {
  return value === figma.mixed;
}

function isValidFills(fills: ReadonlyArray<Paint> | typeof figma.mixed | null): fills is ReadonlyArray<Paint> {
  return fills !== null && !isMixed(fills);
}

function isValidNumber(value: number | typeof figma.mixed | null): value is number {
  return typeof value === 'number' && !isMixed(value);
}

function isValidStyleId(id: string | typeof figma.mixed | null): id is string {
  return typeof id === 'string' && !isMixed(id);
}

// Funzione per estrarre le proprietà di un frame
function extractDesignProperties(node: FrameNode): DesignProperties {
  const properties: DesignProperties = {
    opacity: node.opacity || 1,
    blendMode: node.blendMode || "NORMAL",
    layoutMode: node.layoutMode || "NONE",
  };

  // Gestisci fills e strokes
  if (isValidFills(node.fills)) {
    properties.fills = [...node.fills]; // Crea una copia dell'array
  }
  if (isValidFills(node.strokes)) {
    properties.strokes = [...node.strokes]; // Crea una copia dell'array
  }

  // Gestisci le proprietà numeriche
  if (isValidNumber(node.strokeWeight)) {
    properties.strokeWeight = node.strokeWeight;
  }
  if (isValidNumber(node.cornerRadius)) {
    properties.cornerRadius = node.cornerRadius;
  }

  // Gestisci gli stili
  if (isValidStyleId(node.fillStyleId)) {
    properties.fillStyleId = node.fillStyleId;
  }
  if (isValidStyleId(node.strokeStyleId)) {
    properties.strokeStyleId = node.strokeStyleId;
  }

  // Salva i token di design se presenti
  if (node.boundVariables) {
    // Salva i token per le proprietà di spacing
    Object.entries(node.boundVariables).forEach(([key, value]) => {
      if (value && typeof value === 'object' && 'type' in value) {
        // Handle single VariableAlias
        properties[`${key}Token`] = value;
      }
      // Ignore other cases for now
    });
  }

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
function applyDesignProperties(node: FrameNode, properties: DesignProperties) {
  console.log('Applying properties:', properties); // Debug

  // Applica gli stili prima dei valori assoluti
  if (properties.fillStyleId) {
    node.fillStyleId = properties.fillStyleId;
  } else if (properties.fills) {
    node.fills = properties.fills;
  }

  if (properties.strokeStyleId) {
    node.strokeStyleId = properties.strokeStyleId;
  } else if (properties.strokes) {
    node.strokes = properties.strokes;
  }

  // Applica le altre proprietà
  Object.entries(properties).forEach(([key, value]: [string, any]) => {
    // Salta le proprietà già gestite
    if (key === 'fills' || key === 'fillStyleId' || key === 'strokes' || key === 'strokeStyleId') {
      return;
    }

    // Se è un token
    if (key.endsWith('Token')) {
      const propertyName = key.replace('Token', '') as VariableBindableNodeField;
      try {
        node.setBoundVariable(propertyName, value);
      } catch (error) {
        console.error(`Errore nell'applicazione del token per ${propertyName}:`, error);
      }
    } 
    // Se è un valore normale
    else if (key !== 'className' && value !== null) {
      try {
        (node as any)[key] = value;
      } catch (error) {
        console.error(`Errore nell'applicazione della proprietà ${key}:`, error);
      }
    }
  });

  // Salva il nome della classe come metadato
  if (properties.className) {
    node.setPluginData('className', properties.className);
  }
}

// Funzione per applicare le classi a tutti i frame
function applyClassesToAllFrames() {
  console.log("Inizio applyClassesToAllFrames"); // Debug
  
  // Ricarica le classi salvate dal plugin data
  const savedClassesData = figma.root.getPluginData("savedClasses");
  const savedClasses = JSON.parse(savedClassesData || "{}");
  console.log("Classi caricate:", savedClasses); // Debug
  
  // Ottieni tutti i frame nella pagina corrente
  const frames = figma.currentPage.findAll(node => node.type === "FRAME");
  console.log("Frame trovati:", frames.length); // Debug

  let appliedCount = 0;

  frames.forEach(frame => {
    const frameName = frame.name;
    console.log("Controllo frame:", frameName); // Debug
    // Controlla se esiste una classe con lo stesso nome del frame
    if (savedClasses[frameName]) {
      console.log("Trovata corrispondenza per:", frameName); // Debug
      // Applica le proprietà della classe al frame
      const properties = {
        ...savedClasses[frameName],
        className: frameName
      };
      applyDesignProperties(frame as FrameNode, properties);
      appliedCount++;
    }
  });

  console.log("Classi applicate:", appliedCount); // Debug
  figma.notify(`Classi applicate a ${appliedCount} frame!`);
}

// Funzione per gestire le categorie
function addClassToCategory(className: string, categoryName: string) {
  if (!savedCategories[categoryName]) {
    savedCategories[categoryName] = [];
  }
  savedCategories[categoryName].push(className);
  figma.root.setPluginData("savedCategories", JSON.stringify(savedCategories));
}

// Funzione per esportare le classi
function exportClasses() {
  console.log("Inizio exportClasses"); // Debug
  console.log("Classi da esportare:", savedClasses); // Debug
  console.log("Nomi classi da esportare:", savedClassNames); // Debug
  
  const exportData = {
    classes: savedClasses,
    classNames: savedClassNames,
    version: "1.0",
    exportDate: new Date().toISOString(),
    pluginVersion: "1.0.0"
  };
  
  console.log("Export data creato:", exportData); // Debug
  const jsonString = JSON.stringify(exportData, null, 2);
  console.log("JSON generato:", jsonString); // Debug
  return jsonString;
}

// Funzione per importare le classi
function importClasses(jsonData: string) {
  try {
    const importedData = JSON.parse(jsonData);
    
    // Validazione della struttura
    if (!importedData.classes || !importedData.classNames) {
      throw new Error("Invalid file format");
    }

    // Controlla versioni compatibili
    if (importedData.version !== "1.0") {
      figma.notify("Warning: importing from a different version");
    }

    // Gestione dei conflitti
    const conflicts = savedClassNames.filter(name => 
      importedData.classNames.includes(name)
    );

    if (conflicts.length > 0) {
      // Notifica l'utente dei conflitti
      figma.notify(`Found ${conflicts.length} conflicting classes. They will be skipped.`);
      
      // Rimuovi le classi in conflitto
      conflicts.forEach(name => {
        const idx = importedData.classNames.indexOf(name);
        importedData.classNames.splice(idx, 1);
        delete importedData.classes[name];
      });
    }

    // Merge dei dati
    Object.assign(savedClasses, importedData.classes);
    savedClassNames.push(...importedData.classNames);
    
    // Salva tutto
    figma.root.setPluginData("savedClasses", JSON.stringify(savedClasses));
    figma.root.setPluginData("savedClassNames", JSON.stringify(savedClassNames));
    
    updateUI();
    figma.notify(`Successfully imported ${importedData.classNames.length} classes!`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      figma.notify(`Error importing classes: ${error.message}`);
    } else {
      figma.notify('Error importing classes: Unknown error occurred');
    }
  }
}

// Gestione dei messaggi dall'UI
figma.ui.onmessage = async (msg: { type: string; [key: string]: any }) => {
  console.log("Ricevuto messaggio dal UI:", msg.type); // Debug
  console.log("Messaggio completo:", msg); // Debug

  // Gestisci prima l'export
  if (msg.type === "export-classes") {
    console.log("Gestione export iniziata");
    
    if (Object.keys(savedClasses).length === 0) {
      figma.notify("Non ci sono classi da esportare");
      return;
    }
    
    try {
      const exportData = {
        classes: savedClasses,
        classNames: savedClassNames,
        version: "1.0",
        exportDate: new Date().toISOString(),
        pluginVersion: "1.0.0"
      };

      const jsonString = JSON.stringify(exportData, null, 2);
      
      figma.ui.postMessage({
        type: "download-json",
        filename: `figma-classes-${new Date().toISOString().split('T')[0]}.json`,
        content: jsonString
      });
      
    } catch (error) {
      console.error("Errore durante l'export:", error);
      figma.notify("Errore durante l'esportazione delle classi");
    }
    return;
  } else if (msg.type === "export-complete") {
    figma.notify("Export completato con successo!");
  } else if (msg.type === "export-error") {
    figma.notify(`Errore durante l'export: ${msg.error}`);
  }

  // Gestisci gli altri messaggi
  else if (msg.type === "save-class") {
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

    // Salva la nuova classe
    savedClasses[className] = extractDesignProperties(frame);
    savedClassNames.push(className);

    // Salva i dati nel plugin data
    try {
      figma.root.setPluginData("savedClasses", JSON.stringify(savedClasses));
      figma.root.setPluginData("savedClassNames", JSON.stringify(savedClassNames));
      console.log("Classi salvate:", savedClasses); // Debug
      console.log("Nomi classi salvati:", savedClassNames); // Debug
      
      figma.notify(`Class "${className}" saved successfully!`);
      updateUI(); // Aggiorna l'UI dopo il salvataggio
    } catch (error) {
      console.error("Errore nel salvataggio:", error);
      figma.notify("Errore nel salvataggio della classe");
    }
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
  } else if (msg.type === "apply-classes-to-all") {
    applyClassesToAllFrames();
  } else if (msg.type === "import-classes") {
    importClasses(msg.jsonData);
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

interface ClassVersion {
  properties: any;
  timestamp: number;
  author?: string;
}

const classVersions: { [className: string]: ClassVersion[] } = JSON.parse(
  figma.root.getPluginData("classVersions") || "{}"
);

function saveClassVersion(className: string, properties: any) {
  if (!classVersions[className]) {
    classVersions[className] = [];
  }
  classVersions[className].push({
    properties,
    timestamp: Date.now(),
    author: figma.currentUser?.name
  });
  figma.root.setPluginData("classVersions", JSON.stringify(classVersions));
}

function searchClasses(query: string, filters: { 
  hasAutoLayout?: boolean,
  hasCornerRadius?: boolean,
  category?: string 
}) {
  return savedClassNames.filter(className => {
    const properties = savedClasses[className];
    
    // Ricerca per nome
    if (!className.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    
    // Applica filtri
    if (filters.hasAutoLayout && properties.layoutMode === "NONE") {
      return false;
    }
    if (filters.hasCornerRadius && !properties.cornerRadius) {
      return false;
    }
    if (filters.category && !savedCategories[filters.category].includes(className)) {
      return false;
    }
    
    return true;
  });
}

interface StyleTemplate {
  name: string;
  properties: any;
  description?: string;
}

const styleTemplates: StyleTemplate[] = [
  {
    name: "Card Base",
    description: "Template base per card con ombra e bordi arrotondati",
    properties: {
      cornerRadius: 8,
      layoutMode: "VERTICAL",
      padding: 16,
      effects: [/* shadow effect */]
    }
  },
  // Altri template...
];

function applyTemplate(templateName: string, frame: FrameNode) {
  const template = styleTemplates.find(t => t.name === templateName);
  if (template) {
    applyDesignProperties(frame, template.properties);
  }
}

interface ClassDefinition {
  properties: any;
  extends?: string[];  // Classi da cui eredita
  overrides?: string[];  // Proprietà che sovrascrivono le classi parent
}

function applyClassWithInheritance(frame: FrameNode, className: string) {
  const classdef = savedClasses[className] as ClassDefinition;
  
  // Applica prima le proprietà delle classi parent
  if (classdef.extends) {
    for (const parentClass of classdef.extends) {
      applyClassWithInheritance(frame, parentClass);
    }
  }
  
  // Poi applica le proprietà specifiche di questa classe
  applyDesignProperties(frame, classdef.properties);
}

interface ClassUsageStats {
  appliedCount: number;
  lastUsed: number;
  usedBy: string[];  // User IDs
  usedInPages: string[];  // Page names
}

const classStats: { [className: string]: ClassUsageStats } = JSON.parse(
  figma.root.getPluginData("classStats") || "{}"
);

function updateClassStats(className: string) {
  if (!classStats[className]) {
    classStats[className] = {
      appliedCount: 0,
      lastUsed: 0,
      usedBy: [],
      usedInPages: []
    };
  }
  
  const stats = classStats[className];
  stats.appliedCount++;
  stats.lastUsed = Date.now();
  stats.usedBy = [...new Set([...stats.usedBy, figma.currentUser?.id].filter((id): id is string => id !== null && id !== undefined))];
  stats.usedInPages = [...new Set([...stats.usedInPages, figma.currentPage.name])];
  
  figma.root.setPluginData("classStats", JSON.stringify(classStats));
}
