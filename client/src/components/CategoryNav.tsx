import { Button } from "@/components/ui/button";
import { SiSamsung, SiXiaomi } from "react-icons/si";
import { Smartphone } from "lucide-react";

const categories = [
  { id: "samsung", name: "Samsung", icon: SiSamsung },
  { id: "xiaomi", name: "Xiaomi", icon: SiXiaomi },
  { id: "motorola", name: "Motorola", icon: Smartphone },
  { id: "oppo", name: "Oppo", icon: Smartphone },
  { id: "infinix", name: "Infinix", icon: Smartphone },
  { id: "ofertas", name: "Ofertas", icon: null },
];

export default function CategoryNav() {
  return (
    <nav className="bg-card border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 py-3 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={category.id === "ofertas" ? "default" : "ghost"}
                size="sm"
                className="flex-shrink-0 hover-elevate active-elevate-2"
                data-testid={`button-category-${category.id}`}
                onClick={() => console.log(`Navigate to ${category.name}`)}
              >
                {Icon && <Icon className="h-4 w-4 mr-2" />}
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
