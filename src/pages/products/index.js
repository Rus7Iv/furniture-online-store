import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState, useEffect } from "react";
import styles from "../../styles/ProductList.module.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomSnackbar from "@/components/CustomSnackbar";
import ProductCard from "@/components/ProductCard";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDuplicateMessage, setShowDuplicateMessage] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setFilteredProducts(productList);

      const categories = [
        ...new Set(productList.map((product) => product.category)),
      ];
      setCategories(categories);
    };

    const fetchRooms = async () => {
      const roomsCollection = collection(db, "products");
      const roomsSnapshot = await getDocs(roomsCollection);
      const roomList = roomsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomList);

      const rooms = [...new Set(roomList.map((product) => product.room))];
      setRooms(rooms);
    };

    fetchProducts();
    fetchRooms();
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

  const searchProducts = (searchTerm, category, room) => {
    const searchedProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    let filteredProducts = searchedProducts;
    if (category !== "") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }
    if (room !== "") {
      filteredProducts = filteredProducts.filter(
        (product) => product.room === room
      );
    }
    setFilteredProducts(filteredProducts);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    searchProducts(event.target.value, selectedCategory, selectedRoom);
  };

  const handleCloseDuplicateMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowDuplicateMessage(false);
  };

  const sortProducts = (sortBy) => {
    let sortedProducts = [...filteredProducts];
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
    setFilteredProducts(sortedProducts);
    setCurrentPage(1);
  };

  const filterProductsByCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    searchProducts(searchTerm, categoryId, selectedRoom);
  };

  const filterProductsByRoom = (roomName) => {
    setSelectedRoom(roomName);
    searchProducts(searchTerm, selectedCategory, roomName);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <>
      <Navigation />
      <main>
        <h1>Каталог товаров</h1>
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Поиск товаров по названию"
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <select
            value={selectedCategory}
            onChange={(event) => filterProductsByCategory(event.target.value)}
            className={styles.select}
          >
            <option value="">Все категории</option>
            {categories.map((category) => (
              <option key={category} value={category} className={styles.option}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={selectedRoom}
            onChange={(event) => filterProductsByRoom(event.target.value)}
            className={styles.select}
          >
            <option value="">Все комнаты</option>
            {rooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(event) => sortProducts(event.target.value)}
            className={styles.select}
          >
            <option value="">Сортировать по:</option>
            <option value="price-asc">Цене (по возрастанию)</option>
            <option value="price-desc">Цене (по убыванию)</option>
            <option value="name-asc">Названию (по алфавиту)</option>
          </select>
        </div>
        <div className={styles.center_list}>
          <ul className={styles.list}>
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </ul>
        </div>
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? styles.active : ""}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </main>
      <Footer />
      <CustomSnackbar
        open={showSuccessMessage}
        handleClose={handleCloseSuccessMessage}
        message="Товар добавлен в корзину"
        severity="success"
      />
      <CustomSnackbar
        open={showDuplicateMessage}
        handleClose={handleCloseDuplicateMessage}
        message="Этот товар уже в корзине"
        severity="warning"
      />
    </>
  );
}

export default ProductsPage;
