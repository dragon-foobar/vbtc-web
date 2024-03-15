"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  throw new Error("Public stripe key not found");
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

type Props = {
  eventId: string;
  event: any;
};

export const TicketForm = ({ eventId, event }: Props) => {
  const [email, setEmail] = useState("");

  if (!event) throw new Error("No event id is defined");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const paymentMethod = formData.get("paymentMethod") as string;

    if (email.trim() === "") {
      alert("Please provide an email");
      return;
    }

    const response = await fetch(
      `${paymentMethod === "fiat" ? "/checkout-stripe" : "/checkout"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    const result = await response.json();

    if (result.success) {
      window.location.assign(result.url);
    }
  };

  const validateEmail = (e: React.FormEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value === email) {
      console.log("Yay its the same");
    }
  };

  return (
    <div className="container flex flex-col mx-auto sm:py-8 lg:py-20 items-center px-4">
      <h1 className="mb-6 md:mb-10 w-full text-center">Purchase Tickets</h1>
      <h2 className="text-2xl">{event.title}</h2>
      <p className="py-4 font-sans">
        <strong>Ticket price: </strong>
        <span>{event.price} satoshis</span>
      </p>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="name"
            >
              Number of tickets
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-secondary-light rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="name"
              name="ticketAmount"
              type="number"
              min="0"
              max="5"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="email"
            >
              Email (which will be used to send ticket confirmation)
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-secondary-light rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              placeholder="satoshin@gmx.com"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="confirmEmail"
            >
              Confirm email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-secondary-light rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="confirmEmail"
              type="email"
              name="confirmEmail"
              onChange={(e) => validateEmail(e)}
              placeholder="satoshin@gmx.com"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <legend className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Select payment method:
            </legend>
          </div>
          <div className="md:w-2/3">
            <div>
              <input
                className="w-4 h-4"
                type="radio"
                id="btc"
                name="paymentMethod"
                value="btc"
                checked
                readOnly
              />
              <label className="font-serif pl-2" htmlFor="btc">
                Bitcoin (via BTCPay Server)
              </label>
            </div>

            <div>
              <input
                className="w-4 h-4"
                type="radio"
                id="fiat"
                name="paymentMethod"
                value="fiat"
                disabled
              />
              <label className="font-serif pl-2" htmlFor="fiat">
                Fiat (via Stripe){" "}
                <em>
                  <small>
                    SoonTM. We're still trying to find a fiat bank that will
                    bank us.
                  </small>
                </em>
              </label>
            </div>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow-xl hover:bg-secondary bg-secondary-light focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded"
              type="submit"
            >
              Purchase
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
