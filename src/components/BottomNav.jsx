import { C } from '../App';
import Btn from './Btn';

// ─── BOTTOM NAV ──────────────────────────────────────────────────────────────
export default function BottomNav({ tab, setTab }) {
  const items = [['semana','📅','Semana'],['compras','🛒','Compras'],['historial','📋','Historial']];
  return (
    <div style={{ position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:430, background:'#1A1A1A', display:'flex', zIndex:100, borderTop:'1px solid #2A2A2A' }}>
      {items.map(([id, icon, label]) => (
        <Btn key={id} onClick={() => setTab(id)} style={{ flex:1, padding:'10px 0 14px', display:'flex', flexDirection:'column', alignItems:'center', gap:2, color: tab===id ? C.orange : '#666' }}>
          <span style={{ fontSize:22 }}>{icon}</span>
          <span style={{ fontSize:11, fontWeight: tab===id ? 800 : 400 }}>{label}</span>
        </Btn>
      ))}
    </div>
  );
}
