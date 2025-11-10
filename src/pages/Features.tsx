import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Wallet,
  Shield,
  Zap,
  Users,
  Smartphone,
  BarChart3,
  Lock,
  Clock,
  MapPin,
  Bell,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

export default function FeaturesPage() {
  const coreFeatures = [
    {
      icon: Zap,
      title: "Real-Time Transaction Rails",
      description: "Proprietary infrastructure enables immediate, verifiable fund transfers globally.",
      benefits: ["Instant settlement (T+0)", "24/7 API availability", "Transparent, fixed fee structure"],
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Implement best-in-class security protocols to safeguard all client assets and data.",
      benefits: ["ISO 27001 Certified encryption", "Mandatory Multi-Factor Authentication (MFA)", "AI-driven fraud detection"],
    },
    {
      icon: Smartphone,
      title: "Optimized Multi-Platform Access",
      description: "A seamless, responsive experience across web, iOS, and Android applications.",
      benefits: ["Intuitive, human-centered design", "Offline transaction queuing", "Real-time device synchronization"],
    },
    {
      icon: Users,
      title: "Decentralized Agent Network",
      description: "Extensive physical access points for secure cash digitization and withdrawal services.",
      benefits: ["150,000+ certified global agents", "Rapid service initiation", "Extended operational hours"],
    },
  ];

  const advancedFeatures = [
    {
      icon: BarChart3,
      title: "Actionable Analytics Suite",
      description: "Detailed, customizable reports offering predictive insights into spending and revenue flows.",
    },
    {
      icon: Bell,
      title: "Customized Behavioral Alerts",
      description: "Instant, configurable notifications for specific transaction types or balance thresholds.",
    },
    {
      icon: Lock,
      title: "Granular Access Control",
      description: "Define and adjust spending and withdrawal limits at the individual user or corporate level.",
    },
    {
      icon: Clock,
      title: "Automated Recurring Payouts",
      description: "Schedule complex, repeated transactions with guaranteed execution times and audit logs.",
    },
    {
      icon: MapPin,
      title: "Geo-Locational Service Finder",
      description: "Real-time mapping integration to quickly locate the nearest certified agent or withdrawal point.",
    },
    {
      icon: FileText,
      title: "Immutable Digital Audit Trails",
      description: "Automatic generation and archival of verifiable digital receipts and transaction records.",
    },
  ];

  const userTypes = [
    {
      title: "Individuals & Consumers",
      description: "Effortless personal financial management and global money movement.",
      features: [
        "Send, receive, and remit funds globally",
        "Utility bill and service top-up functionality",
        "In-depth personal finance visualization",
        "Dedicated analytics access",
        "24/7 priority support",
      ],
      icon: Wallet,
    },
    {
      title: "Certified Business Agents",
      description: "Monetize foot traffic and grow a sustainable service business.",
      features: [
        "Full cash-in/cash-out facility management",
        "Transparent, real-time commission tracking",
        "Integrated customer relationship tools",
        "Comprehensive real-time reporting",
        "Advanced training and tiered support access",
      ],
      icon: Users,
    },
    {
      title: "Platform Administrators (B2B)",
      description: "Total oversight and control for institutional system management.",
      features: [
        "Comprehensive user/agent lifecycle management",
        "Full system-wide transaction monitoring",
        "Advanced regulatory reporting & compliance tools",
        "Centralized security policy enforcement",
        "API integration and SDK access",
      ],
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section - Elevated Typography */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-foreground">
            Platform Capabilities that Drive Financial Efficiency
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
            PayWallet is engineered to provide not just payment solutions, but strategic financial tools for every transaction, built on speed, security, and scalability.
          </p>
          <Button size="lg" className="px-10 text-xl font-semibold shadow-lg hover:shadow-xl transition-all" asChild>
            <Link to="/auth/signup">
              Start Your Free Trial
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Core Features - Clean Grid Layout */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Foundational Excellence
          </h2>
          <div className="grid lg:grid-cols-2 gap-10">
            {coreFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="p-8 border-l-4 border-primary/50 hover:border-primary transition-all rounded-xl shadow-md hover:shadow-lg"
              >
                <CardHeader className="flex flex-row items-center space-x-6 p-0 pb-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold mb-1">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <h3 className="text-base font-medium mb-3 text-foreground/80">Key Benefits:</h3>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-sm text-muted-foreground">
                        <ArrowRight className="h-4 w-4 text-secondary/80 mr-3 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features - Elevated Simple Cards */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Advanced Operational Toolkit
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="p-8 text-left hover:shadow-xl transition-shadow rounded-xl"
              >
                <CardHeader className="p-0 pb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Types - Polished Segmented View */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Purpose-Built for Every Stakeholder
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <Card 
                key={index} 
                className="p-8 rounded-xl shadow-lg border-t-4 border-secondary hover:shadow-2xl transition-shadow"
              >
                <CardHeader className="text-center pb-8 p-0">
                  <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <type.icon className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl font-extrabold">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-3 pt-4 border-t border-muted/50">
                    {type.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center text-base font-medium text-foreground">
                        <svg className="h-5 w-5 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Stronger, Dual Call-to-Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Experience the full suite of seamless and secure digital payment tools designed for the future of finance.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button className="px-10 h-14 text-lg font-semibold shadow-lg bg-primary hover:bg-primary/90" asChild>
              <Link to="/auth/signup">
                Initiate Account Setup
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
            <Button variant="outline" className="px-10 h-14 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary/5" asChild>
              <Link to="/contact/demo">Request a Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}