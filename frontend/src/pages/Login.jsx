import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import loginImage from "../assets/auth/login.svg";
import qualityIcon from "../assets/auth/quality.svg";
import ecoIcon from "../assets/auth/eco.svg";
import globalIcon from "../assets/auth/global.svg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <img
          src={loginImage}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY (gradient tint like your design) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(70,21,153,0.8) 0%, rgba(70,21,153,0) 100%)",
          }}
        ></div>

        {/* CONTENT */}
        <div className="relative z-10 text-white p-12 flex flex-col justify-between w-full m-8">
          <div>
            <h1 className="text-2xl font-bold mb-10">PackEdge</h1>

            <h2 className="font-playfair font-extrabold text-[40px] leading-[60px] tracking-tight mb-6">
              Redefining the standard of presentation.
            </h2>

            <p
              className="text-[18px] text-justify"
              style={{ color: "#CEB8FF" }}
            >
              PackEdge leads in bespoke digital product showcases, bridging the
              gap between structural engineering and visual storytelling to
              present your products with prestige.
            </p>

            <ul
              className="mt-8 space-y-3"
              style={{ fontSize: "16px", lineHeight: "24px" }}
            >
              <li className="flex items-center gap-2">
                <img src={qualityIcon} alt="Quality" className="w-4 h-4" />
                Uncompromising Quality
              </li>
              <li className="flex items-center gap-2">
                <img src={ecoIcon} alt="Eco-Conscious" className="w-4 h-4" />
                Eco-Conscious Materials
              </li>
              <li className="flex items-center gap-2">
                <img
                  src={globalIcon}
                  alt="Global Logistics"
                  className="w-4 h-4"
                />
                Global Logistics Network
              </li>
            </ul>
          </div>

          {/* STATS */}
          <div className="flex gap-6 pt-12">
            {/* Happy Customers */}
            <div
              className="rounded-xl text-center relative"
              style={{
                height: "90px",
                backgroundColor: "rgba(94,53,177,0.15)", 
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)", 
                padding: "16px",
              }}
            >
              <h3
                className="font-playfair font-bold text-[24px]"
                style={{ color: "#FFFFFF" }}
              >
                12k+
              </h3>
              <p
                className="font-semibold text-[12px]"
                style={{ color: "#CEB8FF" }}
              >
                Happy Customers
              </p>
            </div>

            {/* Premium Support */}
            <div
              className="rounded-xl text-center relative"
              style={{
                height: "82px",
                backgroundColor: "rgba(94,53,177,0.15)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                padding: "16px",
                marginTop: "8px",
              }}
            >
              <h3
                className="font-playfair font-bold text-[24px]"
                style={{ color: "#FFFFFF" }}
              >
                24/7
              </h3>
              <p
                className="font-semibold text-[12px]"
                style={{ color: "#CEB8FF" }}
              >
                Premium Support
              </p>
            </div>

            {/* Sustainable Products */}
            <div
              className="rounded-xl text-center relative"
              style={{
                height: "90px",
                backgroundColor: "rgba(94,53,177,0.15)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                padding: "16px",
              }}
            >
              <h3
                className="font-playfair font-bold text-[24px]"
                style={{ color: "#FFFFFF" }}
              >
                5k+
              </h3>
              <p
                className="font-semibold text-[12px]"
                style={{ color: "#CEB8FF" }}
              >
                Sustainable Products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500 text-sm mb-6">
            Please enter your details to access your dashboard.
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="text-xs text-gray-500">EMAIL ADDRESS</label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mt-1">
              <Mail size={16} className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="admin@packedge.com"
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-xs text-gray-500">PASSWORD</label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mt-1">
              <Lock size={16} className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-sm"
              />
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={16} className="text-gray-400" />
                ) : (
                  <Eye size={16} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember Me
            </label>
            <button
              onClick={() => navigate("/Register")}
              className="text-purple-600 font-medium"
            >
              Register
            </button>
          </div>

          {/* Button */}
          <button className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-full font-semibold transition">
            Sign In
          </button>

          {/* Register */}
          <p className="text-center text-sm mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/Register")}
              className="text-purple-600 font-medium"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
