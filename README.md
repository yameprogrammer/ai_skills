# AI 에이전트 스킬 저장소 (AI Agent Skills Repository)

이 저장소는 AI 에이전트 및 LLM(대형 언어 모델)이 동적으로 로드하여 동작할 수 있는 다양한 **에이전트 스킬(Agent Skills)**을 수집하고 직접 개발하여 관리하는 중앙 허브입니다.

---

## 🔍 전체 스킬 찾아보기 (Skills Directory)

현재 저장소에 탑재되어 있는 17가지 스킬의 용도, 분류, 출처 및 라이선스는 **[SKILLS_INDEX.md (스킬 색인 대장)](file:///C:/Users/parkp/Workspace/personal/ai_skills/SKILLS_INDEX.md)**에서 한눈에 확인하실 수 있습니다. 

---

## ⚠️ 에이전트 및 AI 적용 전 필독 가이드 (Read Before Use)

이 디렉토리에 수집되어 있는 스킬들은 다양한 출처(Anthropic 공식 스킬 등)에서 수집된 리소스입니다. 다른 AI 에이전트 환경이나 타사 LLM(OpenAI, Google 등)에 이 스킬들을 이식하여 탑재하기 전에 **반드시 아래 지침에 맞추어 적절한 튜닝과 환경 세팅을 진행해야 합니다.**

### 1. 모델별 프롬프트 최적화 (Model-Specific Tuning)
* **Claude 최적화 양식의 변환**: Anthropic의 공식 스킬들은 Claude 모델에 최적화되어 있어, 규칙 제어를 위해 XML 태그(`<guidelines>`, `<example>` 등)와 생각의 사슬(Chain of Thought) 기법을 적극 활용합니다.
* **타사 LLM 적용 시**: GPT-4, Gemini 등 타사 LLM에 스킬을 적용할 때는 모델의 성향에 따라 XML 태그 형식을 일반 마크다운(Markdown)이나 JSON 형식의 지침으로 변경하고 핵심 규칙을 단순화할 것을 권장합니다.

### 2. 실행 환경 및 도구 의존성 세팅 (Tool & Dependency Setup)
* **실행 코드 존재**: 일부 기술적 스킬(예: `docx`, `xlsx`, `webapp-testing` 등)은 단순 지침 외에 백엔드에서 실행될 Python 코드나 Node.js 도구를 포함하고 있습니다.
* **도구 연동(Tool Calling)**: 에이전트 실행 환경에 필요한 패키지(`python-docx`, `openpyxl`, `playwright` 등)가 사전에 설치되어 있어야 하며, 에이전트 프레임워크(LangChain, CrewAI, AutoGen 등)에 해당 스크립트를 호출할 수 있는 Function/Tool API 형태로 래핑하여 제공해야 합니다.

---

## 📌 스킬 관리 및 갱신 규칙 (Management Rules)

새로운 스킬을 제작하여 추가하거나 외부에서 가져올 때는 **반드시 다음 두 가지 규칙을 함께 준수해야 합니다.**

1. **폴더 구조 유지**: 모든 스킬은 `skills/` 하위에 고유 폴더명으로 생성되어야 하며, 폴더 내에 `SKILL.md`가 포함되어야 합니다.
2. **색인 문서 동시 갱신**: 스킬의 추가, 수정, 삭제가 발생할 경우 **[SKILLS_INDEX.md (스킬 색인 대장)](file:///C:/Users/parkp/Workspace/personal/ai_skills/SKILLS_INDEX.md)**의 카테고리 인덱스와 관리 목록 테이블을 **동시에 갱신**하여 관리 일관성을 유지합니다.

---

## 📂 저장소 구조 (Directory Structure)

```
📂 ai_skills/ (Root)
 ┣ 📄 README.md                (본 가이드 문서)
 ┣ 📄 SKILLS_INDEX.md          (스킬 색인 및 출처 정보 대장)
 ┣ 📂 skills/                  (실제 탑재되는 개별 스킬 폴더들)
 ┃ ┣ 📂 docx/
 ┃ ┣ 📂 pdf/
 ┃ ┗ ... (총 17개 스킬)
 ┗ 📂 templates/               (커스텀 스킬 작성을 위한 기본 템플릿)
```

---

## 🛠️ 커스텀 스킬 생성 방법

새로운 스킬을 제작하여 이 저장소에 추가할 때는 `templates/` 폴더 내의 구조를 복사하여 사용합니다.

1. `skills/` 하위에 고유한 이름의 폴더를 생성합니다. (예: `skills/my-custom-task`)
2. 폴더 내에 `SKILL.md` 파일을 작성하고, 상단에 아래와 같이 Frontmatter를 기입합니다.
   ```markdown
   ---
   name: my-custom-task
   description: 이 스킬이 실행되어야 하는 상황과 목적을 에이전트가 판단할 수 있도록 상세히 적습니다.
   ---
   # 내 커스텀 스킬 제목
   
   이곳에 에이전트가 수행할 지침과 규칙을 작성합니다.
   ```
3. 코드가 필요한 스킬일 경우 `scripts/` 폴더를 생성하고 스크립트 파일을 추가합니다.
4. 작성이 끝나면 **[SKILLS_INDEX.md](file:///C:/Users/parkp/Workspace/personal/ai_skills/SKILLS_INDEX.md)**를 갱신합니다.
