import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const DocumentsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Required Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">Generate Picking List</Button>
            <Button variant="outline">Generate Packing Slip</Button>
            <Button variant="outline">Generate Invoice</Button>
            <Button variant="outline">Generate BOL</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};