#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Run the command using zsh
/bin/zsh -c "pwsh \"$SCRIPT_DIR/update_directory.ps1\""

echo "Directory structure has been updated!" 