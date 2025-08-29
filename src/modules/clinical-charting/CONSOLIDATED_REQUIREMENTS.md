# 📋 Consolidated Case Sheet Requirements

## 🎯 Non-Negotiable Rules
1. **Chronological Order** - Preserve sequence of data entry
2. **Universal Notes** - Every item can have remarks/attachments  
3. **No Scrolling Overview** - Key info visible at once
4. **Tooth-Centric Design** - Most actions relate to specific teeth

## 📊 Section Flow & Purpose

### Phase 1: Information Gathering
1. **Chief Complaints** → What patient says (subjective)
2. **Clinical Findings** → What doctor sees (objective)
3. **Investigations** → What tests show (evidence)

### Phase 2: Decision Making  
4. **Bird's Eye View** → Summary dashboard (auto-generated)
5. **Diagnosis** → Professional assessment per tooth

### Phase 3: Treatment Planning
6. **Treatment Proposal** → Quote + consent (patient-facing)
7. **Treatment Procedures** → Detailed execution plan (clinical)

### Phase 4: Documentation
8. **Universal Attachments** → Context-specific files
9. **Case Notes** → General observations

## 🔧 Technical Considerations

### Data Structure
```javascript
CaseSheet = {
  id: "CS-2025-001",
  patientId: 1,
  createdAt: "2025-08-10T10:00:00",
  sections: {
    complaints: [
      { tooth: 14, description: "Pain", severity: 8, timestamp: "..." }
    ],
    findings: [
      { tooth: 14, finding: "Deep cavity", timestamp: "..." }
    ],
    // ... maintains order
  },
  attachments: {
    "complaint-1": ["note1.txt", "photo1.jpg"],
    "finding-1": ["xray1.dcm"]
  }
}
```

### UI Requirements
- **Tooth Selector** → Visual picker, not dropdown
- **Pain Scale** → Visual 1-10 slider
- **Attachment Indicators** → Badge showing count
- **Consent Workflow** → Clear yes/no with timestamp
- **Print Format** → Patient-friendly layout

## ❓ Questions Resolved

**Q: How do sections 6 & 7 differ?**
- Section 6: High-level plan for patient consent (simplified)
- Section 7: Detailed procedures for clinical execution

**Q: Can sections 9 & 10 be merged?**
- No. Section 9 (attachments) is inline with items
- Section 10 (case notes) is general commentary

**Q: Is sequential entry mandatory?**
- Yes for logical flow, but can save draft at any point

## 🚀 Implementation Priority

1. **Core Workflow** → Sections 1-5 first (data collection)
2. **Treatment Flow** → Sections 6-7 (planning)  
3. **Enhancements** → Attachments, templates, shortcuts

---

*Ready to implement based on these consolidated requirements*
