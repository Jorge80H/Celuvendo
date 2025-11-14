import { useState } from "react";
import { db, id } from "@/lib/instant";
import { Button } from "@/components/ui/button";
import { samsungProducts } from "@/data/samsung-products";

export default function SeedData() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ added: number; existing: number } | null>(null);

  // Query existing products from database
  const { data: existingData, isLoading: isQueryLoading } = db.useQuery({
    products: {}
  });

  const seedDatabase = async () => {
    setLoading(true);
    setError(null);
    setStats(null);

    try {
      // Get existing product SKUs
      const existingSKUs = new Set(
        existingData?.products?.map((p: any) => p.sku) || []
      );

      // Filter only new products (products with SKUs that don't exist yet)
      const newProducts = samsungProducts.filter(
        (p) => !existingSKUs.has(p.sku)
      );

      const existingCount = samsungProducts.length - newProducts.length;

      // If no new products, just notify
      if (newProducts.length === 0) {
        setSuccess(true);
        setStats({ added: 0, existing: existingCount });
        alert(`ℹ️ Todos los ${samsungProducts.length} productos ya existen en la base de datos.`);
        return;
      }

      // Add only new products
      for (const product of newProducts) {
        const productWithTimestamps = {
          ...product,
          id: id(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        await db.transact([
          db.tx.products[productWithTimestamps.id].update(productWithTimestamps)
        ]);
      }

      setSuccess(true);
      setStats({ added: newProducts.length, existing: existingCount });
      alert(`✅ ${newProducts.length} producto(s) nuevo(s) agregado(s)!\n${existingCount} producto(s) ya existían.`);
    } catch (err) {
      console.error("Error seeding:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const clearDatabase = async () => {
    const confirmClear = window.confirm(
      "⚠️ ¿Estás seguro? Esto borrará TODOS los productos de la base de datos. Esta acción no se puede deshacer."
    );

    if (!confirmClear) return;

    setLoading(true);
    setError(null);

    try {
      const products = existingData?.products || [];

      if (products.length === 0) {
        alert("ℹ️ La base de datos ya está vacía.");
        setLoading(false);
        return;
      }

      // Delete all products
      for (const product of products) {
        await db.transact([db.tx.products[product.id].delete()]);
      }

      setSuccess(false);
      setStats(null);
      alert(`✅ Base de datos limpiada exitosamente. ${products.length} producto(s) eliminado(s).`);
    } catch (err) {
      console.error("Error clearing database:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const totalProducts = existingData?.products?.length || 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Seed Database</h1>

        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
          <p className="text-sm text-blue-800">
            📊 <strong>Productos en BD:</strong> {isQueryLoading ? "Cargando..." : totalProducts}
          </p>
          <p className="text-sm text-blue-800 mt-1">
            📦 <strong>Productos en archivo:</strong> {samsungProducts.length}
          </p>
        </div>

        <p className="text-gray-600 mb-6">
          Click "Seed Database" to add new products. Products with duplicate SKUs will be skipped automatically.
        </p>

        <div className="space-y-3">
          <Button
            onClick={seedDatabase}
            disabled={loading || isQueryLoading}
            className="w-full"
          >
            {loading ? "Seeding..." : "Seed Database"}
          </Button>

          <Button
            onClick={clearDatabase}
            variant="destructive"
            disabled={loading || isQueryLoading}
            className="w-full"
          >
            {loading ? "Clearing..." : "Clear Database"}
          </Button>
        </div>

        {stats && (
          <div className="bg-green-50 border border-green-200 rounded p-4 mt-4">
            <p className="text-green-800 font-semibold">
              ✅ Operación completada
            </p>
            <p className="text-sm text-green-600 mt-2">
              • {stats.added} producto(s) nuevo(s) agregado(s)
            </p>
            <p className="text-sm text-green-600">
              • {stats.existing} producto(s) ya existían
            </p>
            <p className="text-sm text-green-600 mt-2">
              Puedes ir al <a href="/" className="underline font-semibold">homepage</a> para ver los productos.
            </p>
          </div>
        )}

        {success && !stats && (
          <div className="bg-green-50 border border-green-200 rounded p-4 mt-4">
            <p className="text-green-800">
              ✅ Database seeded successfully!
            </p>
            <p className="text-sm text-green-600 mt-2">
              You can now go to the <a href="/" className="underline">homepage</a> to see your products.
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-4 mt-4">
            <p className="text-red-800">
              ❌ Error: {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
