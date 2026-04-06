import React, { useContext } from "react";
import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Heart, 
  Star, 
  MapPin, 
  CreditCard, 
  User, 
  LogOut,
  ChevronRight,
  Settings
} from "lucide-react";
import { AuthContext } from "../../context/Auth.context";

const sidebarLinks = [
  { name: "Dashboard", path: "/account", icon: LayoutDashboard },
  { name: "Orders", path: "/allorders", icon: ShoppingBag },
  { name: "Wishlist", path: "/wishlist", icon: Heart },
  { name: "Favorites", path: "/favorite", icon: Star },
  { name: "Addresses", path: "/addresses", icon: MapPin },
  { name: "Payment Methods", path: "/payment-methods", icon: CreditCard },
  { name: "Account Details", path: "/account", icon: User }, // Pointing to /account for now as per image
];

export default function AccountSidebar() {
  const { token, logOut } = useContext(AuthContext);
  const location = useLocation();

  // Decode token to get user info (simplified)
  let userData = { name: "Farha", email: "farha2015@gmail.com" };
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      userData.name = decoded.name || "Farha";
      userData.email = decoded.email || "farha2015@gmail.com";
    } catch (e) {
      console.error("Token decode error", e);
    }
  }

  return (
    <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
      {/* User Header */}
      <div className="p-8 flex items-center gap-4 border-b border-gray-50">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center font-medium shadow-sm border border-emerald-100/50">
           <User size={24} />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-800 truncate text-base">{userData.name}</h3>
          <p className="text-sm text-gray-400 truncate -mt-0.5">{userData.email}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-2 py-4">
        <ul className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path && (link.name !== "Account Details" || location.pathname === "/account");
            const Icon = link.icon;
            
            return (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 group ${
                    isActive 
                    ? "bg-emerald-50/60 text-emerald-600 shadow-sm border border-emerald-100/30" 
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} className={`${isActive ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-600"} transition-colors`} />
                  <span className="flex-1">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 pt-4 border-t border-gray-50">
          <button
            onClick={logOut}
            className="w-full flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200 group"
          >
            <LogOut size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
