# deploy-skills.ps1
# AI Agent Skills Deployment & Translocation Tool

$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "        AI Agent Skills Deployer Tool         " -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# 1. Input Target Path
$targetInput = Read-Host "Enter the absolute path of the target project to deploy skills"
if (-not $targetInput) {
    Write-Warning "Target path is empty. Exiting."
    exit
}

# Resolve target path
$targetPath = [System.IO.Path]::GetFullPath($targetInput)

if (-not (Test-Path -Path $targetPath)) {
    Write-Warning "Target path does not exist: $targetPath"
    $createDir = Read-Host "Do you want to create this directory? (y/n)"
    if ($createDir -eq 'y' -or $createDir -eq 'Y') {
        New-Item -ItemType Directory -Force -Path $targetPath | Out-Null
        Write-Host "Created directory: $targetPath"
    } else {
        Write-Error "Exiting."
        exit
    }
}

# 2. Select Skill Package
Write-Host "`nSelect a skill package to deploy:" -ForegroundColor Yellow
Write-Host "1) Anthropic Official Skill Set (17 skills)"
Write-Host "2) Superpowers Workflow & Discipline Set (14 skills)"
Write-Host "3) ECC Performance Optimization Set (268 skills)"
Write-Host "4) Claude Code Game Studios (CCGS) Template (49 agents and 73 skills structure)"
Write-Host "5) All Individual Skills Combined (312 skills)"
Write-Host "6) Manual Selection (Comma-separated skill folder names)"
Write-Host "7) Claude Code Video Toolkit (Remotion) Template (digitalsamba)"

$choice = Read-Host "Choice (1-7)"

# Define destination subfolders
$destSkillsPath = Join-Path $targetPath ".claude/skills"
$destAgentsPath = Join-Path $targetPath ".claude/agents"

# Anthropic skills list
$anthropicSkills = @('docx', 'pdf', 'pptx', 'xlsx', 'algorithmic-art', 'brand-guidelines', 'canvas-design', 'claude-api', 'doc-coauthoring', 'frontend-design', 'internal-comms', 'mcp-builder', 'skill-creator', 'slack-gif-creator', 'theme-factory', 'web-artifacts-builder', 'webapp-testing')

# Superpowers skills list
$superpowersSkills = @('brainstorming', 'dispatching-parallel-agents', 'executing-plans', 'finishing-a-development-branch', 'receiving-code-review', 'requesting-code-review', 'subagent-driven-development', 'systematic-debugging', 'test-driven-development', 'using-git-worktrees', 'using-superpowers', 'verification-before-completion', 'writing-plans', 'writing-skills')

function Copy-Skills {
    param(
        [string[]]$skillList
    )
    if (-not (Test-Path -Path $destSkillsPath)) {
        New-Item -ItemType Directory -Force -Path $destSkillsPath | Out-Null
    }
    
    $copiedCount = 0
    foreach ($skill in $skillList) {
        $src = Join-Path "skills" $skill
        if (Test-Path -Path $src) {
            Write-Host "Copying: $skill -> .claude/skills/$skill"
            Copy-Item -Path $src -Destination $destSkillsPath -Recurse -Force
            $copiedCount++
        } else {
            Write-Warning "Skill directory not found, skipping: $skill"
        }
    }
    return $copiedCount
}

