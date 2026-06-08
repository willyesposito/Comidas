import { useEffect, useRef, useState } from 'react';
import {
  addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { generarCompras, recomendar } from './data/comidas';
import BottomNav from './components/BottomNav';
import Selector from './components/Selector';
import SemanaView from './views/SemanaView';
import ComprasView from './views/ComprasView';
import HistorialView from './views/HistorialView';

// ─── COLORS ──────────────────────────────────────────────────────────────────
export const C = {
  bg:          '#F5F0E8',
  card:        '#FFFFFF',
  orange:      '#C85A0A',
  orangeLight: '#FEF0E6',
  text:        '#1A1A1A',
  muted:       '#888',
  border:      '#E3DDD4',
  green:       '#2A5C43',
  purple:      '#3D2B5C',
};

const semanasRef = collection(db, 'semanas');

const labelSemana = (fecha = new Date()) =>
  `Semana ${fecha.toLocaleDateString('es-AR', { day:'2-digit', month:'numeric' })}`;

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab,         setTab]         = useState('semana');
  const [semanas,     setSemanas]     = useState(null);
  const [editandoDia, setEditandoDia] = useState(null);
  const [checkados,   setCheckados]   = useState({});
  const creandoSemana = useRef(false);

  // Suscripción en tiempo real a la colección `semanas`
  useEffect(() => {
    const q = query(semanasRef, orderBy('createdAt', 'asc'));
    return onSnapshot(q, snap => {
      setSemanas(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const semanaActiva = semanas?.find(s => s.activa) ?? null;
  const historial    = semanas?.filter(s => !s.activa) ?? [];

  // Primer uso: si todavía no hay ninguna semana activa, creamos una
  useEffect(() => {
    if (semanas === null || semanaActiva || creandoSemana.current) return;
    creandoSemana.current = true;
    addDoc(semanasRef, {
      label:     labelSemana(),
      createdAt: serverTimestamp(),
      activa:    true,
      dias:      recomendar(historial),
    }).finally(() => { creandoSemana.current = false; });
  }, [semanas]);

  const actualizarDias = (dias) => {
    if (!semanaActiva) return;
    updateDoc(doc(db, 'semanas', semanaActiva.id), { dias });
  };

  const onGuardar = async () => {
    if (!semanaActiva) return;
    await updateDoc(doc(db, 'semanas', semanaActiva.id), { activa: false });
    await addDoc(semanasRef, {
      label:     labelSemana(),
      createdAt: serverTimestamp(),
      activa:    true,
      dias:      recomendar([...historial, semanaActiva]),
    });
    setCheckados({});
    alert('Semana guardada en el historial ✓');
  };

  const listaCompras = generarCompras(semanaActiva?.dias ?? []);

  return (
    <div style={{ fontFamily:"'Nunito', 'Helvetica Neue', sans-serif", background:C.bg, maxWidth:430, margin:'0 auto', minHeight:'100vh', position:'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');
        * { box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
        button, input { font-family:inherit; }
        ::-webkit-scrollbar { display:none; }
        body { margin:0; }
      `}</style>

      {(tab==='semana' || tab==='compras') && !semanaActiva && (
        <div style={{ padding:'70px 16px', textAlign:'center', color:C.muted, fontSize:15 }}>
          Cargando…
        </div>
      )}

      {semanaActiva && tab==='semana' && (
        <SemanaView
          semana={semanaActiva.dias}
          label={semanaActiva.label}
          setEditandoDia={setEditandoDia}
          setTab={setTab}
          onNuevaRecomendacion={() => actualizarDias(recomendar(historial))}
          onGuardar={onGuardar}
        />
      )}
      {semanaActiva && tab==='compras' && (
        <ComprasView listaCompras={listaCompras} checkados={checkados} setCheckados={setCheckados} />
      )}
      {tab==='historial' && <HistorialView historial={historial} />}

      <BottomNav tab={tab} setTab={setTab} />

      {editandoDia !== null && semanaActiva && (
        <Selector
          diaIndex={editandoDia}
          onSelect={(comidaId, custom) => {
            actualizarDias(semanaActiva.dias.map((d,i) => i===editandoDia ? {...d, comidaId, custom} : d));
            setEditandoDia(null);
          }}
          onClose={() => setEditandoDia(null)}
        />
      )}
    </div>
  );
}
