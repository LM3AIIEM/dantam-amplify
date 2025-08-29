/* 🏥 Unified Clinical Page - Single Patient View */

import { UnifiedPatientClinicalView } from '@/modules/unified-clinical';

export default function ClinicalPage({ params }: { params: { id: string } }) {
  const patientId = parseInt(params.id);
  
  if (isNaN(patientId)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Invalid Patient ID</h1>
          <p className="text-gray-600 mt-2">Please select a valid patient.</p>
        </div>
      </div>
    );
  }

  return <UnifiedPatientClinicalView patientId={patientId} />;
}
