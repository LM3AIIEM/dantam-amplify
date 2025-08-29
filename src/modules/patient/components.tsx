import React from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatINR } from '@/shared/utils';
import { 
  Phone, 
  Mail, 
  Calendar, 
  AlertCircle, 
  Users, 
  MoreVertical,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  MessageSquare,
  UserPlus,
  Edit,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Status color helpers
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800 border-green-200';
    case 'needs-followup': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getInsuranceStatusColor = (status: string) => {
  switch (status) {
    case 'verified': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'expired': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Patient Avatar Component
export const PatientAvatar = ({ patient, size = "default" }: { patient: any, size?: "default" | "large" }) => {
  const sizeClass = size === "large" ? "h-16 w-16" : "h-12 w-12";
  const textSize = size === "large" ? "text-xl" : "";
  
  return (
    <Avatar className={sizeClass}>
      <AvatarImage src={patient.avatar} />
      <AvatarFallback className={`bg-blue-100 text-blue-600 font-semibold ${textSize}`}>
        {patient.name.split(' ').map((n: string) => n[0]).join('')}
      </AvatarFallback>
    </Avatar>
  );
};

// Medical Alert Component
export const MedicalAlert = ({ alerts }: { alerts: string[] }) => {
  if (!alerts || alerts.length === 0) return null;
  
  return (
    <div className="flex items-start space-x-2 p-3 bg-red-50 rounded-lg border border-red-100">
      <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
      <div>
        <span className="text-sm font-medium text-red-800">Medical Alerts:</span>
        <p className="text-sm text-red-700 mt-0.5">{alerts.join(', ')}</p>
      </div>
    </div>
  );
};

// Patient Card Component
export const PatientCard = ({ patient, onSelect, onAction }: { 
  patient: any, 
  onSelect: (patient: any) => void,
  onAction: (action: string, patient: any) => void 
}) => {
  const router = useRouter();
  
  const handleClick = () => {
    // Navigate to unified clinical view
    router.push(`/clinical/${patient.id}`);
  };
  
  return (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
      <CardContent className="p-6" onClick={handleClick}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <PatientAvatar patient={patient} />
            <div className="flex-1">
              <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                {patient.name}
              </h3>
              <p className="text-sm text-slate-600">Age {patient.age} • ID: #00{patient.id}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center text-sm text-slate-600">
                  <Phone className="h-4 w-4 mr-1" />
                  {patient.phone}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="h-4 w-4 mr-1" />
                  <span className="truncate max-w-[200px]">{patient.email}</span>
                </div>
              </div>
            </div>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onAction('schedule', patient)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction('message', patient)}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction('call', patient)}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Patient
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onAction('edit', patient)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Details
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onAction('delete', patient)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Patient
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className={getStatusColor(patient.status)}>
                {patient.status.replace('-', ' ')}
              </Badge>
              <Badge variant="outline" className={getInsuranceStatusColor(patient.insuranceStatus)}>
                Insurance: {patient.insuranceStatus}
              </Badge>
              {patient.family > 1 && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  Family of {patient.family}
                </Badge>
              )}
            </div>
            {patient.balance > 0 && (
              <div className="flex items-center text-sm font-medium text-red-600">
                <DollarSign className="h-4 w-4" />
                {formatINR(patient.balance).replace('₹', '')}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-600">Last Visit:</span>
              <div className="font-medium flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3" />
                {new Date(patient.lastVisit).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
            <div>
              <span className="text-slate-600">Next Appointment:</span>
              <div className="font-medium flex items-center gap-1 mt-1">
                <Calendar className="h-3 w-3" />
                {patient.nextAppt ? new Date(patient.nextAppt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }) : 'Not scheduled'}
              </div>
            </div>
          </div>
          
          <MedicalAlert alerts={patient.medicalAlerts} />
        </div>
      </CardContent>
    </Card>
  );
};

// Stats Card Component
export const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color = "blue" 
}: { 
  title: string, 
  value: string | number, 
  icon: any, 
  trend?: string,
  color?: string 
}) => {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    yellow: "text-yellow-600 bg-yellow-100",
    red: "text-red-600 bg-red-100"
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {trend && (
              <p className="text-xs text-slate-500 mt-1">{trend}</p>
            )}
          </div>
          <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Empty State Component
export const EmptyState = ({ 
  title, 
  description, 
  action 
}: { 
  title: string, 
  description: string, 
  action?: { label: string, onClick: () => void } 
}) => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Users className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 max-w-md mx-auto">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4 mr-2" />
          {action.label}
        </Button>
      )}
    </div>
  );
};
