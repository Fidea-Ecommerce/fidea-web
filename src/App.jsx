import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductPage from "./Pages/ProductPage";
import HomePage from "./Pages/HomePage";
import ProductDetail from "./Pages/ProductDetail";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import PageNotFound from "./Pages/PageNotFound";
import RegisterPage from "./Pages/RegisterPage";
import ResetPassword1 from "./Pages/ResetPassword1";
import SearchResult from "./Pages/SearchResult";
import ResultNotFound from "./Pages/ResultNotFound";
import Cookies from "js-cookie";
import { jwtVerify } from 'jose';

const verifyToken = async (accessToken, refreshToken) => {
  try {
    const { payload: payloadAccessToken } = await jwtVerify(accessToken, new TextEncoder().encode('D3v1n@634824ATK'));
    const { payload: payloadRefreshToken } = await jwtVerify(refreshToken, new TextEncoder().encode('D3v1n@634824RTK'));
    const now = Date.now() / 1000;
    return payloadAccessToken['exp'] > now || payloadRefreshToken['exp'] > now;
  } catch (error) {
    return false;
  }
};

const useAuth = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = Cookies.get('access_token');
      const refreshToken = Cookies.get('refresh_token');
      if (!accessToken || !refreshToken) {
        setAuth(false);
      } else {
        const isValid = await verifyToken(accessToken, refreshToken);
        setAuth(isValid);
      }
    };
    checkAuth();
  }, []);

  return auth;
};

const PrivateRoute = () => {
  const auth = useAuth();

  if (auth === null) {
    return null;
  }

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const auth = useAuth();

  if (auth === null) {
    return null; 
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/resetpassword" element={<ResetPassword1 />} />
          <Route path="/products/result/:productName" element={<SearchResult />} />
        </Route>
        <Route path="/result/notfound" element={<ResultNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
