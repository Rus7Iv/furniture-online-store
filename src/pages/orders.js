import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import UserOrders from "../components/Orders/UserOrders";

export default function OrdersPage() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Navigation />
      <main>
        <UserOrders />
      </main>
      <Footer />
    </>
  );
}
