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

function isValidSelection(): boolean {
  const nodes = figma.currentPage.selection;
  return nodes.length === 1 && nodes[0].type === 'FRAME';
}

figma.on('selectionchange', () => {
  figma.ui.postMessage({
    type: 'display-saved-classes',
    savedClasses,
    savedClassNames,
    validSelection: isValidSelection(),
  });
});

figma.ui.postMessage({
  type: 'display-saved-classes',
  savedClasses,
  savedClassNames,
  validSelection: isValidSelection(),
});

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
      figma.root.setPluginData('saved
      function handleSaveClass() {
        const className = inputEl.value.trim();
        if (!className) {
          figma.ui.postMessage({ type: 'empty-class-name' });
          return;
        }
        const msg = { type: 'save-class', className };
        figma.ui.postMessage(msg);
        inputEl.value = '';
        successMessageEl.style.opacity = '1';
        setTimeout(() => {
          successMessageEl.style.opacity = '0';
        }, 1500);
      }
      function handleDeleteClass(className) {
        const msg = { type: 'delete-class', className };
        figma.ui.postMessage(msg);
      }
      
      function handleApplyClass(className) {
        const msg = { type: 'apply-class', className };
        figma.ui.postMessage(msg);
      }
      
      function handleRenameClass(oldClassName, newClassName) {
        const msg = { type: 'rename-class', className: oldClassName, newClassName };
        figma.ui.postMessage(msg);
      }
      
      function handleInputKeypress(e) {
        if (e.keyCode === 13) {
          handleSaveClass();
        }
      }
      
      function init() {
        formEl.addEventListener('submit', (e) => e.preventDefault());
        saveClassBtnEl.addEventListener('click', handleSaveClass);
        inputEl.addEventListener('keypress', handleInputKeypress);
      
        savedClassesEl.addEventListener('click', (e) => {
          const target = e.target;
          if (target.tagName === 'BUTTON') {
            const action = target.dataset.action;
            const className = target.dataset.className;
            if (action === 'delete') {
              handleDeleteClass(className);
            } else if (action === 'apply') {
              handleApplyClass(className);
            }
          }
        });
      
        savedClassesEl.addEventListener('dblclick', (e) => {
          const target = e.target;
          if (target.tagName === 'SPAN') {
            const className = target.dataset.className;
            const newClassName = prompt('Enter a new name for the class', className);
            if (newClassName && newClassName !== className) {
              handleRenameClass(className, newClassName);
            }
          }
        });
      }
      
      init();
      