switch ($choice) {
    "1" {
        $count = Copy-Skills -skillList $anthropicSkills
        Write-Host "`n[Success] Anthropic official skills ($count skills) deployed successfully!" -ForegroundColor Green
    }
    "2" {
        $count = Copy-Skills -skillList $superpowersSkills
        Write-Host "`n[Success] Superpowers workflow skills ($count skills) deployed successfully!" -ForegroundColor Green
    }
    "3" {
        Write-Host "Parsing skill list..."
        $allSkills = Get-ChildItem -Path "skills" -Directory | Select-Object -ExpandProperty Name
        $eccSkills = $allSkills | Where-Object { $_ -notin $anthropicSkills -and $_ -notin $superpowersSkills -and $_ -ne 'clipify' -and $_ -ne 'video-use' -and $_ -ne 'youtube-clipper' -and $_ -ne 'remotion-best-practices' -and $_ -ne 'video-copywriting' -and $_ -ne 'video-ui-ux-design' -and $_ -ne 'video-producer' -and $_ -ne 'promo-video' -and -not $_.StartsWith('godot-') }
        $count = Copy-Skills -skillList $eccSkills
        Write-Host "`n[Success] ECC optimization skills ($count skills) deployed successfully!" -ForegroundColor Green
    }
    "4" {
        # Game Studios Template Copy
        $srcGS = "templates/game-studios/.claude"
        if (-not (Test-Path -Path $srcGS)) {
            Write-Error "Game Studios template not found. Submodule sync is required."
            exit
        }
        
        Write-Host "Copying Game Studios template structure..." -ForegroundColor Yellow
        
        # 1. Copy .claude folder
        Copy-Item -Path $srcGS -Destination $targetPath -Recurse -Force
        
        # 2. Copy other workspace folders
        $foldersToCopy = @('design', 'production', 'docs', 'tests')
        foreach ($folder in $foldersToCopy) {
            $srcFolder = Join-Path "templates/game-studios" $folder
            $destFolder = Join-Path $targetPath $folder
            if (Test-Path -Path $srcFolder) {
                if (-not (Test-Path -Path $destFolder)) {
                    Copy-Item -Path $srcFolder -Destination $targetPath -Recurse -Force
                    Write-Host "Copied folder: templates/game-studios/$folder -> $destFolder"
                } else {
                    Write-Host "Folder already exists, skipping: $destFolder"
                }
            }
        }
        
        # Copy CLAUDE.md
        $srcClaudeMd = "templates/game-studios/CLAUDE.md"
        $destClaudeMd = Join-Path $targetPath "CLAUDE.md"
        if (Test-Path -Path $srcClaudeMd -and -not (Test-Path -Path $destClaudeMd)) {
            Copy-Item -Path $srcClaudeMd -Destination $destClaudeMd -Force
            Write-Host "CLAUDE.md file copied successfully"
        }
        
        Write-Host "`n[Success] Claude Code Game Studios template deployed successfully!" -ForegroundColor Green
    }
    "5" {
        $allSkills = Get-ChildItem -Path "skills" -Directory | Select-Object -ExpandProperty Name
        $count = Copy-Skills -skillList $allSkills
        Write-Host "`n[Success] All individual skills ($count skills) deployed successfully!" -ForegroundColor Green
    }
    "6" {
        $inputSkills = Read-Host "Enter skill names separated by commas (e.g. docx, pdf, context-budget)"
        if ($inputSkills) {
            $selectedSkills = $inputSkills.Split(',') | ForEach-Object { $_.Trim() }
            $count = Copy-Skills -skillList $selectedSkills
            Write-Host "`n[Success] Selected skills ($count skills) deployed successfully!" -ForegroundColor Green
        }
    }
    "7" {
        # Video Toolkit (digitalsamba) Template Copy
        $srcVT = "templates/video-toolkit"
        if (-not (Test-Path -Path $srcVT)) {
            Write-Error "Video Toolkit template not found. Submodule sync is required."
            exit
        }
        
        Write-Host "Copying Video Toolkit template structure..." -ForegroundColor Yellow
        
        # Copy files excluding git repository files
        Copy-Item -Path "$srcVT/*" -Destination $targetPath -Recurse -Force -Exclude ".git"
        
        Write-Host "`n[Success] Claude Code Video Toolkit template deployed successfully!" -ForegroundColor Green
    }
    Default {
        Write-Warning "Invalid choice."
    }
}

Write-Host "`nDeployment complete! You can now run Claude Code in target path: $targetPath" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
