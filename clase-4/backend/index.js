// index.js
import http from "node:http";
import { randomUUID } from "node:crypto";

const places = [
  {
    id: randomUUID(),
    name: "Rosario",
    lat: -32.9587,
    lng: -60.6930,
    date: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    name: "Santa Fe Capital",
    lat: -31.6333,
    lng: -60.7000,
    date: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    name: "Reconquista",
    lat: -29.1442,
    lng: -59.6417,
    date: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    name: "Venado Tuerto",
    lat: -33.7456,
    lng: -61.9689,
    date: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    name: "San Justo",
    lat: -30.7894,
    lng: -60.5917,
    date: new Date().toISOString(),
  },
];

const server = http.createServer((req, res) => {
  // Configuración básica de CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Manejo de preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    res.writeHead(204); // No Content
    res.end();
    return;
  }

  if (req.url === "/places" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(places));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

const PORT = 3000; // 65535 puertos disponibles, 1024 reservados para el sistema

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
