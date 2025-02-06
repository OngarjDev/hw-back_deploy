FROM node:20-alpine  

WORKDIR /app

# คัดลอก package.json และ package-lock.json ก่อน เพื่อให้ Docker cache การติดตั้ง dependencies ได้
COPY package.json package-lock.json ./

# ติดตั้ง dependencies
RUN npm install  

# คัดลอกโค้ดทั้งหมด (หลังจาก npm install เพื่อลดการ build ซ้ำ)
COPY . .

# รัน Prisma Generate (ถ้ามี)
RUN npx prisma generate  

# กำหนด PORT
ENV PORT 8080
EXPOSE 8080

# ใช้ PM2 หรือรันด้วย node ปกติ
CMD ["node", "index.js"]
