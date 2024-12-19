import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FulfillmentTabProps {
  formData: {
    pickingPriority: string;
    selectedDate: Date | null;
    qualityControl: string;
  };
  handleSelectChange: (name: string, value: string) => void;
  setFormData: (value: React.SetStateAction<any>) => void;
}

export const FulfillmentTab: React.FC<FulfillmentTabProps> = ({
  formData,
  handleSelectChange,
  setFormData,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fulfillment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Picking Priority</label>
            <Select
              value={formData.pickingPriority}
              onValueChange={(value) => handleSelectChange('pickingPriority', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select picking priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fifo">FIFO (First In, First Out)</SelectItem>
                <SelectItem value="fefo">FEFO (First Expired, First Out)</SelectItem>
                <SelectItem value="lifo">LIFO (Last In, First Out)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Preferred Shipping Window</label>
            <Calendar 
              mode="single"
              selected={formData.selectedDate}
              onSelect={(date) => setFormData(prev => ({ ...prev, selectedDate: date }))}
              className="rounded-md border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Quality Control</label>
            <div className="grid grid-cols-2 gap-2">
              {['standard', 'enhanced'].map(qc => (
                <Button
                  key={qc}
                  variant="outline"
                  className={formData.qualityControl === qc ? 'bg-primary text-primary-foreground' : ''}
                  onClick={() => setFormData(prev => ({ ...prev, qualityControl: qc }))}
                >
                  {qc.charAt(0).toUpperCase() + qc.slice(1)} QC
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};