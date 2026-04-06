import {  faEnvelope, faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import {  faBars, faCartShopping, faChevronDown, faEllipsis, faMagnifyingGlass, faPerson, faPersonDress, faPhone, faRightFromBracket, faSuitcaseMedical, faUserPlus, faXmark, faSpinner, faBagShopping, faZap, faWifi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router";
import { memo, useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "../../context/Auth.context";
import { cartContext } from "../../context/Cart.context";
import { wishlistContext } from "../../context/Wishlist.context";

import groceryLogo from "../../assets/Images/freshcart-logo.svg";
import useOnLineStatus from "../../Hooks/useOnLineStatus";
import { useProducts } from "../../Hooks/useProducts";
import useCategories from "../../Hooks/useCategories";

function NavbarComponent() {

  const isOnLine = useOnLineStatus();


  const { cartInfo } = useContext(cartContext);
  const numOfCartItems = cartInfo?.numOfCartItems || 0;

  const { wishlistInfo } = useContext(wishlistContext);
  const numOfWishlistItems = wishlistInfo?.length || 0;

  const { logOut, token } = useContext(AuthContext);
  const { categories } = useCategories();
  const { products } = useProducts();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("EN");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const navigate = useNavigate();

  function toggleMenu() {
    setIsMenuOpen(prev => !prev);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-products?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false); // close menu if open
      setShowSearchDropdown(false);
    }
  };

  // Live Typeahead Search
  const liveSearchResults = useMemo(() => {
    if (!searchQuery.trim() || !products) return [];
    const lower = searchQuery.toLowerCase();
    return products.filter(p =>
      p.title?.toLowerCase().includes(lower) ||
      p.category?.name?.toLowerCase().includes(lower) ||
      p.brand?.name?.toLowerCase().includes(lower)
    ).slice(0, 5); // Limit to top 5 results for the dropdown
  }, [searchQuery, products]);

  // Close the menu when resizing to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinkStyle = ({ isActive }) =>
    isActive ? 'text-primary-600 font-semibold' : 'text-gray-700 hover:text-primary-600 transition-colors duration-200';

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          {/* top navbar */}
          <div className="hidden lg:flex justify-between items-center border-b border-gray-100 py-2 text-sm text-gray-600">
            <ul className="flex gap-5 items-center *:flex *:gap-2 *:items-center">
              <li className="hover:text-primary-600 transition">
                <FontAwesomeIcon icon={faPhone} />
                <a href="tel:+1(800) 123-7890">+1(800) 123-7890</a>
              </li>
              <li className="hover:text-primary-600 transition">
                <FontAwesomeIcon icon={faEnvelope} />
                <a href="mailto:support@freshcart.com">support@freshcart.com</a>
              </li>

              {isOnLine &&(
                <li className="text-primary-600 ">
                  <FontAwesomeIcon icon={faWifi} />
                  <span>online</span>
                </li>  )}
             
               

            </ul>

            <ul className="flex gap-5 items-center">
              <li>
                <NavLink to="/track-order" className={({ isActive }) => 
                  isActive ? 'text-primary-600 font-bold' : 'hover:text-primary-600 transition'
                }>Track Order</NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => 
                  isActive ? 'text-primary-600 font-bold' : 'hover:text-primary-600 transition'
                }>About</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => 
                  isActive ? 'text-primary-600 font-bold' : 'hover:text-primary-600 transition'
                }>Contact</NavLink>
              </li>
              <li>
                <select
                  name="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-transparent border-none outline-none cursor-pointer hover:text-primary-600 focus:text-primary-600 font-bold transition-colors"
                >
                  <option value="USD">USD</option>
                  <option value="EGP">EGP</option>
                  <option value="AED">AED</option>
                </select>
              </li>
              <li>
                <select
                  name="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent border-none outline-none cursor-pointer hover:text-primary-600 focus:text-primary-600 font-bold transition-colors"
                >
                  <option value="EN">EN</option>
                  <option value="AR">AR</option>
                </select>
              </li>
            </ul>
          </div>

          {/* main navbar */}
          <nav className="flex justify-between items-center py-4">
            <h1 className="flex-shrink-0">
              <Link to="/">
                <img src={groceryLogo} alt="FreshCart Logo" className="h-8 md:h-10" />
              </Link>
            </h1>

            <div className="relative hidden lg:block flex-grow max-w-xl mx-8 z-50">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  className="w-full border-2 border-gray-100 rounded-xl pl-4 pr-12 py-3 focus:border-primary-600 focus:outline-none transition-all shadow-sm"
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  onFocus={() => setShowSearchDropdown(true)}
                  onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </form>

              {/* Typeahead Dropdown */}
              {showSearchDropdown && searchQuery.trim().length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white shadow-2xl border border-gray-100 mt-2 rounded-[1.5rem] overflow-hidden animate-fadeIn">
                  {liveSearchResults.length > 0 ? (
                    <ul className="divide-y divide-gray-50">
                      {liveSearchResults.map(product => (
                        <li key={product._id || product.id}>
                          <Link
                            to={`/product/${product._id || product.id}`}
                            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition"
                            onClick={() => {
                              setShowSearchDropdown(false);
                              setSearchQuery("");
                            }}
                          >
                            <img src={product.imageCover} alt={product.title} className="w-14 h-14 object-contain rounded-xl bg-gray-50 p-1 border border-gray-100" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-gray-900 truncate">{product.title}</h4>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-primary-600 font-black">{product.price} EGP</span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase">{product.category?.name}</span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleSearchSubmit}
                          className="w-full text-center p-4 text-xs text-gray-400 font-black uppercase tracking-widest hover:bg-primary-50 hover:text-primary-600 transition"
                        >
                          Show all results for "{searchQuery}"
                        </button>
                      </li>
                    </ul>
                  ) : (
                    <div className="p-8 text-center bg-gray-50/50">
                      <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">No matching products found</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <ul className="hidden lg:flex gap-10 items-center flex-shrink-0">
              <li>
                <NavLink to="/wishlist" className={({ isActive }) => isActive ? 'text-primary-600 flex flex-col items-center gap-1.5' : 'flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary-600 transition-all group'}>
                  <div className="relative">
                    <FontAwesomeIcon icon={faHeart} className="text-xl group-hover:scale-110 transition-transform" />
                    {numOfWishlistItems > 0 && (
                      <span className="absolute -top-2.5 -right-2.5 text-[10px] font-black bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-primary-600/30 animate-bounceIn">
                        {numOfWishlistItems}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Wishlist</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className={({ isActive }) => isActive ? "text-primary-600 flex flex-col items-center gap-1.5" : "flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary-600 transition-all group"}>
                  <div className="relative">
                    <FontAwesomeIcon icon={faCartShopping} className="text-xl group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-2.5 -right-2.5 text-[10px] font-black bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-primary-600/30 animate-bounceIn">
                      {numOfCartItems}
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Cart</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/account" className={({ isActive }) => isActive ? 'text-primary-600 flex flex-col items-center gap-1.5' : 'flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary-600 transition-all group'}>
                  <FontAwesomeIcon icon={faUser} className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Profile</span>
                </NavLink>
              </li>

              {!token ? (
                <>
                  <li className="flex gap-4 items-center">
                    <NavLink to="/login" className="text-gray-900 border-2 border-gray-100 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary-600 transition shadow-sm">
                      Login
                    </NavLink>
                    <NavLink to="/signup" className="bg-primary-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-700 transition shadow-md">
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="flex flex-col cursor-pointer items-center gap-1.5 text-red-500 hover:text-red-700 transition group" onClick={logOut}>
                  <FontAwesomeIcon icon={faRightFromBracket} className="text-xl group-hover:translate-x-1 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
                </li>
              )}
            </ul>

            <button onClick={toggleMenu} className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl text-gray-900 lg:hidden hover:bg-primary-50 hover:text-primary-600 transition">
              {isMenuOpen ? <FontAwesomeIcon icon={faXmark} className="text-xl" /> : <FontAwesomeIcon icon={faBars} className="text-xl" />}
            </button>
          </nav>
        </div>

        {/* category navigation */}
        <nav className="bg-white border-t border-gray-50 hidden lg:block">
          <div className="container mx-auto px-4 flex items-center gap-12 py-4">
            <div className="group relative">
              <button
                className="flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] 
             hover:text-green-700 bg-green-50 border border-green-200 
             px-4 py-2 rounded-lg
            
             focus:text-green-700 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faBars} />
                Departments
                <FontAwesomeIcon icon={faChevronDown} className="text-[10px] opacity-50 ml-1" />
              </button>

              <div className="absolute min-w-[280px] top-full left-0 bg-white shadow-2xl rounded-[2rem] hidden group-hover:block z-50 overflow-hidden animate-fadeIn py-2 border border-gray-50 before:content-[''] before:absolute before:bottom-full before:left-0 before:w-full before:h-8">
                <ul className="grid grid-cols-1">
                  {categories?.slice(0, 6).map(cat => (
                    <li key={cat._id}>
                      <Link to={`/category/${cat._id}`} className="flex items-center gap-4 px-6 py-3.5 hover:bg-primary-50 transition group/item">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center p-1 group-hover/item:bg-white transition">
                          <img src={cat.image} alt="" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <span className="text-sm font-bold text-gray-700 group-hover/item:text-primary-600 uppercase tracking-tight">{cat.name}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="mt-2 border-t border-gray-50 p-2">
                    <Link
                      to="/categories"
                      className="block text-center py-4 px-4 rounded-[1.5rem] 
             bg-green-50 text-green-600 border border-green-200
             hover:bg-green-600 hover:text-white hover:border-green-600
             transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                        See All Departments →
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <ul className="flex gap-10 items-center font-black text-[11px] uppercase tracking-widest">
              <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
              <li><NavLink to="/categories" className={navLinkStyle}>All Categories</NavLink></li>
              <li><NavLink to="/recently-added" className={navLinkStyle}>Recently Added</NavLink></li>
              <li><NavLink to="/featured-products" className={navLinkStyle}>Featured Products</NavLink></li>
              <li><NavLink to="/offers" className={navLinkStyle}>Offers</NavLink></li>
              <li><NavLink to="/brands" className={navLinkStyle}>Brands</NavLink></li>
            </ul>
          </div>
        </nav>

        {/* OFFCanvas Menu for mobile devices */}
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-40 transition-opacity" onClick={toggleMenu}></div>
            <div className="fixed top-0 left-0 w-80 h-full bg-white z-50 flex flex-col overflow-y-auto animate-slideInLeft shadow-2xl rounded-r-[2.5rem]">

              {/* Header */}
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <img src={groceryLogo} alt="FreshCart Logo" className="h-8" />
                <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-400 hover:text-red-500 transition" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {/* Search */}
              <div className="p-8">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-gray-50 border-none rounded-2xl pl-4 pr-12 py-4 text-sm font-medium focus:ring-2 focus:ring-primary-600/20 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </form>
              </div>

              {/* Mobile Main Navigation */}
              <div className="px-8 pb-8 flex flex-col gap-2">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Discover</h3>
                <NavLink to="/" onClick={toggleMenu} className={({ isActive }) => `px-4 py-4 rounded-2xl text-sm font-bold uppercase tracking-tight ${isActive ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' : 'text-gray-700 hover:bg-gray-50'}`}>Home</NavLink>
                <NavLink to="/categories" onClick={toggleMenu} className={({ isActive }) => `px-4 py-4 rounded-2xl text-sm font-bold uppercase tracking-tight ${isActive ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' : 'text-gray-700 hover:bg-gray-50'}`}>Collections</NavLink>
                <NavLink to="/recently-added" onClick={toggleMenu} className={({ isActive }) => `px-4 py-4 rounded-2xl text-sm font-bold uppercase tracking-tight ${isActive ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' : 'text-gray-700 hover:bg-gray-50'}`}>New Arrivals</NavLink>
              </div>

              {/* User Actions */}
              <div className="px-8 pb-12 mt-auto border-t border-gray-50 pt-8 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <NavLink to="/wishlist" onClick={toggleMenu} className="flex-1 bg-gray-50 p-4 rounded-2xl flex flex-col items-center gap-1 group">
                    <FontAwesomeIcon icon={faHeart} className="text-gray-400 group-hover:text-primary-600 transition" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Wishlist</span>
                  </NavLink>
                  <NavLink to="/cart" onClick={toggleMenu} className="flex-1 bg-gray-50 p-4 rounded-2xl flex flex-col items-center gap-1 group">
                    <FontAwesomeIcon icon={faCartShopping} className="text-gray-400 group-hover:text-primary-600 transition" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Cart</span>
                  </NavLink>
                </div>

                {!token ? (
                  <NavLink to="/login" onClick={toggleMenu} className="w-full bg-primary-600 text-white py-4 rounded-2xl text-center font-black uppercase tracking-widest text-xs shadow-xl shadow-primary-600/30">
                    Sign In
                  </NavLink>
                ) : (
                  <button onClick={() => { logOut(); toggleMenu(); }} className="w-full border-2 border-red-100 text-red-500 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-500 hover:text-white transition-all duration-300">
                    Logout
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}

export default memo(NavbarComponent);