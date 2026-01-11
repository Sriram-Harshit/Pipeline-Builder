import { useState } from "react";
import useStore from "./store";
import "../css/submitPopup.css";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [showPopup, setShowPopup] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = { nodes, edges };

      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        "Unable to reach backend. Please check if the server is running."
      );
    } finally {
      setLoading(false);
      setShowPopup(true);
    }
  };

  return (
    <>
      <div className="submit-container">
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {(loading || showPopup) && (
        <div className="popup-overlay">
          {loading ? (
            <div className="loader-card">
              <div className="loader-spinner" />
              <p className="loader-text">Validating pipeline…</p>
            </div>
          ) : (
            <div className="popup-card">
              <h3 className="popup-title">Pipeline Result</h3>

              {error ? (
                <p className="popup-error">{error}</p>
              ) : (
                <>
                  <div className="popup-content">
                    <p>
                      <strong>Nodes:</strong> {result.num_nodes}
                    </p>
                    <p>
                      <strong>Edges:</strong> {result.num_edges}
                    </p>
                    <p>
                      <strong>Is DAG:</strong>{" "}
                      <span
                        className={result.is_dag ? "dag-true" : "dag-false"}
                      >
                        {result.is_dag ? "Yes" : "No"}
                      </span>
                    </p>
                  </div>
                  {result.message && <p>{result.message}</p>}
                </>
              )}

              <button
                className="popup-close-btn"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
