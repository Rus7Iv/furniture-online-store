import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function AddItem() {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState([]);
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");

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
        console.log("Document written with ID: ", docRef.id);
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
      }}
    >
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "300px",
            margin: "10px",
          }}
        />
        <input
          type="text"
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "300px",
            margin: "10px",
          }}
        />

        <input
          type="text"
          placeholder="Категория"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "300px",
            margin: "10px",
          }}
        />
        <input
          type="text"
          placeholder="Комната"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          style={{
            width: "300px",
            margin: "10px",
          }}
        />
        <input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            width: "300px",
            margin: "10px",
          }}
        />
        <input
          type="text"
          placeholder="URL изображений (вводите через запятую)"
          onChange={(e) => setImage(e.target.value.split(","))}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
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
