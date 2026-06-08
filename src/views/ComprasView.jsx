import { C } from '../App';
import { PROV, PROV_ORDER } from '../data/comidas';
import Btn from '../components/Btn';

// ─── COMPRAS VIEW ─────────────────────────────────────────────────────────────
export default function ComprasView({ listaCompras, checkados, setCheckados }) {
  const total   = Object.values(listaCompras).flat().length;
  const checked = Object.values(checkados).filter(Boolean).length;

  const compartir = () => {
    const txt = PROV_ORDER
      .filter(p => listaCompras[p]?.length)
      .map(p => `${PROV[p]}\n${listaCompras[p].map(i => `• ${i}`).join('\n')}`)
      .join('\n\n');
    if (navigator.share) navigator.share({ title:'Compras', text:txt });
    else { navigator.clipboard?.writeText(txt); alert('Copiado al portapapeles ✓'); }
  };

  return (
    <div style={{ paddingBottom:90 }}>
      <div style={{ background:C.green, padding:'24px 16px 20px', color:'#fff' }}>
        <div style={{ fontSize:12, opacity:.8, marginBottom:2, fontWeight:600 }}>{checked}/{total} comprado</div>
        <div style={{ fontSize:26, fontWeight:800, letterSpacing:'-0.5px' }}>Compras</div>
      </div>

      <div style={{ padding:'10px 14px', display:'flex', flexDirection:'column', gap:14 }}>
        {PROV_ORDER.map(prov => {
          const items = listaCompras[prov] || [];
          if (!items.length) return null;
          return (
            <div key={prov}>
              <div style={{ fontSize:11, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.7px', marginBottom:6, paddingLeft:2 }}>
                {PROV[prov]}
              </div>
              <div style={{ background:C.card, borderRadius:14, border:`1.5px solid ${C.border}`, overflow:'hidden' }}>
                {items.map((item, j) => {
                  const key = `${prov}|${item}`;
                  const on  = checkados[key];
                  return (
                    <Btn key={j} onClick={() => setCheckados(p => ({...p, [key]:!p[key]}))} style={{
                      width:'100%', textAlign:'left', padding:'15px 16px', background:'none',
                      borderBottom: j < items.length-1 ? `1px solid ${C.border}` : 'none',
                      display:'flex', alignItems:'center', gap:14,
                    }}>
                      <div style={{
                        width:26, height:26, borderRadius:7, flexShrink:0,
                        border:`2.5px solid ${on ? C.green : '#CCC'}`,
                        background: on ? C.green : 'transparent',
                        display:'flex', alignItems:'center', justifyContent:'center',
                      }}>
                        {on && <span style={{ color:'#fff', fontSize:13, fontWeight:800, lineHeight:1 }}>✓</span>}
                      </div>
                      <span style={{ fontSize:15, color: on ? C.muted : C.text, textDecoration: on ? 'line-through' : 'none', fontWeight: on ? 400 : 600 }}>
                        {item}
                      </span>
                    </Btn>
                  );
                })}
              </div>
            </div>
          );
        })}

        {total > 0 && (
          <Btn onClick={compartir} style={{ padding:'16px', background:C.green, color:'#fff', borderRadius:14, fontSize:15, fontWeight:700, width:'100%', textAlign:'center' }}>
            📤 Compartir lista
          </Btn>
        )}

        {total === 0 && (
          <div style={{ textAlign:'center', padding:'70px 0', color:C.muted }}>
            <div style={{ fontSize:52 }}>🛒</div>
            <div style={{ marginTop:10, fontSize:15 }}>Planificá la semana primero</div>
          </div>
        )}
      </div>
    </div>
  );
}
