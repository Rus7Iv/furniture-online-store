import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/Promo.module.css";
import Link from "next/link";
import Image from "next/image";
import arrowLeft from "../../public/arrow-left.svg";
import arrowRight from "../../public/arrow-right.svg";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Loading from "./Loading";
import { MotionButton } from "./MotionButton/MotionButton";

const Promo = () => {
  const [carouselProducts, setCarouselProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display: "block" }}>
        <MotionButton>
          <Image
            src={arrowLeft}
            alt="Prev"
            width={24}
            height={24}
            onClick={onClick}
          />
        </MotionButton>
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display: "block" }}>
        <MotionButton>
          <Image
            src={arrowRight}
            alt="Next"
            width={24}
            height={24}
            onClick={onClick}
          />
        </MotionButton>
      </div>
    );
  };

  useEffect(() => {
    const fetchCarouselProducts = async () => {
      setIsLoading(true); // Установить isLoading в true при начале загрузки
      const snapshot = await getDocs(collection(db, "products"));
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const carouselProducts = products.filter((product) => product.isCarousel);
      setCarouselProducts(carouselProducts);

      setIsLoading(false);
    };
    fetchCarouselProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      {isLoading ? ( // Если isLoading равен true, то показать анимацию загрузки
        <>
          <Loading />
        </>
      ) : (
        <div className={styles.wrapper}>
          <Slider {...settings} className={styles.carousel}>
            {carouselProducts.map((product, index) => (
              <div key={index}>
                <Link href={`/products/${product.id}`} className={styles.image}>
                  <img
                    src={product.image[0]}
                    alt={product.title}
                    className={styles.img_}
                  />
                  <div className={styles.details}>
                    <p className={styles.name}>{product.title}</p>
                    <p className={styles.price}>{product.price} ₽</p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default Promo;
