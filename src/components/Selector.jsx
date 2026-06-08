import { useState } from 'react';
import { C } from '../App';
import { COMIDAS, DIAS_FULL } from '../data/comidas';
import Btn from './Btn';

// ─── MEAL SELECTOR (bottom sheet) ────────────────────────────────────────────
export default function Selector({ diaIndex, onSelect, onClose }) {
  const [q,          setQ]          = useState('');
  const [custom,     setCustom]     = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const cats     = [...new Set(COMIDAS.map(c => c.cat))];
  const filtered = q ? COMIDAS.filter(c => c.nombre.toLowerCase().includes(q.toLowerCase())) : null;

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:200, display:'flex', alignItems:'flex-end', maxWidth:430, left:'50%', transform:'translateX(-50%)' }}>
      <div style={{ background:C.bg, width:'100%', borderRadius:'22px 22px 0 0', maxHeight:'88vh', display:'flex', flexDirection:'column', overflow:'hidden' }}>

        {/* Header */}
        <div style={{ padding:'16px 16px 12px', background:C.card, borderBottom:`1px solid ${C.border}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
            <div style={{ fontSize:17, fontWeight:800, color:C.text }}>{DIAS_FULL[diaIndex]}</div>
            <Btn onClick={onClose} style={{ width:34, height:34, borderRadius:'50%', background:'#ECEAE6', fontSize:16, color:C.muted, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</Btn>
          </div>
          <input
            type="text" placeholder="Buscar..." value={q} onChange={e => setQ(e.target.value)}
            style={{ width:'100%', padding:'12px 14px', borderRadius:12, border:`1.5px solid ${C.border}`, fontSize:15, background:C.bg, outline:'none', boxSizing:'border-box' }}
          />
        </div>

        {/* List */}
        <div style={{ overflowY:'auto', flex:1 }}>
          <Btn onClick={() => onSelect(null, null)} style={{
            width:'100%', padding:'15px 16px', textAlign:'left',
            fontSize:15, color:'#CC3333', fontWeight:700, borderBottom:`1px solid ${C.border}`,
          }}>
            ✕ Sin planificar
          </Btn>

          {filtered
            ? filtered.map(c => (
                <Btn key={c.id} onClick={() => onSelect(c.id, null)} style={{ width:'100%', padding:'15px 16px', textAlign:'left', borderBottom:`1px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:15, fontWeight:600, color:C.text }}>{c.nombre}</span>
                  <span style={{ fontSize:12, color:C.muted }}>{c.cat}</span>
                </Btn>
              ))
            : cats.map(cat => (
                <div key={cat}>
                  <div style={{ padding:'9px 16px 3px', fontSize:11, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.6px', background:'#EDE8E0' }}>
                    {cat}
                  </div>
                  {COMIDAS.filter(c => c.cat===cat).map(c => (
                    <Btn key={c.id} onClick={() => onSelect(c.id, null)} style={{ width:'100%', padding:'15px 16px', textAlign:'left', borderBottom:`1px solid ${C.border}` }}>
                      <span style={{ fontSize:15, fontWeight:600, color:C.text }}>{c.nombre}</span>
                    </Btn>
                  ))}
                </div>
              ))
          }

          {/* Custom */}
          <div style={{ padding:'14px 16px', borderTop:`1px solid ${C.border}` }}>
            {!showCustom
              ? <Btn onClick={() => setShowCustom(true)} style={{ width:'100%', padding:'14px 16px', border:`1.5px dashed ${C.border}`, borderRadius:12, fontSize:14, color:C.muted, textAlign:'left' }}>
                  + Otra comida...
                </Btn>
              : <div style={{ display:'flex', gap:8 }}>
                  <input
                    autoFocus type="text" placeholder="Ej: Empanadas, Polenta..." value={custom}
                    onChange={e => setCustom(e.target.value)}
                    onKeyDown={e => e.key==='Enter' && custom && onSelect(null, custom)}
                    style={{ flex:1, padding:'13px 14px', borderRadius:12, border:`1.5px solid ${C.border}`, fontSize:15, outline:'none', boxSizing:'border-box' }}
                  />
                  <Btn onClick={() => custom && onSelect(null, custom)} style={{ padding:'13px 20px', background:C.orange, color:'#fff', borderRadius:12, fontSize:15, fontWeight:700 }}>
                    OK
                  </Btn>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
