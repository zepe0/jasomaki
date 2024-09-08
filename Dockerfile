# Usar la imagen base de Ubuntu
FROM ubuntu:20.04

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Actualizar los paquetes del sistema e instalar Apache, Node.js, y npm
RUN apt-get update && apt-get install -y \
    apache2 \
    curl \
    nodejs \
    npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copiar archivos del proyecto (si es necesario)
COPY . .

# Exponer el puerto para Apache y Node.js
EXPOSE 80 5000

# Iniciar Apache en segundo plano y Node.js
CMD ["sh", "-c", "service apache2 start && npm start"]