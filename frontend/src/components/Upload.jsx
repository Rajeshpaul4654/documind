import { useState } from "react";
import axios from "axios";

function Upload({ setSelectedDocId, setActiveTab }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("http://127.0.0.1:8000/upload", formData);
      setResult(res.data);
      setSelectedDocId(res.data.doc_id);
    } catch (err) {
      setError("Upload failed. Make sure the backend is running.");
    }
    setLoading(false);
  };

  return (
    <div style={{ background: "#1e293b", borderRadius: "12px", padding: "32px" }}>
      <h2 style={{ marginBottom: "24px", color: "#e2e8f0" }}>Upload a PDF</h2>
      <div style={{ border: "2px dashed #334155", borderRadius: "8px", padding: "40px", textAlign: "center", marginBottom: "20px" }}>
        <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} id="fileInput" />
        <label htmlFor="fileInput" style={{ cursor: "pointer", color: "#6366f1" }}>
          {file ? file.name : "Click to select a PDF file"}
        </label>
      </div>
      {error && <p style={{ color: "#f87171", marginBottom: "12px" }}>{error}</p>}
      <button onClick={handleUpload} disabled={!file || loading}
        style={{ width: "100%", padding: "12px", background: "#6366f1", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px" }}>
        {loading ? "Processing..." : "Upload & Process"}
      </button>
      {result && (
        <div style={{ marginTop: "20px", background: "#0f172a", borderRadius: "8px", padding: "16px" }}>
          <p style={{ color: "#4ade80" }}>✓ Successfully processed!</p>
          <p style={{ color: "#94a3b8", marginTop: "8px" }}>Filename: {result.filename}</p>
          <p style={{ color: "#94a3b8" }}>Chunks created: {result.chunks}</p>
          <button onClick={() => setActiveTab("chat")}
            style={{ marginTop: "16px", padding: "10px 20px", background: "#4ade80", color: "#0f172a", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
            Start Chatting →
          </button>
        </div>
      )}
    </div>
  );
}

export default Upload;