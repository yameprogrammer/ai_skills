---
name: blender-director-previz
description: 3D 블렌더 프리비즈(Blocking)를 설계하여 AI 영상 생성용 모션/카메라 가이드 비디오와 프롬프트를 자동 분리 생성하는 스킬
triggers:
  - "3D 프리비즈 연출"
  - "블렌더 액션 블로킹"
  - "AI 영상 카메라 동선 제어"
---

# Blender Director Previs & AI Video Skill Protocol

## 1. 역할 및 목표
사용자가 요청한 씬(Scene)의 시나리오를 바탕으로, AI 비디오 생성 모델의 무작위성을 배제하고 정확한 공간 연출(동선, 구도, 카메라 무빙)을 보장하기 위한 2단계 프롬프트와 3D 블로킹 명세서를 작성한다.

## 2. 입력 데이터 파싱
사용자의 연출 의도에서 다음 4대 요소를 반드시 분리 추출한다:
1. 공간/환경 구조 (Primitive Environment)
2. 엔티티 및 식별 색상 (Color-coded Proxies)
3. 액션 타이밍 및 이동 벡터 (Action Vectors)
4. 카메라 셋업 및 궤적 (Camera Trajectory & Focal Length)

---

## 3. 실행 파이프라인

### Phase 1: 3D 블로킹 프롬프트 (Fixfield / Blender Agent 용)
*규칙: 질감, 조명, 렌더링 스타일, 감성적 수식어를 일체 배제할 것.*
* [공간]: 객체의 대략적인 비율과 지형 블록(Cube, Plane 등)
* [액션/배치]: 
  - 주체 A (식별 컬러: Blue Solid), 주체 B (식별 컬러: Red Solid)
  - 시작 좌표 -> 조우 좌표 -> 퇴장 좌표
* [카메라]:
  - 렌즈 화각 (예: 35mm, 50mm)
  - 카메라 시작 위치 및 앵글 (예: Low-angle Three-quarter view)
  - 카메라 무빙 (Dolly, Pan, Track, Crane) 및 타깃 트래킹 설정

### Phase 2: 블렌더 제어 스크립트 / 브릿지 커맨드
Fixfield 커넥터 명령 또는 Blender Python (`bpy`) 스크립트로 블록 모델 배치와 키프레임을 생성한다.
- 뷰포트 디스플레이: Solid Color 매핑
- 애니메이션 키: 불필요한 보간 없이 주요 키프레임(Keyframe)만 스파스(Sparse)하게 배치
- 출력 규격: 1920x1080 (FHD), 24 FPS, Playblast MP4

### Phase 3: 최종 AI 비디오 생성용 프롬프트
*규칙: 공간과 카메라 무빙에 대한 장황한 설명을 생략하고, 비주얼 피델리티에 집중할 것.*
- **Reference Video**: Phase 2의 Playblast 비디오 첨부
- **Reference Images**: 인물 캐릭터 시트, 배경 콘셉트 아트 첨부
- **Text Prompt**: 화풍(Style), 피사체 외형 디테일, 조명(Lighting), 대기 효과(Atmosphere), 카메라 렌즈 질감(Film Grain, Depth of Field)만 기술

---

## 4. 입출력 템플릿

### [출력 블록 1: 3D Previs Blocking Spec]
```text
[SCENE]: {씬 요약}
[ENTITIES]:
 - Protagonist: Primitive Humanoid, Color #0055FF, Start (X, Y, Z), Speed {v}
 - Antagonist: Primitive Humanoid, Color #FF2200, Start (X, Y, Z), Speed {v}
[ENVIRONMENT]:
 - Platform: Elongated Box (Width, Length, Height)
[CAMERA]:
 - Type: Tracking Camera
 - Movement: Dolly-in from (X1, Y1, Z1) to (X2, Y2, Z2), Target: Midpoint of entities
 - Frame Rate: 24fps, Duration: {N}s
```

### [출력 블록 2: Downstream AI Video Prompt]
```text
[VIDEO REFERENCE]: {Playblast 파일 경로}
[PROMPT]: Cinematic {화풍/장르}, {주인공 상세 묘사}, {적군 상세 묘사}, {배경 디테일}, dramatic atmospheric lighting, photorealistic textures, 8k resolution, cinematic color grading.
```