import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Heart, Zap } from "lucide-react";
import { Link } from "react-router";
import HelmetTitle from "@/components/layout/HelmetTitle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function About() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former Goldman Sachs executive with 15+ years in fintech innovation.",
      image: "/professional-woman-ceo.png",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Ex-Google engineer specializing in secure payment systems and blockchain technology.",
      image: "/professional-cto.png",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Security",
      bio: "Cybersecurity expert with experience at major banks and payment processors.",
      image: "/professional-woman-security-expert.png",
    },
    {
      name: "David Kim",
      role: "Head of Product",
      bio: "Product strategist focused on user experience and financial inclusion.",
      image: "/professional-product-manager.png",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description:
        "We put the protection of your funds and personal information at the heart of everything we build.",
    },
    {
      icon: Users,
      title: "Financial Inclusion",
      description:
        "Bringing modern financial tools to everyone, regardless of background or geography.",
    },
    {
      icon: Heart,
      title: "Customer Focused",
      description:
        "Our users shape our roadmap — every feature is designed to solve real-world needs.",
    },
    {
      icon: Zap,
      title: "Driven by Innovation",
      description:
        "We constantly push boundaries to make digital payments faster, safer, and more intuitive.",
    },
  ];

  const milestones = [
    {
      year: "2020",
      event: "PayWallet founded with a vision to democratize digital payments.",
    },
    {
      year: "2021",
      event: "Launched beta with 1,000 early adopters and strong community feedback.",
    },
    {
      year: "2022",
      event: "Reached 1 million users and expanded our nationwide agent network.",
    },
    {
      year: "2023",
      event: "Processed $10B+ in transactions and achieved sustainable growth.",
    },
    {
      year: "2024",
      event: "Introduced advanced features and surpassed 10 million active users.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <HelmetTitle title="About" />

      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering the Future of Digital Payments
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              At PayWallet, we’re redefining how the world moves money —
              securely, instantly, and for everyone. Our mission is to make
              financial access as seamless as sending a message.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We aim to empower individuals and businesses with secure, fast,
              and affordable payment solutions that close the gap between
              traditional banking and the digital economy.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you’re sending money to family, managing your business, or
              building the next fintech innovation — we’re here to make it
              effortless.
            </p>
          </div>
          <div className="relative">
            <img
              src="/digital-payment-mission.png"
              alt="Our Mission"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            These core principles shape every decision, product, and partnership
            at PayWallet.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-all"
              >
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            From a small startup to a trusted global payment network.
          </p>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-20 text-right mr-8">
                  <Badge variant="outline" className="text-sm font-semibold">
                    {milestone.year}
                  </Badge>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full mt-1 mr-8" />
                <div className="flex-1">
                  <p className="text-lg leading-relaxed">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with ShadCN Carousel */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Leadership Team
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Meet the dedicated professionals building PayWallet’s future.
          </p>

          <Carousel opts={{ align: "center", loop: true }} className="max-w-5xl mx-auto">
            <CarouselContent>
              {teamMembers.map((member, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <Card className="text-center p-6 hover:shadow-xl transition-all">
                    <CardHeader>
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md"
                      />
                      <CardTitle className="text-lg font-semibold">
                        {member.name}
                      </CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {member.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="bg-background border hover:bg-primary hover:text-white" />
              <CarouselNext className="bg-background border hover:bg-primary hover:text-white" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            PayWallet in Numbers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              ["10M+", "Active Users"],
              ["$50B+", "Transactions Processed"],
              ["50,000+", "Agent Partners"],
              ["99.9%", "Uptime"],
            ].map(([value, label], i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {value}
                </div>
                <div className="text-lg text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/10 to-secondary/10 text-center">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Mission
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Be part of a financial revolution that puts people first. Create
              your free PayWallet account and experience the future of digital
              payments today.
            </p>
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/auth/signup">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
