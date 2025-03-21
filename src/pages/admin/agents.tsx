import router from "next/router";
import { useEffect, useState } from "react";

export default function Agents() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetch("/api/agents")
      .then((res) => res.json())
      .then((data) => setAgents(data));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this agent?")) return;

    const response = await fetch(`/api/agents/delete?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setAgents(agents.filter((agent) => agent._id !== id));
    } else {
      alert("Failed to delete agent.");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Agents</h2>
        <button
          onClick={() => router.push("/admin/add-agent")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          + Add Agent
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Phone</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent: any) => (
              <tr key={agent._id} className="border-b hover:bg-gray-100">
                <td className="p-3 text-gray-800">{agent.name}</td>
                <td className="p-3 text-gray-800">{agent.email}</td>
                <td className="p-3 text-gray-800">{agent.phone}</td>
                <td className="p-3 flex justify-center space-x-3">
                  <button
                    onClick={() => router.push(`/admin/edit-agent?id=${agent._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(agent._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}