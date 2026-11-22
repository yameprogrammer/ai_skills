---
name: hyperframes-motion-reference
description: Choose and plan a small HyperFrames pilot for an intro, title card, promo, or product demo; consult selective choreography references for web UI without changing an existing media pipeline.
---

# 모션 참고와 HyperFrames 파일럿

필요한 작업에서만 이 가이드를 열어 사용한다. 기본 도구 설치, 전역 에이전트 설정 변경, 기존 작업 마이그레이션이나 게시를 승인하지 않는다. 외부 원문의 코드를 복제하지 않은 로컬 가이드다.

## 상황별 선택
- **영상 오버레이·인트로·짧은 홍보:** [HyperFrames 공식 문서](https://hyperframes.heygen.com/)와 [CLI 저장소](https://github.com/heygen-com/hyperframes)부터. HTML 중심의 편집 가능한 소스와 렌더된 MP4가 필요할 때만 시험. 업스트림 Apache-2.0, 샘플 폰트·음악·에셋 권리는 별도.
- **웹앱 인터랙션:** 기존 motion-foundations, motion-patterns를 우선하고 [Emil의 animate](https://aiforui.dev/skills/animate) 또는 [choreograph](https://aiforui.dev/skills/choreograph) 하나만 주제에 맞춰 읽는다. [DesignBookmark Motion](https://designbookmark.com/motion)은 동작 예시 탐색용이며, 코드를 곧바로 복제하거나 실행하지 않는다.
- **기존 Remotion 구성이나 Blender 편집본:** 원래 도구를 유지한다. HyperFrames는 타이포그래피·그래픽 컷을 비교할 때만 사용하며 일반 영상 편집이나 캐릭터 생성의 대체재가 아니다. 캐릭터 중심 본편, 립싱크 및 장시간 음악 루프는 기존 프로젝트 파이프라인 우선.

## 필요한 때 시작
1. 이 폴더의 [5초 비교 테스트](PILOT.md)를 기준으로 현재 작업에 효과가 있는지 정한다.
2. Node.js 22 이상과 FFmpeg 버전을 확인하고, 공식 CLI의 검증된 버전을 선택해 테스트용 프로젝트에만 고정한다. 전체 스킬 자동 설치 대신 필요한 문서부터 읽고, 초기화 시 별도 스킬 설치가 수반되는지 현재 버전 도움말을 확인한다.
3. 기존 산출물을 덮지 않는다. 공식 preview/render 단계로 렌더 후 한글 글리프, 프레임 타이밍, 안전 여백을 확인한다. 실제 적용 여부는 기존 도구와의 비교로 판단한다.

출발점: [Meng To의 모션 도구 목록](https://x.com/MengTo/status/2124195058408980677).
