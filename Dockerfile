# 베이스 이미지
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 모든 의존성 설치 (devDependencies 포함 - 빌드에 필요)
# Use npm ci for reproducible installs; ensures devDependencies are installed
RUN npm ci

# 소스 복사
COPY . .

# Nest.js 빌드 (tsc)
RUN npm run build

# 프로덕션 의존성만 남기기: 빌드가 끝나면 devDependencies 제거
# npm prune --production은 설치된 devDependencies를 제거합니다
RUN npm prune --production

# 컨테이너 포트 명시
EXPOSE 3001

# 실행 명령어
CMD ["npm", "run", "start:prod"]

