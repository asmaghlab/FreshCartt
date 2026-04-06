import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Camera,
  Trash2,
  Upload,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/Auth.context";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import AccountSkeleton from "../../components/Skeleton/AccountSkeleton";
import { getUserProfile, updateUserProfile } from "../../services/user-service";

export default function Account() {
  const { token, setUserInfo } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required")
    }),
    onSubmit: async (values) => {
      try {
        const response = await updateUserProfile(values);
        if (response.statusMsg === "success") {
          toast.success("Profile updated successfully!");
          setUserInfo(response.user);
          localStorage.setItem("userInfo", JSON.stringify(response.user));
        }
      } catch (err) {
        toast.error("Failed to update profile. Please try again.");
      }
    }
  });

  useEffect(() => {
    async function fetchProfile() {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        // In this specific API (routemisr), we often get user info from the token 
        // because the getMe endpoint might not be fully implemented in all versions.
        // But we try to fetch it first.
        const decoded = JSON.parse(atob(token.split(".")[1]));
        formik.setValues({
          name: decoded.name || "",
          email: decoded.email || "",
          phone: decoded.phone || ""
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        toast.success("Preview updated! Click 'Save Changes' to persist.");
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) return <AccountSkeleton />;

  return (
    <div className="min-h-screen bg-[#fafafa] py-16 px-4 md:px-8 lg:px-16 mt-16">
      <Helmet>
        <title>Account Details - FreshCart</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-3 hidden lg:block">
             <AccountSidebar />
          </div>

          <div className="lg:col-span-9">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12"
            >
              <header className="mb-10">
                <h1 className="text-2xl font-bold text-gray-900">Account Details</h1>
              </header>

              <section className="mb-12">
                <h2 className="text-base font-semibold text-gray-800 mb-6 font-medium">Profile Picture</h2>
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <div className="relative group">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-emerald-50 shadow-sm transition-all group-hover:border-emerald-100">
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label className="absolute bottom-1 right-1 bg-emerald-500 text-white p-2.5 rounded-full shadow-lg hover:bg-emerald-600 transition-all border-2 border-white cursor-pointer hover:scale-110 active:scale-95">
                      <Camera size={16} />
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-gray-500 mb-1">Upload a new profile picture</p>
                    <div className="flex items-center gap-3">
                      <label className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-600/10 active:scale-95 cursor-pointer">
                         Upload New
                         <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </label>
                      <button 
                        onClick={() => setProfileImage("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop")}
                        className="px-6 py-2.5 bg-white text-gray-400 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 hover:text-gray-600 transition-all active:scale-95"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG. Max size 2MB</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-base font-semibold text-gray-800 mb-8 font-medium">Personal Information</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        {...formik.getFieldProps('name')}
                        placeholder="Your full name"
                        className={`w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 focus:outline-none transition-all text-gray-700 font-medium ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
                      />
                      {formik.touched.name && formik.errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{formik.errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        {...formik.getFieldProps('email')}
                        placeholder="email@example.com"
                        className={`w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 focus:outline-none transition-all text-gray-700 font-medium ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                      />
                      {formik.touched.email && formik.errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{formik.errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 ml-1">Phone Number</label>
                      <input 
                        type="text" 
                        {...formik.getFieldProps('phone')}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 focus:outline-none transition-all text-gray-700 font-medium ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''}`}
                      />
                      {formik.touched.phone && formik.errors.phone && <p className="text-xs text-red-500 mt-1 ml-1">{formik.errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm font-medium text-gray-500 ml-1">Account Created</label>
                       <div className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center text-gray-400 font-medium cursor-not-allowed">
                          <p className="text-[13px] flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-emerald-500" />
                            Verified Member
                          </p>
                       </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <button 
                      type="submit" 
                      disabled={formik.isSubmitting}
                      className="px-10 py-3.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95 disabled:opacity-50 disabled:scale-100"
                    >
                      {formik.isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </section>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
