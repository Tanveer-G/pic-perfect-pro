export default function BrandHeader() {
  return (
    <div className="w-full flex flex-col justify-center items-center my-4">
      <h1 className="mb-2 capitalize text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {"pic perfect "}
        <span className="text-[#4fa83d] dark:text-[#4fa83d]">{"pro"}</span>
      </h1>
      <p className="font-medium italic text-center">
        {"'Experience the Realtime Image Optimization.'"}
      </p>
    </div>
  );
}
