import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import ProductCard from "@/components/ProductCard/ProductCard";
import CustomSnackbar from "@/components/CustomSnackbar";
import styles from "../styles/FavoritesPage.module.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDuplicateMessage, setShowDuplicateMessage] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const favoriteProductDocs = favorites.map((fav) =>
        doc(db, "products", fav.id)
      );
      const favoriteProductSnapshots = await Promise.all(
        favoriteProductDocs.map((doc) => getDoc(doc))
      );
      const favoriteProducts = favoriteProductSnapshots
        .filter((snapshot) => snapshot.exists())
        .map((snapshot) => ({
          id: snapshot.id,
          ...snapshot.data(),
        }));
      setFavorites(favoriteProducts);
    };
    fetchFavorites();
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      handleDuplicateMessage();
    } else {
      cart.push({ ...product, quantity: 1, favorite: false });
      localStorage.setItem("cart", JSON.stringify(cart));
      handleSuccessMessage();
    }
  };

  const handleSuccessMessage = () => {
    setShowSuccessMessage(true);
  };

  const handleCloseSuccessMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSuccessMessage(false);
  };

  const handleDuplicateMessage = () => {
    setShowDuplicateMessage(true);
  };

  const handleCloseDuplicateMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowDuplicateMessage(false);
  };

  return (
    <>
      <Navigation />
      <main>
        <div className={styles.page}>
          {favorites.length > 0 ? (
            favorites.map((favorite) => (
              <div className={styles.item}>
                <ProductCard
                  key={favorite.id}
                  product={favorite}
                  addToCart={addToCart}
                />
              </div>
            ))
          ) : (
            <p className={styles.empty}>В избранном пока нет товаров</p>
          )}
        </div>
      </main>
      <CustomSnackbar
        open={showSuccessMessage}
        handleClose={handleCloseSuccessMessage}
        severity="success"
        message="Товар успешно добавлен в корзину"
      />
      <CustomSnackbar
        open={showDuplicateMessage}
        handleClose={handleCloseDuplicateMessage}
        severity="warning"
        message="Товар уже добавлен в корзину"
      />
      <Footer />
    </>
  );
};

export default FavoritesPage;
