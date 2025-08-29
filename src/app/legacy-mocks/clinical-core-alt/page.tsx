'use client';

import { useState } from 'react';
import { Save, Plus, Camera, FileText, Clock, AlertTriangle, Check, X, Edit3, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

// Dental notation - Universal numbering system by quadrants
const toothQuadrants = {
  upperRight: { teeth: [1, 2, 3, 4, 5, 6, 7, 8], label: "Upper Right (Q1)" },
  upperLeft: { teeth: [9, 10, 11, 12, 13, 14, 15, 16], label: "Upper Left (Q2)" },
  lowerLeft: { teeth: [17, 18, 19, 20, 21, 22, 23, 24], label: "Lower Left (Q3)" },
  lowerRight: { teeth: [25, 26, 27, 28, 29, 30, 31, 32], label: "Lower Right (Q4)" }
};

const conditionTypes = [
  { id: 'healthy', label: 'Healthy', color: 'bg-green-500', icon: '✓' },
  { id: 'caries', label: 'Caries', color: 'bg-red-500', icon: 'C' },
  { id: 'filling', label: 'Filling', color: 'bg-blue-500', icon: 'F' },
  { id: 'crown', label: 'Crown', color: 'bg-yellow-500', icon: 'Cr' },
  { id: 'missing', label: 'Missing', color: 'bg-gray-400', icon: 'X' },
  { id: 'root_canal', label: 'Root Canal', color: 'bg-purple-500', icon: 'RC' },
  { id: 'implant', label: 'Implant', color: 'bg-indigo-500', icon: 'I' },
  { id: 'bridge', label: 'Bridge', color: 'bg-orange-500', icon: 'B' }
];

const treatmentPlans = [
  {
    id: 1,
    tooth: 14,
    procedure: 'Composite Filling',
    surface: 'Occlusal',
    priority: 'high',
    status: 'planned',
    cost: 180,
    notes: 'Deep caries on chewing surface'
  },
  {
    id: 2,
    tooth: 19,
    procedure: 'Crown',
    surface: 'Full Coverage',
    priority: 'medium',
    status: 'in_progress',
    cost: 1200,
    notes: 'Existing large filling failing'
  },
  {
    id: 3,
    tooth: 30,
    procedure: 'Root Canal',
    surface: 'Pulp',
    priority: 'urgent',
    status: 'scheduled',
    cost: 850,
    notes: 'Severe pain, possible abscess'
  }
];

export default function DentalChartingSystem() {
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState('healthy');
  const [toothConditions, setToothConditions] = useState({
    14: 'caries',
    19: 'filling',
    30: 'root_canal',
    18: 'crown',
    25: 'missing'
  });
  const [showTreatmentPlan, setShowTreatmentPlan] = useState(false);
  const [clinicalNotes, setClinicalNotes] = useState('');

  const collapsedQuadrants = [];
  const toggleQuadrant = (quadrantKey) => {
    setCollapsedQuadrants(prev => ({
      ...prev,
      [quadrantKey]: !prev[quadrantKey]
    }));
  };

  const renderQuadrant = (quadrantKey, quadrant) => {
    const isCollapsed = collapsedQuadrants[quadrantKey];
    const hasIssues = quadrant.teeth.some(tooth => 
      toothConditions[tooth] && toothConditions[tooth] !== 'healthy'
    );

    return (
      <Card key={quadrantKey} className={`${hasIssues ? 'border-orange-200 bg-orange-50' : ''}`}>
        <CardHeader 
          className="pb-3 cursor-pointer hover:bg-gray-50"
          onClick={() => toggleQuadrant(quadrantKey)}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {quadrant.label}
              {hasIssues && (
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {quadrant.teeth.filter(tooth => toothConditions[tooth] && toothConditions[tooth] !== 'healthy').length} issues
              </span>
              {isCollapsed ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              )}
            </div>
          </div>
        </CardHeader>
        
        {!isCollapsed && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-8 gap-2">
              {quadrant.teeth.map((toothNumber) => (
                <div key={toothNumber} className="flex flex-col items-center">
                  <button
                    onClick={() => handleToothClick(toothNumber)}
                    className={`
                      w-8 h-12 border-2 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md
                      ${selectedTooth === toothNumber ? 'ring-2 ring-blue-500 ring-offset-1' : ''}
                      ${getConditionColor(getToothCondition(toothNumber))}
                      ${getToothCondition(toothNumber) === 'missing' ? 'opacity-30 border-dashed' : 'border-gray-300'}
                      flex items-center justify-center text-white text-xs font-bold
                    `}
                  >
                    {getToothCondition(toothNumber) === 'missing' ? '✗' : getConditionIcon(getToothCondition(toothNumber))}
                  </button>
                  <span className="text-xs text-gray-600 mt-1">{toothNumber}</span>
                </div>
              ))}
            </div>
            
            {/* Quadrant Summary */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {conditionTypes.map(condition => {
                  const count = quadrant.teeth.filter(tooth => 
                    getToothCondition(tooth) === condition.id
                  ).length;
                  if (count === 0) return null;
                  
                  return (
                    <Badge key={condition.id} variant="outline" className="text-xs">
                      <div className={`w-2 h-2 rounded-full mr-1 ${condition.color}`}></div>
                      {condition.label}: {count}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  const handleToothClick = (toothNumber) => {
    setSelectedTooth(toothNumber);
    if (selectedCondition && toothNumber) {
      setToothConditions(prev => ({
        ...prev,
        [toothNumber]: selectedCondition
      }));
    }
  };

  const getToothCondition = (toothNumber) => {
    return toothConditions[toothNumber] || 'healthy';
  };

  const getConditionColor = (condition) => {
    const conditionType = conditionTypes.find(c => c.id === condition);
    return conditionType ? conditionType.color : 'bg-white';
  };

  const getConditionIcon = (condition) => {
    const conditionType = conditionTypes.find(c => c.id === condition);
    return conditionType ? conditionType.icon : '';
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Clinical Charting</h1>
          <p className="text-sm text-gray-600 mt-1">
            Patient: <span className="font-medium">Sarah Johnson</span> • Age: 34 • Last Visit: July 28, 2024
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowTreatmentPlan(!showTreatmentPlan)}>
            <FileText className="w-4 h-4 mr-2" />
            Treatment Plan
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Chart
          </Button>
        </div>
      </div>

      {/* Quick Condition Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Charting Tools</CardTitle>
          <p className="text-sm text-gray-600">Click a condition, then click teeth to mark them</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {conditionTypes.map((condition) => (
              <Button
                key={condition.id}
                variant={selectedCondition === condition.id ? "default" : "outline"}
                className={`h-16 flex flex-col gap-1 ${
                  selectedCondition === condition.id 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCondition(condition.id)}
              >
                <div className={`w-6 h-6 rounded text-white text-xs flex items-center justify-center ${condition.color}`}>
                  {condition.icon}
                </div>
                <span className="text-xs">{condition.label}</span>
              </Button>
            ))}
          </div>
          
          {selectedCondition && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Selected:</strong> {conditionTypes.find(c => c.id === selectedCondition)?.label}
                <span className="ml-2 text-blue-600">→ Click on teeth to apply this condition</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dental Chart by Quadrants */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Dental Chart</h2>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setCollapsedQuadrants({
                upperRight: false, upperLeft: false, lowerLeft: false, lowerRight: false
              })}
            >
              Expand All
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setCollapsedQuadrants({
                upperRight: true, upperLeft: true, lowerLeft: true, lowerRight: true
              })}
            >
              Collapse All
            </Button>
          </div>
        </div>

        {/* Upper Quadrants */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {renderQuadrant('upperRight', toothQuadrants.upperRight)}
          {renderQuadrant('upperLeft', toothQuadrants.upperLeft)}
        </div>

        {/* Lower Quadrants */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {renderQuadrant('lowerLeft', toothQuadrants.lowerLeft)}
          {renderQuadrant('lowerRight', toothQuadrants.lowerRight)}
        </div>
      </div>

      {/* Selected Tooth Info */}
      {selectedTooth && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg">Tooth #{selectedTooth} Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600">Current Condition</label>
                <p className="font-medium">
                  {conditionTypes.find(c => c.id === getToothCondition(selectedTooth))?.label}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Surface</label>
                <Input placeholder="e.g., Occlusal, Mesial" className="mt-1" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Notes</label>
                <Input placeholder="Add tooth-specific notes" className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {showTreatmentPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Treatment Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {treatmentPlans.map((treatment) => (
                <div key={treatment.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-700">
                        {treatment.tooth}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{treatment.procedure}</h4>
                        <p className="text-sm text-gray-600">{treatment.surface}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(treatment.priority)}>
                        {treatment.priority}
                      </Badge>
                      <Badge className={getStatusColor(treatment.status)}>
                        {treatment.status.replace('_', ' ')}
                      </Badge>
                      <span className="font-medium text-gray-900">${treatment.cost}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{treatment.notes}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      Schedule
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full border-dashed">
                <Plus className="w-4 h-4 mr-2" />
                Add Treatment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clinical Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter clinical observations, treatment notes, or patient feedback..."
            value={clinicalNotes}
            onChange={(e) => setClinicalNotes(e.target.value)}
            className="min-h-24"
          />
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="outline">
              <Camera className="w-3 h-3 mr-1" />
              Add Photo
            </Button>
            <Button size="sm" variant="outline">
              <FileText className="w-3 h-3 mr-1" />
              Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Check className="w-3 h-3 mr-1" />
              Complete Exam
            </Button>
            <Button size="sm" variant="outline">
              <Camera className="w-3 h-3 mr-1" />
              Take X-ray
            </Button>
            <Button size="sm" variant="outline">
              <FileText className="w-3 h-3 mr-1" />
              Print Chart
            </Button>
            <Button size="sm" variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              Schedule Follow-up
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Chart Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {conditionTypes.map((condition) => (
              <div key={condition.id} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded text-white text-xs flex items-center justify-center ${condition.color}`}>
                  {condition.icon}
                </div>
                <span className="text-xs text-gray-600">{condition.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
