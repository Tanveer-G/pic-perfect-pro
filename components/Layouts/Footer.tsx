import Socials from "./Socials";
const Footer = () => {
  return (
    <footer className="mt-4 bg-black/20 rounded-md py-2 flex flex-col bottom-0 relative text-center justify-center items-center text-[#fe7f00] font-semibold w-full">
      <h5 className="text-[#4fa83d]">
        {" "}
        &#169; Develope and Design by Tanveer H.
      </h5>
      <a
        href="https://tanveer-portfolio.vercel.app/en-US/contact"
        className=" flex text-white hover:text-[#4fa83d] active:text-[#7D141D] hover:underline"
      >
        Contact me.
      </a>
      <Socials />
    </footer>
  );
};
export default Footer;
