# DANTAM Dental Practice Management System - AI Coding Guidelines

## Project Context
Building an interactive dental clinic management system for Indian practices. Currently focused on completing the Unified Patient-Clinical View - a single-screen workflow where dentists manage patient cases without context switching.

## Critical Commands & Workflows
```bash
# ALWAYS verify working directory first:
pwd  # Must show: C:\WORK\DANTAM\__DEV\dantam-august-prototype

# Development workflow:
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Test compilation (should complete in ~4s)
```

## Architecture & Key Files
### Active Development Focus
- **Primary Component**: `/src/modules/unified-clinical/UnifiedPatientClinicalView.tsx` (~750 lines)
  - 3-column layout: Patient Info (left), Clinical Work (center), Quick Actions (right)
  - Chief Complaints ✅ Clinical Findings ✅ Investigations ⏳ Diagnosis ⏳ Treatment Plan ⏳
  
### Navigation Flow
```
Landing → "Clinical Charting" → /patients → Click patient → /clinical/[id]
```

### Data & Testing
- **Mock Data**: `/src/shared/mock-patients.json` - Always test with Priya Sharma (ID: 1)
- **Indian Context**: All prices in INR (₹), dates in DD/MM/YYYY, phone: +91 format

## Project-Specific Patterns

### Card Minimization Pattern
```tsx
// Every collapsible card follows this exact pattern:
<Card className={`transition-all duration-300 ease-in-out cursor-pointer ${
  minimizedCards.cardName ? 'hover:shadow-md' : ''
}`}>
  <CardHeader>
    <Button onClick={() => setMinimizedCards({...minimizedCards, cardName: !minimizedCards.cardName})}>
      {minimizedCards.cardName ? <ChevronRight /> : <X />}
    </Button>
  </CardHeader>
  {!minimizedCards.cardName && (
    <CardContent className="animate-in fade-in-0 slide-in-from-top-2 duration-200">
```

### Entry Form Pattern
```tsx
// All case sheet entries use this structure:
{showAddEntry.show && showAddEntry.type === type && (
  <div className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
```

### Dropdown with Suggestions
```tsx
// Common pattern for dropdowns with filtering:
const commonComplaints = ['Toothache', 'Sensitivity to hot/cold', ...];
// Input with ChevronDown icon, filter on typing, click to select
```

## Essential Context
- **Stakeholder Priority**: "They want to see the logic and interact with it" - Make everything clickable
- **Swiss Design**: Clean, minimal, functional - avoid decorative elements
- **Animations**: Always use `animate-in fade-in-0 slide-in-from-top-2 duration-200`
- **Protected Dirs**: Never modify `/MOCKS/` or `/DOCUMENTS/` - reference only

## Common Issues & Solutions
- **Import Errors**: Check if component needs import from `@/components/ui/label` or `lucide-react`
- **TypeScript Errors**: Ensure all tooth statuses match the defined types (healthy/decay/restoration/missing/treatment)
- **Build Failures**: Verify you're in the correct directory before running npm commands

## Current State & Next Steps
1. Unified view is ~60% complete with interactive Chief Complaints and Clinical Findings
2. Next: Implement Investigations with file attachments, then Diagnosis with ICD codes
3. Maintain existing patterns - don't refactor completed sections unless fixing bugs
4. Test every change with Priya Sharma's profile at `/clinical/1`

## Refactoring Methodology
When refactoring modules, follow the 5-phase approach in `CORE_DIRECTIVES.md`:
1. Analysis → MODULE_CONTEXT.md
2. Foundation → types/, lib/data/, lib/utils/
3. Hooks → hooks/use[Module].ts
4. Components → components/[module]/
5. Integration → Update page.tsx

Remember: Interactive demo > perfect code. Ship working features quickly.
