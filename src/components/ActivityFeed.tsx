import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package2, ArrowRight, AlertTriangle } from "lucide-react";

const activities = [
  {
    action: "Item Moved",
    item: "Dell Laptop",
    from: "Warehouse A",
    to: "Office Storage",
    time: "2 hours ago",
    type: "move",
  },
  {
    action: "Stock Added",
    item: "USB Cables",
    quantity: 50,
    location: "Electronics Storage",
    time: "3 hours ago",
    type: "add",
  },
  {
    action: "Low Stock Alert",
    item: "Printer Paper",
    quantity: 5,
    threshold: 10,
    time: "5 hours ago",
    type: "alert",
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "move":
      return <ArrowRight className="h-4 w-4 text-blue-600" />;
    case "add":
      return <Package2 className="h-4 w-4 text-green-600" />;
    case "alert":
      return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    default:
      return <Package2 className="h-4 w-4 text-gray-600" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case "move":
      return "bg-blue-50";
    case "add":
      return "bg-green-50";
    case "alert":
      return "bg-orange-50";
    default:
      return "bg-gray-50";
  }
};

export function ActivityFeed() {
  return (
    <Card className="border-none bg-gradient-to-br from-white to-gray-50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className={`rounded-full p-2 ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500 truncate">
                  {activity.item}
                  {activity.from && (
                    <span className="flex items-center gap-1 mt-0.5">
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
              <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}