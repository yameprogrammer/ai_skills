# deploy-skills.ps1
# AI Agent Skills 배포 및 이식 도구

# UTF-8 출력 보장
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "        AI Agent Skills Deployer Tool         " -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# 1. 대상 경로 입력 받기
$targetInput = Read-Host "스킬을 배포할 대상 프로젝트의 절대 경로를 입력하세요"
if (-not $targetInput) {
    Write-Warning "경로가 입력되지 않았습니다. 프로그램을 종료합니다."
    exit
}

# 윈도우 스타일 경로로 변환
$targetPath = [System.IO.Path]::GetFullPath($targetInput)

if (-not (Test-Path -Path $targetPath)) {
    Write-Warning "입력하신 경로가 존재하지 않습니다: $targetPath"
    $createDir = Read-Host "해당 경로에 새 폴더를 생성할까요? (Y/N)"
    if ($createDir -eq 'Y' -or $createDir -eq 'y') {
        New-Item -ItemType Directory -Force -Path $targetPath | Out-Null
        Write-Host "폴더를 생성했습니다: $targetPath"
    } else {
        Write-Error "종료합니다."
        exit
    }
}

# 2. 스킬 패키지 선택
Write-Host "`n배포할 스킬 패키지를 선택해 주세요:" -ForegroundColor Yellow
Write-Host "1) Anthropic 공식 스킬 세트 (17개 스킬)"
Write-Host "2) Superpowers 개발 워크플로우 규율 세트 (14개 스킬)"
Write-Host "3) ECC 성능 최적화 스킬 세트 (268개 스킬)"
Write-Host "4) Claude Code Game Studios (CCGS) 통합 게임 개발 스튜디오 템플릿 (49개 에이전트 & 73개 스킬 전체)"
Write-Host "5) 모든 개별 스킬 통합 배포 (299개 스킬 전체)"
Write-Host "6) 특정 개별 스킬 수동 선택 (쉼표로 구분)"

$choice = Read-Host "선택 (1-6)"

# 대상 폴더 하위 경로 정의
$destSkillsPath = Join-Path $targetPath ".claude/skills"
$destAgentsPath = Join-Path $targetPath ".claude/agents"

# 앤트로픽 스킬 리스트
$anthropicSkills = @('docx', 'pdf', 'pptx', 'xlsx', 'algorithmic-art', 'brand-guidelines', 'canvas-design', 'claude-api', 'doc-coauthoring', 'frontend-design', 'internal-comms', 'mcp-builder', 'skill-creator', 'slack-gif-creator', 'theme-factory', 'web-artifacts-builder', 'webapp-testing')

# 슈퍼파워 스킬 리스트
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
            Write-Host "복사 중: $skill -> .claude/skills/$skill"
            Copy-Item -Path $src -Destination $destSkillsPath -Recurse -Force
            $copiedCount++
        } else {
            Write-Warning "스킬을 찾을 수 없어 건너뜁니다: $skill"
        }
    }
    return $copiedCount
}

switch ($choice) {
    "1" {
        $count = Copy-Skills -skillList $anthropicSkills
        Write-Host "`n[성공] Anthropic 공식 스킬 세트(총 $count개)가 배포되었습니다!" -ForegroundColor Green
    }
    "2" {
        $count = Copy-Skills -skillList $superpowersSkills
        Write-Host "`n[성공] Superpowers 워크플로우 스킬 세트(총 $count개)가 배포되었습니다!" -ForegroundColor Green
    }
    "3" {
        Write-Host "스킬 목록을 파싱 중..."
        $allSkills = Get-ChildItem -Path "skills" -Directory | Select-Object -ExpandProperty Name
        $eccSkills = $allSkills | Where-Object { $_ -notin $anthropicSkills -and $_ -notin $superpowersSkills }
        $count = Copy-Skills -skillList $eccSkills
        Write-Host "`n[성공] ECC 성능 최적화 스킬 세트(총 $count개)가 배포되었습니다!" -ForegroundColor Green
    }
    "4" {
        # Game Studios 템플릿 통째 복사
        $srcGS = "templates/game-studios/.claude"
        if (-not (Test-Path -Path $srcGS)) {
            Write-Error "Game Studios 템플릿을 찾을 수 없습니다. 서브모듈 동기화가 필요합니다."
            exit
        }
        
        Write-Host "Game Studios 템플릿 구조 복사 중..." -ForegroundColor Yellow
        
        # 1. .claude 폴더 통째 복사
        Copy-Item -Path $srcGS -Destination $targetPath -Recurse -Force
        
        # 2. 기타 폴더 구조들 (design, production 등) 복사
        $foldersToCopy = @('design', 'production', 'docs', 'tests')
        foreach ($folder in $foldersToCopy) {
            $srcFolder = Join-Path "templates/game-studios" $folder
            $destFolder = Join-Path $targetPath $folder
            if (Test-Path -Path $srcFolder) {
                if (-not (Test-Path -Path $destFolder)) {
                    Copy-Item -Path $srcFolder -Destination $targetPath -Recurse -Force
                    Write-Host "폴더 복사: templates/game-studios/$folder -> $destFolder"
                } else {
                    Write-Host "폴더가 이미 존재하여 덮어쓰지 않습니다: $destFolder"
                }
            }
        }
        
        # CLAUDE.md 복사
        $srcClaudeMd = "templates/game-studios/CLAUDE.md"
        $destClaudeMd = Join-Path $targetPath "CLAUDE.md"
        if (Test-Path -Path $srcClaudeMd -and -not (Test-Path -Path $destClaudeMd)) {
            Copy-Item -Path $srcClaudeMd -Destination $destClaudeMd -Force
            Write-Host "CLAUDE.md 파일 복사 완료"
        }
        
        Write-Host "`n[성공] Claude Code Game Studios 템플릿 구조가 타겟 프로젝트에 통째로 세팅되었습니다!" -ForegroundColor Green
    }
    "5" {
        $allSkills = Get-ChildItem -Path "skills" -Directory | Select-Object -ExpandProperty Name
        $count = Copy-Skills -skillList $allSkills
        Write-Host "`n[성공] 모든 개별 스킬(총 $count개)이 배포되었습니다!" -ForegroundColor Green
    }
    "6" {
        $inputSkills = Read-Host "배포할 스킬명들을 쉼표(,)로 구분하여 입력하세요 (예: docx, pdf, context-budget)"
        if ($inputSkills) {
            $selectedSkills = $inputSkills.Split(',') | ForEach-Object { $_.Trim() }
            $count = Copy-Skills -skillList $selectedSkills
            Write-Host "`n[성공] 선택하신 스킬(총 $count개)이 배포되었습니다!" -ForegroundColor Green
        }
    }
    Default {
        Write-Warning "올바른 번호를 선택해 주세요."
    }
}

Write-Host "`n배포 완료! 대상 프로젝트 경로($targetPath)에서 AI 에이전트를 가동해 보세요." -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
