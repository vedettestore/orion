import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PackingList {
  id: number;
  order_number: string;
  customer_name: string;
  status: string;
  created_at: string;
  created_by: { display_name: string } | null;
}

interface PackingListTableProps {
  data: PackingList[];
  isLoading: boolean;
}

export const PackingListTable = ({ data, isLoading }: PackingListTableProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="font-semibold">Order #</TableHead>
            <TableHead className="font-semibold">Customer</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Created By</TableHead>
            <TableHead className="font-semibold">Created At</TableHead>
            <TableHead className="w-[100px] font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((list) => (
            <TableRow key={list.id} className="hover:bg-gray-50/50">
              <TableCell className="font-medium">{list.order_number}</TableCell>
              <TableCell>{list.customer_name}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    list.status === "completed"
                      ? "bg-green-50 text-green-700"
                      : list.status === "in_progress"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {list.status}
                </span>
              </TableCell>
              <TableCell>{list.created_by?.display_name || "Unknown"}</TableCell>
              <TableCell>
                {new Date(list.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100"
                    onClick={() => navigate(`/packing/${list.id}`)}
                  >
                    <Eye className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100"
                    onClick={() => navigate(`/packing/${list.id}/pack`)}
                  >
                    <Package className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};