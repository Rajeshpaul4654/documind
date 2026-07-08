import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE from "../api";

function Documents({ setSelectedDocId, setActiveTab }) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/documents`)
      .then((res) => setDocs(res.data))
      .catch((err) => console.error("Failed to fetch documents:", err));
  }, []);

  return (
    <div style={{ background: "#1e293b", borderRadius: "12px", padding: "32px" }}>
      <h2 style={{ marginBottom: "24px", color: "#e2e8f0" }}>Uploaded Documents</h2>
      {docs.length === 0 && <p style={{ color: "#94a3b8" }}>No documents uploaded yet.</p>}
      {docs.map((doc) => (
        <div key={doc.id} style={{ background: "#0f172a", borderRadius: "8px", padding: "16px", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ color: "#e2e8f0" }}>{doc.filename}</p>
            <p style={{ color: "#4ade80", fontSize: "12px" }}>{doc.status}</p>
          </div>
          <button onClick={() => { setSelectedDocId(doc.id); setActiveTab("chat"); }}
            style={{ padding: "8px 16px", background: "#6366f1", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
            Chat
          </button>
        </div>
      ))}
    </div>
  );
}

export default Documents;