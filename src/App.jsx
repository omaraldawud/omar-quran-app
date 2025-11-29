import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";

import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/DashboardPage";

import sidebarMenu from "@/assets/data/menus/sidebar_menu-ds";
import "@/assets/css/app.css";
import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <DashboardPage />;
      case "home":
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app-wrapper">
      <Header />
      <div className="app-container w-100">
        <Sidebar page={page} setPage={setPage} menuItems={sidebarMenu} />
        <main className="main-content">{renderPage()}</main>
      </div>
      <Footer />
    </div>
  );
}
