// import { useState, useEffect } from "react";
// import { auth } from "../lib/firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../lib/firebase";

// export default function AddItem() {
//   const [loggedIn, setLoggedIn] = useState(false);

//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState([]);
//   const [room, setRoom] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user && user.email === "test@test.ru") {
//         setLoggedIn(true);
//       } else {
//         setLoggedIn(false);
//       }
//     });
//     return unsubscribe;
//   }, []);

//   if (!loggedIn) {
//     return (
//       <p>
//         Вы должны быть авторизованы под логином test@test.ru, чтобы добавлять
//         товар
//       </p>
//     );
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (window.confirm("Вы точно хотите добавить товар?")) {
//       try {
//         const docRef = await addDoc(collection(db, "products"), {
//           category,
//           price: parseFloat(price),
//           title,
//           image,
//           room,
//           description,
//         });
//         // Очищаем форму
//         setCategory("");
//         setPrice("");
//         setTitle("");
//         setImage([]);
//         setRoom("");
//         setDescription("");
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
//     }
//   };

//   const handleImageChange = (e) => {
//     const imageUrls = e.target.value.split(",");
//     setImage(imageUrls);
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         width: "500px",
//       }}
//     >
//       <h1 style={{ margin: "10px" }}>Добавить товар</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Заголовок"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           style={{
//             width: "500px",
//             margin: "10px",
//           }}
//         />
//         <textarea
//           type="text"
//           placeholder="Описание"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           style={{
//             width: "500px",
//             height: "150px",
//             margin: "10px",
//           }}
//         />

//         <input
//           type="text"
//           placeholder="Категория"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           style={{
//             width: "500px",
//             margin: "10px",
//           }}
//         />
//         <input
//           type="text"
//           placeholder="Комната"
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//           style={{
//             width: "500px",
//             margin: "10px",
//           }}
//         />
//         <input
//           type="number"
//           placeholder="Цена"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           style={{
//             width: "500px",
//             margin: "10px",
//           }}
//         />
//         <textarea
//           type="text"
//           placeholder="URL изображений (вводите через запятую)"
//           onChange={handleImageChange}
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             width: "500px",
//             height: "150px",
//             margin: "10px",
//           }}
//         />
//         <button type="submit" style={{ margin: "10px" }}>
//           Добавить товар
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function AddItem() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState([]);
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email === "test@test.ru") {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  if (!loggedIn) {
    return (
      <p>
        Вы должны быть авторизованы под логином test@test.ru, чтобы добавлять
        товар
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Вы точно хотите добавить товар?")) {
      try {
        const docRef = await addDoc(collection(db, "products"), {
          category,
          price: parseFloat(price),
          title,
          image,
          room,
          description,
        });
        // Очищаем форму
        setCategory("");
        setPrice("");
        setTitle("");
        setImage([]);
        setRoom("");
        setDescription("");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const handleImageChange = (e) => {
    const imageUrls = e.target.value.split(",");
    setImage(imageUrls);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "500px",
      }}
    >
      <h1 style={{ margin: "10px" }}>Добавить товар</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "500px",
            margin: "10px",
          }}
        />
        <textarea
          type="text"
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "500px",
            height: "150px",
            margin: "10px",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "500px",
            margin: "10px",
          }}
        >
          <option value="">Выберите категорию</option>
          {[
            "Диваны и кресла",
            "Шкафы и стеллажи",
            "Кровати и матрасы",
            "Кухонные гарнитуры",
            "Столы и стулья",
            "Освещение",
            "Мебель для офиса",
            "Мебель для ванной",
          ].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          style={{
            width: "500px",
            margin: "10px",
          }}
        >
          <option value="">Выберите комнату</option>
          {[
            "Кухня",
            "Гостиная",
            "Спальня",
            "Ванная",
            "Офис",
            "Гардеробная",
          ].map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            width: "500px",
            margin: "10px",
          }}
        />
        <textarea
          type="text"
          placeholder="URL изображений (вводите через запятую)"
          onChange={handleImageChange}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "500px",
            height: "150px",
            margin: "10px",
          }}
        />
        <button type="submit" style={{ margin: "10px" }}>
          Добавить товар
        </button>
      </form>
    </div>
  );
}
