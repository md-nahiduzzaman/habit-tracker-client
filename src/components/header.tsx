import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-8 bg-gray-600">
      {/* greeting */}
      <div>
        <div className="text-gray-400 text-sm ">Assalamu Alaykum</div>
        <div className="text-2xl font-semibold">Rakib</div>
      </div>
      {/* Right side - Status indicator, notifications, and profile */}
      <div className="flex items-center gap-4">
        {/* Notification bell with indicator */}
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-400" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full"></div>
        </div>

        {/* Profile image */}
        <div className="overflow-hidden">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
