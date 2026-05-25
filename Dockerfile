FROM node:20-alpine AS build

ARG PUBLIC_WHATSAPP_NUMBER
ARG PUBLIC_R2_PUBLIC_URL
ENV PUBLIC_WHATSAPP_NUMBER=$PUBLIC_WHATSAPP_NUMBER
ENV PUBLIC_R2_PUBLIC_URL=$PUBLIC_R2_PUBLIC_URL

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production && npm cache clean --force

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS serve

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

LABEL org.opencontainers.image.title="ExpoStands Panamá"
LABEL org.opencontainers.image.description="Sitio web de ExpoStands Panamá"
LABEL org.opencontainers.image.version="1.0.0"

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1
