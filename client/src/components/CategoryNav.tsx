import { Button } from "@/components/ui/button";
import { SiSamsung, SiXiaomi } from "react-icons/si";
import { Smartphone } from "lucide-react";
import { Link } from "wouter";

const categories = [
  { id: "samsung", name: "Samsung", icon: SiSamsung },
  { id: "xiaomi", name: "Xiaomi", icon: SiXiaomi },
  { id: "motorola", name: "Motorola", icon: Smartphone },
  { id: "oppo", name: "OPPO", icon: Smartphone },
  { id: "infinix", name: "Infinix", icon: Smartphone },
  { id: "tecno", name: "TECNO", icon: Smartphone },
  { id: "ofertas", name: "Ofertas", icon: null },
];

export default function CategoryNav() {
  return (
    <nav className="sticky top-[64px] z-40 bg-white dark:bg-gray-950 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 py-3 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            const href = category.id === "ofertas"
              ? "/productos?ofertas=true"
              : `/productos?brand=${category.name}`;

            return (
              <Link key={category.id} href={href}>
                <Button
                  variant={category.id === "ofertas" ? "default" : "ghost"}
                  size="sm"
                  className="flex-shrink-0 hover-elevate active-elevate-2"
                  data-testid={`button-category-${category.id}`}
                >
                  {Icon && <Icon className="h-4 w-4 mr-2" />}
                  {category.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
