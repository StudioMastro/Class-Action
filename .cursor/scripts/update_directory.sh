#!/bin/sh

# Imposta il percorso del progetto e del file di output
PROJECT_ROOT="$(cd "$(dirname "${0}")/../.." && pwd)"
OUTPUT_FILE="${PROJECT_ROOT}/.cursor/rules/directory_structure.mdc"

# Directory da escludere
EXCLUDED_DIRS=".git node_modules .next dist .vscode coverage .Trash"

# Funzione per ottenere la descrizione di una directory
get_directory_description() {
    case "$1" in
        "src") echo "Primary source code directory containing all core application logic and components" ;;
        "public") echo "Static assets and public resources" ;;
        "components") echo "Reusable React components" ;;
        "pages") echo "Next.js page components and API routes" ;;
        "styles") echo "CSS and styling related files" ;;
        "lib") echo "Utility functions and shared libraries" ;;
        "types") echo "TypeScript type definitions" ;;
        ".cursor") echo "Cursor IDE configuration and project rules" ;;
        *) echo "" ;;
    esac
}

# Funzione per verificare se una directory deve essere esclusa
is_excluded() {
    for excluded in $EXCLUDED_DIRS; do
        [ "$1" = "$excluded" ] && return 0
    done
    return 1
}

# Funzione per generare la struttura delle directory
generate_directory_structure() {
    dir="$1"
    indent="$2"
    
    # Lista tutti i file e directory, ordinati alfabeticamente
    ls -A "$dir" | sort | while read -r item; do
        # Salta le directory escluse
        if [ -d "$dir/$item" ] && is_excluded "$item"; then
            continue
        fi
        
        # Se è una directory
        if [ -d "$dir/$item" ]; then
            # Ottieni la descrizione della directory
            description=$(get_directory_description "$item")
            if [ -n "$description" ]; then
                printf "%s- **%s/** - %s\n" "$indent" "$item" "$description"
            else
                printf "%s- **%s/**\n" "$indent" "$item"
            fi
            # Processa ricorsivamente la directory
            generate_directory_structure "$dir/$item" "    $indent"
        else
            # Mostra solo file specifici
            case "$item" in
                *.ts|*.tsx|*.js|*.jsx|*.json|*.md|*.css|*.scss)
                    printf "%s- %s\n" "$indent" "$item"
                    ;;
            esac
        fi
    done
}

# Genera il contenuto del file markdown
{
    cat << EOF
# Directory Structure

## Overview
This document provides a structured view of the project's organization, highlighting key directories and files.
Only relevant source files are shown (excluding build artifacts, dependencies, and version control files).

## Project Components

\`\`\`
EOF
    generate_directory_structure "$PROJECT_ROOT" ""
    cat << EOF
\`\`\`

## Notes
- Directories marked with ** are folders
- Some directories might be hidden for clarity
- Last updated: $(date "+%Y-%m-%d %H:%M:%S")
EOF
} > "$OUTPUT_FILE"

echo "Directory structure has been updated in $OUTPUT_FILE" 