import { useState } from "react";
import useStore from "./store";
import "./css/submitPopup.css";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [showPopup, setShowPopup] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const payload = { nodes, edges };

      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      setResult(data);
      setError(null);
      setShowPopup(true);
    } catch (err) {
      setError("Failed to submit pipeline");
      setShowPopup(true);
    }
  };

  return (
    <>
      <div className="submit-container">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
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
                    <span className={result.is_dag ? "dag-true" : "dag-false"}>
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
        </div>
      )}
    </>
  );
};
