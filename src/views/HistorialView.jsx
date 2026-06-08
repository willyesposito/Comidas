import { useState } from 'react';
import { C } from '../App';
import { getName } from '../data/comidas';
import Btn from '../components/Btn';

// ─── HISTORIAL VIEW ───────────────────────────────────────────────────────────
export default function HistorialView({ historial }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ paddingBottom:90 }}>
      <div style={{ background:C.purple, padding:'24px 16px 20px', color:'#fff' }}>
        <div style={{ fontSize:12, opacity:.8, marginBottom:2, fontWeight:600 }}>{historial.length} semanas</div>
        <div style={{ fontSize:26, fontWeight:800, letterSpacing:'-0.5px' }}>Historial</div>
      </div>
      <div style={{ padding:'10px 14px', display:'flex', flexDirection:'column', gap:8 }}>
        {[...historial].reverse().map(sem => (
          <div key={sem.id} style={{ background:C.card, borderRadius:14, border:`1.5px solid ${C.border}`, overflow:'hidden' }}>
            <Btn onClick={() => setOpen(open===sem.id ? null : sem.id)} style={{
              width:'100%', textAlign:'left', padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between',
            }}>
              <div>
                <div style={{ fontSize:15, fontWeight:700, color:C.text }}>{sem.label}</div>
                <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>
                  {sem.dias.filter(d => d.comidaId || d.custom).length} cenas registradas
                </div>
              </div>
              <span style={{ color:'#CCC', fontSize:20, display:'inline-block', transform: open===sem.id ? 'rotate(90deg)' : 'none', transition:'transform 0.15s' }}>›</span>
            </Btn>
            {open===sem.id && (
              <div style={{ borderTop:`1px solid ${C.border}` }}>
                {sem.dias.map((dia, i) => (
                  <div key={i} style={{ padding:'11px 16px', display:'flex', alignItems:'center', gap:12, borderBottom: i < sem.dias.length-1 ? `1px solid ${C.border}` : 'none' }}>
                    <div style={{ width:34, fontSize:12, fontWeight:800, color:C.muted, flexShrink:0 }}>{dia.d}</div>
                    <div style={{ fontSize:14, color: getName(dia) ? C.text : C.muted, fontWeight: getName(dia) ? 500 : 400 }}>
                      {getName(dia) || '—'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {historial.length === 0 && (
          <div style={{ textAlign:'center', padding:'70px 0', color:C.muted }}>
            <div style={{ fontSize:52 }}>📋</div>
            <div style={{ marginTop:10, fontSize:15 }}>Todavía no guardaste ninguna semana</div>
          </div>
        )}
      </div>
    </div>
  );
}
