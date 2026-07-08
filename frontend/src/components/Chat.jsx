import { useState } from "react";
import axios from "axios";
import API_BASE from "../api";

function Chat({ docId }) {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!question.trim()) return;
    const userMsg = { role: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/query`, { doc_id: docId, question });
      setMessages((prev) => [...prev, { role: "ai", text: res.data.answer }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "Error getting answer. Try again." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ background: "#1e293b", borderRadius: "12px", padding: "32px" }}>
      <h2 style={{ marginBottom: "24px", color: "#e2e8f0" }}>Chat with your document</h2>
      <div style={{ height: "400px", overflowY: "auto", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {messages.length === 0 && <p style={{ color: "#94a3b8", textAlign: "center", marginTop: "40px" }}>Ask a question about your document...</p>}
        {messages.map((msg, i) => (
          <div key={i} style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start", background: msg.role === "user" ? "#6366f1" : "#0f172a", padding: "12px 16px", borderRadius: "12px", maxWidth: "80%", color: "#e2e8f0", whiteSpace: "pre-wrap" }}>
            {msg.text}
          </div>
        ))}
        {loading && <div style={{ alignSelf: "flex-start", background: "#0f172a", padding: "12px 16px", borderRadius: "12px", color: "#94a3b8" }}>Thinking...</div>}
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
        <input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask a question..." style={{ flex: 1, padding: "12px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#e2e8f0", fontSize: "14px" }} />
        <button onClick={sendMessage} disabled={loading}
          style={{ padding: "12px 24px", background: "#6366f1", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Send</button>
      </div>
    </div>
  );
}

export default Chat;