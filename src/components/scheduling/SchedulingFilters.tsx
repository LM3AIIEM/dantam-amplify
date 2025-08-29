// 👉 Extract filters UI component - pure presentation
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SchedulingFilters } from '@/types/scheduling';
import { providers, chairs } from '@/lib/data/scheduling';

interface SchedulingFiltersProps {
  filters: SchedulingFilters;
  onFilterChange: (key: keyof SchedulingFilters, value: string) => void;
}

export function SchedulingFiltersComponent({ filters, onFilterChange }: SchedulingFiltersProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search patients..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange('searchQuery', e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Input
            type="date"
            value={filters.selectedDate || ''}
            onChange={(e) => onFilterChange('selectedDate', e.target.value)}
            className="w-full"
          />
          
          <Select value={filters.selectedProvider} onValueChange={(value) => onFilterChange('selectedProvider', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Providers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Providers</SelectItem>
              {providers.map(provider => (
                <SelectItem key={provider.id} value={provider.id.toString()}>
                  {provider.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filters.selectedChair} onValueChange={(value) => onFilterChange('selectedChair', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Chairs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Chairs</SelectItem>
              {chairs.map(chair => (
                <SelectItem key={chair.id} value={chair.id.toString()}>
                  {chair.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
