import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/Auth.context";
import { getUserOrders } from "../../services/payment-service";
import { addProductToCart } from "../../services/cart-service";
import { useOrders } from "../../Hooks/useOrders";
import OrdersSkeleton from "../../components/Skeleton/OrdersSkeleton";
import toast from "react-hot-toast";
import { 
  Package, 
  MapPin, 
  Calendar, 
  CreditCard, 
  ChevronLeft,
  Search,
  Filter,
  X,
  ArrowRight,
  ChevronRight,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import Pagination from "../../components/Pagination/Pagination";

export default function Orders() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [userId, setUserId] = useState(null);
  const { orders: allOrders, isLoading, isError, error: fetchError } = useOrders(userId);

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isActionLoading, setIsActionLoading] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState({});

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

  useEffect(() => {
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        if (decoded.id) {
          setUserId(decoded.id);
        }
      } catch (err) {
        console.error("Failed to decode token");
      }
    }
  }, [token]);

  useEffect(() => {
    if (allOrders) {
      const sortedOrders = [...allOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
      setFilteredOrders(sortedOrders);
    }
  }, [allOrders]);

  // Handle Search and Filter
  useEffect(() => {
    let result = orders;
    
    if (searchQuery) {
      result = result.filter(order => 
        order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.cartItems.some(item => item.product.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (statusFilter !== "all") {
      if (statusFilter === "paid") result = result.filter(order => order.isPaid);
      if (statusFilter === "pending") result = result.filter(order => !order.isPaid);
    }
    
    setFilteredOrders(result);
    setCurrentPage(1); // Reset to first page on filter
  }, [searchQuery, statusFilter, orders]);

  // Action Handlers
  const handleReorder = async (orderItems, orderId) => {
    setIsActionLoading(orderId);
    try {
      const promises = orderItems.map(item => addProductToCart({ id: item.product._id }));
      const results = await Promise.all(promises);
      
      const successCount = results.filter(r => r.success).length;
      if (successCount > 0) {
        toast.success(`Success! Added ${successCount} items to your cart.`);
        navigate('/cart');
      } else {
        toast.error("Failed to reorder items. Products might be out of stock.");
      }
    } catch (err) {
      toast.error("An error occurred while reordering.");
    } finally {
      setIsActionLoading(null);
    }
  };

  const handleCompletePayment = (orderId) => {
    toast.loading("Redirecting to checkout...", { id: 'payment-redirect', duration: 2000 });
    setTimeout(() => {
      navigate('/checkout'); // In a real app, you'd pass the orderId to link back
    }, 1000);
  };

  const handleTrackOrder = (orderId) => {
    toast.success("Order tracking initialized. Your items are currently in transit!", {
      icon: '🚚',
      duration: 4000
    });
  };

  const handleCancelOrder = (orderId) => {
    toast((t) => (
      <span className="flex items-center gap-3">
        Are you sure you want to cancel?
        <button 
          onClick={() => {
            toast.dismiss(t.id);
            toast.success("Cancellation request submitted successfully.");
          }}
          className="bg-red-500 text-white px-3 py-1 rounded text-xs"
        >
          Yes
        </button>
      </span>
    ), { duration: 5000 });
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <OrdersSkeleton />;

  return (
    <div className="min-h-screen bg-[#fafafa] py-16 px-4 md:px-8 lg:px-16 ">
      <Helmet>
        <title>Order History - FreshCart</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar */}
          <div className="lg:col-span-3 hidden lg:block">
             <AccountSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h1 className="text-2xl font-bold text-gray-900">
                My Orders
              </h1>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                   <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-10 pl-4 pr-10 rounded-lg bg-white border border-gray-200 focus:border-emerald-500 focus:outline-none transition-all text-sm font-medium text-gray-600 cursor-pointer appearance-none min-w-[140px]"
                   >
                     <option value="all">All Orders</option>
                     <option value="paid">Paid</option>
                     <option value="pending">Pending</option>
                   </select>
                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ChevronRight className="rotate-90" size={14} />
                   </div>
                </div>
                <div className="relative min-w-[280px]">
                   <input 
                    type="text" 
                    placeholder="Search orders..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-4 pr-10 rounded-lg bg-white border border-gray-200 focus:border-emerald-500 focus:outline-none transition-all text-sm font-medium text-gray-600"
                   />
                   <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
            </header>

            {isError ? (
              <div className="bg-red-50 border border-red-100 rounded-[2.5rem] p-12 text-center">
                <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
                <h3 className="text-xl font-black text-red-900 mb-2 uppercase tracking-tight">Access Error</h3>
                <p className="text-red-600 font-bold text-xs uppercase tracking-widest mb-8">{fetchError?.message || "Failed to load orders"}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest"
                >
                  Reload Page
                </button>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl p-20 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                   <Package size={40} className="text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders found</h2>
                <p className="text-gray-400 mb-8 max-w-xs mx-auto text-sm">
                  You haven't placed any orders yet.
                </p>
                <Link 
                  to="/"
                  className="bg-emerald-600 text-white px-10 py-3 rounded-lg font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-8 min-h-[600px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      {currentOrders.map((order) => (
                        <div 
                          key={order._id} 
                          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group"
                        >
                          <div className="p-6">
                            {/* Order Info Bar */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                              <div className="flex flex-wrap items-center gap-4">
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-3">
                                    <span className="font-bold text-gray-800 text-base">
                                      Order #{order._id.slice(-5)}
                                    </span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                                      order.isPaid ? "text-emerald-600" : "text-red-600"
                                    }`}>
                                      <div className={`w-1.5 h-1.5 rounded-full ${order.isPaid ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                      {order.isPaid ? "Paid" : "Unpaid"}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-400">
                                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-6">
                                <button 
                                  onClick={() => handleReorder(order.cartItems, order._id)}
                                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1.5 transition-colors disabled:opacity-50"
                                  disabled={isActionLoading === order._id}
                                >
                                  <RefreshCw size={14} className={`opacity-70 ${isActionLoading === order._id ? 'animate-spin' : ''}`} /> 
                                  {isActionLoading === order._id ? "Adding..." : "Reorder"}
                                </button>
                                <button 
                                  onClick={() => toggleOrderExpansion(order._id)}
                                  className={`text-gray-400 hover:text-gray-600 font-medium text-sm flex items-center gap-1.5 transition-colors ${expandedOrders[order._id] ? 'text-emerald-600' : ''}`}
                                >
                                  <Eye size={14} className="opacity-70" /> 
                                  {expandedOrders[order._id] ? "Hide Details" : "View Details"}
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-gray-50 pt-6">
                              {/* Thumbnails Section */}
                              <div className="md:col-span-4 flex flex-col md:flex-row md:items-center gap-4">
                                <div className="flex -space-x-3 hover:space-x-1 transition-all duration-300">
                                  {order.cartItems.slice(0, 4).map((item, idx) => (
                                    <div key={idx} className="relative w-14 h-14 bg-white border-2 border-white rounded-xl shadow-sm overflow-hidden ring-1 ring-gray-100 group-hover:z-10 transition-all">
                                      <img src={item.product.imageCover} alt="Product" className="w-full h-full object-contain p-1" title={item.product.title} />
                                      <div className="absolute -top-1 -right-1 bg-gray-900 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                        {item.count}
                                      </div>
                                    </div>
                                  ))}
                                  {order.cartItems.length > 4 && (
                                    <div className="relative w-14 h-14 bg-gray-50 border-2 border-white rounded-xl shadow-sm flex items-center justify-center ring-1 ring-gray-100">
                                      <span className="text-[10px] font-black text-gray-500">+{order.cartItems.length - 4}</span>
                                    </div>
                                  )}
                                </div>
                                <div className="md:ml-2">
                                  <span className="text-sm text-gray-500">Items</span>
                                  <p className="font-medium">{order.cartItems.length} items</p>
                                </div>
                              </div>

                              {/* Price and Address */}
                              <div className="md:col-span-2">
                                <span className="text-sm text-gray-500">Total Amount</span>
                                <p className="font-medium">{order.totalOrderPrice} EGP</p>
                              </div>

                              <div className="md:col-span-3">
                                <span className="text-sm text-gray-500">Delivered to</span>
                                <p className="font-medium font-cairo">
                                  {order.shippingAddress.city}
                                </p>
                                <p className="text-xs text-green-600 font-medium mt-0.5">
                                  on {new Date(order.createdAt).toDateString()}
                                </p>
                              </div>

                              {/* Action Buttons */}
                              <div className="md:col-span-3 flex flex-col gap-2">
                                {order.isPaid ? (
                                  <>
                                    <button 
                                      onClick={() => handleTrackOrder(order._id)}
                                      className="w-full h-10 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                                    >
                                      <Clock size={16} /> Track Order
                                    </button>
                                    <button 
                                      onClick={() => handleCancelOrder(order._id)}
                                      className="w-full h-10 rounded bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 font-semibold text-sm transition-all flex items-center justify-center"
                                    >
                                      Cancel Order
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button 
                                      onClick={() => handleCompletePayment(order._id)}
                                      className="w-full h-10 rounded bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                                    >
                                      <CreditCard size={16} /> Complete Payment
                                    </button>
                                    <button 
                                      onClick={() => handleReorder(order.cartItems, order._id)}
                                      className="w-full h-10 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                      disabled={isActionLoading === order._id}
                                    >
                                      {isActionLoading === order._id ? <RefreshCw className="animate-spin" size={16} /> : <ShoppingBag size={16} />}
                                      Reorder Items
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Expanded Details Section */}
                            <AnimatePresence>
                              {expandedOrders[order._id] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="border-t border-gray-50 bg-gray-50/30 overflow-hidden"
                                >
                                  <div className="p-6 space-y-4">
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Detailed Item List</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                      {order.cartItems.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm items-center">
                                          <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-50">
                                            <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-contain p-2" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <h5 className="text-xs font-bold text-gray-900 truncate uppercase tracking-tight">{item.product.title}</h5>
                                            <div className="flex items-center justify-between mt-1">
                                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Qty: {item.count}</span>
                                              <span className="text-xs font-black text-primary-600">{item.price.toLocaleString()} EGP</span>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Pagination Controls */}
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={paginate}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
