import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface AreaCardProps {
  id: string;
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

export default function AreaCard({ id, title, icon }: AreaCardProps) {
  return (
    <Link href={`/${id}`}>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
        <span className="text-xl font-semibold mt-2 mb-3 text-gray-800">
          {title}
        </span>
      </div>
    </Link>
  );
}
