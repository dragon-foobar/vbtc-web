import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const baseUrl = process.env.BASE_URL;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Stripe key not found");
}
const stripe = new Stripe(stripeSecretKey);

export const POST = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: "price_1Ooz65KuBjpie42E4hZcN4zD",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${baseUrl}/payment/?success=true`,
        cancel_url: `${baseUrl}/payment/?canceled=true`,
      });

      if ((session as any).statusCode === 500) {
        console.error((session as any).message);
        return;
      }
      if (!session.url) {
        console.error("Oops! There is no url provided with Stripe session");
        return;
      }

      return NextResponse.json({ success: true, url: session.url });
    } catch (error) {
      console.error(error, `[Stripe] Checkout Error`);
      return NextResponse.json(error, { status: 500 });
    }
  } else {
    throw Error("This was not a POST request.");
  }
};
