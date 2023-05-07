import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import styles from "../styles/FavoritesPage.module.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const favoriteProducts = [];

      for (let i = 0; i < favorites.length; i++) {
        const productDoc = doc(db, "products", favorites[i].id);
        const productSnapshot = await getDoc(productDoc);
        if (productSnapshot.exists()) {
          favoriteProducts.push({
            id: productSnapshot.id,
            ...productSnapshot.data(),
          });
        }
      }
      setFavorites(favoriteProducts);
    };
    fetchFavorites();
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <div className={styles.page}>
          {favorites.length > 0 ? (
            favorites.map((favorite) => (
              <ProductCard key={favorite.id} product={favorite} />
            ))
          ) : (
            <p className={styles.empty}>В избранном пока нет товаров</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FavoritesPage;
