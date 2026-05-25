# ExpoStands Panamá

Sitio web corporativo de ExpoStands Panamá — fabricación de stands, exhibidores y mobiliario comercial.

## Stack

- [Astro](https://astro.build) 5.x — static site generator
- Nginx 1.27-alpine — servidor web (multi-stage Docker)
- Cloudflare R2 — almacenamiento y CDN de imágenes
- Docker + Docker Compose — build y despliegue

## Desarrollo

```bash
npm install
npm run dev
```

## Docker

```bash
# Build
docker compose build

# Build y arrancar
docker compose up -d

# Con variables de entorno (para R2)
PUBLIC_R2_PUBLIC_URL=https://pub-tu-bucket.r2.dev docker compose up -d --build
```

### Estructura

```
├── Dockerfile          # Multi-stage: Node build → Nginx serve
├── docker-compose.yml  # Orquestación con volúmenes para uploads y SSL
├── nginx.conf          # Gzip, security headers, Cloudflare real-IP, cache
└── data/uploads/       # Volumen para imágenes subidas al VPS (gitignored)
```

## Imágenes

El proyecto soporta dos backends de imágenes intercambiables mediante `PUBLIC_R2_PUBLIC_URL`:

| Variable | Valor | Comportamiento |
|---|---|---|
| `PUBLIC_R2_PUBLIC_URL=https://pub-xxx.r2.dev` | URL pública del bucket R2 | Genera `https://pub-xxx.r2.dev/ruta/imagen.jpg` |
| `PUBLIC_R2_PUBLIC_URL=` (vacío) | Fallback local | Genera `/uploads/ruta/imagen.jpg` (volumen montado en `/data/uploads/`) |

Usa la función helper `r2()` desde cualquier `.astro`:

```astro
---
import { r2 } from "../constants";
---
<img src={r2("proyectos/stand-1.jpg")} alt="Stand comercial" />
```

### Recomendación de tamaños

| Componente | Ancho máx. contenedor | Alto | Resolución recomendada |
|---|---|---|---|
| Hero | 480px | auto | 1200×800px |
| Projects cards | ~580px | 200px fijo | 1200×500px (object-fit: cover) |
| Materials cards | ~300px | auto | 1200×900px |

## Cloudflare

Si usas Cloudflare como proxy, Nginx tiene configurados los rangos de IP oficiales de Cloudflare (`set_real_ip_from`) para detectar la IP real del visitante mediante `CF-Connecting-IP`.

### Restringir acceso por país

Crear una Firewall Rule en Cloudflare Dashboard → Security → WAF:

- Campo: `Country`
- Operador: `equals`
- Valor: `PA`
- Acción: `Allow`

## SSL

El `docker-compose.yml` incluye un servicio `certbot` comentado para SSL con Let's Encrypt. Descomentarlo y configurar el dominio cuando sea necesario.

Con Cloudflare proxy activado no hace falta — Cloudflare maneja el SSL en el edge y la conexión al origen puede ser HTTP.
