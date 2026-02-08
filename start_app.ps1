Write-Host "Starting NoShowIQ..." -ForegroundColor Green

# Check if Docker is running
if (!(docker info)) {
    Write-Host "Error: Docker is not running. Please start Docker Desktop and try again." -ForegroundColor Red
    exit
}

Write-Host "Building and starting containers..." -ForegroundColor Cyan
docker-compose up --build -d

Write-Host "NoShowIQ is running!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "Backend: http://localhost:8000" -ForegroundColor White
Write-Host "Press any key to stop..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

docker-compose down
