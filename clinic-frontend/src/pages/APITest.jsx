import { useState } from "react";

export default function APITest() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "admin",
          password: "admin123",
        }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
      console.log("Response:", data);
    } catch (error) {
      setResult(`Error: ${error.message}`);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">API Test</h1>
      <button
        onClick={testLogin}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-4"
      >
        {loading ? "Testing..." : "Test Login API"}
      </button>
      <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
        {result || "Click the button to test..."}
      </pre>
    </div>
  );
}
