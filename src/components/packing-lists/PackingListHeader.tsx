import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

interface PackingListHeaderProps {
  onCreateNew: () => void;
}

export const PackingListHeader = ({ onCreateNew }: PackingListHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Packing Lists</h1>
        <p className="text-muted-foreground">Manage your packing lists and track order fulfillment</p>
      </div>
      <div className="space-x-4">
        <Button variant="outline" className="bg-soft-gray hover:bg-soft-gray/90">
          <FileText className="mr-2 h-4 w-4" />
          Export Lists
        </Button>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={onCreateNew}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Packing List
        </Button>
      </div>
    </div>
  );
};