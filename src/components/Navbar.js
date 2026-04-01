import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthConText";


function Navbar({ cartData }) {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  

  const navItems = [
    { name: "首頁", path: "/" },
    { name: "關於我們", path: "/about" },
    { name: "兔兔專區", path: "/ribbit" },
    { name: "鼠鼠專區", path: "/rat" },
  ];


console.log("Navbar user:", user);


  return (
    <>
      <header className="fixed top-0 left-0 w-full  z-50 bg-[#F9E581] py-2 shadow-xl shadow-black/25">
        <div className="mx-auto flex justify-between items-center px-4 py-2">
          <Link to="/">
          <div className="flex items-center space-x-3">
          <img 
          src="/weblogo.svg" 
          alt="Logo" 
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain" 
        />
       </div>
     </Link>

          <div className="ml-auto flex items-center gap-2">
            <nav className="hidden md:flex gap-4 p-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `no-underline px-6 py-2 rounded-full text-xl font-bold ${
                      isActive
                        ? "bg-orange-300 text-white"
                        : "bg-white text-[#7B3F00] hover:bg-orange-300 transition duration-300 hover:-translate-y-1 hover:scale-110"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

          {user ? (
      <NavLink
        to="/memberpage"
       className="no-underline px-6 py-2 rounded-full text-xl font-bold bg-green-500 text-white"
               >
        會員
           </NavLink>
             ) : (
         <NavLink
       to="/member"
       className="no-underline px-6 py-2 rounded-full text-xl font-bold bg-white text-[#7B3F00]"
        >
         會員登入
         </NavLink>
          )}
          
            </nav>

            <div className="relative mr-2">
              <NavLink to="/cart">
                <i className="ri-shopping-cart-fill text-3xl text-orange"></i>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex items-center justify-center">
                  {cartData?.carts?.length || 0}
                </span>
              </NavLink>
            </div>


            <button
              className="md:hidden text-3xl text-[#7B3F00]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
            </button>
          </div>
        </div>
      </header>
      <div
        className={`md:hidden  fixed top-[96px] left-0 w-full bg-[#F9E581] shadow-lg z-40 transition-all duration-300 ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-4 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-6 py-2 rounded-full mt-6 text-lg no-underline font-bold ${
                  isActive
                    ? "bg-orange-300 text-white"
                    : "bg-white text-[#7B3F00]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="h-[96px]" />
    </>
  );
}

export default Navbar;
