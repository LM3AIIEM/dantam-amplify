# 📋 Patient Management Module - Feature Specification

## 🎯 Module Overview
The Patient Management module is the central hub for all patient-related information and actions. It must provide comprehensive patient profiles, medical history tracking, communication tools, and family relationship management.

## ✨ Core Features

### 1. **Patient List View**
- **Search & Filter**
  - Real-time search by name, phone, email
  - Filter by status (Active, Needs Follow-up, Inactive)
  - Advanced filters: Age range, Last visit date, Balance due
  
- **Patient Cards Display**
  - Avatar with initials
  - Basic info: Name, Age, Phone, Email
  - Status badges (Account status, Insurance status)
  - Family member count indicator
  - Outstanding balance highlight
  - Last visit & Next appointment dates
  - Medical alerts with red background
  - Quick actions dropdown menu

### 2. **New Patient Registration**
- **Multi-step Form**
  - Step 1: Personal Information
    - First/Last Name
    - Date of Birth (with calendar picker)
    - Gender selection
    - Preferred language
  - Step 2: Contact Details
    - Phone (primary/secondary)
    - Email
    - Preferred contact method
    - Address (full form)
  - Step 3: Emergency Contact
    - Name & Relationship
    - Multiple phone numbers
  - Step 4: Medical History (to be implemented)
  - Step 5: Insurance Information (to be implemented)

### 3. **Patient Detail View**
- **Header Section**
  - Large avatar
  - Patient ID
  - Quick actions: Schedule, New Visit
  - Back navigation

- **Overview Tab**
  - Summary cards:
    - Account status with icon
    - Outstanding balance
    - Next appointment
  - Contact information card
  - Insurance information card
  - Recent visits timeline
  - Quick stats (Total visits, Missed appointments)

- **Medical History Tab**
  - Allergies section
  - Current medications
  - Medical conditions
  - Surgical history
  - Family medical history
  - Immunization records

- **Dental Records Tab**
  - Tooth chart integration
  - Treatment history
  - X-ray gallery
  - Periodontal charts
  - Clinical notes

- **Billing Tab**
  - Transaction history
  - Outstanding invoices
  - Payment methods on file
  - Insurance claims status
  - Payment plans

- **Family Tab**
  - Family member connections
  - Shared insurance info
  - Family appointment coordination
  - Relationship tree view

### 4. **Communication Features**
- **Quick Actions**
  - Send SMS reminder
  - Send Email
  - Make phone call (click-to-call)
  - Print patient summary

- **Communication Log**
  - All interactions history
  - SMS/Email/Call logs
  - Notes from conversations
  - Appointment reminders sent

### 5. **Document Management**
- **Document Types**
  - Consent forms
  - Insurance cards
  - ID verification
  - Medical records
  - X-rays and images
  
- **Features**
  - Upload/Download
  - Preview capability
  - Version control
  - Expiration tracking

### 6. **Alerts & Notifications**
- **Medical Alerts**
  - Allergies (highlighted in red)
  - Medications
  - Medical conditions
  - Special needs

- **Administrative Alerts**
  - Insurance expiration
  - Outstanding balance
  - Missed appointments
  - Birthday reminders

### 7. **Advanced Features**
- **Patient Portal Access**
  - Login credentials management
  - Portal activity tracking
  - Online form submissions

- **Appointment Integration**
  - View all appointments
  - Quick scheduling
  - Appointment history
  - No-show tracking

- **Analytics**
  - Visit frequency
  - Treatment compliance
  - Payment history
  - Communication preferences

## 🎨 UI/UX Requirements

### Visual Design
- Clean card-based layout
- Consistent use of shadcn/ui components
- Color coding for statuses
- Responsive grid system
- Smooth transitions

### Interactions
- Click patient card → Detail view
- Hover effects on cards
- Drag to reorder family members
- Right-click context menus
- Keyboard shortcuts (Ctrl+N for new patient)

### Status Color Codes
- **Account Status**
  - Active: Green
  - Needs Follow-up: Yellow
  - Inactive: Gray
  
- **Insurance Status**
  - Verified: Blue
  - Pending: Orange
  - Expired: Red

### Performance
- Instant search (< 100ms)
- Smooth scrolling
- Progressive loading for images
- Optimistic UI updates

## 📊 Data Structure

### Patient Object
```typescript
interface Patient {
  id: number;
  name: string;
  age: number;
  dateOfBirth: Date;
  gender: string;
  phone: string;
  alternatePhone?: string;
  email: string;
  address: Address;
  lastVisit: Date;
  nextAppt?: Date;
  status: 'active' | 'needs-followup' | 'inactive';
  insuranceStatus: 'verified' | 'pending' | 'expired';
  balance: number;
  medicalAlerts: string[];
  family: number;
  familyMembers?: number[];
  avatar?: string;
  preferredLanguage: string;
  preferredContactMethod: 'phone' | 'email' | 'sms';
  emergencyContact: EmergencyContact;
  documents: Document[];
  communicationLog: CommunicationEntry[];
}
```

## 🚀 Implementation Priority

### Phase 1 (Current)
1. ✅ Basic patient list
2. ✅ Search functionality
3. ✅ Status filtering
4. ⏳ Enhanced patient cards
5. ⏳ New patient form

### Phase 2 (Next)
1. Complete patient detail view
2. All 5 tabs functional
3. Document upload
4. Communication features

### Phase 3 (Future)
1. Analytics dashboard
2. Bulk operations
3. Export capabilities
4. API integration prep

## 📝 Success Metrics
- Load time < 1 second
- Search response < 100ms
- All legacy features preserved
- Mobile responsive
- Zero runtime errors
