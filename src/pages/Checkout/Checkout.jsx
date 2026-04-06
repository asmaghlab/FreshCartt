import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";
import { Helmet } from "react-helmet";
import {
  ChevronLeft,
  CreditCard,
  Truck,
  Info,
  Lock,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Clock,
  Gem,
  CheckCircle2
} from "lucide-react";
import CheckoutStepper from "../../components/CheckoutStepper/CheckoutStepper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cartContext } from "../../context/Cart.context";
import CheckoutSkeleton from "../../components/Skeleton/CheckoutSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
  faCcApplePay,
  faGooglePay
} from "@fortawesome/free-brands-svg-icons";
import { createCashOrder, createOnlineOrder } from "../../services/payment-service";
import { toast } from "react-toastify";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartInfo, isLoading, resetCart } = useContext(cartContext);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isOrdering, setIsOrdering] = useState(false);

  // Safety checks for cart data - The Route API stores ID in data._id
  const cartId = cartInfo?.data?._id;
  const products = cartInfo?.data?.products || [];
  const totalCartPrice = cartInfo?.data?.totalCartPrice || 0;

  const shipping = totalCartPrice > 0 ? 70 : 0;
  const discount = products.length > 0 ? -120 : 0; // Simulated discount for premium feel
  const tax = Math.round(totalCartPrice * 0.14);
  const total = totalCartPrice + shipping + tax + discount;

  async function handleCreateOrder(values) {
    if (!cartId) {
      toast.error("Cart not found. Please try again.");
      return;
    }

    try {
      setIsOrdering(true);
      const loadingToast = toast.loading(
        paymentMethod === "online"
          ? "Preparing to redirect to payment..."
          : "Placing your order..."
      );

      let response;
      if (paymentMethod === "online") {
        response = await createOnlineOrder({
          cartId,
          shippingAddress: values.shippingAddress
        });
      } else {
        response = await createCashOrder({
          cartId,
          shippingAddress: values.shippingAddress
        });
      }

      if (response.status === "success" || response.success) {
        toast.dismiss(loadingToast);

        if (paymentMethod === "online" && response.session?.url) {
          toast.success("Order created! Redirecting to secure payment...");
          // Reset local cart state before redirecting
          resetCart();
          setTimeout(() => {
            window.location.href = response.session.url;
          }, 1500);
        } else {
          toast.success("Order placed successfully!");
          resetCart();
          setTimeout(() => {
            navigate("/allorders");
          }, 1500);
        }
      }
    } catch (error) {
      toast.dismiss(); // Dismiss any pending loading toasts
      toast.error(error.response?.data?.message || error.message || "Failed to create order");
      console.error("Order Error:", error);
    } finally {
      setIsOrdering(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema: Yup.object({
      shippingAddress: Yup.object({
        details: Yup.string().required("Address details are required"),
        phone: Yup.string()
          .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
          .required("Phone number is required"),
        city: Yup.string().required("City is required"),
      }),
    }),
    onSubmit: handleCreateOrder,
  });

  if (isLoading) return <CheckoutSkeleton />;

  return (
    <div className="min-h-screen bg-[#fafafa] py-16 px-4 md:px-8 lg:px-16 ">
      <Helmet>
        <title>Secure Checkout - FreshCart</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 text-primary-600 font-bold text-xs uppercase tracking-widest mb-4">
            <ShieldCheck size={16} />
            <span>Secure Payment Gateway</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase mb-8">
            Check<span className="text-primary-600">out</span>
          </h1>
          <CheckoutStepper currentStep={2} />
        </header>

        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content: Left Column */}
          <div className="lg:col-span-8 space-y-8">

            {/* Payment Method Section */}
            <section className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/40">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center">
                    <CreditCard size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Payment Method</h2>
                </div>
                <div className="px-4 py-2 rounded-xl bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100">
                  Step 2 of 3
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`relative flex flex-col p-8 rounded-[2.5rem] border-3 transition-all cursor-pointer group hover:shadow-2xl hover:shadow-gray-200/50 ${paymentMethod === "cod"
                      ? "border-primary-500 bg-primary-50/10"
                      : "border-gray-50 hover:border-primary-100 bg-white"
                    }`}
                >
                  <div className="flex items-center gap-5 mb-6">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${paymentMethod === "cod" ? "border-primary-500 bg-primary-500 scale-110" : "border-gray-200"
                      }`}>
                      {paymentMethod === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-gray-900 uppercase text-sm tracking-tight">Cash on Delivery</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Pay when order arrives</p>
                    </div>
                    <Truck className={paymentMethod === "cod" ? "text-primary-600 animate-bounce" : "text-gray-300"} size={24} />
                  </div>

                  <div className={`p-4 rounded-2xl text-[10px] font-bold leading-relaxed transition-all duration-500 flex items-start gap-2 ${paymentMethod === "cod" ? "bg-white border border-primary-100 text-primary-600" : "bg-gray-50 text-gray-400 opacity-60"
                    }`}>
                    <Info size={14} className="shrink-0" />
                    <span>Please keep exact change ready for hassle-free delivery at your doorstep.</span>
                  </div>

                  {paymentMethod !== "cod" && (
                    <div className="absolute top-4 right-4 text-[9px] font-black text-green-500 px-2 py-1 bg-green-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                      Fastest!
                    </div>
                  )}
                </div>

                {/* Online Payment */}
                <div
                  onClick={() => setPaymentMethod("online")}
                  className={`relative flex flex-col p-8 rounded-[2.5rem] border-3 transition-all cursor-pointer group hover:shadow-2xl hover:shadow-gray-200/50 ${paymentMethod === "online"
                      ? "border-primary-500 bg-primary-50/10"
                      : "border-gray-50 hover:border-primary-100 bg-white"
                    }`}
                >
                  <div className="flex items-center gap-5 mb-6">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${paymentMethod === "online" ? "border-primary-500 bg-primary-500 scale-110" : "border-gray-200"
                      }`}>
                      {paymentMethod === "online" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-gray-900 uppercase text-sm tracking-tight">Online Payment</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Stripe Secure Gateway</p>
                    </div>
                    <Lock className={paymentMethod === "online" ? "text-primary-600" : "text-gray-300"} size={22} />
                  </div>

                  <div className={`p-4 rounded-2xl text-[10px] font-bold leading-relaxed transition-all duration-500 flex items-start gap-2 ${paymentMethod === "online" ? "bg-white border border-primary-100 text-primary-600" : "bg-gray-50 text-gray-400 opacity-60"
                    }`}>
                    <ShieldCheck size={14} className="shrink-0" />
                    <span>You will be redirected to secure payment gateway to complete your transaction safely.</span>
                  </div>

                  <div className="absolute top-4 right-4 text-[9px] font-black text-primary-600 px-2 py-1 bg-primary-50 rounded-lg uppercase tracking-widest border border-primary-100 shadow-sm">
                    Recommended
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping Address Section */}
            <section className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/40">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Billing Address</h2>
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="details" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Street Address / Details *</label>
                    <textarea
                      id="details"
                      name="shippingAddress.details"
                      rows="1"
                      className={`w-full p-5 rounded-2xl border-2 transition-all focus:outline-none resize-none font-bold text-sm ${formik.touched.shippingAddress?.details && formik.errors.shippingAddress?.details
                          ? "border-red-100 focus:border-red-500 bg-red-50/20"
                          : "border-gray-50 focus:border-primary-500 focus:bg-white focus:shadow-xl focus:shadow-primary-600/5 bg-gray-50/50"
                        }`}
                      placeholder="E.g., 123 Nile Street, Apartment 4B"
                      {...formik.getFieldProps("shippingAddress.details")}
                    />
                    {formik.touched.shippingAddress?.details && formik.errors.shippingAddress?.details && (
                      <p className="text-[10px] text-red-500 font-black ml-2 animate-bounce">{formik.errors.shippingAddress.details}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="phone" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number *</label>
                    <div className="relative group">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary-600 transition duration-300" size={18} />
                      <input
                        id="phone"
                        name="shippingAddress.phone"
                        type="tel"
                        className={`w-full h-16 pl-14 pr-6 rounded-2xl border-2 transition-all focus:outline-none font-bold text-sm ${formik.touched.shippingAddress?.phone && formik.errors.shippingAddress?.phone
                            ? "border-red-100 focus:border-red-500 bg-red-50/20"
                            : "border-gray-50 focus:border-primary-500 focus:bg-white focus:shadow-xl focus:shadow-primary-600/5 bg-gray-50/50"
                          }`}
                        placeholder="01010800921"
                        {...formik.getFieldProps("shippingAddress.phone")}
                      />
                    </div>
                    {formik.touched.shippingAddress?.phone && formik.errors.shippingAddress?.phone && (
                      <p className="text-[10px] text-red-500 font-black ml-2 animate-bounce">{formik.errors.shippingAddress.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="city" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City / Region *</label>
                    <input
                      id="city"
                      name="shippingAddress.city"
                      type="text"
                      className={`w-full h-16 px-6 rounded-2xl border-2 transition-all focus:outline-none font-bold text-sm ${formik.touched.shippingAddress?.city && formik.errors.shippingAddress?.city
                          ? "border-red-100 focus:border-red-500 bg-red-50/20"
                          : "border-gray-50 focus:border-primary-500 focus:bg-white focus:shadow-xl focus:shadow-primary-600/5 bg-gray-50/50"
                        }`}
                      placeholder="Cairo"
                      {...formik.getFieldProps("shippingAddress.city")}
                    />
                    {formik.touched.shippingAddress?.city && formik.errors.shippingAddress?.city && (
                      <p className="text-[10px] text-red-500 font-black ml-2 animate-bounce">{formik.errors.shippingAddress.city}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 px-6 h-16 rounded-2xl border-2 border-primary-50/50 bg-primary-50/20">
                    <div className="w-8 h-8 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest leading-tight">Same as delivery address</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar: Right Column */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <section className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-2xl shadow-gray-200/50">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shadow-inner">
                    <ShoppingBag size={20} className="text-gray-400" />
                  </div>
                  <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">Order Summary</h2>
                </div>

                {/* Product List */}
                <div className="max-h-[320px] overflow-y-auto pr-3 mb-10 space-y-6 custom-scrollbar">
                  {products.map((product) => (
                    <div key={product._id} className="flex gap-5 group items-center">
                      <div className="shrink-0 w-22 h-22 rounded-3xl bg-gray-50 border border-gray-100 overflow-hidden group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                        <img
                          src={product.product.imageCover || product.product.image || "https://via.placeholder.com/80"}
                          alt={product.product.title}
                          className="w-full h-full object-contain p-3"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-black text-gray-800 truncate mb-1 uppercase tracking-tight group-hover:text-primary-600 transition-colors">{product.product.title}</h4>
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md border border-gray-100">Qty: {product.count}</span>
                          <span className="text-xs font-black text-primary-600">{(product.price * product.count).toLocaleString()} EGP</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Costs Breakdown */}
                <div className="space-y-5 pt-10 border-t border-gray-50">
                  <div className="flex justify-between items-center group">
                    <span className="text-gray-400 font-black uppercase tracking-widest text-[10px] group-hover:text-gray-600 transition-colors">Subtotal</span>
                    <span className="font-black text-gray-900 text-sm">{totalCartPrice.toLocaleString()} EGP</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 font-black uppercase tracking-widest text-[10px] group-hover:text-gray-600 transition-colors">Discount</span>
                      <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[8px] font-black uppercase tracking-tighter border border-green-100">WELCOME10</span>
                    </div>
                    <span className="font-black text-green-600 text-sm">-{Math.abs(discount).toLocaleString()} EGP</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-gray-400 font-black uppercase tracking-widest text-[10px] group-hover:text-gray-600 transition-colors">Delivery</span>
                    <span className="font-black text-gray-900 text-sm">+{shipping.toLocaleString()} EGP</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-gray-400 font-black uppercase tracking-widest text-[10px] group-hover:text-gray-600 transition-colors">Tax Estimate</span>
                    <span className="font-black text-gray-900 text-sm">+{tax.toLocaleString()} EGP</span>
                  </div>

                  <div className="pt-8 mt-4 border-t-4 border-dashed border-gray-50 relative">
                    <div className="absolute -top-1 -left-10 w-20 h-2 bg-white rounded-full"></div>
                    <div className="absolute -top-1 -right-10 w-20 h-2 bg-white rounded-full"></div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-900 font-black text-xs uppercase tracking-widest block mb-1">Final Amount</span>
                        <span className="text-[9px] text-gray-400 font-bold italic">Inclusive of all taxes</span>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black text-primary-600 block leading-none">{total.toLocaleString()}</span>
                        <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest">EGP</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 space-y-5">
                  <button
                    type="submit"
                    disabled={isOrdering || products.length === 0}
                    className={`w-full h-20 rounded-[2rem] font-black uppercase tracking-widest text-sm transition-all duration-500 flex items-center justify-center gap-4 group shadow-2xl relative overflow-hidden ${isOrdering || products.length === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-primary-600 hover:bg-primary-700 text-white shadow-primary-600/30 active:scale-[0.98] hover:-translate-y-1.5"
                      }`}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    {isOrdering ? (
                      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span className="relative z-10">{paymentMethod === "online" ? "Complete Payment" : "Confirm Order"}</span>
                        <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                      </>
                    )}
                  </button>

                  <Link
                    to="/cart"
                    className="w-full h-14 border-2 border-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-50 font-black uppercase tracking-widest rounded-2xl transition-all duration-300 text-[10px] flex items-center justify-center gap-3 group"
                  >
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to shopping
                  </Link>
                </div>
              </section>

              {/* Secure Checkout Badges */}
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 text-center space-y-8 shadow-xl shadow-gray-200/30 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary-500"></div>
                <div className="flex items-center justify-center gap-3 text-primary-600 font-black text-[12px] uppercase tracking-widest animate-pulse">
                  <Lock size={16} />
                  <span>Verified Secure Transaction</span>
                </div>
                <div className="flex justify-center flex-wrap gap-6 text-gray-300 transition-all duration-700">
                  <FontAwesomeIcon icon={faCcVisa} className="text-3xl hover:text-[#1a1f71] transition-colors" />
                  <FontAwesomeIcon icon={faCcMastercard} className="text-3xl hover:text-[#eb001b] transition-colors" />
                  <FontAwesomeIcon icon={faCcPaypal} className="text-3xl hover:text-[#003087] transition-colors" />
                  <FontAwesomeIcon icon={faCcApplePay} className="text-3xl hover:text-black transition-colors" />
                  <FontAwesomeIcon icon={faGooglePay} className="text-3xl hover:text-[#4285F4] transition-colors" />
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Gem size={20} className="text-primary-500" />
                  </div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                    FreshCart uses enterprise-grade encryption for all payments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
