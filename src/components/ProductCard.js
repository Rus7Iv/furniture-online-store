import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/ProductList.module.css";

function ProductCard({ product, addToCart }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [viewedPages, setViewedPages] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const existingProduct = favorites.find((item) => item.id === product.id);
    setIsFavorite(!!existingProduct);
  }, [product]);

  useEffect(() => {
    const viewedPagesFromLocalStorage = JSON.parse(
      localStorage.getItem("viewedPages") || "[]"
    );
    setViewedPages(viewedPagesFromLocalStorage);
  }, []);

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const existingProduct = favorites.find((item) => item.id === product.id);

    if (!existingProduct) {
      favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    } else {
      const updatedFavorites = favorites.filter(
        (item) => item.id !== product.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    }
  };

  const handlePageView = (product) => {
    const existingProductIndex = viewedPages.findIndex(
      (p) => p.id === product.id
    );
    if (existingProductIndex !== -1) {
      const updatedViewedPages = [
        product,
        ...viewedPages.filter((p) => p.id !== product.id).slice(0, 4),
      ];
      setViewedPages(updatedViewedPages);
      localStorage.setItem("viewedPages", JSON.stringify(updatedViewedPages));
    } else {
      const updatedViewedPages = [product, ...viewedPages.slice(0, 4)];
      setViewedPages(updatedViewedPages);
      localStorage.setItem("viewedPages", JSON.stringify(updatedViewedPages));
    }
  };
  return (
    <div key={product.id} className={styles.card}>
      <Link
        key={product.id}
        href={`/products/${product.id}`}
        passHref
        className={styles.title}
        onClick={() => handlePageView(product)}
      >
        <h2>{product.title}</h2>
        <img src={product.image[0]} width={200} alt={product.title} />
      </Link>
      <p className={styles.label}>{product.price} ₽</p>
      <button
        onClick={() => addToCart(product)}
        className={styles.btn_add_to_cart}
      >
        🛒
      </button>
      <button
        onClick={addToFavorites}
        className={
          isFavorite
            ? styles.btn_remove_from_favorites
            : styles.btn_add_to_favorites
        }
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

export default ProductCard;
