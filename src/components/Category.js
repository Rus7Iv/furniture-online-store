// import { useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import styles from "../styles/Category.module.css";
// import Link from "next/link";
// import ProductCard from "./ProductCard";
// import CustomSnackbar from "./CustomSnackbar";

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [showDuplicateMessage, setShowDuplicateMessage] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const productsRef = collection(db, "products");
//       const querySnapshot = await getDocs(productsRef);
//       const products = [];
//       const categorySet = new Set();
//       querySnapshot.forEach((doc) => {
//         const product = { id: doc.id, ...doc.data() };
//         products.push(product);
//         categorySet.add(product.category);
//       });
//       setProducts(products);
//       setCategories(Array.from(categorySet));
//     };
//     fetchProducts();
//   }, []);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   const addToCart = (product) => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingProduct = cart.find((item) => item.id === product.id);

//     if (existingProduct) {
//       handleDuplicateMessage();
//     } else {
//       cart.push({ ...product, quantity: 1 });
//       localStorage.setItem("cart", JSON.stringify(cart));
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

//   const handleCloseDuplicateMessage = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setShowDuplicateMessage(false);
//   };

//   return (
//     <div>
//       <h2>Категории</h2>
//       <div className={styles.categories}>
//         {categories.map((category) => (
//           <div
//             key={category}
//             className={styles.card}
//             onClick={() => handleCategoryClick(category)}
//           >
//             {category}
//           </div>
//         ))}
//       </div>

//       {selectedCategory && (
//         <div key={selectedCategory}>
//           <h2>{selectedCategory}</h2>
//           <div className={styles.categories}>
//             {products
//               .filter((product) => product.category === selectedCategory)
//               .map((product) => (
//                 <div className={styles.category}>
//                   <ProductCard
//                     key={product.id}
//                     product={product}
//                     addToCart={() => addToCart(product)}
//                   />
//                 </div>
//               ))}
//           </div>
//           <Link href={`/products`}>Найти больше товаров в каталоге</Link>
//         </div>
//       )}
//       <CustomSnackbar
//         open={showSuccessMessage}
//         handleClose={handleCloseSuccessMessage}
//         severity="success"
//         message="Товар успешно добавлен"
//       />
//       <CustomSnackbar
//         open={showDuplicateMessage}
//         handleClose={handleCloseDuplicateMessage}
//         severity="warning"
//         message="Товар уже добавлен в корзину"
//       />
//     </div>
//   );
// };

// export default Category;

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from "../styles/Category.module.css";
import Link from "next/link";
import ProductCard from "./ProductCard";
import CustomSnackbar from "./CustomSnackbar";

const categories = [
  { name: "Диваны и кресла", image: "../categories/диваны_и_кресла.jpg" },
  { name: "Столы и стулья", image: "../categories/столы_и_стулья.jpg" },
];

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDuplicateMessage, setShowDuplicateMessage] = useState(false);

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

  return (
    <div>
      <h2>Категории</h2>
      <div className={styles.categories}>
        {categories.map((category) => (
          <div
            key={category.name}
            className={styles.card}
            onClick={() => handleCategoryClick(category.name)}
          >
            <img
              src={category.image}
              alt={category.name}
              className={styles.img}
            />
            <div className={styles.categoryName}>{category.name}</div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div key={selectedCategory}>
          <h2>{selectedCategory}</h2>
          <div className={styles.categories}>
            {products
              .filter((product) => product.category === selectedCategory)
              .map((product) => (
                <div className={styles.category}>
                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={() => addToCart(product)}
                  />
                </div>
              ))}
          </div>
          <Link href={`/products`}>Найти больше товаров в каталоге</Link>
        </div>
      )}
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
