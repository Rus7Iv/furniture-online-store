import AdminPanel from "@/components/AdminPanel";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const AdminPage = () => {
  return (
    <>
      <Navigation />
      <main>
        <AdminPanel />
      </main>
      <Footer />
    </>
  );
};

export default AdminPage;
