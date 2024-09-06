# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar los archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm y las dependencias
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Exponer el puerto de desarrollo de Vite
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["pnpm", "run", "dev"]