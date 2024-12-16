import { TableCell } from "@/components/ui/table";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <TableCell>
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status === "In Stock"
            ? "bg-green-50 text-green-700"
            : status === "Low Stock"
            ? "bg-yellow-50 text-yellow-700"
            : "bg-gray-50 text-gray-700"
        }`}
      >
        {status || "N/A"}
      </span>
    </TableCell>
  );
};