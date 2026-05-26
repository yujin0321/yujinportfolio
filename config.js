/**
 * =============================
 *  포트폴리오 설정 파일
 *  이 파일만 수정하면 사이트 전체가 바뀝니다.
 * =============================
 */
const CONFIG = {

  /* ── 기본 정보 ── */
  name:    "조유진",
  nameEn:  "Cho Yujin",
  tagline: "Data Scientist · AI Developer · Problem Solver",
  intro:   "빠르게 변하는 기술을 실무적 해결책으로 바꾸고, 집요한 탐구로 문제의 본질을 해결하는 데이터 엔지니어입니다.",
  profileImage: "assets/profile.jpg",
  heroBg:       "assets/bg.jpg",

  /* ── 소셜 링크 (빈 문자열이면 숨김) ── */
  social: {
    github:   "https://github.com/yujin0321",
    email:    "yujinainative@gmail.com",
    linkedin: "",
    blog:     "",
  },

  /* ── 기술 스택 (About 섹션에 카테고리별로 표시) ── */
  skills: [
    {
      category: "Data Science / AI",
      items: ["Python", "Pandas", "Machine Learning", "RAG / LLM", "SHAP 분석", "Kafka"],
    },
    {
      category: "Web / Mobile",
      items: ["HTML / CSS / JavaScript", "Android (Java)", "SQLite", "Tkinter"],
    },
    {
      category: "Tools",
      items: ["Git / GitHub", "Jupyter Notebook", "VS Code"],
    },
  ],

  /* ── 학력 ── */
  education: [
    {
      period: "2024.03 ~ 현재",
      school: "광운대학교",
      dept:   "정보융합학부 데이터사이언스학과",
      note:   "2026년 휴학 중",
    },
  ],

  /* ── 경력 / 교육과정 ── */
  career: [
    {
      period: "2025.12.29 ~ 2026.05.29",
      org:    "국비교육과정",
      role:   "데이터 분석 및 생성형 AI 기반 자동화 시스템 개발 과정",
      desc:   "수료",
    },
  ],

  /* ── 프로젝트 ──
     category: "Data-Analysis" | "AI-ML" | "Application"
     details.features: 주요 기능 목록
     details.stack: 개발 환경/기술
  ── */
  projects: [
    {
      id:       "huss",
      title:    "HUSS Info-Guard",
      category: "AI-ML",
      period:   "2025",
      member:   "정만교, 조유진, 이교원, 이준희 (4인)",
      thumb:    "",           /* 썸네일 이미지 경로 (없으면 기본 그라데이션) */
      github:   "",
      demo:     "",
      details: {
        overview:  "2025 HUSS AI 경진대회 출품작. 사용자가 유튜브 등에서 초기에 접하는 왜곡·선동성 정보의 신뢰도를 판별하기 위한 인공지능 신뢰도 진단 평가 알고리즘을 개발했습니다.",
        features: [
          "유튜브 API 및 yt-dlp 라이브러리를 이용한 실시간 영상 데이터 수집 및 자막 추출",
          "KLUE BERT-base 한국어 특화 모델을 활용한 영상 내 감정 톤 분석 및 프레이밍/편향성 감지",
          "정치 편향, 혐오어 및 부정적 키워드 중심의 편향성 분석 엔진 설계",
          "팩트 체크(40%), 편향성(30%), 감정 분석(20%) 스코어를 반영한 신뢰도 점수 엔진 및 등급 시스템 시각화"
        ],
        stack: ["Python", "BERT (KLUE)", "yt-dlp", "YouTube API", "NLP", "Machine Learning"],
      },
    },
    {
      id:       "mindpick",
      title:    "MINDPICK",
      category: "Data-Analysis",
      period:   "2025.12 ~ 2026.05",
      member:   "조유진, 휘주, 재혁, 은혜 (4인)",
      thumb:    "",
      github:   "",
      demo:     "",
      details: {
        overview:  "개인의 전체 소비 데이터를 통합 분석 및 구조화하여 최적의 신용/체크카드 3종과 카테고리별 특화 혜택 카드를 매칭하여 추천하고 설명해주는 RAG 기반 대화형 챗봇 서비스입니다.",
        features: [
          "Selenium/WebDriverWait 활용, 카드고릴라 기반의 단종되지 않은 국내 카드 데이터 1,184개 수집 및 JSON 구조화",
          "LangChain 및 RecursiveCharacterTextSplitter 기반 ChromaDB 벡터 데이터베이스(Chunks & Embeddings) 설계",
          "BM25 키워드 검색(0.3)과 Dense Cosine 유사도 검색(0.7)을 융합한 앙상블 리트리버 모델 구현",
          "Cohere Rerank 모델 탑재를 통한 검색 결과 재정렬 및 GPT-3.5-Turbo 기반 Few-Shot/CoT 프롬프트 설계"
        ],
        stack: ["Python", "LangChain", "ChromaDB", "GPT-3.5-Turbo", "Cohere Rerank", "BM25", "Selenium", "RAG"],
      },
    },
    {
      id:       "netflix",
      title:    "넷플릭스 구독자 이탈 방지",
      category: "Data-Analysis",
      period:   "2025.12 ~ 2026.05",
      member:   "조유진, 민영, 세준, 기찬 (4인)",
      thumb:    "",
      github:   "",
      demo:     "",
      details: {
        overview:  "넷플릭스 유저 행동 데이터를 기반으로 구독 이탈 신호를 사전에 감지하고 대시보드로 시각화하여, 이탈 예방을 위한 리텐션 액션 플랜과 무료 혜택 연동 등의 맞춤형 마케팅 시뮬레이션을 제시한 프로젝트입니다.",
        features: [
          "Kaggle의 Netflix Userbase 및 Churn Prediction 데이터셋 정제 및 CJ 메조미디어 리포트 분석 반영",
          "행동 데이터 기반 유저 등급 분류: 안정군(주 3회 이상 접속), 주의군(시청 없이 검색만 수행), 위험군(7일 이상 미접속)",
          "이탈 위험 진입 2주 전 골든타임을 감지하고 고객 재활성화를 위한 트리거(맞춤 알림, 쿠폰 전송) 구현",
          "3개월 이상 구독 고객 해지 방지 무료 체험 혜택, 스포츠 중계 및 번들링 결합 리텐션 프로그램 제시"
        ],
        stack: ["Python", "Pandas", "Tableau", "Cohort Analysis", "Data Visualization"],
      },
    },
    {
      id:       "semiconductor",
      title:    "반도체 식각 공정 지능형 관제 에이전트",
      category: "Data-Analysis",
      period:   "2026.05",
      member:   "조유진, 조은혜, 이찬민, 문채린 (4인)",
      thumb:    "",
      github:   "",
      demo:     "",
      details: {
        overview:  "반도체 식각 공정 과정의 다중 센서 데이터를 실시간 스트리밍하고, 이상 탐지 분석(Autoencoder/LightGBM), 원인 설명(SHAP) 및 조치 가이드(GraphRAG)를 연계한 스마트팩토리 의사결정 플랫폼입니다.",
        features: [
          "LAM 9600 Metal Etcher 센서 데이터 기반 극심한 불균형(정상:결함=84:16) 대응을 위한 5가지 시계열 데이터 증강 기법(PGHA, Jitter 등) 적용",
          "Apache Kafka 분산 스트리밍을 통한 초당 수십 건의 데이터 실시간 수집 및 PyTorch Autoencoder + LightGBM 결합 추론 파이프라인 구현",
          "Sliding Window 기반 동적 임계치 조절을 통한 장비 노후화(Drift) 오탐지 극복 및 Top-3 결함 후보군 추출(F1-Score 0.35 ➡️ 0.94)",
          "SHAP 센서 기여도 분석 리포트 자동 생성 및 Neo4j 지식그래프(116노드, 208관계) 기반 RAG 가이드 조치 및 Slack 실시간 알림 연동"
        ],
        stack: ["Python", "Apache Kafka", "PyTorch (Autoencoder)", "LightGBM", "SHAP", "Neo4j", "GPT-4o", "Slack API", "React"],
      },
    },
    {
      id:       "senior",
      title:    "은퇴 노인 취미·일자리 매칭 서비스",
      category: "AI-ML",
      period:   "2026",
      member:   "조유진(팀장), 김규리, 한지영 (3인)",
      thumb:    "",
      github:   "",
      demo:     "",
      details: {
        overview:  "서울시 은퇴 노인의 건강 상태, 이동 거리, 성향, 디지털 리터러시를 종합하여 개인 맞춤형 취미 및 일자리를 추천하고, 가족과 복지사의 대리 등록/관리를 지원하는 시니어 친화형 복지 플랫폼입니다.",
        features: [
          "서울시 25개 구별 노인 복지센터 취미 프로그램 및 일자리 공고 데이터 가공 및 RDBMS형 정적 필터 매핑",
          "시니어 개인 프로필 속성(건강 수준, 시간대, 거리, 성향 등) 기반의 가중치형 다중 기준 매칭 알고리즘 설계",
          "스마트폰 활용이 미숙한 노인을 위한 대리인(가족, 복지사)의 프로필 대리 입력 및 대리 신청/인증 코드 연동",
          "Tkinter GUI 라이브러리를 사용해 MVC 아키텍처 패턴 기반의 시니어 친화적 디자인 화면(대형 폰트/간결한 메뉴) 구현"
        ],
        stack: ["Python", "Tkinter", "GUI Design", "Matching Algorithm", "MVC Architecture"],
      },
    }
  ],

};
