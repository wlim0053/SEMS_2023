import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import RegisterPage from "./pages/student/RegisterPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <Routes>
        <Route path="registerPage" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter> */}
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
