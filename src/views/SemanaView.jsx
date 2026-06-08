import { C } from '../App';
import { COMIDAS, getName } from '../data/comidas';
import Btn from '../components/Btn';

// ─── SEMANA VIEW ──────────────────────────────────────────────────────────────
export default function SemanaView({ semana, label, setEditandoDia, setTab, onNuevaRecomendacion, onGuardar }) {
  return (
    <div style={{ paddingBottom:90 }}>
      <div style={{ background:C.orange, padding:'24px 16px 20px', color:'#fff' }}>
        <div style={{ fontSize:12, opacity:.85, marginBottom:2, fontWeight:600, letterSpacing:'0.3px' }}>{label}</div>
        <div style={{ fontSize:26, fontWeight:800, letterSpacing:'-0.5px' }}>Semana</div>
        <Btn
          onClick={onNuevaRecomendacion}
          style={{ marginTop:10, background:'rgba(255,255,255,0.18)', border:'1.5px solid rgba(255,255,255,0.35)', color:'#fff', borderRadius:20, padding:'7px 16px', fontSize:13, fontWeight:700 }}
        >
          🔄 Nueva recomendación
        </Btn>
      </div>

      <div style={{ padding:'10px 14px', display:'flex', flexDirection:'column', gap:8 }}>
        {semana.map((dia, i) => {
          const nombre = getName(dia);
          const comida = COMIDAS.find(c => c.id === dia.comidaId);
          return (
            <Btn key={i} onClick={() => setEditandoDia(i)} style={{
              background:C.card, border:`1.5px solid ${C.border}`, borderRadius:14,
              padding:'12px 14px', display:'flex', alignItems:'center',
              width:'100%', textAlign:'left', boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                width:48, height:48, borderRadius:11,
                background: nombre ? C.orangeLight : '#ECEAE6',
                display:'flex', alignItems:'center', justifyContent:'center',
                marginRight:12, flexShrink:0,
              }}>
                <span style={{ fontSize:12, fontWeight:800, color: nombre ? C.orange : '#AAA' }}>{dia.d}</span>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                {nombre
                  ? <div style={{ fontSize:15, fontWeight:700, color:C.text, lineHeight:1.2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{nombre}</div>
                  : <div style={{ fontSize:14, color:C.muted }}>Toca para elegir</div>
                }
                {comida && <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>{comida.cat}</div>}
              </div>
              <span style={{ color:'#CCC', fontSize:20, marginLeft:8 }}>›</span>
            </Btn>
          );
        })}
      </div>

      <div style={{ padding:'4px 14px', display:'flex', gap:8 }}>
        <Btn onClick={() => setTab('compras')} style={{ flex:1, padding:'16px', background:C.orange, color:'#fff', borderRadius:14, fontSize:15, fontWeight:700 }}>
          Lista de compras →
        </Btn>
        <Btn onClick={onGuardar} style={{ padding:'16px 20px', background:C.card, color:C.text, border:`1.5px solid ${C.border}`, borderRadius:14, fontSize:20 }}>
          💾
        </Btn>
      </div>
    </div>
  );
}
