import crypto from "crypto";

// Environment variables for Bold API keys
const BOLD_API_KEY = process.env.BOLD_API_KEY || "Iu2YwnF_G0gqnpUcqGJJW1Jz_5wrzyaYk21bYYM9bWs"; // Test key by default
const BOLD_SECRET_KEY = process.env.BOLD_SECRET_KEY || "sOwzS3EPJfdd6PL83_MPMw"; // Test key by default
const BOLD_ENV = process.env.BOLD_ENV || "test"; // 'test' or 'production'

interface BoldPaymentData {
  orderId: string;
  description: string;
  amount: number;
  currency: string;
  redirectUrl: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  customerDocument: string;
  customerDocumentType: string;
}

interface BoldPaymentResponse {
  success: boolean;
  paymentUrl?: string;
  transactionId?: string;
  orderId?: string;
  error?: string;
}

/**
 * Creates a payment with Bold
 * Based on Bold's manual integration documentation
 */
export async function createBoldPayment(data: BoldPaymentData): Promise<BoldPaymentResponse> {
  try {
    const baseUrl = BOLD_ENV === "production"
      ? "https://checkout.bold.co"
      : "https://checkout.sandbox.bold.co";

    // Generate integrity hash (if required by Bold)
    const integritySignature = generateIntegrityHash(data);

    // Prepare payment request according to Bold API
    const paymentRequest = {
      apiKey: BOLD_API_KEY,
      order: {
        id: data.orderId,
        amount: data.amount,
        currency: data.currency,
        description: data.description,
        redirectUrl: data.redirectUrl,
      },
      customer: {
        email: data.customerEmail,
        name: data.customerName,
        phone: data.customerPhone,
        documentNumber: data.customerDocument,
        documentType: data.customerDocumentType,
      },
      integritySignature,
    };

    // Call Bold API to create payment
    const response = await fetch(`${baseUrl}/api/v1/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${BOLD_API_KEY}`,
      },
      body: JSON.stringify(paymentRequest),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Bold API Error:", errorData);
      return {
        success: false,
        error: errorData.message || "Error al crear el pago con Bold",
      };
    }

    const result = await response.json();

    return {
      success: true,
      paymentUrl: result.paymentUrl || result.checkoutUrl,
      transactionId: result.transactionId || result.id,
      orderId: data.orderId,
    };

  } catch (error) {
    console.error("Error creating Bold payment:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

/**
 * Generates integrity hash for Bold payment
 * This follows Bold's security requirements
 */
function generateIntegrityHash(data: BoldPaymentData): string {
  // Create string to hash according to Bold's specification
  const stringToHash = `${data.orderId}${data.amount}${data.currency}${BOLD_SECRET_KEY}`;

  // Generate SHA256 hash
  const hash = crypto.createHash("sha256").update(stringToHash).digest("hex");

  return hash;
}

/**
 * Verifies Bold webhook signature
 * This ensures the webhook is actually from Bold
 */
export function verifyBoldWebhook(payload: string, signature: string): boolean {
  try {
    const expectedSignature = crypto
      .createHmac("sha256", BOLD_SECRET_KEY)
      .update(payload)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error("Error verifying Bold webhook:", error);
    return false;
  }
}

/**
 * Gets payment status from Bold
 */
export async function getBoldPaymentStatus(transactionId: string): Promise<any> {
  try {
    const baseUrl = BOLD_ENV === "production"
      ? "https://api.bold.co"
      : "https://api.sandbox.bold.co";

    const response = await fetch(`${baseUrl}/v1/transaction/${transactionId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${BOLD_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al consultar el estado del pago");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting Bold payment status:", error);
    throw error;
  }
}
