import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, ArrowRight, ArrowDown } from "lucide-react";

const activities = [
  {
    action: "Item Moved",
    item: "Dell Laptop",
    from: "Warehouse A",
    to: "Office Storage",
    time: "2 hours ago",
  },
  {
    action: "Stock Added",
    item: "USB Cables",
    quantity: 50,
    location: "Electronics Storage",
    time: "3 hours ago",
  },
  {
    action: "Low Stock Alert",
    item: "Printer Paper",
    quantity: 5,
    threshold: 10,
    time: "5 hours ago",
  },
];

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 rounded-lg border p-3 text-sm"
            >
              <div className="rounded-full bg-blue-100 p-2">
                <Box className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.action}</p>
                <p className="text-muted-foreground">
                  {activity.item}
                  {activity.from && (
                    <span className="flex items-center gap-1">
                      {activity.from} <ArrowRight className="h-3 w-3" /> {activity.to}
                    </span>
                  )}
                  {activity.quantity && (
                    <span>
                      {activity.quantity} units in {activity.location}
                    </span>
                  )}
                </p>
              </div>
              <span className="text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}