

const Footer = () => {
  return (
    <footer className="border-t py-8 px-4 bg-primary">
      <div className="container mx-auto text-center ">
        
        <p className="text-white text-sm">
          © {new Date().getFullYear()} PayWallet. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
