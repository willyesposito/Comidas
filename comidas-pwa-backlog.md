# Backlog — Comidas PWA

## 🧊 Freezer

- Marcar por día si "sobró y se frisó" o "sobró y no se frisó"
- Pantalla de inventario del freezer: qué hay, desde qué fecha
- Cuando se planifica la semana, mostrar si hay algo en el freezer que pueda usarse
- Botón "usar del freezer" que prioriza esos platos en la recomendación

---

## 📊 Perfil nutricional

- Clasificar cada comida con etiquetas: omega-3, carbohidratos, proteína, lácteos, legumbres, verdura, frito
- En el historial, mostrar un resumen semanal: cuántos días con proteína animal, cuántos con carbos altos, etc.
- Alerta suave si hay muchas semanas seguidas sin omega-3 o legumbres
- No requiere base de datos nutricional exacta — solo etiquetas cualitativas por plato

---

## ⏰ Recordatorios y alertas de preparación

- Cada comida puede tener un campo "prep_previa": remojar lentejas (1 día antes), descongelar carne (1 día antes), etc.
- Notificación o alerta visible en la pantalla del día anterior
- Campo "comprar el mismo día": brotes de soja, ensaladas delicadas, pan fresco
- En la lista de compras, separar en dos secciones: "comprar antes del [X]" y "comprar el mismo día que se cocina"

---

## 🔀 Mover comidas entre días

- Botón de arrastrar o intercambiar en la pantalla de semana
- Alternativa simple: tocar un día, elegir "mover a..." y seleccionar el día destino
- Swap automático: si elegís mover el Lunes al Miércoles, el Miércoles pasa al Lunes

---

## 🏦 Promos y descuentos

- Sección de promos por banco / tarjeta / local (Carrefour, Coto, Día, etc.)
- Recordatorio al generar la lista de compras: "esta semana hay X% en Carrefour con [banco]"
- Podría ser un registro manual simple con fecha de vencimiento de la promo

---

## Otras mejoras (sugerencias propias)

**Variante Feli** — El modelo de datos ya tiene el campo previsto. Agregar en la pantalla de semana un toggle por día para ver la variante de Feli si existe.

**Compartir el plan semanal** — Exportar la semana como texto formateado listo para WhatsApp (no solo la lista de compras). "Dom: Asado / Lun: Tarta..."

**Notas por comida** — Campo libre por día: "quedó muy seco", "agregar más ajo la próxima". Se guarda en el historial junto con el plato.

**Rating de la semana** — Al guardar al historial, puntuar la semana del 1 al 5. Útil para detectar si las recomendaciones automáticas están funcionando bien.

**Editar el catálogo desde la app** — Agregar / modificar / borrar platos del listado base sin tener que tocar el código. Con sus ingredientes y proveedor.

**Cantidades en la lista de compras** — Hoy no hay cantidades. A futuro: opcional por ingrediente, configurable por plato.

**Historial de precios** — Registrar cuánto costó la compra semanal. Gráfico simple de evolución.

**Firebase sync** — Cuando se conecte el backend real, toda la data (semanas, freezer, catálogo) vive en Firestore y se sincroniza entre dispositivos. Prioridad alta si Yani también usa la app.

---

## Orden sugerido de implementación

1. Editar catálogo desde la app — desbloquea independencia del código
2. Variante Feli — ya está en el modelo, es poco trabajo
3. Recordatorios de prep previa — alto valor práctico, bajo costo
4. Freezer — agrega lógica nueva pero es autocontenida
5. Firebase sync — cuando el prototipo esté validado
6. Mover entre días — UX nice-to-have
7. Perfil nutricional — requiere clasificar todos los platos primero
8. Promos — dato manual, fácil de agregar
9. Rating y notas — mejora el ciclo de feedback a largo plazo
10. Cantidades e historial de precios — complejidad alta, valor diferido
