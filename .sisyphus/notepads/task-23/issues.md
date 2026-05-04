
## Task 23: Issues Encountered

### Pre-existing Bug Discovered:
- **Issue**: "Dynamic href https://github.com/[handle]/clipguessr found in <Link> while using the /app router"
- **Location**: components/ui/Button.tsx:36
- **Impact**: Dev server returns HTTP 500, causing tests to skip
- **Note**: This is NOT related to CP1 foundation - it's a pre-existing bug in the codebase
