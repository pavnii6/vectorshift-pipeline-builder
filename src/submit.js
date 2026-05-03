// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './nodes/nodes.css';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

/* ── Result Modal ─────────────────────────────────────────────────────────── */
const ResultModal = ({ result, error, onClose }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="modal" role="dialog" aria-modal="true">
      {/* Header */}
      <div className="modal__header">
        <span className="modal__title">
          {error ? '⚠️ Error' : '📊 Pipeline Analysis'}
        </span>
        <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
      </div>

      {/* Body */}
      <div className="modal__body">
        {error ? (
          <div className="modal__error">{error}</div>
        ) : (
          <>
            {/* Node count */}
            <div className="modal__stat">
              <span className="modal__stat-label">
                <span className="modal__stat-icon">🔷</span>
                Nodes
              </span>
              <span className="modal__stat-value">{result.num_nodes}</span>
            </div>

            {/* Edge count */}
            <div className="modal__stat">
              <span className="modal__stat-label">
                <span className="modal__stat-icon">🔗</span>
                Edges
              </span>
              <span className="modal__stat-value">{result.num_edges}</span>
            </div>

            {/* DAG result */}
            <div className={`modal__dag modal__dag--${result.is_dag ? 'valid' : 'invalid'}`}>
              <span className="modal__dag-label">
                <span className="modal__stat-icon">{result.is_dag ? '✅' : '❌'}</span>
                Graph Type
              </span>
              <span className="modal__dag-value">
                {result.is_dag ? 'Valid DAG' : 'Has Cycles'}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="modal__footer">
        <button className="modal__ok-btn" onClick={onClose}>Done</button>
      </div>
    </div>
  </div>
);

/* ── Submit Button ────────────────────────────────────────────────────────── */
export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading]   = useState(false);
  const [result,  setResult]    = useState(null);   // { num_nodes, num_edges, is_dag }
  const [error,   setError]     = useState(null);
  const [open,    setOpen]      = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  return (
    <>
      <div className="submit-bar">
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Analysing…' : 'Submit Pipeline'}
        </button>
      </div>

      {open && (
        <ResultModal
          result={result}
          error={error}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};
