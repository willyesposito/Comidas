// ─── DÍAS Y PROVEEDORES ──────────────────────────────────────────────────────
export const DIAS_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
export const DIAS_FULL  = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

export const PROV = {
  carniceria:  '🥩 Carnicería',
  verduleria:  '🥦 Verdulería',
  supermercado:'🛒 Supermercado',
  dietetica:   '🌿 Dietética',
  fiambreria:  '🧀 Fiambrería',
};
export const PROV_ORDER = ['carniceria','verduleria','supermercado','dietetica','fiambreria'];

// ─── CATÁLOGO DE COMIDAS ─────────────────────────────────────────────────────
export const COMIDAS = [
  { id:'asado',            nombre:'Asado',                      cat:'🥩 Carne',   ings:[['carne para asado','carniceria'],['achuras','carniceria'],['sal gruesa','supermercado']] },
  { id:'tacos',            nombre:'Tacos',                      cat:'🥩 Carne',   ings:[['carne picada','carniceria'],['cebolla','verduleria'],['pimiento','verduleria'],['tomate','verduleria'],['ajo','verduleria'],['especias','supermercado']] },
  { id:'carne_horno',      nombre:'Carne al horno',             cat:'🥩 Carne',   ings:[['tapa de nalga','carniceria'],['cebolla','verduleria'],['zanahoria','verduleria'],['ajo','verduleria'],['vino blanco','supermercado'],['especias','supermercado']] },
  { id:'chorizos_pomarola',nombre:'Chorizos a la pomarola',     cat:'🥩 Carne',   ings:[['chorizos','carniceria'],['tomate','verduleria'],['cebolla','verduleria'],['ajo','verduleria'],['laurel','supermercado']] },
  { id:'milanesas',        nombre:'Milanesas',                  cat:'🥩 Carne',   ings:[['milanesas de carne','carniceria'],['pan rallado','supermercado'],['huevos','supermercado'],['ajo','verduleria']] },
  { id:'churrascos',       nombre:'Churrascos',                 cat:'🥩 Carne',   ings:[['churrascos','carniceria'],['limón','verduleria'],['especias','supermercado']] },
  { id:'bifes_criolla',    nombre:'Bifes a la criolla',         cat:'🥩 Carne',   ings:[['bifes','carniceria'],['cebolla','verduleria'],['tomate','verduleria'],['pimiento','verduleria'],['ajo','verduleria']] },
  { id:'puchero',          nombre:'Puchero',                    cat:'🥩 Carne',   ings:[['carne puchero','carniceria'],['papa','verduleria'],['zanahoria','verduleria'],['choclo','verduleria'],['zapallo','verduleria'],['repollo','verduleria']] },
  { id:'pollo_horno',      nombre:'Pollo al horno',             cat:'🍗 Pollo',   ings:[['pollo','carniceria'],['papa','verduleria'],['ajo','verduleria'],['limón','verduleria'],['especias','supermercado']] },
  { id:'milanesas_pollo',  nombre:'Milanesas de pollo',         cat:'🍗 Pollo',   ings:[['pechuga de pollo','carniceria'],['pan rallado','supermercado'],['huevos','supermercado'],['ajo','verduleria']] },
  { id:'arroz_pollo',      nombre:'Arroz con pollo',            cat:'🍗 Pollo',   ings:[['pollo','carniceria'],['arroz','supermercado'],['cebolla','verduleria'],['pimiento','verduleria'],['tomate','verduleria'],['ajo','verduleria'],['caldo','supermercado']] },
  { id:'estofado',         nombre:'Estofado papas y arvejas',   cat:'🍗 Pollo',   ings:[['pollo','carniceria'],['papa','verduleria'],['arvejas','supermercado'],['cebolla','verduleria'],['tomate','verduleria'],['ajo','verduleria']] },
  { id:'salpicon',         nombre:'Salpicón',                   cat:'🍗 Pollo',   ings:[['pollo','carniceria'],['papa','verduleria'],['zanahoria','verduleria'],['arvejas','supermercado'],['mayonesa','supermercado']] },
  { id:'arroz_camarones',  nombre:'Arroz con camarones',        cat:'🎣 Pescado', ings:[['camarones','supermercado'],['arroz','supermercado'],['cebolla','verduleria'],['ajo','verduleria'],['pimiento','verduleria']] },
  { id:'tarta_atun',       nombre:'Tarta de atún',              cat:'🎣 Pescado', ings:[['atún en lata','supermercado'],['cebolla','verduleria'],['huevos','supermercado'],['tapa de tarta','supermercado'],['aceitunas','supermercado']] },
  { id:'tarta_verdura',    nombre:'Tarta acelga / brócoli',     cat:'🥦 Otros',   ings:[['acelga / brócoli','verduleria'],['cebolla','verduleria'],['huevos','supermercado'],['queso rallado','fiambreria'],['tapa de tarta','supermercado']] },
  { id:'guiso_lentejas',   nombre:'Guiso de lentejas',          cat:'🥦 Otros',   ings:[['lentejas','dietetica'],['cebolla','verduleria'],['zanahoria','verduleria'],['papa','verduleria'],['tomate triturado','supermercado'],['ajo','verduleria'],['chorizo colorado','carniceria']] },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
export const getName = (dia) => {
  if (dia.custom)    return dia.custom;
  if (dia.comidaId)  return COMIDAS.find(c => c.id === dia.comidaId)?.nombre || '—';
  return null;
};

export const recomendar = (historial) => {
  const cnt = {};
  COMIDAS.forEach(c => { cnt[c.id] = 0; });
  historial.slice(-4).forEach(s =>
    s.dias.forEach(d => { if (d.comidaId && cnt[d.comidaId] !== undefined) cnt[d.comidaId]++; })
  );
  const pool = [...COMIDAS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  pool.sort((a, b) => cnt[a.id] - cnt[b.id]);
  return DIAS_SHORT.map((d, i) => ({
    d, dFull: DIAS_FULL[i], comidaId: pool[i].id, custom: null,
  }));
};

export const generarCompras = (semana) => {
  const map = {};
  semana.forEach(dia => {
    const c = COMIDAS.find(c => c.id === dia.comidaId);
    if (!c) return;
    c.ings.forEach(([nombre, prov]) => { map[nombre] = prov; });
  });
  const grouped = Object.fromEntries(PROV_ORDER.map(p => [p, []]));
  Object.entries(map).forEach(([n, p]) => { if (grouped[p]) grouped[p].push(n); });
  return grouped;
};
