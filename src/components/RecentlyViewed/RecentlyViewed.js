import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import CustomSnackbar from "../CustomSnackbar";
import { MotionButton } from "../MotionButton/MotionButton";
import styles from "../RecentlyViewed/RecentlyViewed.module.css";

function RecentlyViewed() {
  const [viewedPages, setViewedPages] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDuplicateMessage, setShowDuplicateMessage] = useState(false);

  useEffect(() => {
    const viewedPagesFromLocalStorage = JSON.parse(
      localStorage.getItem("viewedPages") || "[]"
    );
    setViewedPages(viewedPagesFromLocalStorage);
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      handleDuplicateMessage();
    } else {
      cart.push({ ...product, quantity: 1 });
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
    <div>
      <div style={{ height: "80px" }} />
      <h3 className={styles.title}>Вы недавно смотрели:</h3>
      <div className={styles.list} style={{ height: "500px" }}>
        {viewedPages.slice(0, 3).map((product) => (
          <div className={styles.item} key={product.id}>
            <MotionButton>
              <ProductCard
                product={product}
                addToCart={() => addToCart(product)}
              />
            </MotionButton>
          </div>
        ))}
      </div>
      <CustomSnackbar
        open={showSuccessMessage}
        handleClose={handleCloseSuccessMessage}
        severity="success"
        message="Товар успешно добавлен"
      />
      <CustomSnackbar
        open={showDuplicateMessage}
        handleClose={handleCloseDuplicateMessage}
        severity="warning"
        message="Товар уже добавлен в корзину"
      />
    </div>
  );
}

export default RecentlyViewed;
