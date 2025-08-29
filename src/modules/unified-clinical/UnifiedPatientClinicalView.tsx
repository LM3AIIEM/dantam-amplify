/* 🏥 Unified Patient-Clinical View - Single Screen Workflow */

"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { GradientSlider } from '@/components/ui/gradient-slider';
import { 
  User, Phone, Mail, Calendar, AlertCircle, Clock, CreditCard,
  Stethoscope, FileText, Camera, Plus, Save, Edit3, X,
  ChevronLeft, ChevronRight, Paperclip, Printer, MessageSquare, Trash2,
  Activity, Pill, CalendarCheck, DollarSign, Home, Briefcase, Search, ChevronDown,
  Focus
} from 'lucide-react'; 
import { formatINR } from '@/shared/utils';
import mockPatients from '@/shared/mock-patients.json';

// Types
interface Patient {
  id: number;
  name: string;
  age: number;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  lastVisit: string;
  nextAppt: string | null;
  status: string;
  balance: number;
  medicalAlerts: string[];
  insuranceInfo: {
    provider: string;
    policyNumber: string;
    effectiveDate: string;
    expirationDate: string;
  };
  medicalHistory: {
    allergies: string[];
    medications: string[];
    conditions: string[];
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

interface CaseEntry {
  id: string;
  type: 'complaint' | 'finding' | 'investigation' | 'diagnosis' | 'treatment-plan' | 'procedure' | 'note';
  timestamp: Date;
  toothNumber?: number;
  teeth?: { number: number }[]; // Support for multi-tooth entries
  description: string;
  severity?: number;
  attachments?: string[];
  notes?: string;
  metadata?: any;
  status?: 'draft' | 'proposed' | 'cancelled';
  treatmentDetails?: {
    procedure: string;
    estimatedCost: number;
    duration: string;
    priority: 'low' | 'medium' | 'high';
  };
  procedureData?: {
    id: string;
    name: string;
    treatmentPlanId?: string | null;
    steps: Array<{
      stepNumber: number;
      description: string;
      toothNumber: number | null;
      appointmentDate: string;
      appointmentTime: string;
      duration: number;
      notes: string;
    }>;
  };
}

// Common complaint tags
const commonComplaints = [
  'Toothache',
  'Sensitivity to hot/cold',
  'Swelling',
  'Bleeding gums',
  'Bad breath',
  'Broken tooth',
  'Loose tooth',
  'Jaw pain',
  'Difficulty chewing',
  'Abscess'
];

// Common clinical findings
const commonFindings = [
  'Cavity/Caries',
  'Gingivitis',
  'Periodontitis',
  'Cracked tooth',
  'Worn enamel',
  'Plaque buildup',
  'Tartar/Calculus',
  'Gum recession',
  'Tooth discoloration',
  'Malocclusion'
];

// Pain scale descriptions
const painScaleDescriptions = [
  { value: 0, label: 'No Pain', color: 'text-green-600' },
  { value: 1, label: 'Minimal', color: 'text-green-500' },
  { value: 2, label: 'Mild', color: 'text-green-400' },
  { value: 3, label: 'Uncomfortable', color: 'text-yellow-500' },
  { value: 4, label: 'Moderate', color: 'text-yellow-600' },
  { value: 5, label: 'Distracting', color: 'text-orange-400' },
  { value: 6, label: 'Distressing', color: 'text-orange-500' },
  { value: 7, label: 'Unmanageable', color: 'text-orange-600' },
  { value: 8, label: 'Intense', color: 'text-red-500' },
  { value: 9, label: 'Severe', color: 'text-red-600' },
  { value: 10, label: 'Unbearable', color: 'text-red-700' }
];

// Tooth statuses for visual diagram
const toothStatuses = {
  healthy: { color: 'bg-green-500', label: 'Healthy' },
  decay: { color: 'bg-red-500', label: 'Decay' },
  restoration: { color: 'bg-blue-500', label: 'Restoration' },
  missing: { color: 'bg-gray-400', label: 'Missing' },
  treatment: { color: 'bg-yellow-500', label: 'Under Treatment' }
};

// Component
export default function UnifiedPatientClinicalView({ patientId }: { patientId: number }) {
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [caseEntries, setCaseEntries] = useState<CaseEntry[]>([
    // Mock data for Priya Sharma - Treatment Plans
    {
      id: 'tp001',
      type: 'treatment-plan',
      description: 'Root Canal Treatment - #14, #15',
      teeth: [{ number: 14 }, { number: 15 }],
      timestamp: new Date('2024-03-15'),
      status: 'proposed',
      treatmentDetails: {
        procedure: 'Root Canal Treatment',
        estimatedCost: 25000, // ₹25,000 for two teeth
        duration: '4 sessions across 2 weeks',
        priority: 'high'
      }
    },
    {
      id: 'tp002', 
      type: 'treatment-plan',
      description: 'Crown Restoration - #16',
      teeth: [{ number: 16 }],
      timestamp: new Date('2024-03-16'),
      status: 'draft',
      treatmentDetails: {
        procedure: 'Crown Restoration',
        estimatedCost: 15000, // ₹15,000 for one crown
        duration: '2 sessions across 1 week',
        priority: 'medium'
      }
    },
    // Mock data - Procedure Sets under Root Canal Treatment
    {
      id: 'proc001',
      type: 'procedure',
      description: 'RCT Session 1: Access & Cleaning',
      teeth: [{ number: 14 }],
      timestamp: new Date('2024-03-20'),
      status: 'draft',
      procedureData: {
        id: 'set001',
        name: 'Root Canal - Session 1',
        treatmentPlanId: 'tp001',
        steps: [
          {
            stepNumber: 1,
            description: 'Access cavity preparation',
            toothNumber: 14,
            appointmentDate: '2024-03-25',
            appointmentTime: '10:00',
            duration: 90,
            notes: 'First session for tooth #14'
          },
          {
            stepNumber: 2,
            description: 'Pulp removal and canal cleaning',
            toothNumber: 14,
            appointmentDate: '2024-03-25',
            appointmentTime: '10:00',
            duration: 90,
            notes: 'Continue with cleaning'
          }
        ]
      }
    },
    {
      id: 'proc002',
      type: 'procedure', 
      description: 'RCT Session 2: Filling & Restoration',
      teeth: [{ number: 14 }],
      timestamp: new Date('2024-03-21'),
      status: 'draft',
      procedureData: {
        id: 'set002',
        name: 'Root Canal - Session 2',
        treatmentPlanId: 'tp001',
        steps: [
          {
            stepNumber: 1,
            description: 'Canal filling',
            toothNumber: 14,
            appointmentDate: '2024-04-01',
            appointmentTime: '14:00',
            duration: 60,
            notes: 'Final filling for tooth #14'
          },
          {
            stepNumber: 2,
            description: 'Temporary restoration',
            toothNumber: 14,
            appointmentDate: '2024-04-01',
            appointmentTime: '14:00',
            duration: 60,
            notes: 'Temporary filling until crown'
          }
        ]
      }
    },
    {
      id: 'proc003',
      type: 'procedure',
      description: 'RCT for tooth #15 - Complete procedure',
      teeth: [{ number: 15 }],
      timestamp: new Date('2024-03-22'),
      status: 'draft',
      procedureData: {
        id: 'set003',
        name: 'Root Canal - Tooth #15',
        treatmentPlanId: 'tp001',
        steps: [
          {
            stepNumber: 1,
            description: 'Complete root canal procedure',
            toothNumber: 15,
            appointmentDate: '2024-04-05',
            appointmentTime: '09:00',
            duration: 120,
            notes: 'Single session RCT for tooth #15'
          }
        ]
      }
    },
    // Mock data - Procedure Sets under Crown Restoration
    {
      id: 'proc004',
      type: 'procedure',
      description: 'Crown Preparation - #16',
      teeth: [{ number: 16 }],
      timestamp: new Date('2024-03-23'),
      status: 'draft',
      procedureData: {
        id: 'set004',
        name: 'Crown Prep & Impression',
        treatmentPlanId: 'tp002',
        steps: [
          {
            stepNumber: 1,
            description: 'Tooth preparation',
            toothNumber: 16,
            appointmentDate: '2024-04-10',
            appointmentTime: '11:00',
            duration: 75,
            notes: 'Prepare tooth for crown'
          },
          {
            stepNumber: 2,
            description: 'Digital impression',
            toothNumber: 16,
            appointmentDate: '2024-04-10',
            appointmentTime: '11:00',
            duration: 75,
            notes: 'Take digital impression for lab'
          }
        ]
      }
    },
    // Other clinical entries
    {
      id: 'complaint001',
      type: 'complaint',
      description: 'Severe pain in upper right molars',
      teeth: [{ number: 14 }, { number: 15 }],
      timestamp: new Date('2024-03-10'),
      severity: 8,
      status: 'draft'
    },
    {
      id: 'finding001',
      type: 'finding',
      description: 'Deep caries in #14 and #15, pulp involvement suspected',
      teeth: [{ number: 14 }, { number: 15 }],
      timestamp: new Date('2024-03-12'),
      status: 'draft'
    },
    // Realistic Investigation Mock Data for Priya Sharma
    {
      id: 'invest001',
      type: 'investigation',
      description: 'Periapical Radiograph - #14, #15',
      teeth: [{ number: 14 }, { number: 15 }],
      timestamp: new Date('2024-03-12'),
      status: 'draft',
      notes: 'X-ray shows deep caries with possible pulp involvement in both teeth. Periapical areas appear normal.'
    },
    {
      id: 'invest002',
      type: 'investigation',
      description: 'Panoramic Radiograph - Full mouth survey',
      teeth: [],
      timestamp: new Date('2024-03-12'),
      status: 'draft',
      notes: 'OPG reveals generalized bone loss consistent with chronic periodontitis. Multiple restorations noted. No impacted teeth observed.'
    },
    {
      id: 'invest003',
      type: 'investigation',
      description: 'Vitality Test - #16',
      teeth: [{ number: 16 }],
      timestamp: new Date('2024-03-13'),
      status: 'draft',
      notes: 'Cold test negative, EPT negative at maximum setting. Confirms non-vital pulp status.'
    },
    // Realistic Diagnosis Mock Data for Priya Sharma
    {
      id: 'diag001',
      type: 'diagnosis',
      description: 'Irreversible Pulpitis - #14 (K04.01)',
      teeth: [{ number: 14 }],
      timestamp: new Date('2024-03-13'),
      status: 'draft',
      notes: 'Severe spontaneous pain, prolonged response to thermal stimuli. Radiograph shows deep caries approaching pulp chamber. Vital pulp therapy not viable.'
    },
    {
      id: 'diag002',
      type: 'diagnosis',
      description: 'Irreversible Pulpitis - #15 (K04.01)',
      teeth: [{ number: 15 }],
      timestamp: new Date('2024-03-13'),
      status: 'draft',
      notes: 'Similar presentation to #14. Deep caries with suspected pulp exposure. Patient reports throbbing pain worse at night.'
    },
    {
      id: 'diag003',
      type: 'diagnosis',
      description: 'Chronic Apical Periodontitis - #16 (K04.5)',
      teeth: [{ number: 16 }],
      timestamp: new Date('2024-03-14'),
      status: 'draft',
      notes: 'Periapical radiolucency visible on radiograph. Tooth has large restoration with secondary caries. Percussion positive, vitality test negative.'
    },
    {
      id: 'diag004',
      type: 'diagnosis',
      description: 'Chronic Generalized Gingivitis - Generalized (K05.10)',
      teeth: [],
      timestamp: new Date('2024-03-10'),
      status: 'draft',
      notes: 'Generalized gingival inflammation with bleeding on probing. Plaque score 65%. Patient reports occasional gum bleeding during brushing.'
    },
    {
      id: 'diag005',
      type: 'diagnosis',
      description: 'Dental Calculus - Generalized (K03.6)',
      teeth: [],
      timestamp: new Date('2024-03-10'),
      status: 'draft',
      notes: 'Moderate subgingival calculus deposits throughout dentition, particularly heavy in lower anterior region. Contributing factor to gingivitis.'
    }
  ]);
  const [showAddEntry, setShowAddEntry] = useState<{ type: string; show: boolean }>({ type: '', show: false });
  const [teethStatus, setTeethStatus] = useState<Record<number, { status: keyof typeof toothStatuses; condition?: string }>>({});
  
  // Card minimization states
  const [isPatientCardMinimized, setIsPatientCardMinimized] = useState(false);
  const [minimizedCards, setMinimizedCards] = useState<Record<string, boolean>>({
    medicalAlerts: false,
    quickStats: false,
    insurance: false,
    medicalHistory: false,
    quickActions: false,
    recentActivity: false
  });

  // Focus Mode state - Phase 2 Enhancement (COMPLETED & USER APPROVED)
  // User tested and LOVES this feature - Aug 11, 2025
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [focusModePreservedState, setFocusModePreservedState] = useState<Record<string, boolean>>({});

  // Enhanced card interaction helper
  const toggleCard = useCallback((cardKey: string) => {
    setMinimizedCards(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }));
  }, []);

