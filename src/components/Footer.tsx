import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-6 px-10 text-sm flex justify-between items-center">
      <div className="w-full"></div>
      <p className="w-full  text-center">
        <span className="text-sm ">
        © {new Date().getFullYear()} Social Mint — Developed by IgentWorks, a subsidiary of Igent Holdings LLC.
        </span>
      </p>
      <div className="flex justify-center gap-2  text-sm text-gray-300 w-full">
        <Link to="/privacy-policy" >
          Privacy Policy
        </Link>
        <Link to="/terms-of-service" >
          Terms of Service
        </Link>
      </div>
    </footer>
  );
};

export default Footer;