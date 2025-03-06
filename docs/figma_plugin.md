# Figma Plugin Development Standards

> Note: For common development standards and build process information, please refer to @rules/cursor_rules.mdc and @rules/build_process.mdc.

## Plugin Architecture

- Separate UI and plugin logic
- Use TypeScript for type safety
- Follow event-driven communication
- Implement proper error handling
- Use @create-figma-plugin/build utilities

## Figma API Usage

- Batch API operations for performance
- Handle API rate limits gracefully
- Implement proper error recovery
- Cache API results when possible
- Use proper type annotations

## Data Management

- Validate all user inputs
- Handle large data sets efficiently
- Implement proper data persistence
- Use proper serialization
- Handle data migration gracefully

## Error Handling (Specific to Figma)

- Use Figma's notification system for error notifications
- Handle plugin-specific errors gracefully
- Provide user-friendly error messages
- Implement proper error recovery

## Performance (Specific to Figma)

- Minimize plugin startup time
- Handle large files efficiently
- Optimize UI updates
- Implement proper caching
- Use efficient data structures

## Security

- Validate all inputs
- Sanitize data before storage
- Handle sensitive data properly
- Follow Figma's security guidelines
- Implement proper access controls

## Plugin Communication

- Use typed messages between UI and plugin
- Handle message failures gracefully
- Implement proper timeouts
- Validate message data
- Use proper event handling

## Current Limitations and Constraints

### Style Properties Support

The plugin has varying levels of support for different Figma style properties:

| Property Type | Support Level | Implementation Details                                                      |
| ------------- | ------------- | --------------------------------------------------------------------------- |
| Solid Colors  | Full          | Stored as RGBA strings, converted back to SolidPaint objects                |
| Gradients     | Partial       | Stored as CSS gradient strings, limited reconversion capabilities           |
| Images        | Not Supported | Only references to image hashes are stored, actual images are not preserved |
| Videos        | Not Supported | Only references to video hashes are stored, actual videos are not preserved |
| Effects       | Full          | Complete support for shadows and blur effects                               |
| Layout Grids  | Full          | Grid styles are fully supported                                             |

### Technical Limitations

#### Image and Video Fills

The plugin cannot currently save and reapply image or video fills due to:

1. Figma API limitations - no direct way to transfer images between documents
2. Storage constraints - images would significantly increase storage requirements
3. Hash references - image hashes are document-specific and not transferable

#### Position Handling

The plugin intentionally does not save or apply absolute position (X, Y coordinates) to:

1. Prevent unwanted overlapping when applying classes to multiple frames
2. Preserve positioning of frames within auto-layout containers
3. Maintain the intended layout structure of the document

## Documentation

- Document API usage patterns
- Include code examples
- Document known limitations
- Specify version compatibility
- Include troubleshooting guides

## References

- @docs/README.mdc - Project documentation overview
- @rules/build_process.mdc - Build process guidelines
- @rules/react_components.mdc - UI component guidelines
