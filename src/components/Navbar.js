import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <header className="bg-[#F9E581] py-2 shadow-xl shadow-black/25">
        <div className=" mx-auto flex justify-between items-center px-4 py-2">
          <div className="flex items-center space-x-3">
            <img src="/weblogo.svg" alt="Logo" className="w-24 h-24" />
          </div>

          <div className="ml-auto flex items-center">
            <nav className="flex gap-4 p-4">
              {[
                { name: "首頁", path: "/" },
                { name: "關於我們", path: "/about" },
                { name: "兔兔專區", path: "/ribbit" },
                { name: "鼠鼠專區", path: "/rat" },
                { name: "會員", path: "/member" },
              ].map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `no-underline px-6 py-2 rounded-full text-xl font-bold transition ${
                      isActive
                        ? "bg-orange-300 !text-white"
                        : "bg-white text-[#7B3F00] !hover:bg-orange-100"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <div className="relative mr-4">
              <img
                src="/shopping_cart.svg"
                alt="cart"
                className="w-10 h-8 cursor-pointer"
              />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
