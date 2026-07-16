#!/bin/bash

# ANSI Color Codes
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}==============================================${NC}"
echo -e "${CYAN}        AI Agent Skills Deployer Tool         ${NC}"
echo -e "${CYAN}==============================================${NC}"

# 1. Target directory input
read -p "Enter the absolute path of the target project to deploy skills: " target_input

if [ -z "$target_input" ]; then
    echo -e "${RED}Target path is empty. Exiting.${NC}"
    exit 1
fi

# Expand tilde ~ to absolute path
target_path="${target_input/#\~/$HOME}"

# Resolve target path
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    target_path=$(cd "$target_path" 2>/dev/null && pwd || echo "$target_path")
else
    target_path=$(realpath "$target_path" 2>/dev/null || echo "$target_path")
fi

if [ ! -d "$target_path" ]; then
    echo -e "${YELLOW}Target path does not exist: $target_path${NC}"
    read -p "Do you want to create this directory? (y/n): " create_dir
    if [[ "$create_dir" =~ ^[Yy]$ ]]; then
        mkdir -p "$target_path"
        echo "Created directory: $target_path"
    else
        echo "Exiting."
        exit 1
    fi
fi

# Target subdirectories
dest_skills_path="$target_path/.claude/skills"
dest_agents_path="$target_path/.claude/agents"

# Anthropic skills list
anthropic_skills=("docx" "pdf" "pptx" "xlsx" "algorithmic-art" "brand-guidelines" "canvas-design" "claude-api" "doc-coauthoring" "frontend-design" "internal-comms" "mcp-builder" "skill-creator" "slack-gif-creator" "theme-factory" "web-artifacts-builder" "webapp-testing")

# Superpowers skills list
superpowers_skills=("brainstorming" "dispatching-parallel-agents" "executing-plans" "finishing-a-development-branch" "receiving-code-review" "requesting-code-review" "subagent-driven-development" "systematic-debugging" "test-driven-development" "using-git-worktrees" "using-superpowers" "verification-before-completion" "writing-plans" "writing-skills")

copy_skills() {
    local -a skills_to_copy=("${!1}")
    mkdir -p "$dest_skills_path"
    local copied_count=0
    for skill in "${skills_to_copy[@]}"; do
        local src="skills/$skill"
        if [ -d "$src" ]; then
            echo "Copying: $skill -> .claude/skills/$skill"
            cp -r "$src" "$dest_skills_path/"
            copied_count=$((copied_count + 1))
        else
            echo -e "${YELLOW}Skill directory not found, skipping: $skill${NC}"
        fi
    done
    echo "$copied_count"
}

# 2. Select package
echo -e "\n${YELLOW}Select a skill package to deploy:${NC}"
echo "1) Anthropic Official Skill Set (17 skills)"
echo "2) Superpowers Workflow & Discipline Set (14 skills)"
echo "3) ECC Performance Optimization Set (268 skills)"
echo "4) Claude Code Game Studios (CCGS) Template (49 agents & 73 skills structure)"
echo "5) All Individual Skills Combined (313 skills)"
echo "6) Manual Selection (Comma-separated skill folder names)"
echo "7) Claude Code Video Toolkit (Remotion) Template (digitalsamba)"

read -p "Choice (1-7): " choice

