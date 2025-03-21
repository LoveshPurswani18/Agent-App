import { useEffect, useState } from "react";

export default function DistributedLists() {
  const [lists, setLists] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/lists")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data:", data); 
        if (Array.isArray(data)) {
          setLists(data);
        } else {
          console.error("Unexpected API response:", data);
          setLists([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching lists:", error);
        setLists([]);
      });
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Distributed Lists</h2>
      {lists.length === 0 ? (
        <p className="text-red-500">No lists available or failed to fetch data.</p>
      ) : (
        lists.map((list: any) => (
          <div key={list._id} className="bg-white shadow-lg rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-700">File: {list.filename}</h3>
            <table className="w-full mt-4 border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border p-3 text-left">First Name</th>
                  <th className="border p-3 text-left">Phone</th>
                  <th className="border p-3 text-left">Notes</th>
                  <th className="border p-3 text-left">Assigned Agent</th>
                </tr>
              </thead>
              <tbody>
                {list.records.map((record: any) => (
                  <tr key={record._id} className="border-b hover:bg-gray-100">
                    <td className="p-3 text-black">{record.firstName}</td>
                    <td className="p-3 text-black">{record.phone}</td>
                    <td className="p-3 text-black">{record.notes}</td>
                    <td className="p-3 text-black">
                      {record.assignedAgent?.name || "Unassigned"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}
