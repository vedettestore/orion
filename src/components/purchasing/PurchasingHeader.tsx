import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreatePurchaseOrder } from "./CreatePurchaseOrder";

interface PurchasingHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

export function PurchasingHeader({
  isDialogOpen,
  setIsDialogOpen,
}: PurchasingHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
        <p className="text-muted-foreground">
          Manage your purchase orders and shipments
        </p>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Place New Order</Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create Purchase Order</DialogTitle>
          </DialogHeader>
          <CreatePurchaseOrder onSuccess={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}