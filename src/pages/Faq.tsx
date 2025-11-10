import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    ChevronDown,
    ChevronUp,
    Globe,
    ShieldCheck,
    ArrowRightLeft,
    Users,
    HardHat,
    PhoneCall,
    Send,
    HelpCircle, // New icon for the main FAQ header
} from "lucide-react";
import { Link } from "react-router";
import HelmetTitle from "@/components/layout/HelmetTitle";

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [openItems, setOpenItems] = useState<string[]>([]);

    const categories = [
        { id: "all", label: "All Topics", icon: Globe, color: "text-gray-600 bg-gray-100" },
        { id: "account", label: "Account & Verification", icon: ShieldCheck, color: "text-green-600 bg-green-50" },
        { id: "payments", label: "Transfers & Fees", icon: ArrowRightLeft, color: "text-primary bg-primary/10" },
        { id: "agents", label: "Agent Network", icon: Users, color: "text-indigo-600 bg-indigo-50" },
        { id: "technical", label: "Platform & App Issues", icon: HardHat, color: "text-red-600 bg-red-50" },
    ];

    const faqs = [
        {
            id: "1",
            category: "account",
            question: "How do I quickly set up my PayWallet account?",
            answer:
                "Setting up your account is fast and easy. Simply click 'Register', provide your name, email, and mobile number, and choose your account type (Retail or Agent). We finalize your registration by sending an SMS verification code to secure your profile.",
        },
        {
            id: "2",
            category: "account",
            question: "What security measures protect my funds and personal data?",
            answer:
                "We utilize bank-grade, multi-layered security. This includes mandatory Multi-Factor Authentication (MFA), 256-bit encryption for all data, and continuous AI-driven fraud monitoring. Your deposited funds are kept in segregated, secure accounts.",
        },
        {
            id: "3",
            category: "payments",
            question: "How long do typical transfers take to complete?",
            answer:
                "Transfers between any two registered PayWallet users are instant (T+0). External transfers, such as bank withdrawals or agent cash-outs, generally follow standard banking timelines, usually settling within 1 to 3 business days.",
        },
        {
            id: "4",
            category: "payments",
            question: "How can I increase my account's transaction limits?",
            answer:
                "Transaction limits are based on your verification tier. Standard accounts have a $5,000 daily limit. To significantly increase this, complete the enhanced Know Your Customer (KYC) verification within your profile settings (ID and address proof).",
        },
        {
            id: "5",
            category: "payments",
            question: "What is the fee structure for my transactions?",
            answer:
                "Sending money between PayWallet users is always free. Fees only apply to external services like cash deposits/withdrawals via the agent network (typically 1.0% to 2.0%) or certain bank wire transfers. Please check our dedicated 'Pricing' page for full details.",
        },
        {
            id: "6",
            category: "agents",
            question: "What's the process to become a Certified Agent?",
            answer:
                "To join, you must first register an Agent account, submit necessary commercial licenses/documents, pass comprehensive identity checks, and successfully complete our mandatory Agent Training Program. Approval grants immediate access to commission-earning services.",
        },
        {
            id: "7",
            category: "agents",
            question: "What is the earning potential for a Certified Agent?",
            answer:
                "Agents earn a performance-based commission (0.5% to 1.5%) on all processed transactions. Highly managed, high-traffic Agent locations can realistically exceed $2,000 in monthly revenue from commissions.",
        },
        {
            id: "8",
            category: "technical",
            question: "I forgot my password. How do I reset my credentials?",
            answer:
                "On the login page, click the 'Forgot Password' link. Enter your registered email address, and a secure, temporary reset link will be sent instantly. For security purposes, this link expires automatically after 24 hours.",
        },
        {
            id: "9",
            category: "technical",
            question: "Why is my account access restricted or login failing?",
            answer:
                "Access issues are typically caused by incorrect credentials, a temporary security lock due to multiple attempts, or an ongoing account review. First, ensure your input is correct. If the problem persists, contact our 24/7 technical support team immediately for assistance.",
        },
        {
            id: "10",
            category: "account",
            question: "What is required for full KYC verification?",
            answer:
                "Full KYC compliance requires: confirmed phone/email, submission of a government-issued photo ID, and a valid proof of residency (e.g., utility bill). Our compliance team typically completes the review and unlocks higher limits within 1-2 business days.",
        },
        {
            id: "11",
            category: "payments",
            question: "Can I cancel or reverse a completed transfer?",
            answer:
                "Due to the instantaneous and immutable nature of digital transfers, confirmed transactions cannot be automatically reversed. Always double-check the recipient's details before confirming. If a transaction is stuck in a 'pending' status, contact support right away.",
        },
        {
            id: "12",
            category: "technical",
            question: "Are there native PayWallet apps for my phone?",
            answer:
                "Yes! PayWallet is fully supported on native mobile applications available on the Apple App Store (iOS) and Google Play Store (Android). The apps support features like biometric login and push notifications for a superior experience.",
        },
    ];

    const filteredFAQs = faqs.filter((faq) => {
        const matchesCategory =
            selectedCategory === "all" || faq.category === selectedCategory;
        const matchesSearch =
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleItem = (id: string) => {
        setOpenItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };
    
    // Helper to find category color
    const getCategoryColor = (id: string) => categories.find(c => c.id === id)?.color || "text-gray-600 bg-gray-100";
    const getCurrentCategoryLabel = () => categories.find(c => c.id === selectedCategory)?.label;

    return (
        <div className="min-h-screen bg-background">
            <HelmetTitle title="Support Center & FAQ" />

            {/* Hero Section */}
            <section className="py-24 px-4 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-border">
                <div className="container mx-auto text-center">
                    <div className="max-w-4xl mx-auto">
                        <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight text-foreground">
                            Your Instant Support Hub
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                            Find immediate answers to the most common questions on security, transactions, and platform features.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content: Search, Filter, and FAQ List */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-12">

                        {/* Sidebar (Filter/Categories) - Col 3 */}
                        <div className="lg:col-span-3 lg:sticky lg:top-24 mb-10 lg:mb-0">
                            <Card className="p-4 rounded-xl shadow-xl border-primary/20">
                                <CardHeader className="p-4 pb-3 border-b">
                                    <CardTitle className="text-xl font-bold">Quick Filters</CardTitle>
                                    <CardDescription>Select a category to narrow results.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="flex flex-col space-y-1 pt-3">
                                        {categories.map((category) => (
                                            <Button
                                                key={category.id}
                                                variant="ghost"
                                               
                                                onClick={() => {
                                                    setSelectedCategory(category.id);
                                                    setOpenItems([]);
                                                }}
                                                className={`justify-start text-base font-medium transition-all duration-200 ${
                                                    selectedCategory === category.id 
                                                        ? 'bg-primary/10 text-primary hover:bg-primary/20 font-semibold border-l-4 border-primary' 
                                                        : 'text-muted-foreground hover:bg-muted'
                                                }`}
                                            >
                                                <category.icon className="h-5 w-5 mr-3" />
                                                {category.label}
                                            </Button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* FAQ List and Search - Col 9 */}
                        <div className="lg:col-span-9">
                            
                            {/* Search Bar */}
                            <div className="relative mb-8">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                                <Input
                                    type="text"
                                    placeholder="Search the knowledge base: fees, verification, password, agent..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12 py-6 text-lg h-auto rounded-xl border-2 shadow-sm focus:border-primary"
                                />
                            </div>

                            {/* Results Count */}
                            <div className="mb-8 pl-1 flex items-center space-x-2">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Results:
                                </h3>
                                <Badge variant="secondary" className="text-base font-bold px-3 py-1">
                                    {filteredFAQs.length} found
                                </Badge>
                                {selectedCategory !== "all" && (
                                    <p className="text-base text-muted-foreground ml-3">
                                        in the {getCurrentCategoryLabel()} section.
                                    </p>
                                )}
                            </div>

                            {/* FAQ Items */}
                            <div className="space-y-4">
                                {filteredFAQs.length > 0 ? (
                                    filteredFAQs.map((faq) => {
                                        const isOpen = openItems.includes(faq.id);
                                        const categoryLabel = categories.find(c => c.id === faq.category)?.label.split(" ")[0];
                                        const categoryColorClass = getCategoryColor(faq.category);

                                        return (
                                            <Card 
                                                key={faq.id} 
                                                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'border-2 border-primary shadow-xl' : 'border-border hover:shadow-md'}`}
                                            >
                                                <Collapsible
                                                    open={isOpen}
                                                    onOpenChange={() => toggleItem(faq.id)}
                                                >
                                                    <CollapsibleTrigger asChild>
                                                        <CardHeader className="cursor-pointer p-5 md:p-6 transition-colors duration-200">
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex items-start space-x-4 flex-1">
                                                                    <Badge 
                                                                        variant="outline" 
                                                                        className={`mt-1 flex-shrink-0 text-xs font-semibold px-3 py-1 ${categoryColorClass} border-transparent`}
                                                                    >
                                                                        {categoryLabel}
                                                                    </Badge>
                                                                    <CardTitle className="text-left text-lg font-semibold leading-relaxed text-foreground hover:text-primary transition-colors">
                                                                        {faq.question}
                                                                    </CardTitle>
                                                                </div>
                                                                <div className="ml-4 pt-1 flex-shrink-0">
                                                                    {isOpen ? (
                                                                        <ChevronUp className="h-5 w-5 text-primary" />
                                                                    ) : (
                                                                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </CardHeader>
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent>
                                                        <CardContent className="pt-2 pb-6 px-6 md:px-8 border-t border-muted bg-muted/20">
                                                            <p className="text-base text-muted-foreground leading-relaxed">
                                                                {faq.answer}
                                                            </p>
                                                        </CardContent>
                                                    </CollapsibleContent>
                                                </Collapsible>
                                            </Card>
                                        )
                                    })
                                ) : (
                                    <Card className="p-12 text-center border-2 border-dashed border-muted-foreground/30 bg-muted/20">
                                        <HardHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                        <CardTitle className="mb-2 text-2xl">Query Not Found</CardTitle>
                                        <CardDescription className="mb-6 text-base">
                                            We couldn't match your support query. Please try different keywords or browse the filters on the left.
                                        </CardDescription>
                                        <Button
                                            variant="default"
                                           
                                            onClick={() => {
                                                setSearchTerm("");
                                                setSelectedCategory("all");
                                            }}
                                        >
                                            Clear Search & Filters
                                        </Button>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA - Prominent, Clean Footer */}
            <section className="py-20 px-4 bg-muted/50 border-t border-border">
                <div className="container mx-auto text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
                            Still Need Assistance?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                            For complex, time-sensitive, or specific technical issues, our dedicated 24/7 priority support team is available.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Button className="px-10 h-14 text-lg font-semibold shadow-lg" asChild>
                                <Link to="/contact">
                                    <PhoneCall className="h-5 w-5 mr-3" />
                                    Submit a Support Ticket
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                className="px-10 h-14 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary/5 transition-colors"
                                asChild
                            >
                                <Link to="/auth/register">
                                    <Send className="h-5 w-5 mr-3" />
                                    Ready to Register?
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}