# Script to update directory structure documentation
$projectRoot = "../.."  # Navigate up two levels to reach project root
$outputFile = "../directory_structure.md"

# Directories to exclude
$excludedDirs = @(
    ".git",
    "node_modules",
    ".next",
    "dist",
    ".vscode",
    "coverage"
)

# Directory descriptions
$dirDescriptions = @{
    "src" = "Primary source code directory containing all core application logic and components"
    "public" = "Static assets and public resources"
    "components" = "Reusable React components"
    "pages" = "Next.js page components and API routes"
    "styles" = "CSS and styling related files"
    "lib" = "Utility functions and shared libraries"
    "types" = "TypeScript type definitions"
    ".notes" = "Project documentation and notes"
}

# Generate directory listing
function Get-FormattedDirectory {
    param (
        [string]$path,
        [int]$indent = 0
    )

    $indentString = "    " * $indent
    $content = ""

    foreach ($item in Get-ChildItem -Path $path -Force) {
        # Skip excluded directories
        if ($item.PSIsContainer -and $excludedDirs -contains $item.Name) {
            continue
        }

        if ($item.PSIsContainer) {
            # Add directory with description if available
            $dirName = $item.Name
            $description = $dirDescriptions[$dirName]
            if ($description) {
                $content += "$indentString- **$dirName/** - $description`n"
            } else {
                $content += "$indentString- **$dirName/**`n"
            }
            # Recursively process subdirectories
            $content += Get-FormattedDirectory -path $item.FullName -indent ($indent + 1)
        } else {
            # Only show specific file types
            $allowedExtensions = @(".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".css", ".scss")
            if ($allowedExtensions -contains $item.Extension) {
                $content += "$indentString- $($item.Name)`n"
            }
        }
    }
    return $content
}

# Generate content for markdown file
$markdownContent = @"
# Directory Structure

## Overview
This document provides a structured view of the project's organization, highlighting key directories and files.
Only relevant source files are shown (excluding build artifacts, dependencies, and version control files).

## Project Components

``````
$(Get-FormattedDirectory -path $projectRoot)
``````

## Notes
- Directories marked with ** are folders
- Some directories might be hidden for clarity
- Last updated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
"@

# Output to file
$markdownContent | Out-File -FilePath $outputFile -Encoding UTF8

Write-Host "Directory structure updated in $($outputFile)" 