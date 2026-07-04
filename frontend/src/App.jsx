import { useState } from "react";
import Upload from "./components/Upload";
import Chat from "./components/Chat";
import Documents from "./components/Documents";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedDocId, setSelectedDocId] = useState(null);

  return (
    <div className="app">
      <header>
        <h1>DocuMind AI</h1>
        <p>Upload a PDF and ask questions about it</p>
        <nav>
          <button onClick={() => setActiveTab("upload")} className={activeTab === "upload" ? "active" : ""}>Upload</button>
          <button onClick={() => setActiveTab("documents")} className={activeTab === "documents" ? "active" : ""}>Documents</button>
          <button onClick={() => setActiveTab("chat")} className={activeTab === "chat" ? "active" : ""} disabled={!selectedDocId}>Chat</button>
        </nav>
      </header>
      <main>
        {activeTab === "upload" && <Upload setSelectedDocId={setSelectedDocId} setActiveTab={setActiveTab} />}
        {activeTab === "documents" && <Documents setSelectedDocId={setSelectedDocId} setActiveTab={setActiveTab} />}
        {activeTab === "chat" && <Chat docId={selectedDocId} />}
      </main>
    </div>
  );
}

export default App;