import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Navigation() {
  return (
    <div className="flex justify-between items-center px-4 py-4">
      <div>
        <h1 className="text-xl font-bold">Habit-tracker</h1>
      </div>

      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
