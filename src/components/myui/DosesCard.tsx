import Link from "next/link";

interface DosesCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
}

export default function DosesCard({
  id,
  title,
  description,
  category,
}: // icon,
//iconColor,
DosesCardProps) {
  return (
    <Link href={`/doses/${id}`}>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
        <span className="text-sm font-medium text-blue-600">{category}</span>
        <h3 className="text-xl font-semibold mt-2 mb-3 text-gray-800">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
