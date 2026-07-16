# 📡 하이브리드 스킬 로더 연동 가이드 (Agent Integration Guide)

이 문서는 AI 에이전트(Claude Code, Cursor, Windsurf 등)나 개발자가 직접 빌드하는 커스텀 에이전트 파이프라인에서 **[skill-loader](file:///C:/Users/parkp/Workspace/personal/ai_skills/skills/skill-loader/SKILL.md)**를 어떻게 세팅하고 주입하여 구동하는지 설명하는 매뉴얼입니다.

---

## 🛠️ 에이전트별 설치 및 설정 방법

### 1. 🤖 Claude Code
Claude Code는 프로젝트 디렉토리 하위의 `.claude/skills/` 디렉토리에 정의된 지침을 자동으로 로드하여 사용합니다.
*   **설치 방법**: 
    제공된 배포 스크립트(`deploy-skills.ps1` 또는 `deploy-skills.sh`)를 사용하여 `skill-loader` 만 프로젝트 루트로 복사해 이식합니다.
    ```powershell
    # 6번(수동 선택)을 선택하고 'skill-loader'를 입력하여 이식
    .\deploy-skills.ps1
    ```
*   **작동**: 
    이후 클로드가 작동할 때 유저의 요청을 감지하여 로컬 폴더 또는 원격 깃허브에서 관련 스킬을 자동으로 dynamic fetch해 와서 스스로 장착해 사용합니다.

---

### 2. 🧩 Cursor IDE
Cursor는 프로젝트 설정의 `Rules for AI` 또는 프로젝트 루트의 `.cursorrules` 파일을 통해 AI 전체 지침을 제어합니다.
*   **설치 방법**:
    1. 프로젝트 루트에 `.cursorrules` 파일을 생성(이미 있다면 열기)합니다.
    2. [skills/skill-loader/SKILL.md](file:///C:/Users/parkp/Workspace/personal/ai_skills/skills/skill-loader/SKILL.md)의 **`# Hybrid Skill Loader (AI Instruction)`** 이하 본문 텍스트 전체를 복사하여 `.cursorrules` 파일 맨 하단에 덧붙여 줍니다.
*   **작동**:
    Cursor의 채팅창(Ctrl + L 또는 Ctrl + K)에서 코딩을 요구하면, Cursor AI가 로컬 디렉토리 탐색 권한이나 웹 검색 기능(Composer Web Search)을 활용해 `SKILLS_INDEX.md` 및 원격 깃허브에서 적절한 스킬을 읽어와 코딩 품질을 자율 개선합니다.

---

### 3. 🌊 Windsurf IDE
Windsurf는 프로젝트의 작동 규칙을 `.windsurfrules` 파일을 통해 학습합니다.
*   **설치 방법**:
    1. 프로젝트 루트 디렉토리에 `.windsurfrules` 파일을 만듭니다.
    2. [skills/skill-loader/SKILL.md](file:///C:/Users/parkp/Workspace/personal/ai_skills/skills/skill-loader/SKILL.md)의 핵심 지침 내용을 복사하여 파일에 기입합니다.
*   **작동**:
    에이전트가 코딩을 진행할 때 시스템 규칙에 따라 `skills/` 디렉토리를 선제 스캔한 뒤, 코드를 짤 때 해당 모범 규칙을 로드하여 대입합니다.

---

### 4. 🐍 Custom Agent (Python / LangChain / CrewAI 등)
자체적으로 빌드하는 AI 에이전트 시스템에 이 300개의 스킬을 장착하는 최적의 방법은 **System Message 주입**과 **File/URL Read Tool 바인딩**입니다.

#### 📝 에이전트 세팅 파이썬 예제 코드
```python
import urllib.request
from langchain.agents import initialize_agent, Tool
from langchain.chat_models import ChatOpenAI

# 1. 스킬 로더 프롬프트를 에이전트의 System Message로 지정
system_prompt = """
You are equipped with a Dynamic Hybrid Skill Loader.
If the user asks you to perform a task (e.g., Godot coding, TDD, video editing, PDF control), 
you must check the index (https://raw.githubusercontent.com/yameprogrammer/ai_skills/main/SKILLS_INDEX.md) 
to find a matching skill ID.
If a match is found, fetch the raw markdown file from:
"https://raw.githubusercontent.com/yameprogrammer/ai_skills/main/skills/{skill-id}/SKILL.md"
and prepend its guidelines to your current instructions before solving the user's task.
"""

# 2. 에이전트가 깃허브 URL을 읽을 수 있도록 간단한 HTTP GET 툴 바인딩
def fetch_url(url: str) -> str:
    try:
        with urllib.request.urlopen(url) as response:
            return response.read().decode('utf-8')
    except Exception as e:
        return f"Error fetching: {str(e)}"

fetch_tool = Tool(
    name="read_url_content",
    func=fetch_url,
    description="Useful for fetching raw skill files from github repository."
)

# 3. 에이전트 초기화 (Tool 리스트에 fetch_tool 포함)
# 이제 에이전트는 유저 질문을 받으면 스스로 github에서 관련 SKILL.md 지침을 Fetch해와 뇌에 얹고 답변을 생성합니다.
```

---

## 🔗 원격 참조 저장소 주소
하이브리드 로더가 참조하는 공식 깃허브 레포지토리 정보는 다음과 같습니다.
*   **메인 깃허브 저장소**: `https://github.com/yameprogrammer/ai_skills`
*   **스킬 원본 Raw 경로**: `https://raw.githubusercontent.com/yameprogrammer/ai_skills/main/skills/<skill-name>/SKILL.md`
