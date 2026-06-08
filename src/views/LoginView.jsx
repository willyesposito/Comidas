import { C } from '../App';
import Btn from '../components/Btn';

// ─── LOGIN VIEW ───────────────────────────────────────────────────────────────
// Pantalla previa al ingreso. `error` muestra el caso "cuenta sin acceso".
export default function LoginView({ onLogin, error }) {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 24px', textAlign:'center' }}>
      <div style={{ fontSize:64, marginBottom:8 }}>🍽️</div>
      <div style={{ fontSize:28, fontWeight:800, color:C.text, letterSpacing:'-0.5px' }}>Comidas</div>
      <div style={{ fontSize:15, color:C.muted, marginTop:6, marginBottom:32 }}>
        Planificación semanal de cenas
      </div>

      <Btn
        onClick={onLogin}
        style={{
          display:'flex', alignItems:'center', justifyContent:'center', gap:10,
          background:C.card, color:C.text, border:`1.5px solid ${C.border}`,
          borderRadius:14, padding:'14px 24px', fontSize:15, fontWeight:700,
          boxShadow:'0 1px 4px rgba(0,0,0,0.06)',
        }}
      >
        <span style={{ fontSize:18 }}>🔑</span>
        Ingresar con Google
      </Btn>

      {error && (
        <div style={{ marginTop:20, fontSize:14, color:'#CC3333', maxWidth:300, lineHeight:1.4 }}>
          {error}
        </div>
      )}
    </div>
  );
}
