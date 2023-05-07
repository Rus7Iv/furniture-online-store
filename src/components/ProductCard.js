// import Link from "next/link";
// import styles from "../styles/ProductList.module.css";

// function ProductCard({ product, addToCart }) {
//   return (
//     <div key={product.id} className={styles.card}>
//       <Link
//         key={product.id}
//         href={`/products/${product.id}`}
//         passHref
//         className={styles.title}
//       >
//         <div>
//           <h2>{product.title}</h2>
//           <img src={product.image[0]} width={200} alt={product.title} />
//         </div>
//       </Link>
//       <p className={styles.label}>{product.price} ₽</p>
//       <button
//         onClick={() => addToCart(product)}
//         className={styles.btn_add_to_cart}
//       >
//         🛒
//       </button>
//     </div>
//   );
// }

// export default ProductCard;

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/ProductList.module.css";

function ProductCard({ product, addToCart }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const existingProduct = favorites.find((item) => item.id === product.id);
    setIsFavorite(!!existingProduct);
  }, [product]);

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

  return (
    <div key={product.id} className={styles.card}>
      <Link
        key={product.id}
        href={`/products/${product.id}`}
        passHref
        className={styles.title}
      >
        <div>
          <h2>{product.title}</h2>
          <img src={product.image[0]} width={200} alt={product.title} />
        </div>
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
