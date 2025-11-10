import HoverButton from "@/components/HoverButton";

export default function HeroSection() {
  
    return (
        <div className="overflow-hidden relative ">
            <div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white to-primary/10 animate-gradient"
            
            />

            <div className="absolute inset-0 pointer-events-none opacity-50">
                <div
                    className="absolute w-4 h-4 bg-primary/80 rounded-full animate-float shadow-lg"
                    style={{
                        left: "12%",
                        top: "15%",
                    }}
                />
                <div
                    className="absolute w-6 h-6 bg-secondary/80 rounded-full animate-float-reverse shadow-lg"
                    style={{
                        right: "10%",
                        top: "35%",
                    }}
                />
                <div
                    className="absolute w-3 h-3 bg-primary/50 rounded-full animate-float"
                    style={{
                        left: "75%",
                        bottom: "25%",
                    }}
                />
                <div
                    className="absolute w-8 h-8 bg-secondary/90 rounded-full animate-float-reverse"
                    style={{
                        left: "5%",
                        bottom: "10%",
                    }}
                />
            </div>

            <main className="relative z-10 flex items-center justify-center  px-6 py-10">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                    <div
                        className="text-center lg:text-left space-y-8"
                       
                    >
                        <div className="space-y-4">
                            <h1 className="font-space-grotesk font-extrabold md:text-6xl text-4xl lg:text-7xl text-black leading-tight">
                                ZERO FRICTION.
                                <br />
                                GLOBAL MONEY,
                                <span className="text-primary"> INSTANTLY.</span>
                            </h1>
                            <p className="font-dm-sans text-xl text-black/80 max-w-lg mx-auto lg:mx-0">
                                Send and receive funds across any distance with T+0 settlement speed. Cash-in and Cash-out using our nationwide Agent Network. Optimized for the future of finance, powered in Bangladesh.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <HoverButton />
                        </div>
                    </div>

                    <div
                        className="hidden lg:flex justify-center"
                        data-aos="zoom-in"
                        data-aos-delay="200"
                    >
                        <div className="w-[450px] h-[600px] bg-white rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-gray-100 p-6 transform hover:scale-[1.02] transition-transform duration-500 flex items-center justify-center">
                           <img src="https://static.vecteezy.com/system/resources/previews/004/329/339/non_2x/money-transfer-app-interface-template-mobile-app-interface-blue-design-layout-e-payment-online-banking-application-digital-transaction-flat-ui-phone-display-with-credit-cards-information-vector.jpg" alt="App Mockup" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}