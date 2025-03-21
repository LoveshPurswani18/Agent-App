import { useState } from "react";

export default function UploadList() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("/api/lists/upload", {
        method: "POST",
        body: formData,
      });
  
      const text = await response.text(); // Read raw response
      console.log("Server Response:", text); // Log the response
  
      try {
        const data = JSON.parse(text); // Try parsing JSON
        if (response.ok) {
          setMessage("File uploaded successfully!");
          setFile(null);
        } else {
          setMessage("Upload failed: " + data.message);
        }
      } catch (err) {
        setMessage("Upload failed: Server returned invalid response.");
      }
    } catch (error) {
      setMessage("Upload failed: " + error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-semibold mb-4 text-black">Upload CSV</h2>
        <form onSubmit={handleUpload} className="flex flex-col space-y-4">
          <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} className="p-2 border border-gray-300 rounded text-black" />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Upload</button>
        </form>
        {message && <p className="text-center mt-4 text-black">{message}</p>}
      </div>
    </div>
  );
}