import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditAgent() {
  const router = useRouter();
  const { id } = router.query;
  const [agent, setAgent] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (id) {
      fetch(`/api/agents/get?id=${id}`)
        .then((res) => res.json())
        .then((data) => setAgent(data));
    }
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/agents/update?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agent),
    });

    if (response.ok) {
      alert("Agent updated successfully!");
      router.push("/admin/agents");
    } else {
      alert("Failed to update agent.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-semibold mb-4 text-black">Edit Agent</h2>
        <form onSubmit={handleUpdate} className="flex flex-col space-y-4">
          <input type="text" placeholder="Name" value={agent.name} onChange={(e) => setAgent({ ...agent, name: e.target.value })}
            required className="p-2 border border-gray-300 rounded text-black" />
          <input type="email" placeholder="Email" value={agent.email} onChange={(e) => setAgent({ ...agent, email: e.target.value })}
            required className="p-2 border border-gray-300 rounded text-black" />
          <input type="text" placeholder="Phone" value={agent.phone} onChange={(e) => setAgent({ ...agent, phone: e.target.value })}
            required className="p-2 border border-gray-300 rounded text-black" />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Update Agent</button>
        </form>
      </div>
    </div>
  );
}