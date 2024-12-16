import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
}

export function StatsCard({ title, value, icon: Icon, description }: StatsCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-none bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="rounded-full bg-primary/10 p-2.5">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl font-bold text-gray-900">{value}</div>
        {description && (
          <p className="text-xs sm:text-sm mt-1 text-gray-500">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}