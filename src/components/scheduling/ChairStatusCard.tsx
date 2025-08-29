// 👉 Extract Chair Status component - single responsibility UI component
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Activity, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Chair, ChairUtilization } from '@/types/scheduling';
import { getStatusColor } from '@/lib/utils/scheduling';

interface ChairStatusCardProps {
  chair: Chair;
  utilization: ChairUtilization;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "available": return <CheckCircle className="h-4 w-4" />;
    case "occupied": return <Activity className="h-4 w-4" />;
    case "maintenance": return <XCircle className="h-4 w-4" />;
    default: return <AlertCircle className="h-4 w-4" />;
  }
};

export function ChairStatusCard({ chair, utilization }: ChairStatusCardProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div>
        <div className="font-medium">{chair.name}</div>
        <div className="text-sm text-gray-500">{chair.location}</div>
        <div className="text-xs text-gray-400">
          {chair.equipment.slice(0, 2).join(", ")}
          {chair.equipment.length > 2 && ` +${chair.equipment.length - 2} more`}
        </div>
      </div>
      <div className="text-right">
        <Badge className={getStatusColor(chair.status)}>
          {getStatusIcon(chair.status)}
          <span className="ml-1 capitalize">{chair.status}</span>
        </Badge>
        {utilization[chair.id] && (
          <div className="text-xs text-gray-500 mt-1">
            {utilization[chair.id]}% utilized
          </div>
        )}
      </div>
    </div>
  );
}
