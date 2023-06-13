import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { useMemo } from "react";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomSnackbar from "@/components/CustomSnackbar";
import ProductCard from "@/components/ProductCard/ProductCard";
import Loading from "@/components/Loading/Loading";
import styles from "../products/styles/ProductList.module.css";

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
  const [isLoading, setIsLoading] = useState(true);

  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
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

      setIsLoading(false);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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
    let searchedProducts = [...products];
    if (searchTerm !== "") {
      searchedProducts = searchedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (category !== "") {
      searchedProducts = searchedProducts.filter(
        (product) => product.category === category
      );
    }
    if (room !== "") {
      searchedProducts = searchedProducts.filter(
        (product) => product.room === room
      );
    }
    setFilteredProducts(searchedProducts);
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

  const filteredProductsMemo = useMemo(() => {
    let sortedProducts = [...filteredProducts];
    switch (sortOrder) {
      case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        sortedProducts = filteredProducts;
        break;
    }
    if (selectedCategory !== "") {
      sortedProducts = sortedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (selectedRoom !== "") {
      sortedProducts = sortedProducts.filter(
        (product) => product.room === selectedRoom
      );
    }
    if (searchTerm !== "") {
      sortedProducts = sortedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return sortedProducts;
  }, [filteredProducts, sortOrder, selectedCategory, selectedRoom, searchTerm]);

  const totalPages = Math.ceil(filteredProductsMemo.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedProducts = filteredProductsMemo.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <>
      <Navigation />
      <main>
        {isLoading ? (
          <>
            {" "}
            <Loading />{" "}
          </>
        ) : (
          <>
            <h1>Каталог товаров</h1>
            <div className={styles.filters}>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Поиск товаров по названию"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <select
                className={styles.select}
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  searchProducts(searchTerm, e.target.value, selectedRoom);
                }}
              >
                <option value="">Все категории</option>
                {categories
                  .filter((c) => c)
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
              <select
                className={styles.select}
                value={selectedRoom}
                onChange={(e) => {
                  setSelectedRoom(e.target.value);
                  searchProducts(searchTerm, selectedCategory, e.target.value);
                }}
              >
                <option value="">Все комнаты</option>
                {rooms
                  .filter((c) => c)
                  .map((room) => (
                    <option key={room} value={room}>
                      {room}
                    </option>
                  ))}
              </select>
              <select
                className={styles.select}
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Сортировать по</option>
                <option value="name-asc">Названию (А-Я)</option>
                <option value="price-asc">Цене (по возрастанию)</option>
                <option value="price-desc">Цене (по убыванию)</option>
              </select>
            </div>
            <div className={styles.center_list}>
              {paginatedProducts.length === 0 ? (
                <p>Ничего не найдено</p>
              ) : (
                <ul className={styles.list}>
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      addToCart={addToCart}
                    />
                  ))}
                </ul>
              )}
            </div>
            {paginatedProducts.length > 0 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {"<"}
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={currentPage === page ? styles.active : ""}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {">"}
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
      <CustomSnackbar
        open={showSuccessMessage}
        onClose={handleCloseSuccessMessage}
        message="Товар добавлен в корзину"
        severity="success"
      />
      <CustomSnackbar
        open={showDuplicateMessage}
        onClose={handleCloseDuplicateMessage}
        message="Этот товар уже в корзине"
        severity="warning"
      />
    </>
  );
}

export default ProductsPage;
