# Private Documentation Directory

This directory contains private documentation and implementation details for the Class Action Figma Plugin.

## Contents

- `LICENSING.mdc`: Technical documentation of the licensing system implementation
  - Business model details
  - API integration specifics
  - Testing procedures
  - Security considerations

## Purpose

This directory is specifically for documentation that:

1. Contains sensitive implementation details
2. Provides technical specifications
3. Includes private business logic
4. Details internal APIs and configurations

## Usage with Cursor

These documents are automatically indexed by Cursor for context-aware assistance. When working with Cursor:

1. Reference these docs using the `@docs/` syntax:

   ```
   @docs/LICENSING.mdc
   ```

2. Use the documents for implementation guidance:
   ```
   Help me implement this feature according to @docs/LICENSING.mdc
   ```

## Documentation Standards

1. Use `.mdc` extension for all documents in this directory
2. Include appropriate frontmatter with `globs` to link docs to relevant code
3. Keep sensitive information in this directory, not in public docs
4. Use English for all documentation

For public documentation, refer to the files in the project root:

- `LICENSE.md`: Public license terms
- `README.md`: Project overview
- `CHANGELOG.md`: Version history
