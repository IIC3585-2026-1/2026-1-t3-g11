# Tarea 3: Knapsack (Mochila)

Aplicacion web para resolver el problema de la mochila 0/1: dado un peso maximo y una lista de paquetes (valor, peso), encontrar el subconjunto de paquetes que maximiza el valor total sin superar la capacidad.

## Objetivo de la tarea

Aprender a integrar un algoritmo intensivo en CPU en una app web y presentar claramente su funcionamiento.

## Problema que se resuelve

- Hay hasta n paquetes.
- Cada paquete i tiene:
  - peso W[i]
  - valor V[i]
- La mochila tiene capacidad maxima M.
- Un item puede tomarse una sola vez (0/1 knapsack).
- Se busca maximizar el valor total sin exceder M.

Salida esperada:

- Items elegidos
- Peso total
- Valor total

## Estado del proyecto

- Frontend sencillo en React + TypeScript + Vite.
- Interfaz para ingresar peso maximo y editar paquetes dinamicamente.
- Boton Calcular que ejecuta el algoritmo y muestra resultado.
- Estilo visual mejorado y responsivo para presentacion.

Implementacion del algoritmo:

- Archivo: src/knapsack.ts
- Tecnica: Programacion dinamica (tabla DP + reconstruccion de items)
- Complejidad: O(n * M)

## Validacion con el ejemplo de la pauta

Entrada:

- W = [12, 2, 1, 1, 4]
- V = [4, 2, 1, 2, 10]
- M = 15

Resultado mostrado por la app:

- Items elegidos: item 2, item 3, item 4, item 5
- Peso total: 8
- Valor total: 15

Coincide con el valor optimo esperado.

## Como ejecutar

Requisitos:

- Node.js 20+ (recomendado)

Comandos:

```bash
npm install
npm run dev
```

Para build de produccion:

```bash
npm run build
```

## Estructura principal

- src/App.tsx: interfaz, estado y render de solucion.
- src/knapsack.ts: algoritmo de mochila.
- src/Package.ts: modelo de paquete.
- src/styles.css: estilos visuales.

## Nota sobre WebAssembly (Wasm)

La UI y el flujo de demostracion ya estan listos.
Actualmente el solver esta implementado en TypeScript para validar funcionalidad de extremo a extremo.

Para cerrar el requerimiento completo de Wasm de la tarea, queda reemplazar la funcion de src/knapsack.ts por la llamada al modulo compilado con Emscripten y documentar:

1. Fuente exacta del codigo C/C++ usado (autor, enlace, licencia).
2. Comando de compilacion a Wasm.
3. Metodo de carga/invocacion desde el frontend.

## Uso de IA (transparencia)

Se uso IA como asistente para:

- mejorar claridad del frontend,
- revisar errores de TypeScript/JSX,
- estructurar documentacion.

El equipo entiende y puede explicar el algoritmo, las decisiones de implementacion y las pruebas realizadas.

## Autoevaluacion breve

- (40%) Cumplimiento funcional: Se resuelve correctamente el problema de mochila en la app.
- (30%) Transferencia de aprendizaje: Interfaz clara para mostrar entradas/salida y explicar el algoritmo.
- (20%) Uso de IA: asistencia para productividad, con validacion manual de resultados.
- (10%) Rigurosidad: se valida con caso de prueba oficial y build exitoso.
