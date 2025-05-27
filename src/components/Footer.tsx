import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-6 px-10 text-sm flex justify-between items-center">
      <div></div>
      <p>
        Social Poster is a product of <span className="font-semibold">Igent Works</span>, operated by <span className="font-semibold">Igent Holding LLC</span> — a U.S. registered company.
      </p>
      <div className="flex justify-center gap-2 mt-4 text-sm text-gray-500">
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