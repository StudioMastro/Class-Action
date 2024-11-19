/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://class-action/./src/styles.css?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\nconsole.log(\"JS Caricato correttamente!\");\n\n\nconst classNameInput = document.getElementById(\"class-name\");\nconst saveClassButton = document.getElementById(\"save-class\");\nconst savedClassesContainer = document.getElementById(\"saved-classes\");\n\n// Gestisci l'input per abilitare/disabilitare il pulsante \"Salva Classe\"\nclassNameInput.addEventListener(\"input\", () => {\n    saveClassButton.disabled = !classNameInput.value.trim();\n});\n\n// Aggiungi una nuova classe\nsaveClassButton.addEventListener(\"click\", () => {\n    const className = classNameInput.value.trim();\n    if (className) {\n        parent.postMessage(\n            { pluginMessage: { type: \"save-class\", className } },\n            \"*\"\n        );\n        classNameInput.value = \"\";\n        saveClassButton.disabled = true;\n    }\n});\n\n// Ricevi messaggi dal thread principale\nwindow.onmessage = (event) => {\n    const { type, savedClasses, savedClassNames, validSelection } =\n        event.data.pluginMessage;\n\n    if (type === \"display-saved-classes\") {\n        updateSavedClasses(savedClasses, savedClassNames);\n        saveClassButton.disabled =\n            !validSelection || !classNameInput.value.trim();\n    }\n};\n\n// Aggiorna la lista delle classi salvate\nfunction updateSavedClasses(savedClasses, savedClassNames) {\n    savedClassesContainer.innerHTML = \"\";\n\n    savedClassNames.forEach((className) => {\n        const classItem = document.createElement(\"div\");\n        classItem.className = \"class-item\";\n\n        const classNameSpan = document.createElement(\"span\");\n        classNameSpan.textContent = className;\n\n        // Bottone Rinomina\n        const renameButton = document.createElement(\"button\");\n        renameButton.textContent = \"Rinomina\";\n        renameButton.className = \"button button--secondary\"; // Stile secondario\n        renameButton.addEventListener(\"click\", () => renameClass(className));\n\n        // Bottone Elimina\n        const deleteButton = document.createElement(\"button\");\n        deleteButton.textContent = \"Elimina\";\n        deleteButton.className = \"button button--primary-destructive\"; // Stile per azioni critiche\n        deleteButton.addEventListener(\"click\", () => deleteClass(className));\n\n        // Bottone Applica\n        const applyButton = document.createElement(\"button\");\n        applyButton.textContent = \"Applica\";\n        applyButton.className = \"button button--primary\"; // Stile primario\n        applyButton.addEventListener(\"click\", () => applyClass(className));\n\n        const buttonsContainer = document.createElement(\"div\");\n        buttonsContainer.className = \"buttons\";\n        buttonsContainer.append(renameButton, applyButton, deleteButton);\n\n        classItem.append(classNameSpan, buttonsContainer);\n        savedClassesContainer.appendChild(classItem);\n    });\n}\n\n// Funzioni per le azioni\nfunction deleteClass(className) {\n    parent.postMessage(\n        { pluginMessage: { type: \"delete-class\", className } },\n        \"*\"\n    );\n}\n\nfunction applyClass(className) {\n    parent.postMessage(\n        { pluginMessage: { type: \"apply-class\", className } },\n        \"*\"\n    );\n}\n\nfunction renameClass(oldClassName) {\n    // Riferimenti agli elementi\n    const renameModal = document.getElementById(\"rename-modal\");\n    const renameInput = document.getElementById(\"rename-input\");\n    const renameCancel = document.getElementById(\"rename-cancel\");\n    const renameConfirm = document.getElementById(\"rename-confirm\");\n    const overlay = document.getElementById(\"overlay\");\n\n    // Funzione per aprire la modale\n    const openModal = () => {\n        renameModal.style.display = \"block\";\n        overlay.style.display = \"block\";\n        document.body.style.overflow = \"hidden\"; // Disabilita lo scroll\n        renameInput.value = oldClassName; // Precompila l'input con il nome attuale\n        renameInput.focus(); // Focalizza l'input per consentire subito la modifica\n        renameInput.select(); // Seleziona tutto il testo per facilitarne l'editing\n    };\n\n    // Funzione per chiudere la modale\n    const closeModal = () => {\n        renameModal.style.display = \"none\";\n        overlay.style.display = \"none\";\n        document.body.style.overflow = \"auto\"; // Riabilita lo scroll\n    };\n\n    // Mostra la modale\n    openModal();\n\n    // Gestisci il click su \"Annulla\"\n    renameCancel.addEventListener(\"click\", closeModal);\n\n    // Gestisci il click sull'overlay per chiudere\n    overlay.addEventListener(\"click\", closeModal);\n\n    // Gestisci il click su \"Conferma\"\n    renameConfirm.addEventListener(\"click\", () => {\n        const newClassName = renameInput.value.trim();\n\n        if (!newClassName || newClassName === oldClassName) {\n            alert(\"Nome non valido o uguale al precedente!\");\n            return;\n        }\n\n        console.log(`Rinominare \"${oldClassName}\" in \"${newClassName}\"`);\n        parent.postMessage(\n            {\n                pluginMessage: {\n                    type: \"rename-class\",\n                    oldClassName,\n                    newClassName,\n                },\n            },\n            \"*\"\n        );\n\n        closeModal(); // Chiudi la modale\n    });\n}\n\n//# sourceURL=webpack://class-action/./src/ui.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ui.js");
/******/ 	
/******/ })()
;