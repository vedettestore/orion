export type ScanCountRow = {
  id: number;
  inventory_id: number | null;
  scanned_by: string | null;
  scanned_at: string | null;
  count: number | null;
  batch_id: string | null;
  notes: string | null;
};