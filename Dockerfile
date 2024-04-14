# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de la aplicación al directorio de trabajo
COPY package.json .
COPY package-lock.json .
COPY index.js .

# Instala las dependencias de la aplicación
RUN npm install

# Expone el puerto en el que la aplicación Express está escuchando
EXPOSE 3001

# Ejecuta el comando para iniciar la aplicación
CMD ["node", "index.js"]
