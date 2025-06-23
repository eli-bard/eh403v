import { Baby, Joystick, LucideIcon } from "lucide-react";

interface Especialidades {
  id: string;
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

export const specialties: Especialidades[] = [
  {
    id: "neonatologia",
    title: "Neonatologia",
    icon: Baby,
  },
  {
    id: "pediatria",
    title: "Pediatria",
    icon: Joystick,
  },
];
