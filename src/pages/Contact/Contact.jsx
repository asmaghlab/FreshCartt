import React from "react";
import { Helmet } from "react-helmet";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";

export default function Contact() {
  const contactInfo = [
    { title: "Email Us", detail: "support@freshcart.com", icon: <Mail size={22} /> },
    { title: "Call Us", detail: "+1(800) 123-7890", icon: <Phone size={22} /> },
    { title: "Visit Us", detail: "123 E-commerce Ave, NY 10001", icon: <MapPin size={22} /> },
    { title: "Working Hours", detail: "Mon - Fri: 9AM - 6PM", icon: <Clock size={22} /> },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - FreshCart</title>
      </Helmet>

      {/* Hero Header */}
      <section className="bg-gray-900 py-32  relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Contact <span className="text-primary-400">Us</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            Have a question about our services or need assistance with an order? Our team is available 24/7 to help you.
          </p>
        </div>
      </section>

      <section className="py-24 mb-0 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h2>
                  <p className="text-gray-500 font-medium">Fill out the form and our team will get back to you within 24 hours.</p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{info.title}</h4>
                        <p className="text-gray-900 font-bold">{info.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-gray-100 italic text-sm text-gray-400 font-medium">
                  "At FreshCart, we don't just deliver groceries, we deliver convenience and care directly to your doorstep."
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <form className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl space-y-6 transform hover:shadow-2xl transition duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g., John Doe"
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-primary-600 focus:bg-white rounded-xl px-4 py-3 outline-none transition duration-300 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g., john@example.com"
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-primary-600 focus:bg-white rounded-xl px-4 py-3 outline-none transition duration-300 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help you?"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary-600 focus:bg-white rounded-xl px-4 py-3 outline-none transition duration-300 font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Message</label>
                  <textarea
                    rows="5"
                    placeholder="Write your message here..."
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-primary-600 focus:bg-white rounded-xl px-4 py-3 outline-none transition duration-300 font-medium resize-none"
                  ></textarea>
                </div>

                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest py-4 rounded-xl shadow-lg hover:shadow-primary-600/40 transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]">
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
