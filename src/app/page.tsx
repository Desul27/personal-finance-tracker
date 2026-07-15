import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import WhyUs from "@/components/landing/WhyUs";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
  
export default function HomePage() {
  return (
    <>
    
    
    {/* <main className="p-10"> */}
      <Navbar />

      <Hero />

      <Features />

      <WhyUs />

      <CTA />

      <Footer />
    {/* </main> */}
    </>
  );
}