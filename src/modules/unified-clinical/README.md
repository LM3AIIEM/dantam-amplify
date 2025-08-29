# 🏥 Unified Patient-Clinical Module

## Overview
The Unified Patient-Clinical View implements the stakeholder's vision of a single-screen workflow where doctors can access all patient information and perform clinical work without switching screens or tabs.

## Key Features

### 3-Column Layout
1. **Left Panel** - Patient Information (Always Visible)
   - Basic demographics
   - Medical alerts (highlighted in red)
   - Contact information
   - Insurance details
   - Medical history
   - Current medications
   - Balance information
   - **NEW: Integrated patient search**
   - **NEW: Minimize/expand functionality for all cards**

2. **Center Panel** - Clinical Work Area
   - Case sheet with chronological entries
   - Interactive tooth diagram
   - Chief complaints
   - Clinical findings
   - Investigations with attachments
   - Diagnosis
   - Treatment planning
   - Procedure tracking
   - Case notes

3. **Right Panel** - Quick Actions
   - Prescribe medication
   - Schedule appointment
   - Generate bill
   - Send message
   - View history
   - Case progress indicator
   - Recent activity

## Navigation
- Access via `/clinical/[patientId]`
- Navigate from patient list by clicking any patient card
- Previous/Next patient navigation buttons
- Back to patients list button
- **NEW: Patient search within the Patient Information card**
- **NEW: Quick switch between patients without leaving the clinical view**

## Card Interactions
### Enhanced Minimize/Expand Feature (Phase 1)
- **Multiple Triggers**: Click title area OR close icon to minimize any card
- **Smooth Animations**: Scale effects with hover feedback and transitions
- **Expand Options**: Click anywhere on minimized card to expand
- **Visual Feedback**: Hover states with opacity changes and scale transforms
- Minimized patient card shows: Name, Age, Gender (F/M/O), ID#
- Other minimized cards show relevant summary information

### Focus Mode (Phase 2 - NEW)
- **Toggle Button**: Located in top navigation with Focus icon
- **Distraction-Free Workflow**: Hides non-essential cards during clinical work
- **Smart State Preservation**: Remembers card states when entering/exiting focus mode
- **Essential Cards Only**: Shows Quick Actions and Case Progress for active workflow
- **Visual Indicators**: Blue banner when active, subtle background color change
- **One-Click Exit**: Quick exit button in focus indicator or toggle in navigation

### Patient Search
- Located within the Patient Information card (when expanded)
- Real-time search as you type
- Shows up to 5 matching patients
- Click on any result to navigate directly to that patient
- Search by name, phone number, or patient ID

## Data Flow
```
Patient List → Click Patient → /clinical/[id] → Unified View
                                                     ↓
                                              All patient data
                                              + Clinical work
                                              + Quick actions
```

## Case Sheet Structure
Following the stakeholder requirements, the case sheet maintains:
- **Chronological Order** - All entries in time sequence
- **Universal Notes** - Any entry can have notes/attachments
- **Tooth-Centric** - Most actions linked to specific teeth
- **Bird's Eye View** - See everything without excessive scrolling

## Integration Points
- Uses shared patient data from `/shared/mock-patients.json`
- Reuses UI components from `/components/ui`
- Follows Indian localization (INR, phone formats)
- Compatible with existing patient management module

## Usage Example
```tsx
import { UnifiedPatientClinicalView } from '@/modules/unified-clinical';

// In your page component
<UnifiedPatientClinicalView patientId={1} />
```

## Recent Enhancements ✅

### Phase 1: Enhanced Card Interactions (Completed)
- ✅ Multiple minimize triggers (title + close icon clicks)
- ✅ Smooth scale animations and hover effects
- ✅ Performance optimized with useCallback hooks
- ✅ Consistent interaction pattern across all 8 cards

### Phase 2: Focus Mode (Completed) 
- ✅ Toggle-based distraction-free workflow
- ✅ Smart state preservation and restoration
- ✅ Essential cards filter (Quick Actions + Case Progress)
- ✅ Visual focus indicators and smooth transitions

### Phase 3: Smart Dental Chart Positioning (Completed) ✅
- ✅ Universal smart positioning for both mobile AND desktop
- ✅ Chart automatically jumps to active forms when hitting "Add"
- ✅ Desktop-optimized floating chart (w-96, indigo styling, top-20 right-8)
- ✅ Mobile-optimized compact chart (w-80, blue styling, top-4 right-4)
- ✅ Responsive floating action button (🦷) for quick chart access
- ✅ Scroll-aware positioning with viewport-specific offsets
- ✅ Visual connection indicators and smart instruction text
- ✅ Touch-optimized interactions with proper sizing

## Future Enhancements

### Integration & Workflow (Planned)
- [ ] Real-time case entry addition
- [ ] File upload for investigations
- [ ] Print functionality for case sheets
- [ ] Treatment consent management
- [ ] Integration with prescription module
- [ ] Integration with billing module
- [ ] SMS/WhatsApp quick actions

### Advanced Features (Future)
- [ ] Voice-to-text for clinical notes
- [ ] AI-assisted diagnosis suggestions
- [ ] Treatment plan templates
- [ ] Patient portal integration
