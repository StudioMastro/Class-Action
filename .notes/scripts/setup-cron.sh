#!/bin/bash

# Get absolute path to the project directory
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/../.." && pwd )"
SCRIPT_PATH="$PROJECT_DIR/.notes/scripts/update-structure.sh"

# Create a temporary cron file
TEMP_CRON=$(mktemp)
crontab -l > "$TEMP_CRON" 2>/dev/null

# Add our job - runs at 9:00 AM every day
echo "0 9 * * * cd $PROJECT_DIR && $SCRIPT_PATH >> $PROJECT_DIR/.notes/update.log 2>&1" >> "$TEMP_CRON"

# Install the new cron file
crontab "$TEMP_CRON"
rm "$TEMP_CRON"

echo "Cron job installed! The directory structure will be updated daily at 9:00 AM"
echo "Updates will be logged to .notes/update.log" 