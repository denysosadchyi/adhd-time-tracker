# Tauri Widget Setup and Run Script

Write-Host "Checking prerequisites..." -ForegroundColor Cyan

# Check Node.js
$nodeInstalled = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeInstalled) {
    Write-Host "Node.js is not installed." -ForegroundColor Yellow
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Or use winget: winget install OpenJS.NodeJS" -ForegroundColor Yellow
    exit 1
} else {
    Write-Host "Node.js found: $(node --version)" -ForegroundColor Green
}

# Check Rust
$rustInstalled = Get-Command cargo -ErrorAction SilentlyContinue
if (-not $rustInstalled) {
    Write-Host "Rust is not installed." -ForegroundColor Yellow
    Write-Host "Installing Rust..." -ForegroundColor Cyan
    Write-Host "Please visit https://rustup.rs/ and run the installer" -ForegroundColor Yellow
    Write-Host "Or use winget: winget install Rustlang.Rustup" -ForegroundColor Yellow
    exit 1
} else {
    Write-Host "Rust found: $(cargo --version)" -ForegroundColor Green
}

# Install dependencies
Write-Host "`nInstalling npm dependencies..." -ForegroundColor Cyan
npm install

# Install Tauri CLI if not present
$tauriInstalled = Get-Command tauri -ErrorAction SilentlyContinue
if (-not $tauriInstalled) {
    Write-Host "Installing Tauri CLI globally..." -ForegroundColor Cyan
    npm install -g @tauri-apps/cli
}

# Run the widget
Write-Host "`nStarting Tauri widget..." -ForegroundColor Cyan
npm run dev

