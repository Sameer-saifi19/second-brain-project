import { ReactElement } from "react";

export function SideBarItem({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex cursor-pointer hover:bg-gray-100 gap-4 rounded-md p-4  ">
      <div>{icon}</div>
      <div className="font-semibold text-lg">{text}</div>
    </div>
  );
}
