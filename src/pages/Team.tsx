import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Team = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team</h1>
              <p className="text-muted-foreground">Manage your team members</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p>Team management content will go here</p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Team;