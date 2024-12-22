import Button from "./Button";

export default function Hero() {
  return (
    <div className="text-white p-8 w-screen text-center">
      <div className="justify-center">
        <h1 className="text-5xl md:text-8xl font-extrabold mb-4">
          Empowering Every Ride <br />with <br /> Quality Parts
        </h1>
        <h2 className="text-lg md:text-3xl">
          Your Trusted Destination for Motorbike & Auto Parts Across Vietnam
        </h2>
        <div className="mt-4 text-sm md:text-base font-semibold">
          Fast Delivery | Genuine Products | Expert Support
        </div>
        <div className="flex justify-center gap-4 p-5">
          <Button title="Shop Now" link="/products" />
          <Button title="Compatability Check" link="/compatability-check" />
        </div>
      </div>
    </div>
  );
}