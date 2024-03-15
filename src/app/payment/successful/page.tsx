"use client";

export default function Page() {
  return (
    <div className="container mx-auto p-60">
      <h1 className="underline decoration-secondary decoration-solid">
        Success!
      </h1>
      <p className="text-xl mb-10">
        Thank you, your bitcoin payment was successful.
      </p>
      <p className="text-xl">
        If have any questions regarding this, don't hesitate to contact us at{" "}
        <a rel="noopener noreferrer" href="mailto:info@vbtc.org.au">
          info@vbtc.org.au
        </a>
      </p>
    </div>
  );
}
