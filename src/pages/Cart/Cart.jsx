import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Truck, ShieldCheck, ShoppingBag, ArrowRight, Home, ChevronLeft, ChevronRight } from "lucide-react";
import CartItems from "../../components/CartItems/CartItems";
import { cartContext } from '../../context/Cart.context';
import CartSkeleton from '../../components/Skeleton/CartSkeleton';
import { Helmet } from "react-helmet";

const Cart = () => {
  const navigate = useNavigate();
  const { cartInfo, isLoading, removeItem, updateItemQty } = useContext(cartContext);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) return <CartSkeleton />;

  const products = cartInfo?.data?.products || [];
  const numOfCartItems = cartInfo?.numOfCartItems || 0;

  // Calculate totals based on all items
  const subtotal = products.reduce((s, item) => {
    const price = item.price || item.product?.price || 0;
    const quantity = item.quantity || item.count || 0;
    return s + price * quantity;
  }, 0);

  const shipping = subtotal > 0 ? 70 : 0;
  const tax = Math.round(subtotal * 0.14);
  const total = subtotal + shipping + tax;

  // Pagination Logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handleQtyChange = (id, delta) => updateItemQty(id, delta);

  // If page becomes empty after removal, go back
  if (currentPage > 1 && currentItems.length === 0 && products.length > 0) {
    setCurrentPage(currentPage - 1);
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart - FreshCart</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          {products.length === 0 ? (
            <div className="flex items-center justify-center min-h-[70vh] px-4">
              <div className="w-full max-w-md text-center bg-white p-12 rounded-[2.5rem] shadow-xl border border-gray-50">
                <div className="flex justify-center mb-8 relative w-40 h-40 mx-auto">
                   <div className="absolute inset-0 bg-primary-100 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                   <div className="relative w-full h-full bg-primary-50 text-primary-600 rounded-full flex items-center justify-center shadow-inner group">
                      <ShoppingBag size={80} className="transform group-hover:scale-110 transition duration-500" strokeWidth={1.5} />
                   </div>
                </div>

                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Your Cart is <span className="text-primary-600">Empty</span></h2>
                <p className="text-gray-500 font-medium mb-10 leading-relaxed">
                  Looks like you haven't added anything to your cart yet. Let's find some amazing deals for you!
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => navigate('/')}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-black py-4 px-6 rounded-2xl transition duration-300 shadow-lg shadow-primary-600/30 flex items-center justify-center gap-2 group uppercase tracking-widest text-sm"
                  >
                    <Home size={18} />
                    Start Shopping
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => navigate('/categories')}
                    className="w-full border-2 border-gray-100 text-gray-400 hover:text-primary-600 hover:border-primary-100 font-black py-4 px-6 rounded-2xl transition duration-300 uppercase tracking-widest text-sm"
                  >
                    Browse Categories
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col xl:flex-row gap-12 items-start">
              {/* Cart Items Section */}
              <div className="flex-1 w-full space-y-8">
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12">
                  <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-8">
                    <div>
                      <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Shopping <span className="text-primary-600">Cart</span></h1>
                      <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">
                        {numOfCartItems} item{numOfCartItems !== 1 && 's'} in your cart
                      </p>
                    </div>
                    {totalPages > 1 && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">
                          Page {currentPage} of {totalPages}
                        </span>
                        <button 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {currentItems.map((product, index) => (
                      <CartItems
                        key={product.product?.id || product.id || index}
                        products={product}
                        updateQty={handleQtyChange}
                      />
                    ))}
                  </div>
                  
                  {/* Bottom Pagination for better UX on long pages */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12 pt-8 border-t border-gray-50">
                         <button 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary-600 disabled:opacity-30 transition"
                        >
                          <ChevronLeft size={16} strokeWidth={3} />
                          Prev
                        </button>
                        <div className="flex items-center gap-1">
                          {[...Array(totalPages)].map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentPage(i + 1)}
                              className={`w-8 h-8 rounded-lg text-xs font-black transition ${currentPage === i + 1 ? "bg-primary-600 text-white" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                        <button 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary-600 disabled:opacity-30 transition"
                        >
                          Next
                          <ChevronRight size={16} strokeWidth={3} />
                        </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary Section */}
              <div className="w-full xl:w-[400px] sticky top-24 space-y-6">
                <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-10 border border-gray-50">
                  <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-widest">Order Summary</h2>
                  
                  <div className="space-y-5">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Subtotal</span>
                      <span className="font-black text-gray-900">{subtotal.toLocaleString()} EGP</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Shipping</span>
                      <span className="font-black text-green-600">+{shipping.toLocaleString()} EGP</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Estimated Tax</span>
                      <span className="font-black text-gray-900">{tax.toLocaleString()} EGP</span>
                    </div>
                    
                    <div className="pt-6 border-t-2 border-dashed border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-black text-sm uppercase tracking-widest">Total cost</span>
                        <span className="text-2xl font-black text-primary-600">{total.toLocaleString()} EGP</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 space-y-4">
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest py-5 rounded-2xl shadow-lg shadow-primary-600/30 transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98]"
                    onClick={() => navigate('/checkout')}
                    
                    >
                      Proceed to Checkout
                    </button>
                    <button
                      onClick={() => navigate('/')}
                      className="w-full border-2 border-gray-50 text-gray-400 hover:text-gray-600 hover:border-gray-200 font-black uppercase tracking-widest py-4 rounded-2xl transition duration-300 text-sm"
                    >
                      Keep Shopping
                    </button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition duration-300">
                      <Truck size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">Express Delivery</h4>
                      <p className="text-xs text-gray-400 font-medium leading-none mt-1">2-3 Logic business days</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition duration-300">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">SSL Protection</h4>
                      <p className="text-xs text-gray-400 font-medium leading-none mt-1">Secure payment gateway</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;