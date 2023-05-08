import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import styles from "../../styles/ProductPage.module.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomPrevArrow from "@/components/Arrows/CustomPrevArrow";
import CustomNextArrow from "@/components/Arrows/CustomNextArrow";
import CustomSnackbar from "@/components/CustomSnackbar";
import { Modal } from "react-bootstrap";

const ProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDuplicateMessage, setShowDuplicateMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const productDoc = doc(db, "products", productId);
      const productSnapshot = await getDoc(productDoc);
      if (productSnapshot.exists()) {
        setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
      }
    };
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const existingProduct = favorites.find((item) => item.id === product?.id);
    setIsFavorite(!!existingProduct);
  }, [product]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      handleDuplicateMessage();
    } else {
      cart.push({ ...product, quantity: 1, favorite: false });
      localStorage.setItem("cart", JSON.stringify(cart));
      setCart(cart);
      handleSuccessMessage();
    }
  };

  const addToFavorites = (product) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const existingProduct = favorites.find((item) => item.id === product.id);

    if (!existingProduct) {
      favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    } else {
      removeFromFavorites(product);
    }
  };

  const removeFromFavorites = (product) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = favorites.filter((item) => item.id !== product.id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(false);
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

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImageIndex(0);
  };

  const handleShowModal = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  if (!product) {
    return (
      <>
        <Navigation />
        <main>
          <div className={styles.loading}>
            <p>Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main>
        <div className={styles.page}>
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            prevArrow={<CustomPrevArrow />}
            nextArrow={<CustomNextArrow />}
            className={styles.carousel}
          >
            {product.image &&
              Array.isArray(product.image) &&
              product.image.map((image, index) => (
                <div key={image}>
                  <button
                    onClick={() => handleShowModal(index)}
                    className={styles.btn_img}
                  >
                    <img
                      src={image}
                      alt={product.title}
                      className={styles.image}
                    />
                  </button>
                </div>
              ))}
          </Slider>

          <div className={styles.info}>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.desc}>{product.description}</p>
            <p className={styles.price}>{product.price} ₽</p>
            <button
              onClick={() => addToCart(product)}
              className={styles.btn_add_to_cart}
            >
              Добавить в корзину
            </button>
            <button
              onClick={() => addToFavorites(product)}
              className={
                isFavorite
                  ? styles.btn_remove_from_favorites
                  : styles.btn_add_to_favorites
              }
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>

          <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <img
                src={product?.image[selectedImageIndex]}
                alt={product?.title}
                className={styles.modalImage}
                width="100%"
              />
            </Modal.Body>
          </Modal>
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
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;
