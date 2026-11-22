---
name: open-game-skills-review
description: Use selected Open Game Skills checklists when reviewing game feel, locomotion, camera clearance, targeting, or playtest evidence in an existing Unity or Godot game.
---

# 전투·이동·카메라·플레이 검증

[고정 버전 원본](../../references/open-game-skills/README.md) 중 지금 문제에 필요한 문서 1~3개와 해당 엔진 어댑터만 읽는다. 예시 속도·타이밍은 프로젝트 값이 아니다. 사용자 범위와 프로젝트 지침이 우선한다. 이 문서는 설치, 실행, 프로젝트 변경, 커밋이나 푸시를 승인하지 않는다.

- **DOSA / Unity:** camera-anti-clip은 카메라의 벽 관통과 흔들림, attack-tell은 공격 예고 가시성, action-feel은 타격감과 타이밍. Unity 어댑터로 현재 업데이트 순서를 확인한다.
- **HO / Godot:** locomotion은 이동, target-priority는 타깃 선택, gameplay-validation은 플레이 증거. 화면 밖 적이 먼저 처치된다면 첫 실루엣과 표적 획득·발사·피해 시점을 대조한다. 카메라 영역과 실제 가시성, 장애물 가림을 구분한다. Godot 어댑터로 현재 물리 틱을 확인한다.
- 충돌 레이어는 collision-layers, 적 한 종류의 공격 간격과 대응 기회는 enemy-kit-balance.
- 빌드, 시작 장비, 입력 장치, 해상도와 카메라, 디버그 개입 여부, 재현 절차와 증거를 남긴다. 자동 입력과 강제 해금은 자연 플레이와 구분한다.
