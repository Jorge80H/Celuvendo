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
    // Bold uses the same API URL for test and production
    // The environment is determined by the API key used
    const baseUrl = "https://integrations.api.bold.co";

    // Prepare payment request according to Bold API documentation
    // Bold uses payment links with /online/link/v1 endpoint
    const paymentRequest = {
      amount: data.amount, // Amount in cents
      amount_type: "CLOSED", // Fixed amount (not open)
      description: data.description,
      callback_url: data.redirectUrl,
      payer_email: data.customerEmail,
      order_id: data.orderId, // Custom order reference
    };

    console.log("Bold payment request:", JSON.stringify(paymentRequest, null, 2));

    // Call Bold API to create payment link
    const response = await fetch(`${baseUrl}/online/link/v1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `x-api-key ${BOLD_API_KEY}`,
      },
      body: JSON.stringify(paymentRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Bold API Error:", { status: response.status, body: errorText });
      return {
        success: false,
        error: `Bold API error: ${response.status} - ${errorText}`,
      };
    }

    const result = await response.json();
    console.log("Bold payment response:", JSON.stringify(result, null, 2));

    // Bold API returns payment link in the response
    // Response format: { link: "https://...", id: "...", ... }
    const paymentUrl = result.link || result.payment_link || result.url;
    const transactionId = result.id || result.payment_id;

    if (!paymentUrl) {
      console.error("No payment URL in Bold response:", result);
      return {
        success: false,
        error: "No se recibió URL de pago de Bold",
      };
    }

    return {
      success: true,
      paymentUrl,
      transactionId,
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
