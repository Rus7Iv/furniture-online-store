import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from "../../styles/ProductList.module.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDuplicateMessage, setShowDuplicateMessage] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      handleDuplicateMessage();
    } else {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      setCart(cart);
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

  const sortProducts = (sortBy) => {
    let sortedProducts = [...products];
    switch (sortBy) {
      case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        setSortOrder("price-asc");
        break;
      case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        setSortOrder("price-desc");
        break;
      case "name-asc":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        setSortOrder("name-asc");
        break;
      default:
        sortedProducts = products;
        setSortOrder("");
    }
    setProducts(sortedProducts);
  };

  return (
    <>
      <Navigation />
      <main>
        <h1>Каталог товаров</h1>
        <div>
          <select
            value={sortOrder}
            onChange={(event) => sortProducts(event.target.value)}
          >
            <option value="">Сортировать по:</option>
            <option value="price-asc">Цене (по возрастанию)</option>
            <option value="price-desc">Цене (по убыванию)</option>
            <option value="name-asc">Названию (по алфавиту)</option>
          </select>
        </div>
        <ul className={styles.list}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <Link
                legacyBehavior
                href={`/products/${product.id}`}
                key={product.id}
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
          ))}
        </ul>
        <Snackbar
          open={showSuccessMessage}
          autoHideDuration={3000}
          onClose={handleCloseSuccessMessage}
        >
          <Alert onClose={handleCloseSuccessMessage} severity="success">
            Товар успешно добавлен
          </Alert>
        </Snackbar>
        <Snackbar
          open={showDuplicateMessage}
          autoHideDuration={3000}
          onClose={handleCloseDuplicateMessage}
        >
          <Alert onClose={handleCloseDuplicateMessage} severity="warning">
            Товар уже добавлен в корзину
          </Alert>
        </Snackbar>
      </main>
      <Footer />
    </>
  );
}

export default ProductsPage;
