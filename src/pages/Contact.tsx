import HelmetTitle from "@/components/layout/HelmetTitle";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
    CheckCircle,
    Clock,
    FileText,
    Headphones,
    Loader2,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    CornerRightUp,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Link } from "react-router";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, category: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            toast({
                title: "Message Received",
                description: "We have successfully logged your inquiry and will respond within 24 hours.",
                className: "bg-green-500 text-white",
            });
        }, 2000);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Support",
            details: "support@paywallet.com",
            description: "Targeted response time is less than 24 hours.",
        },
        {
            icon: Phone,
            title: "Priority Line",
            details: "+1 (555) 123-4567",
            description: "24/7 direct assistance for urgent operational issues.",
        },
        {
            icon: MapPin,
            title: "Corporate Office",
            details: "123 Financial District, New York, NY 10004",
            description: "Appointments required for in-person visits.",
        },
        {
            icon: Clock,
            title: "Availability",
            details: "24 Hours / 7 Days a Week",
            description: "Global support team coverage.",
        },
    ];

    const supportCategories = [
        {
            icon: Headphones,
            title: "Account & Transactions",
            value: "general",
            description:
                "Questions regarding balance, transfers, and general account management.",
        },
        {
            icon: FileText,
            title: "Business & Partnerships",
            value: "business",
            description:
                "Inquiries for corporate accounts, agent network applications, and B2B services.",
        },
        {
            icon: MessageSquare,
            title: "Technical Platform Issues",
            value: "technical",
            description: "Reporting bugs, app performance problems, or API integration support.",
        },
    ];

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-background">
                <HelmetTitle title="Contact Success" />
                <div className="min-h-[80vh] flex items-center justify-center px-4">
                    <Card className="w-full max-w-lg text-center p-6 border-2 border-primary/50 shadow-xl">
                        <CardHeader className="pt-4">
                            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="h-10 w-10 text-primary" />
                            </div>
                            <CardTitle className="text-3xl font-bold">
                                Inquiry Submitted
                            </CardTitle>
                            <CardDescription className="text-lg pt-2 text-muted-foreground">
                                Thank you, {formData.name}. We have successfully received your message and a specialist will review it promptly.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="mt-4">
                            <p className="text-sm text-gray-500 mb-6">Reference Category: {supportCategories.find(c => c.value === formData.category)?.title || "General"}</p>
                            <Button
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setFormData({
                                        name: "",
                                        email: "",
                                        phone: "",
                                        subject: "",
                                        category: "",
                                        message: "",
                                    });
                                }}
                                variant="outline"
                                className="w-full text-base border-primary/50 hover:bg-primary/5"
                            >
                                Send Another Inquiry
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <HelmetTitle title="Contact Our Support Team" />

            <section className="py-24 px-4 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-border">
                <div className="container mx-auto text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight text-foreground">
                            Connect with Our Team
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                            For immediate assistance, please utilize the contact methods below or submit a detailed support ticket.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-3 gap-12">
                        
                        <div className="lg:col-span-1 space-y-10">
                            
                            <div>
                                <h2 className="text-3xl font-bold mb-6 text-foreground">Direct Contact</h2>
                                <div className="space-y-6">
                                    {contactInfo.map((info, index) => (
                                        <div key={index} className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                                                <info.icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">{info.title}</h3>
                                                <p className="text-primary font-medium text-lg">
                                                    {info.details}
                                                </p>
                                                <p className="text-muted-foreground text-sm">
                                                    {info.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold mb-6 text-foreground">Priority Topics</h2>
                                <div className="space-y-4">
                                    {supportCategories.map((category, index) => (
                                        <Card key={index} className="p-4 border-l-4 border-primary/50 hover:shadow-md transition-shadow">
                                            <div className="flex items-start space-x-3">
                                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <category.icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{category.title}</h3>
                                                    <p className="text-muted-foreground text-sm">
                                                        {category.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <Card className="p-8 shadow-2xl border border-primary/20 bg-card/90">
                                <CardHeader className="px-0 pt-0 mb-4">
                                    <CardTitle className="text-3xl font-bold text-foreground">Submit a Detailed Inquiry</CardTitle>
                                    <CardDescription className="text-base text-muted-foreground">
                                        Use the form below for structured support. We prioritize tickets with complete information.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-0">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name *</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    placeholder="Jane Doe"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="h-12"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Work Email *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="jane.doe@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="h-12"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number (Optional)</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    placeholder="+1 (555) 000-0000"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="h-12"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="category">Inquiry Category *</Label>
                                                <Select
                                                    value={formData.category}
                                                    onValueChange={handleSelectChange}
                                                >
                                                    <SelectTrigger className="h-12">
                                                        <SelectValue placeholder="Select a topic to categorize your request" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {supportCategories.map((cat) => (
                                                            <SelectItem key={cat.value} value={cat.value}>
                                                                {cat.title}
                                                            </SelectItem>
                                                        ))}
                                                        <SelectItem value="other">Other Inquiry (Specify in message)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject Line</Label>
                                            <Input
                                                id="subject"
                                                type="text"
                                                placeholder="Brief summary of the issue (e.g., 'Locked out of account')"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="h-12"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Detailed Message *</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Provide all relevant details: dates, error codes, and steps taken..."
                                                rows={8}
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full h-14 text-lg font-semibold"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting && (
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            )}
                                            {isSubmitting ? "Sending Securely..." : "Submit Support Ticket"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-muted/50 border-t">
                <div className="container mx-auto text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Find Answers Instantly
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8">
                            Most common questions about fees, security, and setup are answered in our comprehensive knowledge base.
                        </p>
                        <Button
                            
                            variant="outline"
                            className="text-lg px-8 bg-transparent border-2 border-primary text-primary hover:bg-primary/5"
                            asChild
                        >
                            <Link to="/faq">
                                <CornerRightUp className="h-5 w-5 mr-3"/>
                                Explore Our FAQ
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}