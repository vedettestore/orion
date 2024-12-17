import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface BulkEditHeaderProps {
  selectedCount: number;
}

export const BulkEditHeader = ({ selectedCount }: BulkEditHeaderProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Link
          to="/inventory"
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Bulk Edit</h1>
      </div>
      <p className="text-muted-foreground">
        {selectedCount
          ? `${selectedCount} items selected`
          : "Select items to edit them in bulk"}
      </p>
    </div>
  );
};