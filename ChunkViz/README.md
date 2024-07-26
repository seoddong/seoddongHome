# Dockerfile 만들기
  - Dockerfile 참조

# Dockerfile 위치
  ```
  C:\Users\seodd\python\ChunkViz
  ├── Dockerfile
  ├── package.json
  ├── package-lock.json (선택사항)
  ├── src
  │   └── ... (소스파일들)
  ```

# 도커 실행 및 결과 확인
  ```
  # 소스 폴더로 이동
  cd C:\Users\seodd\python\ChunkViz
  
  # Docker 이미지 빌드
  docker build -t chunkviz-node .
  
  # 컨테이너 실행
  docker run -d -p 3000:3000 chunkviz-node
  ```
  - 물론 도커UI에서 실행해도 됨

