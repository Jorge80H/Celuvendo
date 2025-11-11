import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCOP } from "@/lib/utils";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const brands = ["Samsung", "Xiaomi", "Motorola", "Oppo", "Infinix"];
const ramOptions = ["4GB", "6GB", "8GB", "12GB"];
const storageOptions = ["64GB", "128GB", "256GB", "512GB"];

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([200000, 4000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRam, setSelectedRam] = useState<string[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);

  const toggleSelection = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
    console.log(`Toggled filter: ${item}`);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedRam([]);
    setSelectedStorage([]);
    setPriceRange([200000, 4000000]);
    console.log("Filters cleared");
  };

  const activeFiltersCount = selectedBrands.length + selectedRam.length + selectedStorage.length;

  return (
    <Card className="p-6 sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Filtros</h3>
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" data-testid="badge-active-filters">
            {activeFiltersCount}
          </Badge>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["brand", "price", "ram", "storage"]} className="space-y-4">
        <AccordionItem value="brand" className="border-none">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-2">
            Marca
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleSelection(brand, selectedBrands, setSelectedBrands)}
                    data-testid={`checkbox-brand-${brand.toLowerCase()}`}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-2">
            Rango de Precio
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={200000}
                max={4000000}
                step={100000}
                className="w-full"
                data-testid="slider-price-range"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground" data-testid="text-price-min">
                  {formatCOP(priceRange[0])}
                </span>
                <span className="text-muted-foreground" data-testid="text-price-max">
                  {formatCOP(priceRange[1])}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ram" className="border-none">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-2">
            Memoria RAM
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {ramOptions.map((ram) => (
                <div key={ram} className="flex items-center space-x-2">
                  <Checkbox
                    id={`ram-${ram}`}
                    checked={selectedRam.includes(ram)}
                    onCheckedChange={() => toggleSelection(ram, selectedRam, setSelectedRam)}
                    data-testid={`checkbox-ram-${ram.toLowerCase()}`}
                  />
                  <Label htmlFor={`ram-${ram}`} className="text-sm cursor-pointer">
                    {ram}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="storage" className="border-none">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline py-2">
            Almacenamiento
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {storageOptions.map((storage) => (
                <div key={storage} className="flex items-center space-x-2">
                  <Checkbox
                    id={`storage-${storage}`}
                    checked={selectedStorage.includes(storage)}
                    onCheckedChange={() => toggleSelection(storage, selectedStorage, setSelectedStorage)}
                    data-testid={`checkbox-storage-${storage.toLowerCase()}`}
                  />
                  <Label htmlFor={`storage-${storage}`} className="text-sm cursor-pointer">
                    {storage}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          className="w-full mt-6"
          onClick={clearFilters}
          data-testid="button-clear-filters"
        >
          Limpiar Filtros
        </Button>
      )}
    </Card>
  );
}
