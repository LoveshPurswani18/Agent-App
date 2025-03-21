import { useState } from "react";
import { useRouter } from "next/router";

export default function AddAgent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/agents/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Agent added successfully!");
      router.push("/admin/agents");
    } else {
      alert(data.message || "Error adding agent");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-semibold mb-4 text-black">Add Agent</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
            required className="p-2 border border-gray-300 rounded text-black" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            required className="p-2 border border-gray-300 rounded text-black" />
          <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}
            required className="p-2 border border-gray-300 rounded text-black" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            required className="p-2 border border-gray-300 rounded text-black" />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Add Agent</button>
        </form>
      </div>
    </div>
  );
}