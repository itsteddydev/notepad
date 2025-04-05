# Ejecutar backend
Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c cd backend && npm install && npx prisma migrate deploy && npm run start"

# Esperar unos segundos para que el backend inicie
Start-Sleep -Seconds 5

# Ejecutar frontend
Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c cd frontend && npm install && npm run dev"
