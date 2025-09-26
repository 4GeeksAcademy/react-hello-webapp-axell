import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

import { Contact } from "./Contact";
import { AddContact } from "./AddContact";
import { Home } from "./Home";
import { Single } from "./Single";
import { Demo } from "./Demo";

const Layout = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Navbar />
        <Routes>
          <Route path="/" element={<Contact />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit/:id" element={<AddContact />} />
          <Route path="/home" element={<Home />} />
          <Route path="/single/:theId" element={<Single />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default Layout;
