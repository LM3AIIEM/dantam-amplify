# 📋 Case Sheet Design Specification

## 🎯 Core Principles
1. **Chronological Order** - Everything displayed in order of entry
2. **Universal Notes** - Every section and line item can have remarks/attachments
3. **Birds-Eye View** - See everything without scrolling for diagnosis
4. **Tooth-Centric** - Most actions revolve around specific teeth

## 📐 Visual Layout

```
┌─────────────────────────────────────────────────────────────┐
│                    PATIENT: Priya Sharma                      │
│                    Case #2024-001 | Started: 10 Aug 2025     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [1] CHIEF COMPLAINTS            ┌──────────────────────┐   │
│  ├─ Tooth #14: Pain (8/10) 🔴   │                      │   │
│  ├─ Tooth #15: Sensitivity 🟡    │    TOOTH DIAGRAM     │   │
│  └─ General: Bleeding gums       │   (Visual Summary)   │   │
│                                  │                      │   │
│  [2] CLINICAL FINDINGS           └──────────────────────┘   │
│  ├─ Tooth #14: Deep cavity                                  │
│  ├─ Tooth #15: Enamel erosion                              │
│  └─ Tooth #24: Old filling worn                            │
│                                                             │
│  [3] INVESTIGATIONS                                         │
│  ├─ IOPA #14: [📎 View] Deep caries visible               │
│  ├─ OPG: [📎 View] Full mouth X-ray                       │
│  └─ Blood: [📎 View] Sugar levels elevated                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [4] DIAGNOSIS (Based on above)                             │
│  ├─ Tooth #14: Pulpitis - Root canal needed               │
│  ├─ Tooth #15: Dentinal hypersensitivity                  │
│  └─ General: Moderate gingivitis                          │
│                                                             │
│  [5] TREATMENT PLAN                          ┌─────────────┐│
│  ├─ Tooth #14: RCT + Crown | Dept: Endo    │ ₹15,000    ││
│  │  Proposed: 12 Aug | ⏰ 45 mins          │ [Consent]  ││
│  ├─ Tooth #15: Filling | Dept: Operative   │ ₹3,000     ││
│  │  Proposed: 12 Aug | ⏰ 30 mins          │ [Consent]  ││
│  └─ Cleaning | Dept: Perio                 │ ₹2,000     ││
│     Proposed: 15 Aug | ⏰ 30 mins          │ [Consent]  ││
│                                            └─────────────┘│
│                                            Total: ₹20,000  │
│                                                             │
│  [6] PROCEDURES (After consent)                            │
│  ├─ Tooth #14: RCT Step 1 - Access opening [Scheduled]    │
│  ├─ Tooth #14: RCT Step 2 - Cleaning [Pending]           │
│  └─ Tooth #15: Composite filling [Scheduled]              │
│                                                             │
│  [7] CASE NOTES                                            │
│  Patient preferred morning appointments. Anxious about      │
│  procedures. Discussed payment plan options.               │
└─────────────────────────────────────────────────────────────┘

[+] Add Note  [📎] Attach File  [🖨️] Print  [💾] Save
```

## 🔄 Interaction Patterns

### Adding Entries
1. Click section → Add new entry
2. Automatic timestamp
3. Maintains chronological order
4. Can't reorder (only add new)

### Universal Notes/Attachments
- Hover any line → [+] icon appears
- Click [+] → Add note or attachment
- Notes appear inline with entry
- Attachments show as [📎] with preview on hover

### Tooth Selection Flow
1. Chief Complaint → Click tooth or "General"
2. Clinical Finding → Click tooth (highlighted from complaint)
3. Investigation → Upload and tag to tooth/general
4. Diagnosis → Pre-populated teeth from findings
5. Treatment → Pre-populated teeth from diagnosis

### Consent Management
- Treatment plan shows costs clearly
- Patient can review on screen/printed
- Checkbox for each procedure
- Date negotiation before consent
- Lock plan after consent

## 📊 Data Structure

```typescript
interface CaseSheet {
  id: string;
  patientId: number;
  startDate: Date;
  status: 'active' | 'completed' | 'on-hold';
  
  entries: CaseEntry[];  // All entries in chronological order
}

interface CaseEntry {
  id: string;
  timestamp: Date;
  type: 'complaint' | 'finding' | 'investigation' | 'diagnosis' | 'treatment-plan' | 'procedure' | 'note';
  toothNumber?: number;  // Optional - can be general
  description: string;
  severity?: number;     // For pain scale
  attachments?: Attachment[];
  notes?: Note[];
  createdBy: string;
  
  // For treatment plans
  department?: string;
  service?: string;
  proposedDate?: Date;
  duration?: number;
  cost?: number;
  consentGiven?: boolean;
  consentDate?: Date;
}

interface Note {
  id: string;
  text: string;
  timestamp: Date;
  addedBy: string;
}

interface Attachment {
  id: string;
  type: 'iopa' | 'opg' | 'report' | 'prescription' | 'other';
  filename: string;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
}
```

## 🎨 Visual Indicators

- 🔴 High severity/pain (8-10)
- 🟡 Medium severity/pain (4-7)  
- 🟢 Low severity/pain (1-3)
- 📎 Has attachments
- 💬 Has notes
- ✅ Consent given
- ⏰ Time estimate
- 💰 Cost indicator

## 🚀 Implementation Priority

1. **Phase 1**: Basic case sheet structure with all sections
2. **Phase 2**: Tooth diagram integration with visual feedback
3. **Phase 3**: Attachment system with previews
4. **Phase 4**: Consent workflow and status tracking
5. **Phase 5**: Print-friendly view and templates

---
*This design ensures chronological flow and comprehensive documentation*
