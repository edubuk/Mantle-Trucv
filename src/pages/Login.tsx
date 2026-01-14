import { API_BASE_URL } from "@/main";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
   try {
    setLoading(true);
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("data",data)
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userMailId", email);
      toast.success("Login successful");
      window.location.href = "/";
    } else {
      toast.error(data.message || "Login failed");
    }
    } catch (error) {
       toast.error("something went wrong");
   }finally{
    setLoading(false)
   }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button 
        className="w-full bg-blue-600 text-white py-2 rounded"
        disabled={loading}
        >
          {loading?"Logging in...":"Login"}
        </button>
        <p className="text-center mt-4">
          Don't have an account? <a href="/register" className="text-blue-600">Register</a>
        </p>
      </form>
    </div>
  );
}
