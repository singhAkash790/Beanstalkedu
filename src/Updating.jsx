import React, { useState } from "react";
import axios from "axios";

const Updating = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async e => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("logFile", e.target.files[0]);
      const { data } = await axios.post("http://localhost:3000//api/parse-logs", formData);
      const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "parsed-logs.json";
      link.href = href;
      link.click();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Updating;
