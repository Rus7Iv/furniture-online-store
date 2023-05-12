// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { useState, useEffect } from "react";
// import styles from "../../styles/ProductList.module.css";
// import Navigation from "@/components/Navigation";
// import Footer from "@/components/Footer";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import CustomSnackbar from "@/components/CustomSnackbar";
// import ProductCard from "@/components/ProductCard";

// function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [cart, setCart] = useState([]);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [showDuplicateMessage, setShowDuplicateMessage] = useState(false);
//   const [sortOrder, setSortOrder] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [rooms, setRooms] = useState([]);
//   const [selectedRoom, setSelectedRoom] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const productsCollection = collection(db, "products");
//       const productsSnapshot = await getDocs(productsCollection);
//       const productList = productsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setProducts(productList);
//       setFilteredProducts(productList);

//       const categories = [
//         ...new Set(productList.map((product) => product.category)),
//       ];
//       setCategories(categories);
//     };

//     const fetchRooms = async () => {
//       const roomsCollection = collection(db, "products");
//       const roomsSnapshot = await getDocs(roomsCollection);
//       const roomList = roomsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setRooms(roomList);

//       const rooms = [...new Set(roomList.map((product) => product.room))];
//       setRooms(rooms);
//     };

//     fetchProducts();
//     fetchRooms();
//   }, []);

//   const addToCart = (product) => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingProduct = cart.find((item) => item.id === product.id);

//     if (existingProduct) {
//       handleDuplicateMessage();
//     } else {
//       cart.push({ ...product, quantity: 1 });
//       localStorage.setItem("cart", JSON.stringify(cart));
//       setCart(cart);
//       handleSuccessMessage();
//     }
//   };

//   const handleSuccessMessage = () => {
//     setShowSuccessMessage(true);
//   };

//   const handleCloseSuccessMessage = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setShowSuccessMessage(false);
//   };

//   const handleDuplicateMessage = () => {
//     setShowDuplicateMessage(true);
//   };

//   const searchProducts = (searchTerm) => {
//     const searchedProducts = products.filter((product) =>
//       product.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(searchedProducts);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     searchProducts(event.target.value);
//   };

//   const handleCloseDuplicateMessage = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setShowDuplicateMessage(false);
//   };

//   const sortProducts = (sortBy) => {
//     let sortedProducts = [...filteredProducts];
//     switch (sortBy) {
//       case "price-asc":
//         sortedProducts.sort((a, b) => a.price - b.price);
//         setSortOrder("price-asc");
//         break;
//       case "price-desc":
//         sortedProducts.sort((a, b) => b.price - a.price);
//         setSortOrder("price-desc");
//         break;
//       case "name-asc":
//         sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
//         setSortOrder("name-asc");
//         break;
//       default:
//         sortedProducts = products;
//         setSortOrder("");
//     }
//     setFilteredProducts(sortedProducts);
//   };

//   const filterProductsByCategory = (categoryId) => {
//     setSelectedCategory(categoryId);
//     let filteredProducts = [...products];
//     if (categoryId !== "") {
//       filteredProducts = filteredProducts.filter(
//         (product) => product.category === categoryId
//       );
//     }
//     if (selectedRoom !== "") {
//       filteredProducts = filteredProducts.filter(
//         (product) => product.room === selectedRoom
//       );
//     }
//     setFilteredProducts(filteredProducts);
//   };

//   const filterProductsByRoom = (roomName) => {
//     setSelectedRoom(roomName);
//     let filteredProducts = [...products];
//     if (roomName !== "") {
//       filteredProducts = filteredProducts.filter(
//         (product) => product.room === roomName
//       );
//     }
//     if (selectedCategory !== "") {
//       filteredProducts = filteredProducts.filter(
//         (product) => product.category === selectedCategory
//       );
//     }
//     setFilteredProducts(filteredProducts);
//   };

//   return (
//     <>
//       <Navigation />
//       <main>
//         <h1>Каталог товаров</h1>
//         <div className={styles.filters}>
//           <input
//             type="text"
//             placeholder="Поиск товаров по названию"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className={styles.searchInput}
//           />
//           <select
//             value={selectedCategory}
//             onChange={(event) => filterProductsByCategory(event.target.value)}
//             className={styles.select}
//           >
//             <option value="">Все категории</option>
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//           <select
//             value={selectedRoom}
//             onChange={(event) => filterProductsByRoom(event.target.value)}
//             className={styles.select}
//           >
//             <option value="">Все комнаты</option>
//             {rooms.map((room) => (
//               <option key={room} value={room}>
//                 {room}
//               </option>
//             ))}
//           </select>
//           <select
//             value={sortOrder}
//             onChange={(event) => sortProducts(event.target.value)}
//             className={styles.select}
//           >
//             <option value="">Сортировать по:</option>
//             <option value="price-asc">Цене (по возрастанию)</option>
//             <option value="price-desc">Цене (по убыванию)</option>
//             <option value="name-asc">Названию (по алфавиту)</option>
//           </select>
//         </div>
//         <ul className={styles.list}>
//           {filteredProducts.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               addToCart={addToCart}
//             />
//           ))}
//         </ul>
//       </main>
//       <Footer />
//       <CustomSnackbar
//         open={showSuccessMessage}
//         handleClose={handleCloseSuccessMessage}
//         message="Товар добавлен в корзину"
//         severity="success"
//       />
//       <CustomSnackbar
//         open={showDuplicateMessage}
//         handleClose={handleCloseDuplicateMessage}
//         message="Товар уже добавлен в корзину"
//         severity="warning"
//       />
//     </>
//   );
// }

// export default ProductsPage;

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
  };

  const filterProductsByCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    searchProducts(searchTerm, categoryId, selectedRoom);
  };

  const filterProductsByRoom = (roomName) => {
    setSelectedRoom(roomName);
    searchProducts(searchTerm, selectedCategory, roomName);
  };

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
              <option key={category} value={category}>
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
        <ul className={styles.list}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </ul>
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
