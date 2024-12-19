import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShipmentDetails } from "@/components/shipping/ShipmentDetails";

interface ShipmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: number | null;
}

export function ShipmentDialog({
  isOpen,
  onOpenChange,
  orderId,
}: ShipmentDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Manage Shipment</DialogTitle>
        </DialogHeader>
        {orderId && <ShipmentDetails purchaseOrderId={orderId} />}
      </DialogContent>
    </Dialog>
  );
}