import React, { useState, useEffect } from "react";
import { Link, BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import SNP from "./img/snp.png";
import bell from "./img/bell.png";
import arrow from "./img/arrow.png";
import refresh from "./img/refresh.png";
import DHvanchuyen from "./pages/dhvanchuyen";
import "./App.css";

console.log(SNP);
console.log(bell);
console.log(arrow);
console.log(refresh);

const Layout = () => {
  return (
    <div className="header">
      <div className="header-top">
        <div className="header-top-left">
          <div className="header-top-left-items">
            <img src={SNP} alt="SNP" height={40} />
          </div>

          <div className="header-top-left-items">
            <Link to="/dhvanchuyen">Điều hành vận chuyển</Link>
          </div>

          <div className="header-top-left-items">
            <select>
              <option>
                <Link to="/">Dashboard thống kê</Link>
              </option>
              <option>
                <Link to="/">Báo cáo tiến độ vận tải</Link>
              </option>
            </select>
          </div>

          <div className="header-top-left-items">
            <select>
              <option>
                <Link to="/">Tài khoản đăng nhập</Link>
              </option>
              <option>
                <Link to="/">Tài xế</Link>
              </option>
            </select>
          </div>
        </div>

        <div className="header-top-right">
          <div className="header-top-right-items">
            <select>
              <option>user_00001</option>
              <option>Đăng xuất</option>
            </select>
          </div>

          <div lassName="header-top-right-items">
            <button>
              <img src={bell} alt="bell" height={18} />
            </button>
          </div>

          <div lassName="header-top-right-items">
            <button>
              <img src={arrow} alt="logout" height={18} />
            </button>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DHvanchuyen />} />
            <Route path="dhvanchuyen" element={<DHvanchuyen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
