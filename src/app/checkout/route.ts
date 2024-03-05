import { createId } from "@paralleldrive/cuid2";
import { NextRequest, NextResponse } from "next/server";
import { email, object, parse, string, optional } from "valibot";

const baseUrl = process.env.BASE_URL;
const membershipPrice = process.env.MEMBERSHIP_PRICE;
const apiKey = process.env.BTCPAY_API_KEY;
const storeId = process.env.BTCPAY_STORE_ID;
const url = process.env.BTCPAY_URL;

export const POST = async (request: NextRequest, response: NextResponse) => {
  const req = await request.json();
  console.info("🏁 POST /api/btcpayserver/checkout/route");
  if (
    typeof baseUrl === "undefined" ||
    typeof membershipPrice === "undefined" ||
    typeof apiKey === "undefined" ||
    typeof storeId === "undefined" ||
    typeof url === "undefined"
  ) {
    throw new Error("Env variables are not defined");
  }

  const btcpayserverSchema = object({
    email: optional(string([email()])),
    amount: optional(string()),
  });

  const redirectURL = `${baseUrl}/payment/successful`;

  const project_name = "BTC Ebook";
  const amount = Number(membershipPrice);
  const currency = "SATS";
  
  try {
    const { email, amount: donationAmount } = parse(btcpayserverSchema, req);

    const metadata = {
      orderId: createId(),
      project_name,
      buyerEmail: email,
    };

    const response = await fetch(`${url}/stores/${storeId}/invoices`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${apiKey}`,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        amount: donationAmount ? donationAmount : amount,
        email: email ? email : "info@vbtc.org.au",
        currency,
        metadata,
        checkout: { redirectURL },
      }),
    });

    const session = await response.json();
    console.info(`[BTCPayServer] ✅ Successfully created Checkout Page!`);
    return NextResponse.json({ success: true, url: session.checkoutLink });
  } catch (error) {
    console.error(error, `[BTCPayServer] Checkout Error`);
    return NextResponse.json(error, { status: 500 });
  }
};
