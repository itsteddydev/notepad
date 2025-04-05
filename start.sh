#!/bin/bash

# Navegar al backend y ejecutarlo
echo "Iniciando backend..."
cd backend
npm install
npx prisma migrate deploy
npm run start &

# Esperar unos segundos para que el backend inicie
sleep 5

# Navegar al frontend y ejecutarlo
echo "Iniciando frontend..."
cd ../frontend
npm install
npm run dev &
