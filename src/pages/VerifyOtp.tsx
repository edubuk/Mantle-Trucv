import { API_BASE_URL } from "@/main";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp({ email, password }: { email: string; password: string }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading,setLoading]=useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    setLoading(true);
    const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, password}),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.removeItem("otpEmail");
      alert("Registration successful");
      navigate("/login");
    } else {
      alert(data.message || "Invalid OTP");
    }} catch (error) {
      toast.error("something went wrong");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleVerify}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>

        <p className="text-sm mb-2 text-gray-600">
          OTP sent to <b>{email}</b>
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border rounded mb-4 text-center tracking-widest"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button 
        className="w-full bg-green-600 text-white py-2 rounded"
        disabled={loading}
        >
          {loading?"verifying...":"Verify OTP"}
        </button>
      </form>
    </div>
  );
}
