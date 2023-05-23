// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import styles from "../styles/Promo.module.css";
// import Link from "next/link";
// import Image from "next/image";
// import arrowLeft from "../../public/arrow-left.svg";
// import arrowRight from "../../public/arrow-right.svg";

// const Promo = ({ images }) => {
// const CustomPrevArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div className={className} style={{ ...style, display: "block" }}>
//       <Image
//         src={arrowLeft}
//         alt="Prev"
//         width={24}
//         height={24}
//         onClick={onClick}
//       />
//     </div>
//   );
// };

// const CustomNextArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div className={className} style={{ ...style, display: "block" }}>
//       <Image
//         src={arrowRight}
//         alt="Next"
//         width={24}
//         height={24}
//         onClick={onClick}
//       />
//     </div>
//   );
// };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     prevArrow: <CustomPrevArrow />,
//     nextArrow: <CustomNextArrow />,
//     autoplay: true,
//     autoplaySpeed: 2000,
//   };

//   return (
//     <div className={styles.wrapper}>
//       <Slider {...settings} className={styles.carousel}>
//         {images.map((image, index) => (
//           <div key={index}>
//             <Link href={image.link}>
//               <img src={image.src} alt={image.alt} className={styles.image} />
//             </Link>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Promo;

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

const Promo = () => {
  const [carouselProducts, setCarouselProducts] = useState([]);

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display: "block" }}>
        <Image
          src={arrowLeft}
          alt="Prev"
          width={24}
          height={24}
          onClick={onClick}
        />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display: "block" }}>
        <Image
          src={arrowRight}
          alt="Next"
          width={24}
          height={24}
          onClick={onClick}
        />
      </div>
    );
  };

  useEffect(() => {
    const fetchCarouselProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const carouselProducts = products.filter((product) => product.isCarousel);
      setCarouselProducts(carouselProducts);
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
    <div className={styles.wrapper}>
      <Slider {...settings} className={styles.carousel}>
        {carouselProducts.map((product, index) => (
          <div key={index}>
            <Link href={`/products/${product.id}`} className={styles.image}>
              <img
                src={product.image[0]}
                alt={product.title}
                // width={500}
                // height={420}
                style={{ width: "100%" }}
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Promo;
