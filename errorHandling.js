// errorHandling.ts
export function logError(error, context = {}) {
    const errorLog = {
        message: error instanceof Error ? error.message : String(error),
        context
    };
    if (error instanceof Error && error.stack) {
        errorLog.stack = error.stack;
    }
    console.error('Error occurred:', JSON.stringify(errorLog, null, 2));
    // In futuro, qui potresti aggiungere la logica per inviare l'errore a un servizio di logging esterno
    // Per ora, lo stampiamo solo in console
}
