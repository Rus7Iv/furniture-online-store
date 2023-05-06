// import { useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import styles from "../styles/Category.module.css";
// import Link from "next/link";
// import ProductCard from "./ProductCard";

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const categoriesRef = collection(db, "products");
//       const querySnapshot = await getDocs(categoriesRef);
//       const categorySet = new Set();
//       querySnapshot.forEach((doc) => {
//         const product = { id: doc.id, ...doc.data() };
//         categorySet.add(product.category);
//         setProducts((prevProducts) => [...prevProducts, product]);
//       });
//       setCategories(Array.from(categorySet));
//     };
//     fetchCategories();
//   }, []);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   const addToCart = (product) => {
//     console.log("Добавить в корзину:", product);
//   };

//   return (
//     <div>
//       <h2>Категории</h2>
//       <ul className={styles.list}>
//         {categories.map(
//           (
//             category // удален key, так как элементы не создаются на основе массива продуктов
//           ) => (
//             <div
//               key={category}
//               className={styles.card}
//               onClick={() => handleCategoryClick(category)}
//             >
//               {category}
//             </div>
//           )
//         )}
//       </ul>
//       {selectedCategory && (
//         <div key={selectedCategory}>
//           <h2>{selectedCategory}</h2>
//           <ul>
//             {products
//               .filter((product) => product.category === selectedCategory)
//               .map((product) => (
//                 <ProductCard
//                   key={product.id} // добавлен уникальный идентификатор продукта в качестве ключа
//                   product={product}
//                   addToCart={() => addToCart(product)}
//                 />
//               ))}
//           </ul>
//           <Link href={`/products`}>Найти больше товаров в каталоге</Link>
//         </div>
//       )}
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

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, "products");
      const querySnapshot = await getDocs(productsRef);
      const products = [];
      const categorySet = new Set();
      querySnapshot.forEach((doc) => {
        const product = { id: doc.id, ...doc.data() };
        products.push(product);
        categorySet.add(product.category);
      });
      setProducts(products);
      setCategories(Array.from(categorySet));
    };
    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const addToCart = (product) => {
    console.log("Добавить в корзину:", product);
  };

  return (
    <div>
      <h2>Категории</h2>
      <ul className={styles.list}>
        {categories.map((category) => (
          <div
            key={category}
            className={styles.card}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </ul>
      {selectedCategory && (
        <div key={selectedCategory}>
          <h2>{selectedCategory}</h2>
          <ul>
            {products
              .filter((product) => product.category === selectedCategory)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={() => addToCart(product)}
                />
              ))}
          </ul>
          <Link href={`/products`}>Найти больше товаров в каталоге</Link>
        </div>
      )}
    </div>
  );
};

export default Category;
