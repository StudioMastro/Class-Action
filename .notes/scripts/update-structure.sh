#!/bin/bash

# Check if PowerShell is installed
if ! command -v pwsh &> /dev/null; then
    echo "PowerShell is not installed. Would you like to install it? (y/n)"
    read -r answer
    if [ "$answer" = "y" ]; then
        # Install PowerShell using Homebrew
        brew install powershell
    else
        echo "PowerShell is required to run this script. Please install it and try again."
        exit 1
    fi
fi

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Run the PowerShell script
pwsh "$SCRIPT_DIR/update_directory.ps1"

echo "Directory structure has been updated!" 