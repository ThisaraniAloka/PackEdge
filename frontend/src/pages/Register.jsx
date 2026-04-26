import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Package,
  Check,
  X,
} from "lucide-react";

import loginImage from "../assets/auth/login.svg";
import qualityIcon from "../assets/auth/quality.svg";
import ecoIcon from "../assets/auth/eco.svg";
import globalIcon from "../assets/auth/global.svg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
  e.preventDefault();

  if (!name || !email || !password || !confirmPassword) {
    toast.error("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match!");
    return;
  }

  if (!agreeTerms) {
    toast.error("Please agree to Terms & Conditions");
    return;
  }

  // simulate successful registration
  toast.success("Account created successfully!");
  console.log("User registered:", {
    name,
    email,
    password,
  });

  navigate("/");
};


  const passwordRequirements = [
    { text: "At least 8 characters", validator: (pwd) => pwd.length >= 8 },
    { text: "Contains uppercase letter", validator: (pwd) => /[A-Z]/.test(pwd) },
    { text: "Contains lowercase letter", validator: (pwd) => /[a-z]/.test(pwd) },
    { text: "Contains number", validator: (pwd) => /\d/.test(pwd) },
  ];

  return (
    <div className="min-h-screen flex">

      {/* ================= LEFT SIDE (SAME AS LOGIN) ================= */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">

        <img
          src={loginImage}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(70,21,153,0.8) 0%, rgba(70,21,153,0) 100%)",
          }}
        />

        <div className="relative z-10 text-white p-12 flex flex-col justify-between w-full m-8">

          <div>
            <h1 className="text-2xl font-bold mb-10">PackEdge</h1>

            <h2 className="font-playfair font-extrabold text-[40px] leading-[60px] mb-6">
              Redefining the standard of presentation.
            </h2>

            <p className="text-[18px] text-justify" style={{ color: "#CEB8FF" }}>
              PackEdge leads in bespoke digital product showcases, bridging
              structural engineering and visual storytelling.
            </p>

            <ul className="mt-8 space-y-3 text-[16px]">
              <li className="flex items-center gap-2">
                <img src={qualityIcon} className="w-4 h-4" />
                Uncompromising Quality
              </li>
              <li className="flex items-center gap-2">
                <img src={ecoIcon} className="w-4 h-4" />
                Eco-Conscious Materials
              </li>
              <li className="flex items-center gap-2">
                <img src={globalIcon} className="w-4 h-4" />
                Global Logistics Network
              </li>
            </ul>
          </div>

          {/* STATS */}
          <div className="flex gap-6 pt-12">

            <div
              className="rounded-xl text-center"
              style={{
                height: "90px",
                backgroundColor: "rgba(94,53,177,0.15)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                padding: "16px",
              }}
            >
              <h3 className="font-bold text-[24px]">12k+</h3>
              <p className="text-[12px]" style={{ color: "#CEB8FF" }}>
                Happy Customers
              </p>
            </div>

            <div
              className="rounded-xl text-center"
              style={{
                height: "82px",
                backgroundColor: "rgba(94,53,177,0.15)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                padding: "16px",
                marginTop: "8px",
              }}
            >
              <h3 className="font-bold text-[24px]">24/7</h3>
              <p className="text-[12px]" style={{ color: "#CEB8FF" }}>
                Premium Support
              </p>
            </div>

            <div
              className="rounded-xl text-center"
              style={{
                height: "90px",
                backgroundColor: "rgba(94,53,177,0.15)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                padding: "16px",
              }}
            >
              <h3 className="font-bold text-[24px]">5k+</h3>
              <p className="text-[12px]" style={{ color: "#CEB8FF" }}>
                Sustainable Products
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE (REGISTER FORM) ================= */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">

       <form
          onSubmit={handleRegister}
          className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8"
        >


          <div className="flex items-center gap-2 mb-6">
            <Package className="text-purple-700" />
            <h2 className="text-2xl font-bold">Create Account</h2>
          </div>

          <p className="text-gray-500 text-sm mb-6">
            Join PackEdge and start your journey.
          </p>

          {/* NAME */}
          <div className="mb-4">
            <label className="text-xs text-gray-500">FULL NAME</label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mt-1">
              <User size={16} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Your name"
                className="bg-transparent outline-none w-full text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-xs text-gray-500">EMAIL</label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mt-1">
              <Mail size={16} className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="admin@packedge.com"
                className="bg-transparent outline-none w-full text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="text-xs text-gray-500">PASSWORD</label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mt-1">
              <Lock size={16} className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={16} className="text-gray-400" />
                ) : (
                  <Eye size={16} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-4">
            <label className="text-xs text-gray-500">CONFIRM PASSWORD</label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mt-1">
              <Lock size={16} className="text-gray-400 mr-2" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff size={16} className="text-gray-400" />
                ) : (
                  <Eye size={16} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* TERMS */}
          <label className="flex items-center gap-2 text-sm mb-4">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            I agree to the Terms & Conditions
          </label>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-full font-semibold transition"
          >
            Create Account
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-medium">
              Sign in
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}
