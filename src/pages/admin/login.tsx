import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", { redirect: false, email, password });

    if (result?.error) {
      alert("Invalid credentials");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-semibold mb-4 text-black">Admin Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            required className="p-2 border border-gray-300 rounded text-black" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            required className="p-2 border border-gray-300 rounded text-black" />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Login</button>
        </form>
        <p className="text-center mt-4 text-black">
          Don't have an account? <a href="/admin/register" className="text-blue-500 underline">Register here</a>
        </p>
      </div>
    </div>
  );
}