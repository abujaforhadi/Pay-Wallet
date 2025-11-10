import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    Check, 
    X, 
    ArrowRight, 
    Users, 
    Building, 
    Crown, 
    Layers3, 
    Gauge 
} from "lucide-react";
import { Link } from "react-router";
import HelmetTitle from "@/components/layout/HelmetTitle";

export default function PricingPage() {
    const plans = [
        {
            name: "Personal Account",
            description: "Essential, free solution for daily money management and sending funds.",
            price: "Free",
            period: "Zero fees, always",
            icon: Users,
            popular: false,
            features: [
                "Instant P2P transfers (wallet to wallet)",
                "Up to $5,000 daily transaction capacity",
                "Detailed monthly spending reports",
                "Full mobile app functionality",
                "Responsive email support",
            ],
            notIncluded: [
                "Dedicated account manager",
                "Advanced compliance tools",
                "Custom API access",
                "Agent operations dashboard",
            ],
            cta: "Open Your Free Account",
            href: "/auth/register",
        },
        {
            name: "Certified Agent",
            description: "A high-earning opportunity for financial entrepreneurs and cash service providers.",
            price: "Commission Based",
            period: "Earn up to 1.5% on every transaction",
            icon: Building,
            popular: true,
            features: [
                "Includes all Personal features",
                "Access to the Agent Operations Dashboard",
                "Real-time visibility on commission payouts",
                "Tools for managing customer transactions (Cash-In/Out)",
                "Elevated daily limits (up to $25k)",
                "24/7 Priority Support Channel",
                "Branded marketing and training materials",
            ],
            notIncluded: ["White-label solutions", "Direct Enterprise API access"],
            cta: "Join the Agent Network",
            href: "/auth/register?role=agent",
        },
        {
            name: "Corporate Partner",
            description: "Scalable platform and API integration for major businesses and financial services.",
            price: "Negotiated Rate",
            period: "Tailored contract based on volume",
            icon: Crown,
            popular: false,
            features: [
                "Full Agent capabilities included",
                "Seamless custom system integration",
                "Full API and Webhook access",
                "Optional white-label branding",
                "Dedicated Partner Account Manager",
                "Bespoke Limits & Fee Structure",
                "Regulatory and compliance reporting dashboard",
            ],
            notIncluded: [],
            cta: "Schedule a Consultation",
            href: "/contact",
        },
    ];

    const transactionFees = [
        {
            type: "Wallet-to-Wallet Transfers",
            fee: "0%",
            badgeColor: "bg-green-600 hover:bg-green-700",
            description: "Move funds between any PayWallet account instantly, completely free.",
        },
        {
            type: "Cash Deposit (Agent Network)",
            fee: "1.0% - 2.0%",
            badgeColor: "bg-yellow-600 hover:bg-yellow-700",
            description: "Instantly load your wallet with cash at any certified agent location.",
        },
        {
            type: "Cash Withdrawal (Agent Network)",
            fee: "1.0% - 2.0%",
            badgeColor: "bg-yellow-600 hover:bg-yellow-700",
            description: "Convert your digital balance back to cash via an agent.",
        },
        {
            type: "Incoming Bank Funding",
            fee: "Free",
            badgeColor: "bg-green-600 hover:bg-green-700",
            description: "Push money to your PayWallet account from your linked bank.",
        },
        {
            type: "Outgoing Bank Payout",
            fee: "$0.50 - $2.00",
            badgeColor: "bg-red-600 hover:bg-red-700",
            description: "Transfer funds from PayWallet back to your traditional bank account.",
        },
        {
            type: "Utility & Bill Payments",
            fee: "Free - $1.00",
            badgeColor: "bg-blue-600 hover:bg-blue-700",
            description: "Pay for essential services directly from your wallet; small fee may apply based on vendor.",
        },
    ];

    const limits = [
        {
            account: "Unverified Personal (Tier 1)",
            daily: "$500",
            monthly: "$2,000",
            verification: "Basic registration (Phone)",
            highlight: false,
        },
        {
            account: "Verified Personal (Tier 2)",
            daily: "$5,000",
            monthly: "$25,000",
            verification: "Full KYC: ID + Address proof",
            highlight: true,
        },
        {
            account: "Certified Agent Account",
            daily: "$25,000",
            monthly: "$100,000",
            verification: "KYB: Business license + training",
            highlight: true,
        },
        {
            account: "Corporate/Enterprise",
            daily: "Custom",
            monthly: "Custom",
            verification: "Master Service Agreement",
            highlight: false,
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <HelmetTitle title="Pricing & Fees" />
            
            {/* Hero Section */}
            <section className="py-24 px-4 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-border">
                <div className="container mx-auto text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight text-foreground">
                            Value-Driven Financial Access
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                            Start for free or build a lucrative business with our commission-based Agent program. Clear fees, maximum returns.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Plans */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {plans.map((plan, index) => (
                            <Card
                                key={index}
                                className={`relative p-8 flex flex-col justify-between ${
                                    plan.popular ? "border-primary border-4 shadow-2xl scale-[1.02] bg-card" : "border-border hover:shadow-xl"
                                } rounded-xl transition-all duration-300`}
                            >
                                {plan.popular && (
                                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-sm px-4 py-1.5 font-bold tracking-wider rounded-full">
                                        GROW YOUR BUSINESS
                                    </Badge>
                                )}

                                <CardHeader className="text-center pb-8 pt-4">
                                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                        <plan.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className="text-3xl font-bold">{plan.name}</CardTitle>
                                    <CardDescription className="text-base min-h-[40px]">
                                        {plan.description}
                                    </CardDescription>
                                    <div className="mt-6 border-t pt-4">
                                        <div className="text-5xl font-extrabold text-foreground tracking-tight">{plan.price}</div>
                                        {plan.period && (
                                            <div className="text-muted-foreground text-sm mt-1 font-medium">
                                                {plan.period}
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-1 flex flex-col justify-between space-y-8">
                                    <div className="space-y-3">
                                        
                                        <h4 className="text-sm font-semibold text-primary uppercase mt-4 mb-2">Core Benefits</h4>
                                        {plan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center space-x-3">
                                                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                                                <span className="text-sm text-foreground">{feature}</span>
                                            </div>
                                        ))}
                                        
                                        {plan.notIncluded.length > 0 && (
                                            <>
                                                <h4 className="text-sm font-semibold text-muted-foreground uppercase mt-4 mb-2 pt-2 border-t border-dashed">Exclusive to Higher Tiers</h4>
                                                {plan.notIncluded.map((feature, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center space-x-3 opacity-60"
                                                    >
                                                        <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                                                        <span className="text-sm text-muted-foreground">
                                                            {feature}
                                                        </span>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>

                                    <Button
                                        className={`w-full h-12 text-base font-semibold ${plan.popular ? "shadow-lg" : "border-2"}`}
                                        variant={plan.popular ? "default" : "outline"}
                                        asChild
                                    >
                                        <Link to={plan.href}>
                                            {plan.cta}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            ---
            
            {/* Transaction Fees */}
            <section className="py-20 px-4 bg-muted/50">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <Layers3 className="h-10 w-10 text-primary mx-auto mb-4"/>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                            Operational Fee Structure
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Our fees are competitive and transparent. Pay only for the services you use, with zero transaction fees for wallet-to-wallet transfers.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-6">
                            {transactionFees.map((fee, index) => (
                                <Card key={index} className="p-6 border-l-4 border-primary/50 hover:shadow-lg transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-bold text-lg">{fee.type}</h3>
                                        <Badge
                                            className={`${fee.badgeColor} text-white text-sm font-bold px-3 py-1`}
                                        >
                                            {fee.fee}
                                        </Badge>
                                    </div>
                                    <p className="text-muted-foreground text-sm">
                                        {fee.description}
                                    </p>
                                </Card>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Link to="/contact">
                                <Button variant="link" className="text-base text-primary font-semibold">
                                    Access Full Regulatory Fee Schedule →
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            ---

            {/* Transaction Limits */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <Gauge className="h-10 w-10 text-primary mx-auto mb-4"/>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                            Verification & Limits
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Maximize your spending power. Higher limits are unlocked upon successful account verification (KYC/KYB).
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="overflow-x-auto border rounded-xl shadow-lg">
                            <table className="w-full text-left">
                                <thead className="bg-muted/70">
                                    <tr className="border-b border-border">
                                        <th className="py-4 px-6 font-bold text-sm text-foreground uppercase tracking-wider">
                                            Account Tier
                                        </th>
                                        <th className="py-4 px-6 font-bold text-sm text-foreground uppercase tracking-wider">
                                            Daily Limit
                                        </th>
                                        <th className="py-4 px-6 font-bold text-sm text-foreground uppercase tracking-wider">
                                            Monthly Limit
                                        </th>
                                        <th className="py-4 px-6 font-bold text-sm text-foreground uppercase tracking-wider">
                                            Verification Requirement
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {limits.map((limit, index) => (
                                        <tr 
                                            key={index} 
                                            className={`border-b last:border-b-0 hover:bg-primary/5 transition-colors ${limit.highlight ? 'bg-primary/10' : ''}`}
                                        >
                                            <td className="py-4 px-6 font-semibold text-base">{limit.account}</td>
                                            <td className="py-4 px-6 font-medium text-base text-primary">{limit.daily}</td>
                                            <td className="py-4 px-6 font-medium text-base text-primary">{limit.monthly}</td>
                                            <td className="py-4 px-6 text-muted-foreground text-sm">
                                                {limit.verification}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            ---
            
            {/* FAQ Section */}
            <section className="py-20 px-4 bg-muted/50">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Questions on Pricing</h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-6">
                        <Card className="p-6">
                            <h3 className="font-semibold text-lg mb-2">
                                Are there any compulsory subscription or maintenance fees?
                            </h3>
                            <p className="text-muted-foreground">
                                No. PayWallet's Personal Accounts are completely free of charge. You'll only encounter fees when utilizing specific services like Cash-In, Cash-Out, or certain bank transfers.
                            </p>
                        </Card>

                        <Card className="p-6">
                            <h3 className="font-semibold text-lg mb-2">
                                How is the Agent commission rate determined?
                            </h3>
                            <p className="text-muted-foreground">
                                Agents earn between 0.5% and 1.5% commission on the transaction value they process. The rate is dynamic and based on your monthly volume, regional demand, and the type of service performed.
                            </p>
                        </Card>

                        <Card className="p-6">
                            <h3 className="font-semibold text-lg mb-2">
                                What is required to reach the highest transaction limits?
                            </h3>
                            <p className="text-muted-foreground">
                                To unlock the highest limits (Tier 2 and above), you must complete our Know Your Customer (KYC) verification, which involves uploading a government-issued ID and proof of address. Agents require additional Know Your Business (KYB) documentation.
                            </p>
                        </Card>

                        <Card className="p-6">
                            <h3 className="font-semibold text-lg mb-2">
                                Is there a penalty fee for transactions that fail?
                            </h3>
                            <p className="text-muted-foreground">
                                Absolutely not. We do not charge fees for failed transactions. A transaction fee is only applied upon successful completion of the service.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Take Control of Your Finance?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8">
                            Join the millions of users and entrepreneurs maximizing their financial potential with PayWallet.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="text-lg px-8 h-12 shadow-lg" asChild>
                                <Link to="/auth/register">
                                    Create Free Account
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                               
                                variant="outline"
                                className="text-lg px-8 h-12 border-2 border-primary text-primary hover:bg-primary/5 transition-colors"
                                asChild
                            >
                                <Link to="/contact">Contact Sales</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}