  // Handle card title click for minimization
  const handleCardTitleClick = useCallback((cardKey: string, isMinimized: boolean) => {
    if (!isMinimized) {
      toggleCard(cardKey);
    }
  }, [toggleCard]);

  // Handle card click to expand when minimized
  const handleCardClick = useCallback((cardKey: string, isMinimized: boolean) => {
    if (isMinimized) {
      toggleCard(cardKey);
    }
  }, [toggleCard]);

  // Focus Mode helpers - Phase 2 Enhancement (TESTED & WORKING)
  // Implementation: Smart state preservation + conditional rendering
  // User feedback: "LOVES" the distraction-free workflow
  const toggleFocusMode = useCallback(() => {
    if (!isFocusMode) {
      // Entering focus mode - preserve current state and minimize distracting cards
      setFocusModePreservedState({...minimizedCards});
      setMinimizedCards({
        medicalAlerts: true,
        quickStats: true,
        insurance: true,
        medicalHistory: true,
        quickActions: false, // Keep quick actions visible
        recentActivity: true
      });
    } else {
      // Exiting focus mode - restore preserved state
      setMinimizedCards({...focusModePreservedState});
    }
    setIsFocusMode(!isFocusMode);
  }, [isFocusMode, minimizedCards, focusModePreservedState]);

  // Determine which cards are hidden in focus mode
  const isCardHiddenInFocus = useCallback((cardKey: string) => {
    if (!isFocusMode) return false;
    // In focus mode, only show essential cards for clinical work
    const focusEssentialCards = ['quickActions'];
    return !focusEssentialCards.includes(cardKey);
  }, [isFocusMode]);
  
  // Patient search state
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  
  // Entry form states
  const [newEntryForm, setNewEntryForm] = useState({
    type: '',
    description: '',
    toothNumber: null as number | null,
    severity: 0,
    showDropdown: false
  });

  // Phase 3: Mobile Dental Chart Smart Positioning State
  const [activeFormPosition, setActiveFormPosition] = useState<{ top: number; height: number } | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [dentalChartPosition, setDentalChartPosition] = useState<'fixed' | 'inline'>('inline');
  
  // Enhanced Multi-select Dental Chart State
  const [selectedTeeth, setSelectedTeeth] = useState<Set<number>>(new Set());
  const [preMarkedSection, setPreMarkedSection] = useState<string | null>(null);
  const [preMarkedTeeth, setPreMarkedTeeth] = useState<Set<number>>(new Set());
  const [chartViewMode, setChartViewMode] = useState<'full' | 'premarked'>('full');
  const [showPreMarkingPanel, setShowPreMarkingPanel] = useState(false);
  // Multi-select is now always enabled by default
  
  // Refs for positioning calculations
  const activeFormRef = useRef<HTMLDivElement>(null);
  const dentalChartRef = useRef<HTMLDivElement>(null);
  const clinicalWorkAreaRef = useRef<HTMLDivElement>(null);

  // Stakeholder Requirements State Management
  const [caseStatuses, setCaseStatuses] = useState<Record<string, 'draft' | 'proposed' | 'cancelled'>>({});
  const [caseAttachments, setCaseAttachments] = useState<Record<string, string[]>>({});
  const [caseTreatmentDetails, setCaseTreatmentDetails] = useState<Record<string, any>>({});
  const [caseNotes, setCaseNotes] = useState<Record<string, string>>({});
  const [expandedDraftSections, setExpandedDraftSections] = useState<Set<string>>(new Set());
  const [expandedAttachments, setExpandedAttachments] = useState<Set<string>>(new Set());
  
  // Enhanced form state for notes
  const [newEntryNote, setNewEntryNote] = useState('');

  // Merge drafts functionality state
  const [selectedForMerge, setSelectedForMerge] = useState<Set<string>>(new Set());
  const [showMergeMode, setShowMergeMode] = useState<string | null>(null); // section type for merge mode

  // Enhanced Treatment Plan and Procedure State
  const [activeTreatmentForm, setActiveTreatmentForm] = useState<{
    selectedTeeth: number[];
    selectedService: string | null;
    serviceDetails: any;
    showForm: boolean;
  }>({
    selectedTeeth: [],
    selectedService: null,
    serviceDetails: {},
    showForm: false
  });

  const [activeProcedureForm, setActiveProcedureForm] = useState<{
    treatmentPlanId: string | null;
    procedureSets: Array<{
      id: string;
      name: string;
      steps: Array<{
        stepNumber: number;
        description: string;
        toothNumber: number | null;
        appointmentDate: string;
        appointmentTime: string;
        duration: number; // minutes
        notes: string;
      }>;
    }>;
    showForm: boolean;
  }>({
    treatmentPlanId: null,
    procedureSets: [],
    showForm: false
  });

  // Treatment Services Configuration
  const treatmentServices = {
    'root-canal': {
      name: 'Root Canal Treatment',
      steps: 6,
      visitCount: 2,
      stepTemplate: [
        { visit: 1, steps: ['Access cavity preparation', 'Pulp removal', 'Canal shaping'] },
        { visit: 2, steps: ['Canal filling', 'Core buildup', 'Restoration'] }
      ]
    },
    'crown': {
      name: 'Crown Preparation & Placement',
      steps: 4,
      visitCount: 2,
      stepTemplate: [
        { visit: 1, steps: ['Tooth preparation', 'Impression taking'] },
        { visit: 2, steps: ['Crown try-in', 'Crown cementation'] }
      ]
    },
    'filling': {
      name: 'Composite Filling',
      steps: 2,
      visitCount: 1,
      stepTemplate: [
        { visit: 1, steps: ['Cavity preparation', 'Composite placement'] }
      ]
    },
    'extraction': {
      name: 'Tooth Extraction',
      steps: 1,
      visitCount: 1,
      stepTemplate: [
        { visit: 1, steps: ['Extraction procedure'] }
      ]
    },
    'scaling': {
      name: 'Scaling & Root Planing',
      steps: 2,
      visitCount: 1,
      stepTemplate: [
        { visit: 1, steps: ['Scaling', 'Root planing'] }
      ]
    }
  };

  // Function to update case status
  const updateCaseStatus = (entryId: string, newStatus: 'draft' | 'proposed' | 'cancelled') => {
    setCaseStatuses(prev => ({
      ...prev,
      [entryId]: newStatus
    }));
  };

  // Function to simulate file upload for attachments (simplified)
  const simulateFileUpload = (entryId: string) => {
    const attachmentCount = (caseAttachments[entryId]?.length || 0) + 1;
    setCaseAttachments(prev => ({
      ...prev,
      [entryId]: [...(prev[entryId] || []), `attachment_${attachmentCount}`]
    }));
  };

  // Multi-select tooth functions (always enabled)
  const toggleToothSelection = (toothNumber: number) => {
    const newSelection = new Set(selectedTeeth);
    if (newSelection.has(toothNumber)) {
      newSelection.delete(toothNumber);
    } else {
      newSelection.add(toothNumber);
    }
    setSelectedTeeth(newSelection);
  };

  // Enhanced pre-marking with draft creation
  const preMarkTeethForSection = (sectionType: string) => {
    setPreMarkedSection(sectionType);
    // Show entire tooth list when pre-marking (not filtered)
    setSelectedTeeth(new Set());
    setShowPreMarkingPanel(true); // Show the selection panel
  };

  // Create drafts from pre-marked teeth (with multi-tooth support)
  const createDraftsFromPreMarked = (asSingleEntry = false) => {
    if (selectedTeeth.size === 0 || !preMarkedSection) return;

    if (asSingleEntry) {
      // Create one entry for multiple teeth
      const newEntry: CaseEntry = {
        id: `premark-multi-${Date.now()}`,
        type: preMarkedSection as CaseEntry['type'],
        timestamp: new Date(),
        description: '', // Empty - user needs to fill
        teeth: Array.from(selectedTeeth).map(num => ({ number: num })),
        severity: undefined,
        notes: '',
        attachments: [],
        status: 'draft' as const
      };
      setCaseEntries(prev => [...prev, newEntry]);
    } else {
      // Create individual entries for each tooth
      const newEntries: CaseEntry[] = Array.from(selectedTeeth).map(toothNumber => ({
        id: `premark-${Date.now()}-${toothNumber}`,
        type: preMarkedSection as CaseEntry['type'],
        timestamp: new Date(),
        description: '', // Empty - user needs to fill
        toothNumber,
        severity: undefined,
        notes: '',
        attachments: [],
        status: 'draft' as const
      }));
      setCaseEntries(prev => [...prev, ...newEntries]);
    }
    
    // Add selected teeth to pre-marked set for later filtering
    setPreMarkedTeeth(prev => new Set([...prev, ...selectedTeeth]));
    
    // Auto-expand the relevant section to show new drafts
    setExpandedDraftSections(prev => new Set([...prev, preMarkedSection]));
    
    // Reset selection but keep pre-marking panel open
    setSelectedTeeth(new Set());
  };

