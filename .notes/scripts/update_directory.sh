#!/bin/zsh

# Imposta il percorso del progetto e del file di output
PROJECT_ROOT="$(cd "$(dirname "${0}")/../.." && pwd)"
OUTPUT_FILE="${PROJECT_ROOT}/.notes/directory_structure.md"

# Directory da escludere
EXCLUDED_DIRS=(".git" "node_modules" ".next" "dist" ".vscode" "coverage" ".Trash")

# Descrizioni delle directory
declare -A DIR_DESCRIPTIONS
DIR_DESCRIPTIONS=(
    ["src"]="Primary source code directory containing all core application logic and components"
    ["public"]="Static assets and public resources"
    ["components"]="Reusable React components"
    ["pages"]="Next.js page components and API routes"
    ["styles"]="CSS and styling related files"
    ["lib"]="Utility functions and shared libraries"
    ["types"]="TypeScript type definitions"
    [".notes"]="Project documentation and notes"
)

# Funzione per generare la struttura delle directory
generate_directory_structure() {
    local dir=$1
    local indent=$2
    local output=""
    
    # Lista tutti i file e directory, ordinati alfabeticamente
    for item in $(ls -A "$dir" | sort); do
        # Salta le directory escluse
        if [[ -d "$dir/$item" && " ${EXCLUDED_DIRS[@]} " =~ " ${item} " ]]; then
            continue
        fi
        
        # Se è una directory
        if [[ -d "$dir/$item" ]]; then
            # Aggiungi la directory con la sua descrizione
            if [[ -n "${DIR_DESCRIPTIONS[$item]}" ]]; then
                output+="${indent}- **${item}/** - ${DIR_DESCRIPTIONS[$item]}\n"
            else
                output+="${indent}- **${item}/**\n"
            fi
            # Processa ricorsivamente la directory
            output+="$(generate_directory_structure "$dir/$item" "    $indent")"
        else
            # Mostra solo file specifici
            if [[ $item =~ \.(ts|tsx|js|jsx|json|md|css|scss)$ ]]; then
                output+="${indent}- ${item}\n"
            fi
        fi
    done
    
    echo "$output"
}

# Genera il contenuto del file markdown
cat > "$OUTPUT_FILE" << EOF
# Directory Structure

## Overview
This document provides a structured view of the project's organization, highlighting key directories and files.
Only relevant source files are shown (excluding build artifacts, dependencies, and version control files).

## Project Components

\`\`\`
$(generate_directory_structure "$PROJECT_ROOT" "")
\`\`\`

## Notes
- Directories marked with ** are folders
- Some directories might be hidden for clarity
- Last updated: $(date "+%Y-%m-%d %H:%M:%S")
EOF

echo "Directory structure has been updated in $OUTPUT_FILE" 