case "$choice" in
    1)
        count=$(copy_skills anthropic_skills[@])
        echo -e "\n${GREEN}[Success] Anthropic official skills (${count} skills) deployed successfully!${NC}"
        ;;
    2)
        count=$(copy_skills superpowers_skills[@])
        echo -e "\n${GREEN}[Success] Superpowers workflow skills (${count} skills) deployed successfully!${NC}"
        ;;
    3)
        echo "Parsing skill list..."
        ecc_skills=()
        for dir in skills/*/; do
            dir_name=$(basename "$dir")
            # 제외할 리스트 필터링
            if [ "$dir_name" == "clipify" ] || [ "$dir_name" == "video-use" ] || [ "$dir_name" == "youtube-clipper" ] || [ "$dir_name" == "remotion-best-practices" ] || [ "$dir_name" == "video-copywriting" ] || [ "$dir_name" == "video-ui-ux-design" ] || [ "$dir_name" == "video-producer" ] || [ "$dir_name" == "promo-video" ] || [ "$dir_name" == "skill-loader" ] || [[ "$dir_name" =~ ^godot- ]]; then
                continue
            fi
            in_anthropic=0
            for item in "${anthropic_skills[@]}"; do
                if [ "$item" == "$dir_name" ]; then
                    in_anthropic=1
                    break
                fi
            done
            in_superpowers=0
            for item in "${superpowers_skills[@]}"; do
                if [ "$item" == "$dir_name" ]; then
                    in_superpowers=1
                    break
                fi
            done
            if [ $in_anthropic -eq 0 ] && [ $in_superpowers -eq 0 ]; then
                ecc_skills+=("$dir_name")
            fi
        done
        count=$(copy_skills ecc_skills[@])
        echo -e "\n${GREEN}[Success] ECC optimization skills (${count} skills) deployed successfully!${NC}"
        ;;
    4)
        src_gs="templates/game-studios/.claude"
        if [ ! -d "$src_gs" ]; then
            echo -e "${RED}Error: Game Studios template not found. Submodule sync is required.${NC}"
            exit 1
        fi
        echo -e "${YELLOW}Copying Game Studios template structure...${NC}"
        cp -r "$src_gs" "$target_path/"
        
        folders_to_copy=("design" "production" "docs" "tests")
        for folder in "${folders_to_copy[@]}"; do
            src_folder="templates/game-studios/$folder"
            dest_folder="$target_path/$folder"
            if [ -d "$src_folder" ]; then
                if [ ! -d "$dest_folder" ]; then
                    cp -r "$src_folder" "$target_path/"
                    echo "Copied folder: templates/game-studios/$folder -> $dest_folder"
                else
                    echo "Folder already exists, skipping: $dest_folder"
                fi
            fi
        done
        
        src_claudemd="templates/game-studios/CLAUDE.md"
        dest_claudemd="$target_path/CLAUDE.md"
        if [ -f "$src_claudemd" ] && [ ! -f "$dest_claudemd" ]; then
            cp "$src_claudemd" "$dest_claudemd"
            echo "CLAUDE.md file copied successfully"
        fi
        echo -e "\n${GREEN}[Success] Claude Code Game Studios template deployed successfully!${NC}"
        ;;
    5)
        all_skills=()
        for dir in skills/*/; do
            all_skills+=($(basename "$dir"))
        done
        count=$(copy_skills all_skills[@])
        echo -e "\n${GREEN}[Success] All individual skills (${count} skills) deployed successfully!${NC}"
        ;;
    6)
        read -p "Enter skill names separated by commas (e.g. docx, pdf, context-budget): " input_skills
        IFS=',' read -ra selected_skills <<< "$input_skills"
        trimmed_skills=()
        for skill in "${selected_skills[@]}"; do
            skill=$(echo "$skill" | xargs)
            trimmed_skills+=("$skill")
        done
        count=$(copy_skills trimmed_skills[@])
        echo -e "\n${GREEN}[Success] Selected skills (${count} skills) deployed successfully!${NC}"
        ;;
    7)
        src_vt="templates/video-toolkit"
        if [ ! -d "$src_vt" ]; then
            echo -e "${RED}Error: Video Toolkit template not found. Submodule sync is required.${NC}"
            exit 1
        fi
        echo -e "${YELLOW}Copying Video Toolkit template structure...${NC}"
        cp -r "$src_vt"/* "$target_path/"
        echo -e "\n${GREEN}[Success] Claude Code Video Toolkit template deployed successfully!${NC}"
        ;;
    *)
        echo -e "${RED}Invalid choice.${NC}"
        ;;
esac

echo -e "\n${CYAN}Deployment complete! You can now run Claude Code in target path: $target_path${NC}"
echo -e "${CYAN}==============================================${NC}"
