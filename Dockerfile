# ใช้ Node.js แทน Bun
FROM node:20-alpine  

WORKDIR /app

# คัดลอกไฟล์ package.json และ lock file
COPY package.json package-lock.json ./

# ติดตั้ง dependencies ด้วย npm
RUN npm install  

# คัดลอกโค้ดทั้งหมด
COPY . .

# รัน Prisma Generate ถ้ามี Prisma
RUN npx prisma generate  

# กำหนด PORT
ENV PORT 8080
EXPOSE 8080

# ใช้ PM2 หรือรันด้วย node ปกติ
CMD ["node", "index.js"]
