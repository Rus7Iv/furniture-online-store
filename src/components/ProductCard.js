import Link from "next/link";
import styles from "../styles/ProductList.module.css";

function ProductCard({ product, addToCart }) {
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
    </div>
  );
}

export default ProductCard;
