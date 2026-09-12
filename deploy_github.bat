@echo off
echo ========================================================
echo   ANTIGRAVITY GRAPHIC DESIGN STUDIO - GITHUB DEPLOYER
echo ========================================================
echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/username/graphic-design.git): "

if "%REPO_URL%"=="" (
    echo Error: Repository URL cannot be empty.
    pause
    exit /b
)

echo.
echo [1/3] Adding Git Remote Origin...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [2/3] Pushing source code to GitHub master branch...
git branch -M master
git push -u origin master

echo [3/3] Deploying standalone website to GitHub Pages...
npm run deploy:gh

echo.
echo ========================================================
echo   DEPLOYMENT COMPLETE! Your app is live on GitHub Pages.
echo ========================================================
pause
