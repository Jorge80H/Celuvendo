import { db } from "./instant";

// Helper function to clear all cart items (useful for testing)
export async function clearAllCartItems() {
  const sessionId = localStorage.getItem("cart_session_id");

  if (!sessionId) {
    console.log("No cart session found");
    return;
  }

  const { data } = await db.queryOnce({
    cartItems: {
      $: {
        where: {
          sessionId,
        },
      },
    },
  });

  if (data?.cartItems && data.cartItems.length > 0) {
    const deleteTxs = data.cartItems.map((item: any) =>
      db.tx.cartItems[item.id].delete()
    );
    await db.transact(deleteTxs);
    console.log(`Deleted ${data.cartItems.length} cart items`);
  } else {
    console.log("No cart items to delete");
  }
}

// Make it available in the browser console for debugging
if (typeof window !== 'undefined') {
  (window as any).clearAllCartItems = clearAllCartItems;
}
