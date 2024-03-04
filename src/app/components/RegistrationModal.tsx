"use client";
import { loadStripe } from "@stripe/stripe-js";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  throw new Error("Public stripe key not found");
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export const RegistrationModal = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("about to run form data");
    const formData = new FormData(e.currentTarget);
    console.log("form data", formData);
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

  return (
    <div className="container flex flex-col mx-auto sm:py-8 lg:py-20 items-center px-4">
      <h1 className="mb-6 md:mb-10 w-full text-center">
        Membership Registration
      </h1>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="name"
            >
              Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-cool-gray rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="name"
              name="name"
              type="text"
              placeholder="Satoshi Nakamoto"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="email"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-cool-gray rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="email"
              name="email"
              type="email"
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
              className="bg-gray-200 appearance-none border-2 border-cool-gray rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="confirmEmail"
              type="email"
              name="confirmEmail"
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
          <div>
            <div>
              <input
                className="w-4 h-4"
                type="radio"
                id="btc"
                name="paymentMethod"
                value="btc"
              />
              <label className="font-normal pl-2" htmlFor="btc">
                Bitcoin (lightning via BTCPay Server)
              </label>
            </div>

            <div>
              <input
                className="w-4 h-4"
                type="radio"
                id="fiat"
                name="paymentMethod"
                value="fiat"
              />
              <label className="font-normal pl-2" htmlFor="fiat">
                Fiat via Stripe
              </label>
            </div>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>
          <label className="md:w-2/3 block text-gray-500 font-bold">
            <input
              className="mr-2 leading-tight w-8 md:w-4 md:w-4 h-8"
              type="checkbox"
            />
            <span className="text-xl md:text-sm font-normal">
              I have read and agree to the club purpose.
            </span>
          </label>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow-xl hover:bg-cool-gray focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded"
              type="submit"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
