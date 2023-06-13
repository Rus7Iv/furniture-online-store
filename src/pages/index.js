import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import Category from "../components/Category/Category";
import Promo from "@/components/Promo/Promo";
import RecentlyViewed from "@/components/RecentlyViewed/RecentlyViewed";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Promo />

        <h1>Добро пожаловать в Furniture!</h1>
        <h2>Здесь вы можете подобрать мебель под любой интерьер</h2>
        <Category />

        <RecentlyViewed />
      </main>
      <Footer />
    </>
  );
}
