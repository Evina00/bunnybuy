import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthConText";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminOrders from "./pages/admin/AdminOrders";
import FrontLayout from "./pages/front/FrontLayout";
import Home from "./pages/front/Home";
import About from "./pages/front/About";
import RabbitProducts from "./pages/front/RabbitProducts";
import RatProducts from "./pages/front/RatProducts";
import ProductDetail from "./pages/front/ProductDetail";
import Cart from "./pages/front/Cart";
import Checkout from "./pages/front/Checkout";
import Success from "./pages/front/Success";
import Knowledge from "./pages/front/Knowledge";
import Contact from "./pages/front/Contact";
import MemberLogin from "./pages/front/Member/MemberLogin";
import MemberPage from "./pages/front/Member/MemberPage";
import RegisterForm from "./pages/front/Member/RegisterForm";
import Order from "./pages/front/Member/Order";


function App() {
  return (
    <AuthProvider>
    <div className="App">
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route path="" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ribbit" element={<RabbitProducts />} />
          <Route path="/ribbit/:id" element={<ProductDetail />} />
          <Route path="/rat" element={<RatProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success/:orderId" element={<Success />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/member" element={<MemberLogin />} />
          <Route path="/memberpage" element={<MemberPage />} />
          <Route path="/Register" element={<RegisterForm />} />
          <Route path="/order" element={<Order />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<AdminProducts />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
