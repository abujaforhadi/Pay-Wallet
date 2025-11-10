import { Helmet } from "react-helmet-async";

type HelmetTitleProps = {
  title?: string;
  description?: string;
};

const HelmetTitle = ({
  title = "Pay Wallet",
  description = "Pay Wallet is a digital wallet for payments",
}: HelmetTitleProps) => {
  return (
    <Helmet>
      <title>{title ? `${title} - Pay Wallet` : "Pay Wallet"}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default HelmetTitle;
