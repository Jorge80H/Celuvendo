import { db, id as generateId } from "./instant";

// Get session ID from localStorage or create new one
function getSessionId(): string {
  let sessionId = localStorage.getItem("cart_session_id");
  if (!sessionId) {
    sessionId = generateId();
    localStorage.setItem("cart_session_id", sessionId);
  }
  return sessionId;
}

export async function addToCartInstant(productId: string, quantity: number = 1) {
  const sessionId = getSessionId();

  // Query existing cart items
  const { data } = await db.queryOnce({
    cartItems: {
      $: {
        where: {
          and: [
            { sessionId },
            { productId }
          ]
        },
      },
    },
  });

  if (data?.cartItems && data.cartItems.length > 0) {
    // Update existing item quantity
    const existingItem = data.cartItems[0];
    await db.transact([
      db.tx.cartItems[existingItem.id].update({
        quantity: existingItem.quantity + quantity,
      }),
    ]);
  } else {
    // Add new item
    const newId = generateId();
    await db.transact([
      db.tx.cartItems[newId].update({
        sessionId,
        productId,
        quantity,
        createdAt: Date.now(),
      }).link({ product: productId }),
    ]);
  }
}

export async function updateCartQuantityInstant(cartItemId: string, quantity: number) {
  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    await db.transact([db.tx.cartItems[cartItemId].delete()]);
  } else {
    await db.transact([
      db.tx.cartItems[cartItemId].update({
        quantity,
      }),
    ]);
  }
}

export async function removeFromCartInstant(cartItemId: string) {
  await db.transact([db.tx.cartItems[cartItemId].delete()]);
}

export async function clearCartInstant() {
  const sessionId = getSessionId();

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
  }
}

export function getCartSessionId() {
  return getSessionId();
}
