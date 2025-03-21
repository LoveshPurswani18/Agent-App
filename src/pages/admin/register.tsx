import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registration successful! You can now log in.");
      router.push("/admin/login");
    } else {
      alert(data.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-semibold mb-4 text-black">Admin Registration</h2>
        <form onSubmit={handleRegister} className="flex flex-col space-y-4">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
            required className="p-2 border border-gray-300 rounded text-black" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            required className="p-2 border border-gray-300 rounded text-black" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            required className="p-2 border border-gray-300 rounded text-black" />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Register</button>
        </form>
        <p className="text-center mt-4 text-black">
          Already have an account? <a href="/admin/login" className="text-blue-500 underline">Login here</a>
        </p>
      </div>
    </div>
  );
}