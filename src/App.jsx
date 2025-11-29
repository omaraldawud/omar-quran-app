import { useState, useEffect } from "react";
import { loadChapters } from "@/utils/loadChapters";
import { loadQuran } from "@/utils/loadQuran";
import { loadTranslation } from "@/utils/loadTranslation";
import { loadJuz } from "@/utils/loadJuz";
import { juzNames } from "@/assets/data/juz/juzNames";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/DashboardPage";
import JuzPage from "@/pages/JuzPage";

import sidebarMenu from "@/assets/data/menus/sidebarMenu";

export default function App() {
  const [page, setPage] = useState("home");

  // Quran data
  const [chapters, setChapters] = useState([]);
  const [arabic, setArabic] = useState({});
  const [translation, setTranslation] = useState({});
  const [juzList, setJuzList] = useState([]);

  useEffect(() => {
    (async () => {
      setChapters(await loadChapters("en"));
      setArabic(await loadQuran());
      setTranslation(await loadTranslation("en"));
      setJuzList(await loadJuz());
    })();
  }, []);

  const renderPage = () => {
    if (page.startsWith("juz-")) {
      const juzId = Number(page.split("-")[1]);
      return (
        <JuzPage
          juzId={juzId}
          juzList={juzList}
          arabic={arabic}
          translation={translation}
          chapters={chapters}
        />
      );
    }

    switch (page) {
      case "dashboard":
        return <DashboardPage />;
      case "home":
      default:
        return (
          <HomePage
            chapters={chapters}
            arabic={arabic}
            translation={translation}
          />
        );
    }
  };

  return (
    <div className="app-wrapper">
      <Header />
      <div className="app-container">
        <Sidebar
          page={page}
          setPage={setPage}
          menuItems={sidebarMenu}
          juzList={juzList}
          juzNames={juzNames}
        />

        <main className="main-content">{renderPage()}</main>
      </div>
      <Footer />
    </div>
  );
}
