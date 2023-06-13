import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import Auth from "@/components/Authentication/Auth";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Auth />
      </main>
      <Footer />
    </>
  );
}
