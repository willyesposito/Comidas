// ─── REUSABLE BUTTON ──────────────────────────────────────────────────────────
export default function Btn({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit', background: 'none', padding: 0, ...style }}>
      {children}
    </button>
  );
}
