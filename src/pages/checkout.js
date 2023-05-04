import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Checkout from "@/components/Checkout";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Checkout />
      </main>
      <Footer />
    </>
  );
}
