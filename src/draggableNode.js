// draggableNode.js
// A draggable chip in the toolbar representing a node type.

export const DraggableNode = ({ type, label, icon = '', accentColor = '#6366f1' }) => {
  const onDragStart = (event) => {
    event.target.style.opacity = '0.7';
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType: type })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = (event) => {
    event.target.style.opacity = '1';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      title={`Drag to add ${label} node`}
      style={{
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: 8,
        background: '#1e293b',
        border: `1.5px solid ${accentColor}33`,
        color: '#f1f5f9',
        fontSize: 12,
        fontWeight: 500,
        userSelect: 'none',
        transition: 'background 0.15s, transform 0.1s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#334155')}
      onMouseLeave={(e) => (e.currentTarget.style.background = '#1e293b')}
    >
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      <span>{label}</span>
    </div>
  );
};
