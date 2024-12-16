import { PackingListCard } from "./PackingListCard";

interface PackingListGridProps {
  lists: any[];
  onEdit: (list: any) => void;
}

export const PackingListGrid = ({ lists, onEdit }: PackingListGridProps) => {
  if (!lists?.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold">No packing lists yet</h3>
        <p className="text-muted-foreground mt-2">Create your first packing list to get started</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {lists.map((list) => (
        <PackingListCard 
          key={list.id} 
          list={list} 
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};