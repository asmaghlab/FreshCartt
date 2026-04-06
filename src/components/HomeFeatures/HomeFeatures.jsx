import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    desc: "Orders $50 or more",
  },
  {
    icon: RotateCcw,
    title: "30 Days Return",
    desc: "Satisfaction guaranteed",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    desc: "100% protected checkout",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Ready to help anytime",
  },
];

export default function HomeFeatures() {


  
  return (
    <div className=" container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-10">
      {features.map((item, i) => {
        const Icon = item.icon;
        return (


<div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md transition"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600">
              <Icon size={22} />
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          </div>

       
          
        );
      })}
    </div>
  );
}