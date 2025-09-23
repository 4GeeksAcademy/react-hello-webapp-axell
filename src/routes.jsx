import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// Páginas
import Layout from "./pages/Layout"; // default export
import { Home } from "./pages/Home"; // named export
import { Single } from "./pages/Single"; // named export
import { Demo } from "./pages/Demo"; // named export
import { Contact } from "./pages/Contact"; // named export
import { AddContact } from "./pages/AddContact"; // named export

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      {/* Rutas hijas */}
      <Route index element={<Contact />} />
      <Route path="/add" element={<AddContact />} />
      <Route path="/edit/:id" element={<AddContact />} />
      <Route path="/home" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
    </Route>
  )
);
