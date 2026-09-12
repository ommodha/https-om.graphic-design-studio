Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  ANTIGRAVITY GRAPHIC DESIGN STUDIO - GITHUB DEPLOYER" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

$repoUrl = Read-Host "Enter your GitHub Repository URL (e.g. https://github.com/username/graphic-design.git)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "Error: Repository URL cannot be empty." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "[1/3] Configuring Git Remote Origin..." -ForegroundColor Green
git remote remove origin 2>$null
git remote add origin $repoUrl

Write-Host "[2/3] Pushing source code to GitHub master..." -ForegroundColor Green
git branch -M master
git push -u origin master

Write-Host "[3/3] Deploying live website to GitHub Pages..." -ForegroundColor Green
npm run deploy:gh

Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  SUCCESS! Your Graphic Studio is live on GitHub Pages." -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
