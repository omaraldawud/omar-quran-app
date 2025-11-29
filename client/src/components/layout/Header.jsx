import "@/assets/css/layout.css";
import "@/assets/css/header.css";

import headerMenu from "@/assets/data/menus/header_menu-ds";

export default function Header() {
  return (
    <header className="header">
      {/* Left: Title */}
      <div className="header-left">
        <h2 className="app-title">Quran Search & Resources</h2>
      </div>

      {/* Center: Bismillah */}
      <div className="header-center">
        <p className="bismillah arabic-text">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>

      {/* Right: Nav */}
      <div className="header-right">
        <nav className="header-nav">
          {headerMenu.map((item) => (
            <a key={item.id} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
