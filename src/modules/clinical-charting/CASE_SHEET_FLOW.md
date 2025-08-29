# 📄 Case Sheet Flow Specification

## 🎯 Core Principles
1. **Chronological Order** - Everything in sequence of entry
2. **Universal Notes** - Add remarks to ANY item
3. **No Scrolling for Overview** - Critical info visible at once
4. **Tooth-Centric** - Most sections revolve around teeth

## 📊 Case Sheet Sections (In Order)

### 1️⃣ Chief Complaints
```
┌─────────────────────────────────────────────────┐
│ What brings you here today?                     │
├─────────────────────────────────────────────────┤
│ ✓ Tooth #14 - Severe pain (8/10) [Add Note]    │
│ ✓ Tooth #25 - Sensitivity to cold [Add Note]   │
│ ✓ General - Bleeding gums [Add Note]           │
│                                                 │
│ [+ Add Complaint]                               │
└─────────────────────────────────────────────────┘
```

### 2️⃣ Clinical Findings  
```
┌─────────────────────────────────────────────────┐
│ Doctor's Observations                           │
├─────────────────────────────────────────────────┤
│ ✓ Tooth #14 - Deep cavity, pulp exposed        │
│ ✓ Tooth #25 - Enamel erosion                   │
│ ✓ Tooth #26 - Existing filling damaged         │
│                                                 │
│ [+ Add Finding]                                 │
└─────────────────────────────────────────────────┘
```

### 3️⃣ Investigations
```
┌─────────────────────────────────────────────────┐
│ Supporting Documents                            │
├─────────────────────────────────────────────────┤
│ 📷 IOPA #14 - uploaded 2 min ago               │
│ 📄 OPG Full Mouth - uploaded 5 min ago         │
│ 📊 Blood Report - CBC normal                    │
│                                                 │
│ [📎 Upload Files]                               │
└─────────────────────────────────────────────────┘
```

### 4️⃣ Bird's Eye View (Auto-Generated)
```
┌─────────────────────────────────────────────────┐
│ Summary Dashboard                               │
├─────────────────────────────────────────────────┤
│ Teeth with Issues: #14 🔴 #25 🟡 #26 🟡        │
│ Documents: 3 uploaded                           │
│ Chief Complaints: 3 registered                  │
│ Clinical Findings: 3 documented                 │
└─────────────────────────────────────────────────┘
```

### 5️⃣ Diagnosis
```
┌─────────────────────────────────────────────────┐
│ Professional Diagnosis                          │
├─────────────────────────────────────────────────┤
│ Tooth #14: Irreversible Pulpitis (K04.0)       │
│ Tooth #25: Dentin Hypersensitivity (K03.8)     │
│ Tooth #26: Failed Restoration (K08.5)          │
│                                                 │
│ [+ Add Diagnosis]                               │
└─────────────────────────────────────────────────┘
```

### 6️⃣ Treatment Proposal (For Patient Consent)
```
┌─────────────────────────────────────────────────┐
│ Proposed Treatment Plan                         │
├─────────────────────────────────────────────────┤
│ Tooth #14: Root Canal - Endodontics - ₹8,000   │
│           Proposed Date: Aug 12, 2025           │
│                                                 │
│ Tooth #25: Composite Filling - ₹2,500          │
│           Proposed Date: Aug 12, 2025           │
│                                                 │
│ Total Estimate: ₹10,500                        │
│                                                 │
│ ☐ Patient Consents to Treatment Plan           │
│ [💬 Discuss with Patient] [📧 Email Quote]     │
└─────────────────────────────────────────────────┘
```

### 7️⃣ Treatment Procedures (After Consent)
```
┌─────────────────────────────────────────────────┐
│ Actual Treatment Assignment                     │
├─────────────────────────────────────────────────┤
│ Tooth #14:                                      │
│   • Access Opening - Dr. Sharma - Aug 12       │
│   • Cleaning & Shaping - Dr. Sharma - Aug 12   │
│   • Obturation - Dr. Sharma - Aug 15           │
│                                                 │
│ Tooth #25:                                      │
│   • Cavity Prep - Dr. Patel - Aug 12          │
│   • Composite Fill - Dr. Patel - Aug 12       │
└─────────────────────────────────────────────────┘
```

### 8️⃣ Universal Attachments (Inline Feature)
- Click 📎 icon on ANY line item above
- Attach files, images, notes
- See attachment count badge

### 9️⃣ Case Notes
```
┌─────────────────────────────────────────────────┐
│ General Case Notes                              │
├─────────────────────────────────────────────────┤
│ Patient anxious about procedures. Prescribed    │
│ antibiotics as preventive measure. Follow-up    │
│ scheduled after 1 week.                         │
│                                                 │
└─────────────────────────────────────────────────┘
```

## 🔄 Key Interactions

1. **Sequential Entry** - Can't skip sections
2. **Tooth Picker** - Visual selector for tooth numbers
3. **Quick Templates** - Common diagnoses/procedures
4. **Auto-Calculate** - Costs update as procedures added
5. **Print View** - Patient-friendly format

## 📱 Visual Layout Strategy

```
┌─────────┬────────────────────────┬──────────────┐
│ Patient │   Case Sheet Sections   │ Quick Actions│
│  Info   │   (Scrollable if needed)│              │
│         │                         │ [Save Draft] │
│ Name    │ 1. Chief Complaints     │ [Print]      │
│ Age     │ 2. Clinical Findings    │ [Share]      │
│ ID      │ 3. Investigations       │ [Complete]   │
│         │ 4. Bird's Eye View      │              │
│ Alerts  │ 5. Diagnosis            │ Tooth Visual │
│         │ 6. Treatment Proposal   │    Guide     │
│         │ 7. Procedures           │              │
│         │ 8. Case Notes           │              │
└─────────┴────────────────────────┴──────────────┘
```
