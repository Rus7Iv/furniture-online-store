import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content_footer}>
          <div className={styles.profile}>
            <div className={styles.logo_area}>
              <span className={styles.logo_name}>Furniture</span>
            </div>
            <div className={styles.desc_area}>
              <p>Author: Rus7Iv</p>
            </div>
            <div className={styles.social_media}>
              <a href="#">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAAXNSR0IArs4c6QAAAZBJREFUWEftle8xBEEQxX8XATIgAyJABIgAEZABMiACREAGiIAMEAEZUO9qZ2vqXc9eX9VV7Zedb9vb0+/16z8zY8QzGxGbCXwU9SfZR5f9DLg3FjfAdWXbBH4Cpm/AQWB/BfbNvgX8ylbXXJdfzPEL2DHbM3Bktgg8ivcNbJe73nBitGGBTwABlhMFjcCjrM+Bhxa4fpwauIIcmu1vSeZLs3bZ9S1JPoPaCVwkyhkCV1+81/J2lzxGuF4juTz7IfBb4MISuAMuPaloyex2zN23rr2DfwB7QDQxajLFnHd4fVobLqq9Lks6ATm4YqopjxMl611a4Kqbxsw7XwREbEHCALSYNKqKtXCGdruyeBoImv0lpaRYWvYSOJK/BapZV21dLfmHBDKvWrTRnEDZXCqXCPsGDAlkwBVQBHxH1wR8w7UUk11bbn4y4MVXD8xVQ/NovbYI9CO7CrhwtQFFQs1Y17b1qkUle+z2wUqZe9JqLpVER6MUjlPw1Pa+q2aeHa+U3wSekmndTpPs61Y0Fe8fuFVRIA4107cAAAAASUVORK5CYII=" />
              </a>
              <a href="#">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAAXNSR0IArs4c6QAAAg1JREFUWEfll/0xBEEQxd9FgAgQASJABGSADGSACBABIkAEiAARkAEioH5XM1u9vT27s+fU/aGrrrZqd3re64/pNzfRAm2yQGzNCr4j6VvSmqT3FMCrpM8xwYwB35e0J4nncgHkUdKdpJsaIjXgRHkiiWetkYHjRKLoMwTOBue1iME6snBUykIf+LWkg18AZ9cXSbsRgRL4oaSrOQDnLegFCLQsAqe2D2bVfWoyGo0ybPeQ+kprSDfrbQBnkk6tbwQOSwvgnSBHKv2x8u99EKzfMkezc869A0Q7jCvLEe3FEaSkU/ORR002T3CiXymB83HJREYNmWKjJpfxj4Ih9ZStFTkgby6ll6mBKjPdWdZbRpv2edY7s2AMfzhKTRkXAd5k86/Bq9O+KenZpehppKD4okfaEKYdR9/tvGu6c4auQ+tXnR9jlkHWOeeMRTTbWlEYBsiUhKkptR8yVlC4mdCtMK/S50SmT/97Jxz+OVUwpz4XLhsIDST94GEdEly65bB3k/Io7byzHcqxQImo0UaKrMXepB4Vu+0pRWdglfTc1ms9RZmvURCJxm00ITMXSoh/y6/vJpOllYbjKjSdxwPGjdYb+pDltvVt6A5nM0Av8KPm1DcyD07E9EdIfAgcAJwBy2pXklg/x3O/FBWxBhwCbMy0gghP5kFkRMiPJs1/JoqVqgUfqvVM3/8v+A/IHH0g5hURbgAAAABJRU5ErkJggg==" />
              </a>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className={styles.footer_bottom}>
          <div className={styles.copy_right}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAAXNSR0IArs4c6QAAApJJREFUWEfFl/1RVFEMxQ8VQAdABWgFSAVqBWgFaAVgBWAFagVqBWAFQAXYgVCBzI9JdvKyyb77+IfM7OzHu7knOTnJvbulF7StF8TWc8HfSPovaUfSvSVwGz4P5bQEHMBjSe8MtAL4JYnXjxH0EfBXks4lAT5qfyV9tkBanznwD5K+JW/oJbur8DsBEtzbtPa7pI8d+iZwHKHZDSrPJJFVZ2jgk722bRFBHlUOHXjM+EES38l21GCC4A/MoWSgAsfx2pwAhs6bUdSwDhbI2gNAAxdxnwoch0Nb9L7ImE1PLChvNdoNZn6ndtuzwCkBa/bj8wxOlpcGTI2hOxrfUT6glcEQAUddxBJ+Md08+WbwKDKi7DbBl5J4OZypKmDWss+uvbNvCQ41UEQ7UXs3Mr2zjAFF9bF+PGf4EHxlrKVU2GsPOmYeKZ/QY2Cn5rwmnAYw/lzu3YHTl3GIuAjJuqv3XAycBdgqsQgObT9tQQantrTMn4VjNgbk4F9tCE0EF6npMkc4K8HMpZqeb8w8gue6RsHkwEZiiIOrpJ1a/rOdGBaUwS060xEEkKceA6Wb+8x75gO2Gly5z5lSnExr08hay9uFTRChi5JACZATrGo318xEsBm8nUYWdT7pMuVsThCRgXZqVrPdp1FHL5sxZHyqEQCgsJaPXErJuPaBNZmaFXhsOeiivn5Py5nGO1wlPC8jz1Yt5gu78zzSWx0WcwonKG5ALlrGNYxNkth0k4lHK04oduRiCAjKdqopCZ2wxt7cHS4LDD34DZVpF1sRDSDYeCCVGc/RHmklY4Tkd7I5yv05Ncav08vwnwa/GJIZ53JnnerL9XO0V07Q6kKKakeYSy6Zw5mPUr1o3XMyXwSwafEj6hahIPSd8BkAAAAASUVORK5CYII=" />
            <span>2023 UDSU</span>
          </div>
          <div className={styles.tou}>
            <a href="#">Term of Use</a>
            <a href="#">Privacy</a>
            <a href="#">Policy</a>
            <a href="#">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import React from "react";
// import { Container } from "react-bootstrap";
// import styles from "../styles/Footer.module.css";

// const Footer = () => {
//   return (
//     <footer className={styles.footer}>
//       <Container>
//         <p className="text-center text-muted mb-0">
//           © {new Date().getFullYear()} Your Company, Inc.
//         </p>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;
