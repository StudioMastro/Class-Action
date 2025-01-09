#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Run the shell script
"$SCRIPT_DIR/update_directory.sh"

echo "Directory structure has been updated!" 