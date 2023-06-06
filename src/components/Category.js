import { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from "../styles/Category.module.css";
import Link from "next/link";
import ProductCard from "./ProductCard";
import CustomSnackbar from "./CustomSnackbar";
import { MotionButton } from "./MotionButton/MotionButton";

const categories = [
  { name: "Диваны и кресла", image: "../categories/диваны_и_кресла.jpg" },
  { name: "Столы и стулья", image: "../categories/столы_и_стулья.jpg" },
  { name: "Кровати и матрасы", image: "../categories/кровати_и_матрасы.jpg" },
  { name: "Шкафы и стеллажи", image: "../categories/шкафы_и_стеллажи.png" },
  { name: "Кухонные гарнитуры", image: "../categories/кухонные_гарнитуры.jpg" },
  { name: "Освещение", image: "../categories/освещение.webp" },
];

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDuplicateMessage, setShowDuplicateMessage] = useState(false);
  const categoryRef = useRef(null);
  const categoryContainerRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, "products");
      const querySnapshot = await getDocs(productsRef);
      const products = [];
      querySnapshot.forEach((doc) => {
        const product = { id: doc.id, ...doc.data() };
        products.push(product);
      });
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

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

  const handleScrollLeft = () => {
    categoryContainerRef.current.scrollLeft -= 290;
  };

  const handleScrollRight = () => {
    categoryContainerRef.current.scrollLeft += 290;
  };

  return (
    <div>
      <h2 className={styles.title}>Категории</h2>
      <div className={styles.categoriesContainer}>
        <button
          className={styles.scrollButtonLeft}
          onClick={handleScrollLeft}
          aria-label="Scroll categories left"
        />
        <div
          className={styles.categories}
          ref={categoryContainerRef}
          style={{ scrollBehavior: "smooth" }}
        >
          {categories.map((category) => (
            <div style={{ height: "320px" }}>
              <MotionButton>
                <div
                  key={category.name}
                  className={styles.card}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    categoryRef.current.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className={styles.img}
                  />
                  <div className={styles.categoryName}>{category.name}</div>
                </div>
              </MotionButton>
            </div>
          ))}
        </div>
        <button
          className={styles.scrollButtonRight}
          onClick={handleScrollRight}
          aria-label="Scroll categories right"
        />
      </div>

      <div ref={categoryRef}>
        {selectedCategory && (
          <div key={selectedCategory}>
            <div style={{ height: "80px" }} />
            <h2 className={styles.title}>{selectedCategory}</h2>
            <div className={styles.blur_edges}>
              <div className={styles.categories} style={{ height: "500px" }}>
                {products
                  .filter((product) => product.category === selectedCategory)
                  .map((product) => (
                    <div className={styles.category}>
                      <MotionButton>
                        <ProductCard
                          key={product.id}
                          product={product}
                          addToCart={() => addToCart(product)}
                        />
                      </MotionButton>
                    </div>
                  ))}
              </div>
            </div>
            <div className={styles.href_catalog}>
              <Link href={`/products`} className={styles.text_href}>
                Найти больше товаров в каталоге
              </Link>
            </div>
          </div>
        )}
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
};

export default Category;
