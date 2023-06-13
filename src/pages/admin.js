import { useState } from "react";
import AdminPanel from "@/components/Admin/AdminPanel";
import Footer from "@/components/Footer/Footer";
import Navigation from "@/components/Navigation/Navigation";
import OrdersList from "@/components/Orders/OrdersList";
import Refund from "@/components/Refund/Refund";

const AdminPage = () => {
  const [activeBlock, setActiveBlock] = useState(null);

  const handleOpenOrdersList = () => {
    setActiveBlock("ordersList");
  };

  const handleOpenAdminPanel = () => {
    setActiveBlock("adminPanel");
  };

  const handleOpenRefund = () => {
    setActiveBlock("refund");
  };

  return (
    <>
      <Navigation />
      <main>
        <h1>Панель администратора</h1>
        <div>
          <button
            onClick={handleOpenOrdersList}
            className="btns"
            style={{ width: "160px" }}
          >
            Список заказов
          </button>
          <button
            onClick={handleOpenAdminPanel}
            className="btns"
            style={{ width: "160px" }}
          >
            Список товаров
          </button>
          <button
            onClick={handleOpenRefund}
            className="btns"
            style={{ width: "160px" }}
          >
            Возврат
          </button>
        </div>
        <div style={{ height: "40px" }} />
        {activeBlock === "ordersList" && <OrdersList />}
        {activeBlock === "adminPanel" && <AdminPanel />}
        {activeBlock === "refund" && <Refund />}
      </main>
      <Footer />
    </>
  );
};

export default AdminPage;
