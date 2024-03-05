// Import necessary modules from React and the stylesheet
import React, { useState, ChangeEvent } from "react";

const btcpayUrl = process.env.NEXT_PUBLIC_BTCPAY_URL;
const btcpayStoreId = process.env.NEXT_PUBLIC_BTCPAY_STORE_ID;

// Define the ReactBtcPayButton component
export const DonationWidget = ({
  browserRedirect = "", // Default
  checkoutDesc = "", // Default
  checkoutQueryString = "", // Default
  currency: currencyProp = "SATS", // Default
  defaultPaymentMethod = "", // Default
  imageShow = true, // Default
  inputMax = 21000000000000, // Default
  inputMin = 5000, // Default
  jsonResponse = true, // Default
  notifyEmail = "", // Default
  orderId = "DONATION", // Default
  serverIpn = "", // Default
  sliderMax = 250000, // Default
  sliderMin = 5000, // Default
  submitBtnText = "Donate with ", // Default
}) => {
  const [price, setPrice] = useState(5000);

  // Function to handle changes in the slider
  const handleSliderChange = (e: ChangeEvent) => {
    if (!!e.target) {
      const element = e.currentTarget as HTMLInputElement;
      const value = element.value;

      setPrice(parseInt(value, 10));
    }
  };

  // Function to handle changes in the price input
  const handlePriceChange = (e: ChangeEvent) => {
    const element = e.currentTarget as HTMLInputElement;
    const value = element.value;

    setPrice(parseInt(value, 10));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);
    const amount = formData.get("amount") as string;

    const response = await fetch("/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
    const result = await response.json();

    if (result.success) {
      window.location.assign(result.url);
    }
  };

  // The form that will be displayed
  return (
    <form method="POST" onSubmit={handleSubmit} className="">
      <div className="flex flex-col">
        <input
          className="btcpay-input-range mb-2"
          type="range"
          min={sliderMin}
          max={sliderMax}
          value={price}
          onChange={(e) => handleSliderChange(e)}
        />
        <input
          className="btcpay-input-price mb-4 text-2xl py-2 text-center rounded-lg border-secondary border-2"
          type="number"
          name="amount"
          min={inputMin}
          max={inputMax}
          value={price}
          onChange={handlePriceChange}
          readOnly
        />
      </div>

      {/* Hidden fields for server settings */}
      <input type="hidden" name="storeId" value={btcpayStoreId} />
      <input
        type="hidden"
        name="jsonResponse"
        value={JSON.stringify(jsonResponse)}
      />
      <input
        type="hidden"
        name="defaultPaymentMethod"
        value={defaultPaymentMethod}
      />
      <input type="hidden" name="checkoutDesc" value={checkoutDesc} />
      <input type="hidden" name="orderId" value={orderId} />
      <input type="hidden" name="serverIpn" value={serverIpn} />
      <input type="hidden" name="notifyEmail" value={notifyEmail} />
      <input type="hidden" name="browserRedirect" value={browserRedirect} />
      <input
        type="hidden"
        name="checkoutQueryString"
        value={checkoutQueryString}
      />

      <button
        className="bg-onyx p-2 rounded-lg justify-center flex w-full sm:flex-col lg:flex-row"
        type="submit"
      >
        <span className="mr-2 text-xl text-white">{submitBtnText}</span>
        {imageShow && (
          <img
            className="w-20 ml-2"
            src={`${btcpayUrl}/img/paybutton/logo.svg`}
            alt="BTCPay Logo"
          />
        )}
      </button>
    </form>
  );
};