  // Merge draft entries functionality
  const mergeDraftEntries = (entryIds: string[], mergedDescription?: string) => {
    const entriesToMerge = caseEntries.filter(entry => entryIds.includes(entry.id));
    if (entriesToMerge.length < 2) return;

    // Get all unique teeth from entries to merge
    const allTeeth: { number: number }[] = [];
    entriesToMerge.forEach(entry => {
      if (entry.toothNumber) {
        allTeeth.push({ number: entry.toothNumber });
      }
      if (entry.teeth) {
        allTeeth.push(...entry.teeth);
      }
    });

    // Remove duplicates
    const uniqueTeeth = allTeeth.filter((tooth, index, self) => 
      index === self.findIndex(t => t.number === tooth.number)
    );

    // Create merged entry
    const mergedEntry: CaseEntry = {
      id: `merged-${Date.now()}`,
      type: entriesToMerge[0].type,
      timestamp: new Date(),
      teeth: uniqueTeeth,
      description: mergedDescription || entriesToMerge.map(e => e.description).filter(d => d).join('; ') || '',
      severity: entriesToMerge.find(e => e.severity)?.severity,
      notes: entriesToMerge.map(e => e.notes).filter(n => n).join('; ') || '',
      attachments: entriesToMerge.flatMap(e => e.attachments || []),
      status: 'draft' as const
    };

    // Remove original entries and add merged entry
    setCaseEntries(prev => [
      ...prev.filter(entry => !entryIds.includes(entry.id)),
      mergedEntry
    ]);

    // Clean up related state
    entryIds.forEach(id => {
      setCaseNotes(prev => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
      setCaseStatuses(prev => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
    });
  };

  // Function to group procedures by treatment plan
  const groupProceduresByTreatmentPlan = (procedureEntries: CaseEntry[]) => {
    const grouped: { [treatmentPlanId: string]: { treatmentPlan: CaseEntry | null, procedures: CaseEntry[] } } = {};

    // First, get all treatment plans for easy lookup
    const treatmentPlans = caseEntries.filter(entry => entry.type === 'treatment-plan');

    procedureEntries.forEach(procedure => {
      // Look for treatmentPlanId in procedureData
      const treatmentPlanId = procedure.procedureData?.treatmentPlanId || 'ungrouped';

      if (!grouped[treatmentPlanId]) {
        const relatedTreatmentPlan = treatmentPlans.find(tp => tp.id === treatmentPlanId);
        grouped[treatmentPlanId] = { 
          treatmentPlan: relatedTreatmentPlan || null, 
          procedures: [] 
        };
      }
      
      grouped[treatmentPlanId].procedures.push(procedure);
    });

    // Ensure we always have an ungrouped section if there are ungrouped procedures
    if (!grouped['ungrouped'] && procedureEntries.some(p => !p.procedureData?.treatmentPlanId)) {
      grouped['ungrouped'] = { treatmentPlan: null, procedures: [] };
    }

    return grouped;
  };

  // Update case note
  const updateCaseNote = (entryId: string, note: string) => {
    setCaseNotes(prev => ({
      ...prev,
      [entryId]: note
    }));
  };

  // Load patient data
  useEffect(() => {
    const foundPatient = mockPatients.patients.find(p => p.id === patientId);
    if (foundPatient) {
      setPatient(foundPatient as Patient);
      
      // Initialize with some mock data for Priya Sharma (ID: 1)
      if (patientId === 1) {
        setCaseEntries([
          {
            id: 'mock-1',
            type: 'complaint',
            timestamp: new Date('2025-08-11T09:00:00'),
            toothNumber: 14,
            description: 'Toothache',
            severity: 7,
            attachments: [],
            notes: 'Patient reports pain when chewing',
            status: 'proposed'
          },
          {
            id: 'mock-2',
            type: 'complaint',
            timestamp: new Date('2025-08-11T09:05:00'),
            toothNumber: 15,
            description: 'Sensitivity to hot/cold',
            severity: 4,
            attachments: [],
            notes: '',
            status: 'draft'
          },
          {
            id: 'mock-3',
            type: 'finding',
            timestamp: new Date('2025-08-11T09:15:00'),
            toothNumber: 14,
            description: 'Cavity/Caries',
            attachments: [],
            notes: 'Deep caries on occlusal surface',
            status: 'proposed'
          },
          {
            id: 'mock-4',
            type: 'finding',
            timestamp: new Date('2025-08-11T09:20:00'),
            toothNumber: 15,
            description: 'Worn enamel',
            attachments: [],
            notes: 'Moderate enamel erosion',
            status: 'cancelled'
          },
          {
            id: 'mock-5',
            type: 'treatment-plan',
            timestamp: new Date('2025-08-11T09:25:00'),
            toothNumber: 14,
            description: 'Root Canal Treatment',
            attachments: [],
            notes: 'Multi-visit procedure required',
            status: 'proposed',
            treatmentDetails: {
              procedure: 'Endodontic Treatment',
              estimatedCost: 12000,
              duration: '3 visits, 45 min each',
              priority: 'high' as const
            }
          },
          {
            id: 'mock-6',
            type: 'treatment-plan',
            timestamp: new Date('2025-08-11T09:30:00'),
            toothNumber: 15,
            description: 'Composite Restoration',
            attachments: [],
            notes: 'Single visit restoration',
            status: 'draft',
            treatmentDetails: {
              procedure: 'Composite Filling',
              estimatedCost: 3500,
              duration: '1 visit, 30 min',
              priority: 'medium' as const
            }
          },
          {
            id: 'mock-7',
            type: 'investigation',
            timestamp: new Date('2025-08-11T09:35:00'),
            toothNumber: undefined,
            description: 'Panoramic X-ray',
            attachments: ['panoramic-xray-20250811.jpg'],
            notes: 'General oral health assessment and screening for underlying issues',
            status: 'proposed'
          }
        ]);

        // Initialize case statuses
        setCaseStatuses({
          'mock-1': 'proposed',
          'mock-2': 'draft', 
          'mock-3': 'proposed',
          'mock-4': 'cancelled',
          'mock-5': 'proposed',
          'mock-6': 'draft',
          'mock-7': 'proposed'
        });

        // Initialize some attachments
        setCaseAttachments({
          'mock-1': ['X-ray_tooth_14.jpg', 'Clinical_photo.png'],
          'mock-3': ['Radiograph_bitewing.jpg'],
          'mock-5': ['Treatment_plan_RCT.pdf', 'Insurance_preauth.pdf', 'Clinical_notes.pdf'],
          'mock-7': ['OPG_panoramic.jpg', 'Radiographic_report.pdf']
        });
        
        setTeethStatus({
          14: { status: 'decay', condition: 'Deep cavity' },
          15: { status: 'treatment', condition: 'Enamel erosion' },
          24: { status: 'restoration', condition: 'Old filling' }
        });
      }
    }
  }, [patientId]);

  // Handle patient search
  useEffect(() => {
    if (patientSearchQuery.trim()) {
      const query = patientSearchQuery.toLowerCase();
      const results = mockPatients.patients.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.phone.includes(query) ||
        p.id.toString().includes(query)
      ).slice(0, 5) as Patient[]; // Limit to 5 results
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [patientSearchQuery]);

  // Add new case entry - Enhanced for multi-select and notes
  const addCaseEntry = (type: string) => {
    if (!newEntryForm.description.trim()) return;
    
    const teethToProcess = selectedTeeth.size > 0 ? 
      Array.from(selectedTeeth) : 
      (newEntryForm.toothNumber ? [newEntryForm.toothNumber] : []);
    
    // Create entries for each selected tooth
    const newEntries: CaseEntry[] = teethToProcess.length > 0 ? 
      teethToProcess.map(toothNumber => ({
        id: `entry-${Date.now()}-${toothNumber}`,
        type: type as CaseEntry['type'],
        timestamp: new Date(),
        description: newEntryForm.description,
        toothNumber,
        severity: type === 'complaint' ? newEntryForm.severity : undefined,
        notes: newEntryNote,
        attachments: [],
        status: 'draft' as const
      })) : 
      [{
        id: `entry-${Date.now()}`,
        type: type as CaseEntry['type'],
        timestamp: new Date(),
        description: newEntryForm.description,
        severity: type === 'complaint' ? newEntryForm.severity : undefined,
        notes: newEntryNote,
        attachments: [],
        status: 'draft' as const
      }];
    
    setCaseEntries([...caseEntries, ...newEntries]);
    
    // Save notes for new entries
    newEntries.forEach(entry => {
      if (newEntryNote.trim()) {
        updateCaseNote(entry.id, newEntryNote);
      }
    });
    
    // Reset form
    setShowAddEntry({ type: '', show: false });
    setNewEntryForm({
      type: '',
      description: '',
      toothNumber: null,
      severity: 0,
      showDropdown: false
    });
    setNewEntryNote('');
    setSelectedTeeth(new Set());
    
    // Update tooth status for affected teeth
    teethToProcess.forEach(toothNumber => {
      setTeethStatus(prev => ({
        ...prev,
        [toothNumber]: {
          status: type === 'complaint' ? 'decay' : 'treatment',
          condition: newEntryForm.description
        }
      }));
    });
  };

  // Phase 3: Universal Dental Chart Smart Positioning Hooks  
  // Detect viewport size for responsive positioning
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Smart positioning logic for dental chart based on active forms - WORKS FOR BOTH MOBILE & DESKTOP
  useEffect(() => {
    if (!showAddEntry.show) {
      setDentalChartPosition('inline');
      setActiveFormPosition(null);
      return;
    }

    const updateChartPosition = () => {
      const activeForm = activeFormRef.current;
      if (activeForm) {
        const rect = activeForm.getBoundingClientRect();
        setActiveFormPosition({
          top: rect.top + window.scrollY,
          height: rect.height
        });
        setDentalChartPosition('fixed');
      }
    };

    const observer = new ResizeObserver(updateChartPosition);
    if (activeFormRef.current) {
      observer.observe(activeFormRef.current);
    }

    updateChartPosition();

    return () => {
      observer.disconnect();
      setDentalChartPosition('inline');
    };
  }, [showAddEntry.show]); // Removed isMobileView dependency - now works for ALL viewports

  // Scroll behavior optimization for smart chart positioning - UNIVERSAL FOR ALL DEVICES
  useEffect(() => {
    if (dentalChartPosition !== 'fixed') return;

    const handleScroll = () => {
      if (activeFormPosition && dentalChartRef.current) {
        const scrollTop = window.pageYOffset;
        const formTop = activeFormPosition.top;
        const formBottom = formTop + activeFormPosition.height;
        
        // Keep chart visible near the form - desktop gets more refined positioning
        const offsetY = isMobileView ? 20 : 80; // Desktop gets more spacing
        if (scrollTop > formTop - 100 && scrollTop < formBottom + 100) {
          dentalChartRef.current.style.transform = `translateY(${scrollTop - formTop + offsetY}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dentalChartPosition, activeFormPosition, isMobileView]); // Works for both mobile and desktop

  if (!patient) {
    return <div>Loading patient data...</div>;
  }

  // Patient Info Panel (Left)




  // Phase 3: Enhanced Tooth Chart Component with Multi-select & Pre-marking
  const ToothChart = () => {
    const upperTeeth = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    const lowerTeeth = [32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17];
    
    // Filter teeth based on view mode (full vs pre-marked)
    const getFilteredTeeth = (teethArray: number[]) => {
      if (chartViewMode === 'full') {
        return teethArray; // Show all teeth
      } else if (chartViewMode === 'premarked') {
        // Show only pre-marked teeth if any exist
        return preMarkedTeeth.size > 0 
          ? teethArray.filter(toothNum => preMarkedTeeth.has(toothNum))
          : teethArray; // Show all if no pre-marked teeth
      }
      return teethArray;
    };
    
    const renderTooth = (toothNumber: number) => {
      const tooth = teethStatus[toothNumber] || { status: 'healthy' };
      const isSelected = selectedTooth === toothNumber;
      const isMultiSelected = selectedTeeth.has(toothNumber);
      const hasIssue = caseEntries.some(entry => 
        entry.toothNumber === toothNumber && 
        ['complaint', 'finding', 'diagnosis'].includes(entry.type)
      );
      
      return (
        <div
          key={toothNumber}
          className={`${isMobileView ? 'w-6 h-8 text-xs' : 'w-8 h-10 text-xs'} ${toothStatuses[tooth.status]?.color || 'bg-green-500'} 
            cursor-pointer border-2 flex items-center justify-center font-bold text-white
            ${isSelected ? 'border-black ring-2 ring-black' : 'border-white'} 
            ${isMultiSelected ? 'ring-4 ring-blue-400 border-blue-600' : ''} 
            ${hasIssue ? 'ring-2 ring-red-400' : ''}
            hover:opacity-75 transition-all touch-manipulation relative`}
          onClick={() => {
            // Always handle multi-select (enabled by default)
            toggleToothSelection(toothNumber);
            
            // Also set single selected tooth for forms
            setSelectedTooth(toothNumber);
            if (showAddEntry.show) {
              setNewEntryForm({ ...newEntryForm, toothNumber });
            }
          }}
          title={`Tooth ${toothNumber}: ${tooth.condition || tooth.status}${
            isMultiSelected ? ' (Selected)' : ''
          }`}
        >
          {toothNumber}
          {isMultiSelected && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-white">
              <span className="text-xs">✓</span>
            </div>
          )}
        </div>
      );
    };
    
    // Smart positioning classes for BOTH mobile and desktop - optimized for demo
    const chartClasses = [
      'transition-all duration-300 ease-in-out',
      dentalChartPosition === 'fixed' ? (
        isMobileView 
          ? 'fixed top-4 right-4 z-50 w-80 max-w-[90vw] bg-white rounded-lg shadow-2xl border-2 border-blue-200'
          : 'fixed top-20 right-8 z-50 w-96 bg-white rounded-lg shadow-2xl border-2 border-indigo-300 ring-1 ring-indigo-100'
      ) : '',
      dentalChartPosition === 'fixed' ? 'transform-gpu' : '',
    ].filter(Boolean).join(' ');
    
    return (
      <Card 
        ref={dentalChartRef}
        className={chartClasses}
      >
        <CardHeader className={dentalChartPosition === 'fixed' && isMobileView ? 'pb-2' : ''}>
          {/* Main Header */}
          <div className="flex items-center justify-between">
            <CardTitle className={`${isMobileView ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
              🦷 Dental Chart
              {dentalChartPosition === 'fixed' && (
                <Badge className={`text-xs ${
                  isMobileView 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {isMobileView ? 'Mobile' : 'Desktop'} • Smart Position
                </Badge>
              )}
              {selectedTeeth.size > 0 && (
                <Badge variant="default" className="text-xs bg-blue-100 text-blue-800">
                  {selectedTeeth.size} selected
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              {/* Smart position mode: Only show view toggle, no pre-marking */}
              {dentalChartPosition === 'fixed' ? (
                <Button
                  variant={chartViewMode === 'premarked' ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setChartViewMode(chartViewMode === 'full' ? 'premarked' : 'full');
                  }}
                  className="text-xs h-6"
                  disabled={preMarkedTeeth.size === 0}
                >
                  {chartViewMode === 'full' ? '🦷 Pre-marked' : '🌐 All Teeth'}
                </Button>
              ) : (
                /* Inline mode: Show both view toggle and pre-marking */
                <>
                  <Button
                    variant={chartViewMode === 'premarked' ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setChartViewMode(chartViewMode === 'full' ? 'premarked' : 'full');
                    }}
                    className="text-xs h-6"
                    disabled={preMarkedTeeth.size === 0}
                  >
                    {chartViewMode === 'full' ? '🦷 Show Pre-marked' : '🌐 Show All'}
                  </Button>
                  <Button
                    variant={showPreMarkingPanel ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowPreMarkingPanel(!showPreMarkingPanel)}
                    className="text-xs h-6"
                  >
                    Pre-mark Mode
                  </Button>
                </>
              )}
              {dentalChartPosition === 'fixed' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDentalChartPosition('inline')}
                  className={`h-6 w-6 p-0 ${
                    isMobileView ? 'hover:bg-gray-100' : 'hover:bg-indigo-50'
                  }`}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Pre-marking Panel - Horizontal Foldout (Only in inline mode) */}
          {showPreMarkingPanel && dentalChartPosition === 'inline' && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 animate-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-gray-700">Select section to pre-mark teeth:</p>
                {selectedTeeth.size > 0 && preMarkedSection && (
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      onClick={() => createDraftsFromPreMarked(false)}
                      className="text-xs h-6 px-2"
                    >
                      {selectedTeeth.size} Individual Draft{selectedTeeth.size > 1 ? 's' : ''}
                    </Button>
                    {selectedTeeth.size > 1 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => createDraftsFromPreMarked(true)}
                        className="text-xs h-6 px-2"
                      >
                        1 Multi-Tooth Draft
                      </Button>
                    )}
                  </div>
                )}
              </div>
              
              {/* Section Icons with Multi-select */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { type: 'complaint', label: 'Chief Complaint', icon: '🩺', color: 'text-red-600' },
                  { type: 'finding', label: 'Clinical Finding', icon: '📝', color: 'text-blue-600' },
                  { type: 'investigation', label: 'Investigation', icon: '📷', color: 'text-purple-600' },
                  { type: 'diagnosis', label: 'Diagnosis', icon: '📄', color: 'text-orange-600' },
                  { type: 'treatment-plan', label: 'Treatment Plan', icon: '📋', color: 'text-green-600' }
                ].map(({ type, label, icon, color }) => (
                  <Button
                    key={type}
                    variant={preMarkedSection === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => preMarkTeethForSection(type)}
                    className={`text-xs h-8 px-3 ${color} flex items-center gap-2`}
                  >
                    <span className="text-sm">{icon}</span>
                    {isMobileView ? type.split('-')[0] : label}
                  </Button>
                ))}
              </div>

              {preMarkedSection && (
                <div className="mt-2 text-xs text-gray-600 bg-white p-2 rounded border">
                  <p className="font-medium text-blue-700 mb-1">🎯 Pre-marking mode active: {preMarkedSection}</p>
                  <p>• Click teeth from the ENTIRE tooth list to select multiple</p>
                  <p>• Selected teeth will create empty drafts in the {preMarkedSection} section</p>
                  <p>• Use the toggle button to switch between all teeth and pre-marked teeth view</p>
                </div>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className={dentalChartPosition === 'fixed' && isMobileView ? 'pb-2' : ''}>
          <div className={`space-y-${isMobileView ? '2' : '4'}`}>
            <div className="text-center">
              <h3 className={`text-${isMobileView ? 'xs' : 'sm'} font-semibold mb-${isMobileView ? '1' : '2'}`}>Upper Arch</h3>
              <div className={`flex justify-center gap-${isMobileView ? '0.5' : '1'} flex-wrap`}>
                {getFilteredTeeth(upperTeeth).map(renderTooth)}
              </div>
              {chartViewMode === 'premarked' && getFilteredTeeth(upperTeeth).length === 0 && (
                <p className="text-xs text-gray-500 mt-1">No pre-marked teeth in upper arch</p>
              )}
            </div>
            
            <div className="text-center">
              <h3 className={`text-${isMobileView ? 'xs' : 'sm'} font-semibold mb-${isMobileView ? '1' : '2'}`}>Lower Arch</h3>
              <div className={`flex justify-center gap-${isMobileView ? '0.5' : '1'} flex-wrap`}>
                {getFilteredTeeth(lowerTeeth).map(renderTooth)}
              </div>
              {chartViewMode === 'premarked' && getFilteredTeeth(lowerTeeth).length === 0 && (
                <p className="text-xs text-gray-500 mt-1">No pre-marked teeth in lower arch</p>
              )}
            </div>
            
            {/* Responsive legend - desktop gets full legend */}
            <div className={`flex ${isMobileView ? 'justify-center gap-2 text-xs flex-wrap' : 'justify-center gap-3 text-xs'}`}>
              {Object.entries(toothStatuses).slice(0, isMobileView ? 3 : Object.entries(toothStatuses).length).map(([status, config]) => (
                <div key={status} className="flex items-center gap-1">
                  <div className={`${isMobileView ? 'w-2 h-2' : 'w-3 h-3'} ${config.color} rounded`}></div>
                  <span className="text-xs">{config.label}</span>
                </div>
              ))}
              {isMobileView && Object.entries(toothStatuses).length > 3 && (
                <span className="text-xs text-gray-500">+{Object.entries(toothStatuses).length - 3} more</span>
              )}
            </div>

            {/* Smart instructions based on viewport */}
            {dentalChartPosition === 'fixed' && (
              <div className="text-center">
                <p className={`text-xs text-gray-600 ${
                  isMobileView 
                    ? 'bg-gray-50 p-2 rounded' 
                    : 'bg-indigo-50 p-2 rounded border border-indigo-100'
                } ${dentalChartPosition === 'fixed' ? 'animate-pulse' : ''}`}>
                  {isMobileView 
                    ? '👆 Tap any tooth to select • Chart follows active forms'
                    : '🖱️ Click any tooth to select for the active form • Smart positioning active'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Focus Mode Clinical Entry Interface */}
          {isFocusMode && selectedTeeth.size > 0 && (
            <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-blue-900">
                    Create Clinical Entry for Selected Teeth
                  </h3>
                  <p className="text-sm text-blue-700">
                    Selected: {Array.from(selectedTeeth).map(tooth => `#${tooth}`).join(', ')}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedTeeth(new Set())}
                  className="text-blue-700 border-blue-300 hover:bg-blue-100"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {[
                  { type: 'complaint', label: 'Complaint', icon: Stethoscope, color: 'bg-red-100 hover:bg-red-200 text-red-700' },
                  { type: 'finding', label: 'Finding', icon: Edit3, color: 'bg-blue-100 hover:bg-blue-200 text-blue-700' },
                  { type: 'investigation', label: 'Investigation', icon: Camera, color: 'bg-purple-100 hover:bg-purple-200 text-purple-700' },
                  { type: 'diagnosis', label: 'Diagnosis', icon: FileText, color: 'bg-orange-100 hover:bg-orange-200 text-orange-700' },
                  { type: 'treatment-plan', label: 'Treatment', icon: CalendarCheck, color: 'bg-green-100 hover:bg-green-200 text-green-700' },
                  { type: 'procedure', label: 'Procedure', icon: Activity, color: 'bg-teal-100 hover:bg-teal-200 text-teal-700' },
                  { type: 'note', label: 'Note', icon: MessageSquare, color: 'bg-gray-100 hover:bg-gray-200 text-gray-700' }
                ].map(({ type, label, icon: Icon, color }) => (
                  <Button
                    key={type}
                    variant="outline"
                    size="sm"
                    className={`${color} border-2 flex flex-col items-center gap-1 h-auto py-2`}
                    onClick={() => {
                      if (type === 'treatment-plan') {
                        setActiveTreatmentForm({
                          selectedTeeth: Array.from(selectedTeeth),
                          selectedService: null,
                          serviceDetails: {},
                          showForm: true
                        });
                      } else if (type === 'procedure') {
                        setActiveProcedureForm({
                          treatmentPlanId: null,
                          procedureSets: [],
                          showForm: true
                        });
                      } else {
                        setNewEntryForm({ 
                          type, 
                          description: '', 
                          toothNumber: Array.from(selectedTeeth)[0] || null,
                          severity: 0,
                          showDropdown: false
                        });
                        setActiveFormPosition({ top: 0, height: 400 });
                      }
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{label}</span>
                  </Button>
                ))}
              </div>

              <div className="text-xs text-blue-600 text-center">
                💡 Select an entry type above to create a clinical record for the selected teeth
              </div>
            </div>
          )}

          {/* Enhanced Treatment Plan Form */}
          {activeTreatmentForm.showForm && (
            <div className="mt-6 p-6 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-green-900">
                    Treatment Plan for Selected Teeth
                  </h3>
                  <p className="text-sm text-green-700">
                    Teeth: {activeTreatmentForm.selectedTeeth.map(tooth => `#${tooth}`).join(', ')}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveTreatmentForm(prev => ({ ...prev, showForm: false }))}
                  className="text-green-700 border-green-300 hover:bg-green-100"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-green-900 mb-2">
                    Select Treatment Service
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(treatmentServices).map(([serviceId, service]) => (
                      <div
                        key={serviceId}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          activeTreatmentForm.selectedService === serviceId
                            ? 'border-green-500 bg-green-100'
                            : 'border-green-200 bg-white hover:border-green-300'
                        }`}
                        onClick={() => setActiveTreatmentForm(prev => ({
                          ...prev,
                          selectedService: serviceId,
                          serviceDetails: service
                        }))}
                      >
                        <h4 className="font-medium text-green-900">{service.name}</h4>
                        <p className="text-xs text-green-600">
                          {service.steps} steps • {service.visitCount} visit{service.visitCount > 1 ? 's' : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {activeTreatmentForm.selectedService && (
                  <div className="p-4 bg-white border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">
                      Service Details: {treatmentServices[activeTreatmentForm.selectedService as keyof typeof treatmentServices].name}
                    </h4>
                    <div className="text-sm text-green-700 space-y-1">
                      {treatmentServices[activeTreatmentForm.selectedService as keyof typeof treatmentServices].stepTemplate.map((visit, idx) => (
                        <div key={idx} className="ml-2">
                          <span className="font-medium">Visit {visit.visit}:</span> {visit.steps.join(', ')}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTreatmentForm(prev => ({ ...prev, showForm: false }))}
                    className="text-green-700 border-green-300 hover:bg-green-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      if (activeTreatmentForm.selectedService) {
                        // Create treatment plan entry
                        const newEntry: CaseEntry = {
                          id: Date.now().toString(),
                          type: 'treatment-plan',
                          description: `${treatmentServices[activeTreatmentForm.selectedService as keyof typeof treatmentServices].name} - ${activeTreatmentForm.selectedTeeth.map(t => `#${t}`).join(', ')}`,
                          teeth: activeTreatmentForm.selectedTeeth.map(num => ({ number: num })),
                          timestamp: new Date(),
                          status: 'draft'
                        };
                        setCaseEntries(prev => [...prev, newEntry]);
                        setActiveTreatmentForm({
                          selectedTeeth: [],
                          selectedService: null,
                          serviceDetails: {},
                          showForm: false
                        });
                        setSelectedTeeth(new Set());
                      }
                    }}
                    disabled={!activeTreatmentForm.selectedService}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Create Treatment Plan
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Procedure Form */}
          {activeProcedureForm.showForm && (
            <div className="mt-6 p-6 bg-teal-50 border-2 border-teal-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-teal-900">
                    Create Procedure Sets
                  </h3>
                  <p className="text-sm text-teal-700">
                    Allocate procedures across multiple appointments
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveProcedureForm(prev => ({ ...prev, showForm: false }))}
                  className="text-teal-700 border-teal-300 hover:bg-teal-100"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Select Treatment Plan */}
                <div>
                  <label className="block text-sm font-medium text-teal-900 mb-2">
                    Select Related Treatment Plan (Optional)
                  </label>
                  <select
                    value={activeProcedureForm.treatmentPlanId || ''}
                    onChange={(e) => setActiveProcedureForm(prev => ({
                      ...prev,
                      treatmentPlanId: e.target.value || null
                    }))}
                    className="w-full p-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">-- No Treatment Plan --</option>
                    {caseEntries
                      .filter(entry => entry.type === 'treatment-plan')
                      .map(entry => (
                        <option key={entry.id} value={entry.id}>
                          {entry.description}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Procedure Sets */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-teal-900">
                      Procedure Sets
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newProcedureSet = {
                          id: `set_${Date.now()}`,
                          name: `Procedure Set ${activeProcedureForm.procedureSets.length + 1}`,
                          steps: [{
                            stepNumber: 1,
                            description: '',
                            toothNumber: null,
                            appointmentDate: '',
                            appointmentTime: '',
                            duration: 60,
                            notes: ''
                          }]
                        };
                        setActiveProcedureForm(prev => ({
                          ...prev,
                          procedureSets: [...prev.procedureSets, newProcedureSet]
                        }));
                      }}
                      className="text-teal-700 border-teal-300 hover:bg-teal-100"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Procedure Set
                    </Button>
                  </div>

                  {activeProcedureForm.procedureSets.map((procedureSet, setIndex) => (
                    <div key={procedureSet.id} className="p-4 bg-white border border-teal-200 rounded-lg mb-3">
                      <div className="flex items-center justify-between mb-3">
                        <input
                          type="text"
                          value={procedureSet.name}
                          onChange={(e) => {
                            const updatedSets = [...activeProcedureForm.procedureSets];
                            updatedSets[setIndex].name = e.target.value;
                            setActiveProcedureForm(prev => ({ ...prev, procedureSets: updatedSets }));
                          }}
                          className="font-medium text-teal-900 bg-transparent border-none focus:outline-none focus:underline"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updatedSets = activeProcedureForm.procedureSets.filter((_, idx) => idx !== setIndex);
                            setActiveProcedureForm(prev => ({ ...prev, procedureSets: updatedSets }));
                          }}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {procedureSet.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 p-3 bg-gray-50 rounded">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                            <input
                              type="text"
                              value={step.description}
                              onChange={(e) => {
                                const updatedSets = [...activeProcedureForm.procedureSets];
                                updatedSets[setIndex].steps[stepIndex].description = e.target.value;
                                setActiveProcedureForm(prev => ({ ...prev, procedureSets: updatedSets }));
                              }}
                              className="w-full p-2 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-teal-500"
                              placeholder="e.g., Root canal preparation"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Tooth</label>
                            <select
                              value={step.toothNumber || ''}
                              onChange={(e) => {
                                const updatedSets = [...activeProcedureForm.procedureSets];
                                updatedSets[setIndex].steps[stepIndex].toothNumber = e.target.value ? parseInt(e.target.value) : null;
                                setActiveProcedureForm(prev => ({ ...prev, procedureSets: updatedSets }));
                              }}
                              className="w-full p-2 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-teal-500"
                            >
                              <option value="">-- All Selected --</option>
                              {Array.from(selectedTeeth).map(tooth => (
                                <option key={tooth} value={tooth}>#{tooth}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                              <input
                                type="date"
                                value={step.appointmentDate}
                                onChange={(e) => {
                                  const updatedSets = [...activeProcedureForm.procedureSets];
                                  updatedSets[setIndex].steps[stepIndex].appointmentDate = e.target.value;
                                  setActiveProcedureForm(prev => ({ ...prev, procedureSets: updatedSets }));
                                }}
                                className="w-full p-2 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-teal-500"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Time</label>
                              <input
                                type="time"
                                value={step.appointmentTime}
                                onChange={(e) => {
                                  const updatedSets = [...activeProcedureForm.procedureSets];
                                  updatedSets[setIndex].steps[stepIndex].appointmentTime = e.target.value;
                                  setActiveProcedureForm(prev => ({ ...prev, procedureSets: updatedSets }));
                                }}
                                className="w-full p-2 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-teal-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const updatedSets = [...activeProcedureForm.procedureSets];
                          const newStep = {
                            stepNumber: procedureSet.steps.length + 1,
                            description: '',
                            toothNumber: null,
                            appointmentDate: '',
                            appointmentTime: '',
                            duration: 60,
                            notes: ''
                          };
                          updatedSets[setIndex].steps.push(newStep);
                          setActiveProcedureForm(prev => ({ ...prev, procedureSets: updatedSets }));
                        }}
                        className="text-teal-600 border-teal-300 hover:bg-teal-50"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Step
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setActiveProcedureForm(prev => ({ ...prev, showForm: false }))}
                    className="text-teal-700 border-teal-300 hover:bg-teal-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      if (activeProcedureForm.procedureSets.length > 0) {
                        // Create procedure entries for each set
                        activeProcedureForm.procedureSets.forEach(procedureSet => {
                          const newEntry: CaseEntry = {
                            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                            type: 'procedure',
                            description: `${procedureSet.name} - ${procedureSet.steps.length} steps`,
                            teeth: Array.from(selectedTeeth).map(num => ({ number: num })),
                            timestamp: new Date(),
                            status: 'draft',
                            procedureData: {
                              ...procedureSet,
                              treatmentPlanId: activeProcedureForm.treatmentPlanId
                            }
                          };
                          setCaseEntries(prev => [...prev, newEntry]);
                        });

                        setActiveProcedureForm({
                          treatmentPlanId: null,
                          procedureSets: [],
                          showForm: false
                        });
                        setSelectedTeeth(new Set());
                      }
                    }}
                    disabled={activeProcedureForm.procedureSets.length === 0}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    Create Procedure Sets
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // Main Clinical Work Area (Center)
  const ClinicalWorkArea = () => {
    const entryTypes = [
      { type: 'complaint', label: 'Chief Complaint', icon: Stethoscope, color: 'text-red-600' },
      { type: 'finding', label: 'Clinical Finding', icon: Edit3, color: 'text-blue-600' },
      { type: 'investigation', label: 'Investigation', icon: Camera, color: 'text-purple-600' },
      { type: 'diagnosis', label: 'Diagnosis', icon: FileText, color: 'text-orange-600' },
      { type: 'treatment-plan', label: 'Treatment Plan', icon: CalendarCheck, color: 'text-green-600' },
      { type: 'procedure', label: 'Procedure', icon: Activity, color: 'text-teal-600' },
      { type: 'note', label: 'Case Note', icon: MessageSquare, color: 'text-gray-600' }
    ];

    const getEntriesByType = (type: string) => {
      return caseEntries.filter(entry => entry.type === type);
    };

    // Check if procedure section should be unlocked
    const hasActiveProposedCases = caseEntries.some(entry => 
      (entry.status === 'proposed' || caseStatuses[entry.id] === 'proposed') &&
      ['treatment-plan', 'diagnosis'].includes(entry.type)
    );

    // Get case background color based on status
    const getCaseBackgroundColor = (entry: CaseEntry) => {
      const status = entry.status || caseStatuses[entry.id] || 'draft';
      switch(status) {
        case 'proposed': return 'bg-green-50 border-l-4 border-l-green-500';
        case 'cancelled': return 'bg-red-50 border-l-4 border-l-red-500';
        case 'draft': 
        default: return 'bg-yellow-50 border-l-4 border-l-yellow-500';
      }
    };

    return (
      <div ref={clinicalWorkAreaRef} className="space-y-4">
        {/* Case Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Clinical Case Sheet</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Case #2025-{patient.id.toString().padStart(3, '0')} • Started: {new Date().toLocaleDateString('en-IN')}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Dental Chart - Conditionally positioned based on mobile strategy */}
        {dentalChartPosition === 'inline' && <ToothChart />}

        {/* Case Entries by Section */}
        {entryTypes.map(({ type, label, icon: Icon, color }) => {
          const allEntries = getEntriesByType(type);
          const draftEntries = allEntries.filter(entry => 
            (entry.status || caseStatuses[entry.id] || 'draft') === 'draft'
          );
          const nonDraftEntries = allEntries.filter(entry => 
            (entry.status || caseStatuses[entry.id] || 'draft') !== 'draft'
          );
          const isDraftExpanded = expandedDraftSections.has(type);
          const entries = isDraftExpanded ? allEntries : nonDraftEntries;
          
          const isProcedureSection = type === 'procedure';
          const isLocked = isProcedureSection && !hasActiveProposedCases;
          
          return (
            <Card key={type} className={isLocked ? 'opacity-60 bg-gray-50' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-base flex items-center gap-2 ${color}`}>
                    <Icon className="w-5 h-5" />
                    {label}
                    {draftEntries.length > 0 && (
                      <div className="flex items-center gap-1">
                        <div 
                          className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-yellow-500 cursor-pointer"
                          onClick={() => {
                            const newExpanded = new Set(expandedDraftSections);
                            if (isDraftExpanded) {
                              newExpanded.delete(type);
                            } else {
                              newExpanded.add(type);
                            }
                            setExpandedDraftSections(newExpanded);
                          }}
                          title={`${draftEntries.length} draft${draftEntries.length > 1 ? 's' : ''} - click to ${isDraftExpanded ? 'hide' : 'show'}`}
                        />
                        <span className="text-xs text-yellow-600 font-medium">
                          {draftEntries.length}
                        </span>
                        {draftEntries.length > 1 && isDraftExpanded && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs ml-1"
                            onClick={() => {
                              if (showMergeMode === type) {
                                setShowMergeMode(null);
                                setSelectedForMerge(new Set());
                              } else {
                                setShowMergeMode(type);
                                setSelectedForMerge(new Set());
                              }
                            }}
                          >
                            {showMergeMode === type ? '✗ Cancel' : '🔗 Merge'}
                          </Button>
                        )}
                      </div>
                    )}
                    {isProcedureSection && (
                      <div className="ml-2">
                        {isLocked ? (
                          <Badge variant="secondary" className="text-xs">
                            🔒 Locked
                          </Badge>
                        ) : (
                          <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                            🔓 Unlocked
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowAddEntry({ type, show: true });
                      // Expand drafts when adding new entry
                      if (draftEntries.length > 0) {
                        setExpandedDraftSections(prev => new Set([...prev, type]));
                      }
                    }}
                    disabled={isLocked}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
                {isProcedureSection && (
                  <div className="text-sm text-gray-600 mt-2">
                    {isLocked ? (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2">
                        <p>🔒 Procedure section is locked. You need active proposed treatment cases to unlock this section.</p>
                      </div>
                    ) : (
                      <div className="bg-green-50 border border-green-200 rounded-md p-2">
                        <p>🔓 Procedure section unlocked - you have active proposed treatment cases</p>
                      </div>
                    )}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {/* Add Entry Form */}
                {showAddEntry.show && showAddEntry.type === type && (
                  <div 
                    ref={activeFormRef}
                    className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"
                  >
                    <div className="space-y-3">
                      {/* Description Input with Dropdown */}
                      <div className="relative">
                        <Label className="text-sm">
                          {type === 'complaint' ? 'Complaint' : 'Finding'} Description
                        </Label>
                        <div className="relative mt-1">
                          <Input
                            placeholder={`Enter ${label.toLowerCase()}...`}
                            value={newEntryForm.description}
                            onChange={(e) => {
                              setNewEntryForm({ ...newEntryForm, description: e.target.value });
                              setNewEntryForm({ ...newEntryForm, showDropdown: true });
                            }}
                            onFocus={() => setNewEntryForm({ ...newEntryForm, showDropdown: true })}
                            className="pr-10"
                          />
                          <ChevronDown 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
                            onClick={() => setNewEntryForm({ ...newEntryForm, showDropdown: !newEntryForm.showDropdown })}
                          />
                        </div>
                        
                        {/* Common Tags Dropdown */}
                        {newEntryForm.showDropdown && (
                          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-48 overflow-auto">
                            {(type === 'complaint' ? commonComplaints : commonFindings)
                              .filter(tag => tag.toLowerCase().includes(newEntryForm.description.toLowerCase()))
                              .map((tag, idx) => (
                                <div
                                  key={idx}
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                  onClick={() => {
                                    setNewEntryForm({ ...newEntryForm, description: tag, showDropdown: false });
                                  }}
                                >
                                  {tag}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Tooth Selection - Enhanced for Multi-select */}
                      <div>
                        <Label className="text-sm mb-1">Associated Tooth/Teeth</Label>
                        <div className="flex items-center gap-2 flex-wrap">
                          {selectedTeeth.size > 0 ? (
                            Array.from(selectedTeeth).map(toothNum => (
                              <Badge key={toothNum} variant="default" className="text-xs">
                                Tooth #{toothNum}
                                <X 
                                  className="h-3 w-3 ml-1 cursor-pointer" 
                                  onClick={() => toggleToothSelection(toothNum)}
                                />
                              </Badge>
                            ))
                          ) : newEntryForm.toothNumber ? (
                            <Badge variant="default">
                              Tooth #{newEntryForm.toothNumber}
                              <X 
                                className="h-3 w-3 ml-1 cursor-pointer" 
                                onClick={() => setNewEntryForm({ ...newEntryForm, toothNumber: null })}
                              />
                            </Badge>
                          ) : (
                            <Badge variant="outline">No teeth selected</Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {preMarkedSection ? 
                            'Multi-select mode: Click teeth in diagram to select multiple' : 
                            'Click on a tooth in the diagram to associate'
                          }
                        </p>
                      </div>

                      {/* Enhanced Notes Field */}
                      <div>
                        <Label className="text-sm mb-1">Notes (Optional)</Label>
                        <Textarea
                          placeholder="Add detailed notes about this entry..."
                          value={newEntryNote}
                          onChange={(e) => setNewEntryNote(e.target.value)}
                          className="min-h-[60px] text-sm"
                        />
                      </div>
                      
                      {/* Beautiful Gradient Pain Scale for Complaints */}
                      {type === 'complaint' && (
                        <div>
                          <Label className="text-sm mb-2">Pain Level (0-10)</Label>
                          <div className="space-y-4">
                            <div className="px-2">
                              <GradientSlider
                                value={[newEntryForm.severity]}
                                onValueChange={(value) => setNewEntryForm({ ...newEntryForm, severity: value[0] })}
                                min={0}
                                max={10}
                                step={1}
                                gradientColors={["#10b981", "#84cc16", "#eab308", "#f59e0b", "#ef4444"]}
                                tooltipContent={(value) => 
                                  `${value}/10: ${painScaleDescriptions[value].label}`
                                }
                                className="w-full"
                              />
                              {/* Scale markers */}
                              <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                                <span>0</span>
                                <span>2</span>
                                <span>4</span>
                                <span>6</span>
                                <span>8</span>
                                <span>10</span>
                              </div>
                            </div>
                            {/* Pain Description */}
                            <div className="text-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 border">
                              <div className="flex items-center justify-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ 
                                    background: newEntryForm.severity <= 3 ? '#10b981' : 
                                               newEntryForm.severity <= 6 ? '#eab308' : '#ef4444'
                                  }}
                                />
                                <span className={`text-sm font-semibold ${painScaleDescriptions[newEntryForm.severity].color}`}>
                                  Level {newEntryForm.severity}: {painScaleDescriptions[newEntryForm.severity].label}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setShowAddEntry({ type: '', show: false });
                            setNewEntryForm({
                              type: '',
                              description: '',
                              toothNumber: null,
                              severity: 0,
                              showDropdown: false
                            });
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => addCaseEntry(type)}
                          disabled={!newEntryForm.description.trim()}
                        >
                          Add {label}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {entries.length === 0 && !showAddEntry.show ? (
                  <p className="text-sm text-gray-500 italic">No {label.toLowerCase()}s recorded</p>
                ) : type === 'procedure' ? (
                  // Enhanced procedure display grouped by treatment plan
                  <div className="space-y-4">
                    {Object.entries(groupProceduresByTreatmentPlan(entries)).map(([groupId, group]) => (
                      <div key={groupId} className="border border-gray-200 rounded-lg overflow-hidden">
                        {/* Treatment Plan Header */}
                        {group.treatmentPlan ? (
                          <div className="bg-green-50 border-b border-green-200 p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-semibold text-green-900">
                                  📋 {group.treatmentPlan.description}
                                </h4>
                                <p className="text-xs text-green-700">
                                  {group.procedures.length} Procedure Set{group.procedures.length > 1 ? 's' : ''}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs text-green-700 border-green-300">
                                Treatment Plan
                              </Badge>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gray-50 border-b border-gray-200 p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700">
                                  🔧 Independent Procedures
                                </h4>
                                <p className="text-xs text-gray-600">
                                  {group.procedures.length} Procedure Set{group.procedures.length > 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Procedure Sets */}
                        <div className="divide-y divide-gray-100">
                          {group.procedures.map(entry => {
                            const currentStatus = entry.status || caseStatuses[entry.id] || 'draft';
                            const entryAttachments = caseAttachments[entry.id] || [];
                            
                            return (
                              <div 
                                key={entry.id} 
                                className={`p-4 ${getCaseBackgroundColor(entry)}`}
                              >
                                {showMergeMode === type && currentStatus === 'draft' && (
                                  <div className="flex items-center gap-2 mb-2">
                                    <input
                                      type="checkbox"
                                      checked={selectedForMerge.has(entry.id)}
                                      onChange={(e) => {
                                        const newSelected = new Set(selectedForMerge);
                                        if (e.target.checked) {
                                          newSelected.add(entry.id);
                                        } else {
                                          newSelected.delete(entry.id);
                                        }
                                        setSelectedForMerge(newSelected);
                                      }}
                                    />
                                    <label className="text-xs text-gray-600">Select for merge</label>
                                  </div>
                                )}
                                
                                <div className="flex items-start gap-3">
                                  {entry.teeth && entry.teeth.length > 0 && (
                                    <Badge variant="outline" className="mt-0.5">
                                      Teeth: {entry.teeth.map(t => `#${t.number}`).join(', ')}
                                    </Badge>
                                  )}
                                  
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex-1">
                                        <p className="text-sm font-medium">{entry.description}</p>
                                        
                                        {/* Enhanced procedure steps display */}
                                        {entry.procedureData && entry.procedureData.steps && (
                                          <div className="mt-3 p-3 bg-white border border-gray-200 rounded-lg">
                                            <h5 className="text-xs font-semibold text-gray-700 mb-2">
                                              📅 Procedure Steps ({entry.procedureData.steps.length})
                                            </h5>
                                            <div className="space-y-2">
                                              {entry.procedureData.steps.map((step, idx) => (
                                                <div key={idx} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded">
                                                  <div className="flex-1">
                                                    <span className="font-medium">
                                                      Step {step.stepNumber}: {step.description}
                                                    </span>
                                                    {step.toothNumber && (
                                                      <span className="ml-2 text-gray-600">
                                                        (Tooth #{step.toothNumber})
                                                      </span>
                                                    )}
                                                  </div>
                                                  {step.appointmentDate && (
                                                    <div className="text-right">
                                                      <p className="text-gray-600">
                                                        📅 {step.appointmentDate}
                                                      </p>
                                                      {step.appointmentTime && (
                                                        <p className="text-gray-600">
                                                          🕐 {step.appointmentTime}
                                                        </p>
                                                      )}
                                                    </div>
                                                  )}
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>

                                      {/* Status management */}
                                      <div className="flex items-center gap-2 ml-2">
                                        <Select 
                                          value={currentStatus} 
                                          onValueChange={(value: '' | 'draft' | 'proposed' | 'cancelled') => 
                                            updateCaseStatus(entry.id, value as 'draft' | 'proposed' | 'cancelled')
                                          }
                                        >
                                          <SelectTrigger className="w-24 h-6 text-xs">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="proposed">Proposed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>

                                    {/* Notes and attachments */}
                                    {entry.notes && (
                                      <p className="text-xs text-gray-600 mt-1 italic">
                                        Note: {entry.notes}
                                      </p>
                                    )}

                                    {entryAttachments.length > 0 && (
                                      <div className="mt-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="text-xs h-6 px-2"
                                          onClick={() => {
                                            const expanded = new Set(expandedAttachments);
                                            if (expanded.has(entry.id)) {
                                              expanded.delete(entry.id);
                                            } else {
                                              expanded.add(entry.id);
                                            }
                                            setExpandedAttachments(expanded);
                                          }}
                                        >
                                          <Paperclip className="w-3 h-3 mr-1" />
                                          {entryAttachments.length} attachment{entryAttachments.length > 1 ? 's' : ''}
                                        </Button>
                                        
                                        {expandedAttachments.has(entry.id) && (
                                          <div className="mt-1 space-y-1">
                                            {entryAttachments.map((attachment, idx) => (
                                              <div key={idx} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                                📎 {attachment}
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    <div className="flex justify-between items-center mt-2">
                                      <span className="text-xs text-gray-500">
                                        {entry.timestamp.toLocaleString()}
                                      </span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs h-6 px-2"
                                        onClick={() => simulateFileUpload(entry.id)}
                                      >
                                        <Paperclip className="w-3 h-3 mr-1" />
                                        Add File
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {entries.map(entry => {
                      const currentStatus = entry.status || caseStatuses[entry.id] || 'draft';
                      const entryAttachments = caseAttachments[entry.id] || [];
                      
                      return (
                        <div 
                          key={entry.id} 
                          className={`flex items-start gap-3 p-3 rounded-lg ${getCaseBackgroundColor(entry)}`}
                        >
                          {showMergeMode === type && currentStatus === 'draft' && (
                            <input
                              type="checkbox"
                              checked={selectedForMerge.has(entry.id)}
                              onChange={(e) => {
                                const newSelected = new Set(selectedForMerge);
                                if (e.target.checked) {
                                  newSelected.add(entry.id);
                                } else {
                                  newSelected.delete(entry.id);
                                }
                                setSelectedForMerge(newSelected);
                              }}
                              className="mt-1"
                            />
                          )}
                          {entry.toothNumber && (
                            <Badge variant="outline" className="mt-0.5">
                              Tooth #{entry.toothNumber}
                            </Badge>
                          )}
                          {entry.teeth && entry.teeth.length > 0 && (
                            <Badge variant="outline" className="mt-0.5">
                              Teeth: {entry.teeth.map(t => `#${t.number}`).join(', ')}
                            </Badge>
                          )}
                          <div className="flex-1">
                            {/* Entry header with status */}
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <p className="text-sm font-medium">{entry.description}</p>
                                
                                {/* Treatment details for treatment plans */}
                                {entry.treatmentDetails && (
                                  <div className="mt-2 p-2 bg-white rounded border">
                                    <p className="text-xs font-semibold text-gray-700 mb-1">Treatment Details:</p>
                                    <div className="text-xs text-gray-600 space-y-1">
                                      <p><span className="font-medium">Procedure:</span> {entry.treatmentDetails.procedure}</p>
                                      <p><span className="font-medium">Estimated Cost:</span> ₹{entry.treatmentDetails.estimatedCost.toLocaleString()}</p>
                                      <p><span className="font-medium">Duration:</span> {entry.treatmentDetails.duration}</p>
                                      <p>
                                        <span className="font-medium">Priority:</span> 
                                        <Badge 
                                          variant={entry.treatmentDetails.priority === 'high' ? 'destructive' : 'secondary'} 
                                          className="ml-1 text-xs"
                                        >
                                          {entry.treatmentDetails.priority}
                                        </Badge>
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Status management dropdown */}
                              <div className="flex items-center gap-2 ml-2">
                                <Select 
                                  value={currentStatus} 
                                  onValueChange={(value: '' | 'draft' | 'proposed' | 'cancelled') => 
                                    updateCaseStatus(entry.id, value as 'draft' | 'proposed' | 'cancelled')
                                  }
                                >
                                  <SelectTrigger className="w-24 h-6 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="proposed">Proposed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            {/* Severity display */}
                            {entry.severity !== undefined && (
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-600">Pain:</span>
                                <div className="flex items-center gap-1">
                                  <span className={`text-sm font-medium ${painScaleDescriptions[entry.severity].color}`}>
                                    {entry.severity}/10
                                  </span>
                                  <span className={`text-xs ${painScaleDescriptions[entry.severity].color}`}>
                                    ({painScaleDescriptions[entry.severity].label})
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Notes */}
                            {entry.notes && (
                              <p className="text-xs text-gray-600 mt-1 italic">
                                Note: {entry.notes}
                              </p>
                            )}

                            {/* Enhanced attachments and notes display */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                {entryAttachments.length > 0 && (
                                  <Badge 
                                    variant="secondary" 
                                    className="text-xs cursor-pointer hover:bg-gray-200 transition-colors"
                                    onClick={() => {
                                      const newExpanded = new Set(expandedAttachments);
                                      if (expandedAttachments.has(entry.id)) {
                                        newExpanded.delete(entry.id);
                                      } else {
                                        newExpanded.add(entry.id);
                                      }
                                      setExpandedAttachments(newExpanded);
                                    }}
                                  >
                                    📎 {entryAttachments.length} attachment{entryAttachments.length > 1 ? 's' : ''}
                                    <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${
                                      expandedAttachments.has(entry.id) ? 'rotate-180' : ''
                                    }`} />
                                  </Badge>
                                )}
                                {(caseNotes[entry.id] || entry.notes) && (
                                  <Badge variant="outline" className="text-xs">
                                    📝 Notes
                                  </Badge>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    simulateFileUpload(entry.id);
                                    // Auto-expand attachments when adding
                                    setExpandedAttachments(prev => new Set([...prev, entry.id]));
                                  }}
                                  className="text-xs h-6 px-2"
                                >
                                  <Plus className="w-3 h-3 mr-1" />
                                  Add Attachment
                                </Button>
                              </div>
                              
                              <span className="text-xs text-gray-500">
                                {new Date(entry.timestamp).toLocaleTimeString('en-IN', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            </div>

                            {/* Collapsible attachment list - expands when badge clicked */}
                            {entryAttachments.length > 0 && expandedAttachments.has(entry.id) && (
                              <div className="mt-2 bg-white rounded p-2 border animate-in slide-in-from-top-1 duration-200">
                                <p className="text-xs font-medium text-gray-700 mb-1">Attachments:</p>
                                <div className="flex gap-2 flex-wrap">
                                  {entryAttachments.map((_, idx) => (
                                    <Button
                                      key={idx}
                                      variant="outline"
                                      size="sm"
                                      className="text-xs h-6 px-2 hover:bg-blue-50"
                                    >
                                      <Paperclip className="w-3 h-3 mr-1" />
                                      Attachment {idx + 1}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Enhanced notes display */}
                            {(caseNotes[entry.id] || entry.notes) && (
                              <div className="mt-2 bg-white rounded p-2 border">
                                <p className="text-xs font-medium text-gray-700 mb-1">Notes:</p>
                                <div className="text-xs text-gray-600 whitespace-pre-wrap">
                                  {caseNotes[entry.id] || entry.notes}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Merge Actions */}
                {showMergeMode === type && selectedForMerge.size > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-900">
                          Merge {selectedForMerge.size} Draft Entries
                        </p>
                        <p className="text-xs text-blue-700">
                          Selected entries will be combined into a single multi-tooth entry
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedForMerge(new Set());
                          }}
                        >
                          Clear
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            if (selectedForMerge.size >= 2) {
                              mergeDraftEntries(Array.from(selectedForMerge));
                              setSelectedForMerge(new Set());
                              setShowMergeMode(null);
                            }
                          }}
                          disabled={selectedForMerge.size < 2}
                        >
                          🔗 Merge {selectedForMerge.size} Drafts
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 ${
      isFocusMode ? 'bg-slate-50' : 'bg-gray-50'
    }`}>
      <div className="max-w-[1600px] mx-auto">
        {/* Enhanced Focus Mode Indicator with Patient Info */}
        {isFocusMode && (
          <div className="mb-3 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between animate-in fade-in-0 slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Focus className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Focus Mode</span>
              </div>
              {/* Compact Patient Info in Focus Mode */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold text-gray-900">{patient.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {patient.age}y • {patient.gender === 'Male' ? 'M' : patient.gender === 'Female' ? 'F' : 'O'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-3 h-3" />
                  <span className="text-xs">{patient.phone}</span>
                </div>
                {patient.medicalAlerts.length > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {patient.medicalAlerts.length} Alert{patient.medicalAlerts.length > 1 ? 's' : ''}
                  </Badge>
                )}
                <Badge variant="secondary" className="text-xs">
                  ID: #{patient.id}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFocusMode}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
            >
              Exit Focus
            </Button>
          </div>
        )}
        {/* Top Navigation */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2"
              onClick={() => router.push('/patients')}
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Patients
            </Button>
            {/* Focus Mode Toggle - Phase 2 Enhancement */}
            <Button
              variant={isFocusMode ? "default" : "outline"}
              size="sm"
              onClick={toggleFocusMode}
              className="gap-2 transition-all duration-200"
            >
              <Focus className="w-4 h-4" />
              {isFocusMode ? "Exit Focus" : "Focus Mode"}
            </Button>
          </div>
          <div className="flex gap-2 items-center">
            {/* Quick Actions moved from card */}
            <div className="flex gap-2 mr-4 border-r pr-4">
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 px-3 gap-2 hover:bg-blue-50 transition-colors"
                title="Prescribe Medication"
              >
                <Pill className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium">Prescribe</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 px-3 gap-2 hover:bg-green-50 transition-colors"
                title="Schedule Appointment"
              >
                <CalendarCheck className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium">Schedule</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 px-3 gap-2 hover:bg-amber-50 transition-colors"
                title="Generate Bill"
              >
                <DollarSign className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-medium">Bill</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 px-3 gap-2 hover:bg-purple-50 transition-colors"
                title="Send Message"
              >
                <MessageSquare className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium">Message</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 px-3 gap-2 hover:bg-gray-50 transition-colors"
                title="View History"
              >
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-medium">History</span>
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                const currentIndex = mockPatients.patients.findIndex(p => p.id === patientId);
                if (currentIndex > 0) {
                  router.push(`/clinical/${mockPatients.patients[currentIndex - 1].id}`);
                }
              }}
              disabled={mockPatients.patients.findIndex(p => p.id === patientId) === 0}
            >
              Previous Patient
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                const currentIndex = mockPatients.patients.findIndex(p => p.id === patientId);
                if (currentIndex < mockPatients.patients.length - 1) {
                  router.push(`/clinical/${mockPatients.patients[currentIndex + 1].id}`);
                }
              }}
              disabled={mockPatients.patients.findIndex(p => p.id === patientId) === mockPatients.patients.length - 1}
            >
              Next Patient
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Case Progress - Horizontal Bar */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Case Progress</h3>
              <span className="text-sm text-gray-500">3 of 5 sections completed</span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              {/* Chief Complaints */}
              <div className="flex flex-col items-center space-y-2 flex-1">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-xs text-center text-gray-600">Chief Complaints</span>
                <div className="w-full h-2 bg-green-500 rounded-full"></div>
              </div>
              
              {/* Connection line */}
              <div className="w-8 h-0.5 bg-green-400"></div>
              
              {/* Clinical Findings */}
              <div className="flex flex-col items-center space-y-2 flex-1">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-xs text-center text-gray-600">Clinical Findings</span>
                <div className="w-full h-2 bg-green-500 rounded-full"></div>
              </div>
              
              {/* Connection line */}
              <div className="w-8 h-0.5 bg-yellow-400"></div>
              
              {/* Investigations */}
              <div className="flex flex-col items-center space-y-2 flex-1">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">!</span>
                </div>
                <span className="text-xs text-center text-gray-600">Investigation</span>
                <div className="w-full h-2 bg-yellow-500 rounded-full"></div>
              </div>
              
              {/* Connection line */}
              <div className="w-8 h-0.5 bg-gray-300"></div>
              
              {/* Diagnosis */}
              <div className="flex flex-col items-center space-y-2 flex-1">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm">○</span>
                </div>
                <span className="text-xs text-center text-gray-600">Diagnosis</span>
                <div className="w-full h-2 bg-gray-300 rounded-full"></div>
              </div>
              
              {/* Connection line */}
              <div className="w-8 h-0.5 bg-gray-300"></div>
              
              {/* Treatment Plans */}
              <div className="flex flex-col items-center space-y-2 flex-1">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm">○</span>
                </div>
                <span className="text-xs text-center text-gray-600">Treatment Plans</span>
                <div className="w-full h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main 3-Column Layout */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left Panel - Core Patient Info (4 columns) */}
          <div className="col-span-4">
            <div className="space-y-4">
              {/* Patient Info Card - Hidden in Focus Mode */}
              {!isFocusMode && (
              <Card 
                className={`transition-all duration-300 ease-in-out transform hover:scale-[1.005] ${
                  isPatientCardMinimized ? 'hover:shadow-md cursor-pointer scale-[0.99]' : 'hover:shadow-lg'
                }`}
                onClick={() => isPatientCardMinimized && setIsPatientCardMinimized(false)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle 
                      className={`text-lg flex items-center gap-2 flex-1 ${
                        !isPatientCardMinimized ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''
                      }`}
                      onClick={(e) => {
                        if (!isPatientCardMinimized) {
                          e.stopPropagation();
                          setIsPatientCardMinimized(true);
                        }
                      }}
                    >
                      <User className="w-5 h-5" />
                      {isPatientCardMinimized ? (
                        <span className="text-base">
                          {patient.name} • {patient.age}y • {patient.gender === 'Male' ? 'M' : patient.gender === 'Female' ? 'F' : 'O'} • #{patient.id}
                        </span>
                      ) : (
                        'Patient Information'
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {!isPatientCardMinimized && (
                        <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                          {patient.status}
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPatientCardMinimized(!isPatientCardMinimized);
                        }}
                        className="h-6 w-6 p-0 hover:bg-gray-100 transition-colors"
                      >
                        {isPatientCardMinimized ? (
                          <ChevronRight className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                {!isPatientCardMinimized && (
                  <CardContent className="space-y-3 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                    {/* Patient Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Search patients..."
                        value={patientSearchQuery}
                        onChange={(e) => setPatientSearchQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="pl-9 h-9 text-sm"
                      />
                      
                      {/* Search Results Dropdown */}
                      {searchResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10 max-h-60 overflow-auto">
                          {searchResults.map((result) => (
                            <div
                              key={result.id}
                              className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/clinical/${result.id}`);
                                setPatientSearchQuery('');
                              }}
                            >
                              <div className="font-medium">{result.name}</div>
                              <div className="text-xs text-gray-500">
                                {result.age}y • {result.phone} • ID: #{result.id}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-xl">{patient.name}</h3>
                      <p className="text-sm text-gray-600">
                        {patient.age} years • {patient.gender} • ID: #{patient.id}
                      </p>
                    </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      {patient.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      {patient.email}
                    </div>
                    <div className="flex items-start gap-2">
                      <Home className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p>{patient.address.street}</p>
                        <p>{patient.address.city}, {patient.address.state} {patient.address.zip}</p>
                      </div>
                    </div>
                  </div>
                  </CardContent>
                )}
              </Card>
              )}

              {/* Medical Alerts */}
              {patient.medicalAlerts.length > 0 && !isCardHiddenInFocus('medicalAlerts') && (
                <Card 
                  className={`border-red-200 bg-red-50 transition-all duration-300 ease-in-out transform hover:scale-[1.005] ${
                    minimizedCards.medicalAlerts ? 'hover:shadow-md cursor-pointer scale-[0.99]' : 'hover:shadow-lg'
                  }`}
                  onClick={() => handleCardClick('medicalAlerts', minimizedCards.medicalAlerts)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle 
                        className={`text-sm flex items-center gap-2 text-red-700 flex-1 ${
                          !minimizedCards.medicalAlerts ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''
                        }`}
                        onClick={(e) => {
                          if (!minimizedCards.medicalAlerts) {
                            e.stopPropagation();
                            handleCardTitleClick('medicalAlerts', minimizedCards.medicalAlerts);
                          }
                        }}
                      >
                        <AlertCircle className="w-4 h-4" />
                        Medical Alerts {minimizedCards.medicalAlerts && `(${patient.medicalAlerts.length})`}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCard('medicalAlerts');
                        }}
                        className="h-6 w-6 p-0 text-red-700 hover:text-red-800 hover:bg-red-100 transition-colors"
                      >
                        {minimizedCards.medicalAlerts ? (
                          <ChevronRight className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  {!minimizedCards.medicalAlerts && (
                    <CardContent className="animate-in fade-in-0 slide-in-from-top-2 duration-200">
                      <ul className="text-sm space-y-1">
                        {patient.medicalAlerts.map((alert, idx) => (
                          <li key={idx} className="text-red-600">• {alert}</li>
                        ))}
                      </ul>
                    </CardContent>
                  )}
                </Card>
              )}

              {/* Quick Stats */}
              {!isCardHiddenInFocus('quickStats') && (
              <Card 
                className={`transition-all duration-300 ease-in-out transform hover:scale-[1.005] ${
                  minimizedCards.quickStats ? 'hover:shadow-md cursor-pointer scale-[0.99]' : 'hover:shadow-lg'
                }`}
                onClick={() => handleCardClick('quickStats', minimizedCards.quickStats)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle 
                      className={`text-sm flex items-center gap-2 flex-1 ${
                        !minimizedCards.quickStats ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''
                      }`}
                      onClick={(e) => {
                        if (!minimizedCards.quickStats) {
                          e.stopPropagation();
                          handleCardTitleClick('quickStats', minimizedCards.quickStats);
                        }
                      }}
                    >
                      <Clock className="w-4 h-4" />
                      {minimizedCards.quickStats ? `Quick Stats • ${formatINR(patient.balance)}` : 'Quick Stats'}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCard('quickStats');
                      }}
                      className="h-6 w-6 p-0 hover:bg-gray-100 transition-colors"
                    >
                      {minimizedCards.quickStats ? (
                        <ChevronRight className="w-4 h-4" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {!minimizedCards.quickStats && (
                  <CardContent className="space-y-3 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Visit</span>
                      <span className="text-sm font-medium">
                        {new Date(patient.lastVisit).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    {patient.nextAppt && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Next Appointment</span>
                        <span className="text-sm font-medium">
                          {new Date(patient.nextAppt).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Balance Due</span>
                      <span className={`text-sm font-medium ${patient.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {formatINR(patient.balance)}
                      </span>
                    </div>
                  </CardContent>
                )}
              </Card>
              )}

              {/* Chief Complaints - Moved from center */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2 text-red-600">
                      <Stethoscope className="w-5 h-5" />
                      Chief Complaint
                      {!isFocusMode && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAddEntry({ type: 'complaint', show: true })}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      )}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {caseEntries.filter(entry => entry.type === 'complaint').length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No complaints recorded</p>
                  ) : (
                    <div className="space-y-2">
                      {caseEntries.filter(entry => entry.type === 'complaint').map(entry => (
                        <div key={entry.id} className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border-l-4 border-l-red-500">
                          {entry.toothNumber && (
                            <Badge variant="outline" className="mt-0.5">
                              Tooth #{entry.toothNumber}
                            </Badge>
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{entry.description}</p>
                            {entry.severity !== undefined && (
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-600">Pain:</span>
                                <span className={`text-sm font-medium ${painScaleDescriptions[entry.severity].color}`}>
                                  {entry.severity}/10 ({painScaleDescriptions[entry.severity].label})
                                </span>
                              </div>
                            )}
                            {entry.notes && (
                              <p className="text-xs text-gray-600 mt-1 italic">Note: {entry.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Clinical Findings - Moved from center */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2 text-blue-600">
                      <Edit3 className="w-5 h-5" />
                      Clinical Finding
                      {!isFocusMode && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAddEntry({ type: 'finding', show: true })}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      )}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {caseEntries.filter(entry => entry.type === 'finding').length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No findings recorded</p>
                  ) : (
                    <div className="space-y-2">
                      {caseEntries.filter(entry => entry.type === 'finding').map(entry => (
                        <div key={entry.id} className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border-l-4 border-l-blue-500">
                          {entry.toothNumber && (
                            <Badge variant="outline" className="mt-0.5">
                              Tooth #{entry.toothNumber}
                            </Badge>
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{entry.description}</p>
                            {entry.notes && (
                              <p className="text-xs text-gray-600 mt-1 italic">Note: {entry.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Investigation - Moved from center */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2 text-purple-600">
                      <Camera className="w-5 h-5" />
                      Investigation
                      {!isFocusMode && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAddEntry({ type: 'investigation', show: true })}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      )}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {caseEntries.filter(entry => entry.type === 'investigation').length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No investigations recorded</p>
                  ) : (
                    <div className="space-y-2">
                      {caseEntries.filter(entry => entry.type === 'investigation').map(entry => (
                        <div key={entry.id} className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 border-l-4 border-l-purple-500">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{entry.description}</p>
                            {entry.notes && (
                              <p className="text-xs text-gray-600 mt-1 italic">Note: {entry.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Diagnosis - Moved from center */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2 text-orange-600">
                      <FileText className="w-5 h-5" />
                      Diagnosis
                      {!isFocusMode && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAddEntry({ type: 'diagnosis', show: true })}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      )}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {caseEntries.filter(entry => entry.type === 'diagnosis').length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No diagnosis recorded</p>
                  ) : (
                    <div className="space-y-2">
                      {caseEntries.filter(entry => entry.type === 'diagnosis').map(entry => (
                        <div key={entry.id} className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 border-l-4 border-l-orange-500">
                          {entry.teeth && entry.teeth.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-0.5">
                              {entry.teeth.map((tooth, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  Tooth #{tooth.number}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{entry.description}</p>
                            {entry.notes && (
                              <p className="text-xs text-gray-600 mt-1 italic">Note: {entry.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Center Panel - Clinical Work (4 columns) */}
          <div className="col-span-4">
            {/* Keep only core clinical work in center */}
            <div className="space-y-4">
              {/* Dental Chart - Conditionally positioned based on mobile strategy */}
              {dentalChartPosition === 'inline' && <ToothChart />}

            </div>
          </div>

          {/* Right Panel - Secondary Info & Actions (4 columns) */}
          <div className="col-span-4">
            <div className="space-y-4">
              {/* Insurance Info */}
              {!isCardHiddenInFocus('insurance') && (
              <Card 
                className={`transition-all duration-300 ease-in-out transform hover:scale-[1.005] ${
                  minimizedCards.insurance ? 'hover:shadow-md cursor-pointer scale-[0.99]' : 'hover:shadow-lg'
                }`}
                onClick={() => handleCardClick('insurance', minimizedCards.insurance)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle 
                      className={`text-sm flex items-center gap-2 flex-1 ${
                        !minimizedCards.insurance ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''
                      }`}
                      onClick={(e) => {
                        if (!minimizedCards.insurance) {
                          e.stopPropagation();
                          handleCardTitleClick('insurance', minimizedCards.insurance);
                        }
                      }}
                    >
                      <Briefcase className="w-4 h-4" />
                      {minimizedCards.insurance ? `Insurance • ${patient.insuranceInfo.provider}` : 'Insurance'}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCard('insurance');
                      }}
                      className="h-6 w-6 p-0 hover:bg-gray-100 transition-colors"
                    >
                      {minimizedCards.insurance ? (
                        <ChevronRight className="w-4 h-4" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {!minimizedCards.insurance && (
                  <CardContent className="space-y-2 text-sm animate-in fade-in-0 slide-in-from-top-2 duration-200">
                    <div>
                      <p className="font-medium">{patient.insuranceInfo.provider}</p>
                      <p className="text-gray-600">Policy: {patient.insuranceInfo.policyNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        Valid: {new Date(patient.insuranceInfo.effectiveDate).toLocaleDateString('en-IN')} - 
                        {' '}{new Date(patient.insuranceInfo.expirationDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
              )}

              {/* Medical History */}
              {!isCardHiddenInFocus('medicalHistory') && (
              <Card 
                className={`transition-all duration-300 ease-in-out transform hover:scale-[1.005] ${
                  minimizedCards.medicalHistory ? 'hover:shadow-md cursor-pointer scale-[0.99]' : 'hover:shadow-lg'
                }`}
                onClick={() => handleCardClick('medicalHistory', minimizedCards.medicalHistory)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle 
                      className={`text-sm flex-1 ${
                        !minimizedCards.medicalHistory ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''
                      }`}
                      onClick={(e) => {
                        if (!minimizedCards.medicalHistory) {
                          e.stopPropagation();
                          handleCardTitleClick('medicalHistory', minimizedCards.medicalHistory);
                        }
                      }}
                    >
                      {minimizedCards.medicalHistory ? 
                        `Medical History • ${patient.medicalHistory.conditions.length + patient.medicalHistory.medications.length} items` : 
                        'Medical History'
                      }
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCard('medicalHistory');
                      }}
                      className="h-6 w-6 p-0 hover:bg-gray-100 transition-colors"
                    >
                      {minimizedCards.medicalHistory ? (
                        <ChevronRight className="w-4 h-4" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {!minimizedCards.medicalHistory && (
                  <CardContent className="space-y-3 text-sm animate-in fade-in-0 slide-in-from-top-2 duration-200">
                  {patient.medicalHistory.conditions.length > 0 && (
                    <div>
                      <p className="font-medium text-gray-700">Conditions</p>
                      <ul className="mt-1 text-gray-600">
                        {patient.medicalHistory.conditions.map((condition, idx) => (
                          <li key={idx}>• {condition}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {patient.medicalHistory.medications.length > 0 && (
                    <div>
                      <p className="font-medium text-gray-700">Current Medications</p>
                      <ul className="mt-1 text-gray-600">
                        {patient.medicalHistory.medications.map((med, idx) => (
                          <li key={idx}>• {med}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {patient.medicalHistory.allergies.length > 0 && (
                    <div>
                      <p className="font-medium text-gray-700">Allergies</p>
                      <ul className="mt-1 text-gray-600">
                        {patient.medicalHistory.allergies.map((allergy, idx) => (
                          <li key={idx}>• {allergy}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  </CardContent>
                )}
              </Card>
              )}





              {/* Treatment Plans - Moved from center */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2 text-green-600">
                      <CalendarCheck className="w-5 h-5" />
                      Treatment Plan
                      {!isFocusMode && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAddEntry({ type: 'treatment-plan', show: true })}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      )}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {caseEntries.filter(entry => entry.type === 'treatment-plan').length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No treatment plans recorded</p>
                  ) : (
                    <div className="space-y-2">
                      {/* Grand Total for all Treatment Plans */}
                      <div className="mb-3 p-3 bg-green-100 border border-green-300 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-green-800">Grand Total (GT):</span>
                          <span className="text-lg font-bold text-green-900">
                            ₹{(() => {
                              const total = caseEntries
                                .filter(entry => entry.type === 'treatment-plan')
                                .reduce((sum, entry) => {
                                  return sum + (entry.treatmentDetails?.estimatedCost || 0);
                                }, 0);
                              return total.toLocaleString();
                            })()}
                          </span>
                        </div>
                        <p className="text-xs text-green-700 mt-1">
                          Total for {caseEntries.filter(entry => entry.type === 'treatment-plan').length} treatment plan{caseEntries.filter(entry => entry.type === 'treatment-plan').length > 1 ? 's' : ''}
                        </p>
                      </div>
                      {caseEntries.filter(entry => entry.type === 'treatment-plan').map(entry => (
                        <div key={entry.id} className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border-l-4 border-l-green-500">
                          {entry.toothNumber && (
                            <Badge variant="outline" className="mt-0.5">
                              Tooth #{entry.toothNumber}
                            </Badge>
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{entry.description}</p>
                            {entry.treatmentDetails && (
                              <div className="mt-2 p-2 bg-white rounded border">
                                <div className="text-xs text-gray-600 space-y-1">
                                  <p><span className="font-medium">Estimated Cost:</span> ₹{entry.treatmentDetails.estimatedCost.toLocaleString()}</p>
                                  <p><span className="font-medium">Duration:</span> {entry.treatmentDetails.duration}</p>
                                </div>
                              </div>
                            )}
                            {entry.notes && (
                              <p className="text-xs text-gray-600 mt-1 italic">Note: {entry.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Procedures - Moved from center */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2 text-teal-600">
                      <Activity className="w-5 h-5" />
                      Procedure
                      <div className="ml-2">
                        <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                          🔓 Unlocked
                        </Badge>
                      </div>
                      {!isFocusMode && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAddEntry({ type: 'procedure', show: true })}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      )}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {caseEntries.filter(entry => entry.type === 'procedure').length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No procedures recorded</p>
                  ) : (
                    <div className="space-y-3">
                      {Object.entries(groupProceduresByTreatmentPlan(caseEntries.filter(entry => entry.type === 'procedure'))).map(([groupId, group]) => (
                        <div key={groupId} className="space-y-2">
                          {/* Treatment Plan Header */}
                          {group.treatmentPlan ? (
                            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <div className="flex-1">
                                <h4 className="text-xs font-semibold text-green-900">
                                  {group.treatmentPlan.description}
                                </h4>
                                <p className="text-xs text-green-600">
                                  {group.procedures.length} procedure set{group.procedures.length > 1 ? 's' : ''}
                                </p>
                                {/* GT Total - Placeholder calculation */}
                                <div className="mt-1 px-2 py-1 bg-green-100 rounded text-xs">
                                  <span className="font-semibold text-green-800">GT: ₹{
                                    (() => {
                                      const baseCost = group.treatmentPlan.treatmentDetails?.estimatedCost || 0;
                                      const procedureCosts = group.procedures.length * 5000; // Placeholder: ₹5,000 per procedure
                                      return (baseCost + procedureCosts).toLocaleString();
                                    })()
                                  }</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              <div className="flex-1">
                                <h4 className="text-xs font-semibold text-gray-700">
                                  Independent Procedures
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {group.procedures.length} procedure set{group.procedures.length > 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Procedure Sets */}
                          {group.procedures.map(entry => (
                            <div key={entry.id} className="flex items-start gap-3 p-3 ml-4 rounded-lg bg-teal-50 border-l-4 border-l-teal-500">
                              {entry.teeth && entry.teeth.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {entry.teeth.map((tooth, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      #{tooth.number}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="text-sm font-medium">{entry.procedureData?.name || entry.description}</p>
                                {entry.procedureData?.steps && (
                                  <p className="text-xs text-gray-600 mt-1">
                                    {entry.procedureData.steps.length} step{entry.procedureData.steps.length > 1 ? 's' : ''}
                                    {entry.procedureData.steps.length > 0 && entry.procedureData.steps[0].appointmentDate && 
                                      ` • Next: ${new Date(entry.procedureData.steps[0].appointmentDate).toLocaleDateString()}`
                                    }
                                  </p>
                                )}
                                {entry.notes && (
                                  <p className="text-xs text-gray-600 mt-1 italic">Note: {entry.notes}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Case Notes - Moved from center */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2 text-gray-600">
                      <MessageSquare className="w-5 h-5" />
                      Case Note
                      {!isFocusMode && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAddEntry({ type: 'note', show: true })}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      )}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {caseEntries.filter(entry => entry.type === 'note').length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No case notes recorded</p>
                  ) : (
                    <div className="space-y-2">
                      {caseEntries.filter(entry => entry.type === 'note').map(entry => (
                        <div key={entry.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border-l-4 border-l-gray-500">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{entry.description}</p>
                            {entry.notes && (
                              <p className="text-xs text-gray-600 mt-1 italic">Note: {entry.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              {!isCardHiddenInFocus('recentActivity') && (
              <Card 
                className={`transition-all duration-300 ease-in-out transform hover:scale-[1.005] ${
                  minimizedCards.recentActivity ? 'hover:shadow-md cursor-pointer scale-[0.99]' : 'hover:shadow-lg'
                }`}
                onClick={() => handleCardClick('recentActivity', minimizedCards.recentActivity)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle 
                      className={`text-sm flex-1 ${
                        !minimizedCards.recentActivity ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''
                      }`}
                      onClick={(e) => {
                        if (!minimizedCards.recentActivity) {
                          e.stopPropagation();
                          handleCardTitleClick('recentActivity', minimizedCards.recentActivity);
                        }
                      }}
                    >
                      Recent Activity
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCard('recentActivity');
                      }}
                      className="h-6 w-6 p-0 hover:bg-gray-100 transition-colors"
                    >
                      {minimizedCards.recentActivity ? (
                        <ChevronRight className="w-4 h-4" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {!minimizedCards.recentActivity && (
                  <CardContent className="animate-in fade-in-0 slide-in-from-top-2 duration-200">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Activity className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Last Visit</p>
                        <p className="text-xs text-gray-600">
                          {new Date(patient.lastVisit).toLocaleDateString('en-IN')} - Routine checkup
                        </p>
                      </div>
                    </div>
                  </div>
                  </CardContent>
                )}
              </Card>
              )}
            </div>
          </div>
        </div>

        {/* Phase 3: Universal Smart Dental Chart - Floating positioned when active form is visible */}
        {dentalChartPosition === 'fixed' && <ToothChart />}
        
        {/* Desktop-specific: Subtle connection indicator between chart and active form */}
        {!isMobileView && dentalChartPosition === 'fixed' && (
          <div className="fixed top-16 right-2 z-40 pointer-events-none">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-300 to-transparent rounded-full opacity-60 animate-pulse"></div>
          </div>
        )}

        {/* Universal Quick Chart Access Button - Shows when chart is not in fixed mode */}
        {dentalChartPosition === 'inline' && showAddEntry.show && (
          <Button
            className={`fixed z-40 shadow-lg transition-all ${
              isMobileView 
                ? 'bottom-4 right-4 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700'
                : 'bottom-6 right-6 w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-700 border-2 border-white'
            }`}
            onClick={() => setDentalChartPosition('fixed')}
          >
            <span className={`text-${isMobileView ? 'lg' : 'xl'}`}>
              🦷
            </span>
          </Button>
        )}
      </div>
    </div>
  );
}
