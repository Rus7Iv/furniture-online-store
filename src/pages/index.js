import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Category from "../components/Category";
import Promo from "@/components/Promo";
import RecentlyViewed from "@/components/RecentlyViewed";

const images = [
  {
    src: "../categories/диваны_и_кресла.jpg",
    alt: "Image 1",
    link: "/page1",
  },
  {
    src: "../categories/столы_и_стулья.jpg",
    alt: "Image 2",
    link: "/page2",
  },
];

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Promo images={images} />

        <h1>Добро пожаловать в Furniture!</h1>
        <h2>Здесь вы можете подобрать мебель под любой интерьер</h2>
        <Category />

        <RecentlyViewed />
      </main>
      <Footer />
    </>
  );
}
