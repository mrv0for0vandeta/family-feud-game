# Expose local servers to the internet using ngrok
Write-Host "🚀 Exposing Family Feud servers to the internet..." -ForegroundColor Green
Write-Host ""

# Start ngrok for frontend (port 3000)
Write-Host "📡 Starting ngrok tunnel for frontend (port 3000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "ngrok http 3000 --log=stdout"

Start-Sleep -Seconds 2

# Start ngrok for Socket.IO (port 3001)
Write-Host "🔌 Starting ngrok tunnel for Socket.IO (port 3001)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "ngrok http 3001 --log=stdout"

Write-Host ""
Write-Host "✅ Both tunnels started!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Instructions:" -ForegroundColor Yellow
Write-Host "1. Check the ngrok windows for your public URLs"
Write-Host "2. Frontend URL: Look for 'Forwarding' in first window (e.g., https://abc123.ngrok.io)"
Write-Host "3. Socket URL: Look for 'Forwarding' in second window (e.g., https://xyz789.ngrok.io)"
Write-Host "4. Update .env file with Socket URL"
Write-Host "5. Share Frontend URL with Display machine"
Write-Host ""
Write-Host "⚠️  Note: Free ngrok URLs change on restart" -ForegroundColor Yellow
Write-Host "💡 Tip: Sign up at ngrok.com for permanent URLs" -ForegroundColor Cyan
