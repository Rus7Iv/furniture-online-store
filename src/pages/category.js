import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

function Category({ categories }) {
  const uniqueCategories = [
    ...new Set(categories.map((category) => category.category)),
  ];
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {uniqueCategories.map((categoryName) => {
          const category = categories.find(
            (category) => category.category === categoryName
          );
          return (
            <li key={category.id}>
              <Link href={`/category/${category.id}`}>{category.category}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const categoriesRef = collection(db, "products");
  const querySnapshot = await getDocs(categoriesRef);
  const categories = [];
  querySnapshot.forEach((doc) => {
    categories.push({ id: doc.id, ...doc.data() });
  });
  return {
    props: {
      categories,
    },
  };
}

export default Category;
