import { db } from "../server/db";
import {
  users,
  suppliers,
  inventory,
  priceHistory,
  systemConfig,
  inventoryMovements,
} from "../shared/inventory-schema";
import { hashPassword } from "../server/auth";

async function seedInventory() {
  try {
    console.log("🌱 Starting inventory database seed...\n");

    // 1. Crear usuarios
    console.log("📝 Creating users...");
    const passwordHash = await hashPassword("admin123");

    const createdUsers = await db.insert(users).values([
      {
        email: "admin@celuvendo.com",
        passwordHash,
        firstName: "Admin",
        lastName: "Sistema",
        role: "admin",
        isActive: true,
      },
      {
        email: "warehouse@celuvendo.com",
        passwordHash,
        firstName: "Warehouse",
        lastName: "Manager",
        role: "warehouse_manager",
        isActive: true,
      },
      {
        email: "inventory@celuvendo.com",
        passwordHash,
        firstName: "Inventory",
        lastName: "Clerk",
        role: "inventory_clerk",
        isActive: true,
      },
      {
        email: "logistics@celuvendo.com",
        passwordHash,
        firstName: "Logistics",
        lastName: "Coordinator",
        role: "logistics_coordinator",
        isActive: true,
      },
    ]).returning();

    const [admin] = createdUsers;
    console.log(`✅ Created ${createdUsers.length} users`);
    console.log(`   - Admin: admin@celuvendo.com (password: admin123)\n`);

    // 2. Crear proveedores
    console.log("🏢 Creating suppliers...");
    const suppliersData = await db.insert(suppliers).values([
      {
        name: "Tech Distributors S.A.S",
        legalName: "Tech Distributors Colombia S.A.S",
        taxId: "900123456-7",
        contactName: "Juan Pérez",
        email: "ventas@techdist.com",
        phone: "+57 300 1234567",
        address: {
          street: "Calle 100 # 10-20",
          city: "Bogotá",
          state: "Cundinamarca",
          zipCode: "110111",
          country: "Colombia",
        },
        paymentTerms: "30 días",
        currency: "COP",
        isActive: true,
      },
      {
        name: "Mobile Import SAS",
        legalName: "Mobile Import Colombia SAS",
        taxId: "900987654-3",
        contactName: "María González",
        email: "compras@mobileimport.co",
        phone: "+57 310 9876543",
        address: {
          street: "Carrera 7 # 71-21",
          city: "Bogotá",
          state: "Cundinamarca",
          zipCode: "110231",
          country: "Colombia",
        },
        paymentTerms: "60 días",
        currency: "COP",
        isActive: true,
      },
    ]).returning();

    const [supplier1, supplier2] = suppliersData;
    console.log(`✅ Created ${suppliersData.length} suppliers\n`);

    // 3. Crear inventario de ejemplo
    console.log("📦 Creating inventory items...");

    // Productos de ejemplo (asumiendo que ya existen en la tabla products)
    const productIds = [
      "iphone-15-pro-256",
      "samsung-s24-ultra",
      "xiaomi-13-pro",
    ];

    const inventoryItems = [];
    const movements = [];

    let itemCount = 0;
    for (const productId of productIds) {
      // Crear 15 items por producto
      for (let i = 1; i <= 15; i++) {
        itemCount++;
        const imei = `35${itemCount.toString().padStart(13, "0")}`;
        const serialNumber = `SN-2025-${itemCount.toString().padStart(4, "0")}`;

        // Distribuir entre proveedores
        const supplierId = i % 2 === 0 ? supplier1.id : supplier2.id;

        // Diferentes estados para simular diferentes etapas
        let status: any;
        if (i <= 10) status = "in_warehouse";
        else if (i <= 12) status = "reserved";
        else if (i <= 13) status = "preparing";
        else if (i <= 14) status = "shipped";
        else status = "delivered";

        const item = {
          productId,
          imei,
          serialNumber,
          status,
          purchasePrice: "4500000",
          purchaseDate: new Date("2025-11-01"),
          supplierId,
          purchaseOrderRef: `PO-2025-${Math.floor(itemCount / 10).toString().padStart(3, "0")}`,
          warehouseLocation: status === "in_warehouse" ? `A-${Math.floor(i / 5) + 1}-${i % 5 || 5}` : undefined,
          condition: "new",
          createdBy: admin.id,
        };

        inventoryItems.push(item);
      }
    }

    const createdInventory = await db.insert(inventory).values(inventoryItems).returning();
    console.log(`✅ Created ${createdInventory.length} inventory items\n`);

    // 4. Crear movimientos de inventario para los items
    console.log("🔄 Creating inventory movements...");
    for (const item of createdInventory) {
      // Movimiento inicial (compra)
      movements.push({
        inventoryId: item.id,
        fromStatus: null,
        toStatus: "purchased" as any,
        reason: "Initial purchase",
        performedBy: admin.id,
        performedAt: new Date("2025-11-01T10:00:00Z"),
      });

      // Si está en almacén o posterior, agregar movimiento a almacén
      if (item.status !== "purchased") {
        movements.push({
          inventoryId: item.id,
          fromStatus: "purchased" as any,
          toStatus: "in_warehouse" as any,
          toLocation: item.warehouseLocation || undefined,
          reason: "Arrived at warehouse",
          performedBy: admin.id,
          performedAt: new Date("2025-11-02T14:00:00Z"),
        });
      }

      // Movimientos adicionales según el estado
      if (item.status === "reserved" || item.status === "preparing" ||
          item.status === "shipped" || item.status === "delivered") {
        movements.push({
          inventoryId: item.id,
          fromStatus: "in_warehouse" as any,
          toStatus: "reserved" as any,
          reason: "Reserved for order",
          performedBy: admin.id,
          performedAt: new Date("2025-11-10T09:00:00Z"),
        });
      }

      if (item.status === "preparing" || item.status === "shipped" || item.status === "delivered") {
        movements.push({
          inventoryId: item.id,
          fromStatus: "reserved" as any,
          toStatus: "preparing" as any,
          toLocation: "PREP-01",
          reason: "Order preparation",
          performedBy: admin.id,
          performedAt: new Date("2025-11-11T10:00:00Z"),
        });
      }

      if (item.status === "shipped" || item.status === "delivered") {
        movements.push({
          inventoryId: item.id,
          fromStatus: "preparing" as any,
          toStatus: "shipped" as any,
          reason: "Shipped with LogiCorp",
          performedBy: admin.id,
          performedAt: new Date("2025-11-12T15:00:00Z"),
        });
      }

      if (item.status === "delivered") {
        movements.push({
          inventoryId: item.id,
          fromStatus: "shipped" as any,
          toStatus: "delivered" as any,
          reason: "Successfully delivered",
          performedBy: admin.id,
          performedAt: new Date("2025-11-15T16:30:00Z"),
        });
      }
    }

    await db.insert(inventoryMovements).values(movements);
    console.log(`✅ Created ${movements.length} inventory movements\n`);

    // 5. Crear historial de precios
    console.log("💰 Creating price history...");
    const prices = [];
    for (const productId of productIds) {
      // Precio base
      prices.push({
        productId,
        priceType: "base" as any,
        price: "5500000",
        currency: "COP",
        validFrom: new Date("2025-11-01"),
        isActive: true,
        reason: "Initial price",
        createdBy: admin.id,
      });

      // Precio promocional
      prices.push({
        productId,
        priceType: "promotional" as any,
        price: "5200000",
        currency: "COP",
        validFrom: new Date("2025-11-15"),
        validTo: new Date("2025-12-31"),
        isActive: true,
        reason: "Black Friday promotion",
        createdBy: admin.id,
      });

      // Precio mayorista
      prices.push({
        productId,
        priceType: "wholesale" as any,
        price: "5000000",
        currency: "COP",
        validFrom: new Date("2025-11-01"),
        minQuantity: 5,
        isActive: true,
        reason: "Wholesale pricing",
        createdBy: admin.id,
      });
    }

    await db.insert(priceHistory).values(prices);
    console.log(`✅ Created ${prices.length} price records\n`);

    // 6. Configuración del sistema
    console.log("⚙️  Creating system configuration...");
    await db.insert(systemConfig).values([
      {
        key: "low_stock_threshold",
        value: 10,
        description: "Nivel mínimo de stock para generar alertas",
        updatedBy: admin.id,
      },
      {
        key: "default_currency",
        value: "COP",
        description: "Moneda por defecto del sistema",
        updatedBy: admin.id,
      },
      {
        key: "warehouse_zones",
        value: ["A", "B", "C", "PREP"],
        description: "Zonas disponibles en el almacén",
        updatedBy: admin.id,
      },
      {
        key: "default_shipping_cost",
        value: 15000,
        description: "Costo de envío por defecto (COP)",
        updatedBy: admin.id,
      },
      {
        key: "tax_rate",
        value: 0.19,
        description: "Tasa de IVA (19%)",
        updatedBy: admin.id,
      },
    ]);
    console.log(`✅ Created system configuration\n`);

    // Resumen
    console.log("=" .repeat(50));
    console.log("🎉 SEED COMPLETED SUCCESSFULLY!\n");
    console.log("📊 Summary:");
    console.log(`   - Users: ${createdUsers.length}`);
    console.log(`   - Suppliers: ${suppliersData.length}`);
    console.log(`   - Inventory items: ${createdInventory.length}`);
    console.log(`   - Inventory movements: ${movements.length}`);
    console.log(`   - Price records: ${prices.length}`);
    console.log(`   - System config: 5 settings`);
    console.log("\n🔐 Login credentials:");
    console.log("   Email: admin@celuvendo.com");
    console.log("   Password: admin123");
    console.log("\n📚 Next steps:");
    console.log("   1. Start server: npm run dev");
    console.log("   2. Login via POST /api/v1/auth/login");
    console.log("   3. See API_DOCUMENTATION.md for available endpoints");
    console.log("=" .repeat(50));

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Ejecutar seed
seedInventory()
  .then(() => {
    console.log("\n✅ Seed completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Seed failed:", error);
    process.exit(1);
  });
