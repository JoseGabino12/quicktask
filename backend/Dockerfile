# backend/Dockerfile
FROM python:3.10-slim

WORKDIR /app

# Copia y instala las dependencias del proyecto
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto del código de la aplicación
COPY . .

# Exponer el puerto 5001
EXPOSE 5001

# Comando para iniciar la aplicación
CMD ["python", "main.py"]