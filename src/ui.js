console.log("JS Caricato correttamente!");
import './styles.css';

const classNameInput = document.getElementById("class-name");
const saveClassButton = document.getElementById("save-class");
const savedClassesContainer = document.getElementById("saved-classes");

// Gestisci l'input per abilitare/disabilitare il pulsante "Salva Classe"
classNameInput.addEventListener("input", () => {
    saveClassButton.disabled = !classNameInput.value.trim();
});

// Aggiungi una nuova classe
saveClassButton.addEventListener("click", () => {
    const className = classNameInput.value.trim();
    if (className) {
        parent.postMessage(
            { pluginMessage: { type: "save-class", className } },
            "*"
        );
        classNameInput.value = "";
        saveClassButton.disabled = true;
    }
});

// Ricevi messaggi dal thread principale
window.onmessage = (event) => {
    const { type, savedClasses, savedClassNames, validSelection } =
        event.data.pluginMessage;

    if (type === "display-saved-classes") {
        updateSavedClasses(savedClasses, savedClassNames);
        saveClassButton.disabled =
            !validSelection || !classNameInput.value.trim();
    }
};

// Aggiorna la lista delle classi salvate
function updateSavedClasses(savedClasses, savedClassNames) {
    savedClassesContainer.innerHTML = "";

    savedClassNames.forEach((className) => {
        const classItem = document.createElement("div");
        classItem.className = "class-item";

        const classNameSpan = document.createElement("span");
        classNameSpan.textContent = className;

        // Bottone Rinomina
        const renameButton = document.createElement("button");
        renameButton.textContent = "Rinomina";
        renameButton.className = "button button--secondary"; // Stile secondario
        renameButton.addEventListener("click", () => renameClass(className));

        // Bottone Elimina
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Elimina";
        deleteButton.className = "button button--primary-destructive"; // Stile per azioni critiche
        deleteButton.addEventListener("click", () => deleteClass(className));

        // Bottone Applica
        const applyButton = document.createElement("button");
        applyButton.textContent = "Applica";
        applyButton.className = "button button--primary"; // Stile primario
        applyButton.addEventListener("click", () => applyClass(className));

        const buttonsContainer = document.createElement("div");
        buttonsContainer.className = "buttons";
        buttonsContainer.append(renameButton, applyButton, deleteButton);

        classItem.append(classNameSpan, buttonsContainer);
        savedClassesContainer.appendChild(classItem);
    });
}

// Funzioni per le azioni
function deleteClass(className) {
    parent.postMessage(
        { pluginMessage: { type: "delete-class", className } },
        "*"
    );
}

function applyClass(className) {
    parent.postMessage(
        { pluginMessage: { type: "apply-class", className } },
        "*"
    );
}

function renameClass(oldClassName) {
    // Riferimenti agli elementi
    const renameModal = document.getElementById("rename-modal");
    const renameInput = document.getElementById("rename-input");
    const renameCancel = document.getElementById("rename-cancel");
    const renameConfirm = document.getElementById("rename-confirm");
    const overlay = document.getElementById("overlay");

    // Funzione per aprire la modale
    const openModal = () => {
        renameModal.style.display = "block";
        overlay.style.display = "block";
        document.body.style.overflow = "hidden"; // Disabilita lo scroll
        renameInput.value = oldClassName; // Precompila l'input con il nome attuale
        renameInput.focus(); // Focalizza l'input per consentire subito la modifica
        renameInput.select(); // Seleziona tutto il testo per facilitarne l'editing
    };

    // Funzione per chiudere la modale
    const closeModal = () => {
        renameModal.style.display = "none";
        overlay.style.display = "none";
        document.body.style.overflow = "auto"; // Riabilita lo scroll
    };

    // Mostra la modale
    openModal();

    // Gestisci il click su "Annulla"
    renameCancel.addEventListener("click", closeModal);

    // Gestisci il click sull'overlay per chiudere
    overlay.addEventListener("click", closeModal);

    // Gestisci il click su "Conferma"
    renameConfirm.addEventListener("click", () => {
        const newClassName = renameInput.value.trim();

        if (!newClassName || newClassName === oldClassName) {
            alert("Nome non valido o uguale al precedente!");
            return;
        }

        console.log(`Rinominare "${oldClassName}" in "${newClassName}"`);
        parent.postMessage(
            {
                pluginMessage: {
                    type: "rename-class",
                    oldClassName,
                    newClassName,
                },
            },
            "*"
        );

        closeModal(); // Chiudi la modale
    });
}