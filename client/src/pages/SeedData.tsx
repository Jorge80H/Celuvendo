import { useState } from "react";
import { db, id } from "@/lib/instant";
import { Button } from "@/components/ui/button";
import { samsungProducts } from "@/data/samsung-products";

export default function SeedData() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const seedDatabase = async () => {
    setLoading(true);
    setError(null);

    try {
      for (const product of samsungProducts) {
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
      alert(`✅ Successfully seeded ${samsungProducts.length} Samsung products!`);
    } catch (err) {
      console.error("Error seeding:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Seed Database</h1>
        <p className="text-gray-600 mb-6">
          Click the button below to populate your InstantDB database with {samsungProducts.length} Samsung products.
        </p>

        {!success && (
          <Button
            onClick={seedDatabase}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Seeding..." : "Seed Database"}
          </Button>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
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
