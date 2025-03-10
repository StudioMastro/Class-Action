# Class Action Analytics Dashboard

Questa dashboard ti permette di visualizzare e analizzare i dati di utilizzo raccolti dal plugin Class Action.

## Configurazione

### Prerequisiti

- Un account Firebase con Firestore configurato
- Un progetto Firebase con autenticazione abilitata
- Un utente amministratore creato nel progetto Firebase

### Configurazione Firebase

1. Accedi alla [console Firebase](https://console.firebase.google.com/)
2. Seleziona il tuo progetto "class-action-analytics"
3. Vai su "Authentication" e assicurati che l'autenticazione via email/password sia abilitata
4. Crea un utente amministratore con email e password
5. Vai su "Firestore Database" e assicurati che sia stato creato e configurato correttamente

### Configurazione della dashboard

1. Apri il file `dashboard.html` in un editor di testo
2. Trova la sezione "Firebase configuration" e aggiorna i valori con quelli del tuo progetto Firebase:
   ```javascript
   const firebaseConfig = {
     apiKey: 'IL_TUO_API_KEY',
     authDomain: 'IL_TUO_AUTH_DOMAIN',
     projectId: 'IL_TUO_PROJECT_ID',
     storageBucket: 'IL_TUO_STORAGE_BUCKET',
     messagingSenderId: 'IL_TUO_MESSAGING_SENDER_ID',
     appId: 'IL_TUO_APP_ID',
   };
   ```
3. Salva il file

## Utilizzo

### Accesso alla dashboard

1. Apri il file `dashboard.html` in un browser web
2. Inserisci l'email e la password dell'utente amministratore
3. Clicca su "Login"

### Funzionalità principali

#### Filtri per data

- Utilizza i campi "Start Date" e "End Date" per selezionare un intervallo di date
- Clicca su "Apply" per applicare il filtro
- Clicca su "Reset" per tornare all'intervallo predefinito (ultimi 30 giorni)

#### Schede di riepilogo

- **Total Events**: Numero totale di eventi nel periodo selezionato
- **Unique Users**: Numero di sessioni uniche nel periodo selezionato
- **Classes Created**: Numero di classi create nel periodo selezionato
- **Classes Applied**: Numero di classi applicate nel periodo selezionato

#### Grafici

- **Events Over Time**: Mostra il numero di eventi per giorno nel periodo selezionato
- **Event Types**: Mostra la distribuzione degli eventi per tipo

#### Tabella degli eventi

- Visualizza tutti gli eventi nel periodo selezionato
- Clicca su "View Details" per vedere i dettagli completi di un evento
- Utilizza i pulsanti "Previous" e "Next" per navigare tra le pagine

#### Esportazione dei dati

- Clicca su "Export Data" per esportare tutti i dati filtrati in formato CSV

## Sicurezza

- La dashboard è protetta da autenticazione
- Solo gli utenti con credenziali valide possono accedere ai dati
- I dati sono memorizzati in modo sicuro in Firebase Firestore
- Non vengono raccolti dati personali degli utenti

## Risoluzione dei problemi

### Non riesco ad accedere alla dashboard

- Verifica che le credenziali di accesso siano corrette
- Assicurati che l'utente sia stato creato in Firebase Authentication
- Controlla che la configurazione Firebase sia corretta

### Non vedo dati nella dashboard

- Verifica che il plugin stia inviando dati al backend
- Controlla che l'endpoint di analytics sia configurato correttamente
- Assicurati che il periodo selezionato contenga dati

### I grafici non si aggiornano

- Prova a ricaricare la pagina
- Verifica che ci siano dati nel periodo selezionato
- Controlla la console del browser per eventuali errori

## Supporto

Per assistenza o segnalazione di problemi, contatta il team di sviluppo di Class Action.
