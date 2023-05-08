import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import styles from "../styles/RecentlyViewed.module.css";

function RecentlyViewed() {
  const [viewedPages, setViewedPages] = useState([]);

  useEffect(() => {
    const viewedPagesFromLocalStorage = JSON.parse(
      localStorage.getItem("viewedPages") || "[]"
    );
    setViewedPages(viewedPagesFromLocalStorage);
  }, []);

  return (
    <div>
      <h3>Недавно просмотренные страницы товаров:</h3>
      {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"> */}
      <div className={styles.list}>
        {viewedPages.slice(0, 4).map((page) => (
          <div className={styles.item}>
            <Link key={page.id} href={`/products/${page.id}`}>
              <ProductCard product={page} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyViewed;
