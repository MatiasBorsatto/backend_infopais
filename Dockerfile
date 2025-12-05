FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Exponer puerto 80
EXPOSE 80

# Variable de entorno para el puerto
ENV PORT=80

# Iniciar aplicación
CMD ["node", "server.js"]