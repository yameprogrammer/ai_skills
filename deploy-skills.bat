@echo off
title AI Agent Skills Deployer
chcp 65001 > nul
:: Execute the PowerShell script bypass policy to run interactive deployment
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy-skills.ps1"
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] An error occurred during execution. Please check your PowerShell version and execution permissions.
    pause
)
