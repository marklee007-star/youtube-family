# 🎬 YouTube Family Manager - คู่มือการติดตั้ง

## 📋 สิ่งที่ต้องเตรียม

- Google Account
- Google Sheets
- Vercel Account (deploy ฟรี)
- Node.js 18+ บนเครื่อง

---

## ขั้นตอนที่ 1: ตั้งค่า Google Sheets

### 1.1 สร้าง Spreadsheet

1. ไปที่ [sheets.new](https://sheets.new)
2. ตั้งชื่อ: `YouTube Family DB`
3. คัดลอก **Spreadsheet ID** จาก URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```

### 1.2 สร้าง Sheet Members

สร้าง Sheet ชื่อ `Members` และเพิ่ม Header ในแถวที่ 1:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Email | FamilyGroup | ExpireDate | PaymentStatus | PaymentLink | Note |

ตัวอย่างข้อมูล:
```
abc@gmail.com | Family A | 2026-06-28 | Paid | https://link.com | VIP
```

### 1.3 สร้าง Sheet Payments

สร้าง Sheet ชื่อ `Payments` และเพิ่ม Header:

| A | B | C |
|---|---|---|
| Timestamp | Email | Amount |

---

## ขั้นตอนที่ 2: ตั้งค่า Google Service Account

### 2.1 สร้าง Service Account

1. ไปที่ [Google Cloud Console](https://console.cloud.google.com)
2. สร้าง Project ใหม่ (หรือเลือกที่มีอยู่)
3. ไปที่ **APIs & Services > Library**
4. ค้นหา `Google Sheets API` → Enable
5. ไปที่ **APIs & Services > Credentials**
6. คลิก **Create Credentials > Service Account**
7. กรอกชื่อ → Create
8. ในหน้า Service Account → คลิก **Keys > Add Key > JSON**
9. ดาวน์โหลด JSON file

### 2.2 แชร์ Spreadsheet ให้ Service Account

1. เปิด JSON file ที่ดาวน์โหลด
2. คัดลอก `client_email` (ตัวอย่าง: `xxx@project.iam.gserviceaccount.com`)
3. เปิด Google Sheets → คลิก Share
4. วาง email → ให้สิทธิ์ **Editor** → Done

---

## ขั้นตอนที่ 3: ตั้งค่า Apps Script

### 3.1 เปิด Apps Script

1. ใน Google Sheets → ไปที่ **Extensions > Apps Script**
2. ลบโค้ดเดิมทิ้ง
3. วางโค้ดจากไฟล์ `apps-script/Code.gs`

### 3.2 แก้ไข Config

ใน `Code.gs` แก้ไขส่วน CONFIG:

```javascript
const CONFIG = {
  NEXTJS_APP_URL: 'https://your-app.vercel.app', // URL จาก Vercel
  CRON_SECRET: 'your_secret_here',               // ต้องตรงกับใน .env
  ...
}
```

### 3.3 Deploy Apps Script

1. คลิก **Deploy > New deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. คลิก **Deploy** → คัดลอก URL

### 3.4 ตั้งค่า Trigger

1. ใน Apps Script → คลิก **Run > setupTriggers**
2. ยืนยัน permission
3. หรือตั้งเองที่ **Triggers > Add Trigger**:
   - `checkExpiredMembers` → Time-driven → Day timer → 00:00-01:00
   - `processPayments` → Time-driven → Minutes timer → Every 30 minutes

### 3.5 Initialize Sheets

ใน Google Sheets → เมนู **🎬 YouTube Family > สร้าง Sheet**

---

## ขั้นตอนที่ 4: ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` จากตัวอย่าง:

```bash
cp .env.local.example .env.local
```

แก้ไขค่าทุกอัน:

```env
# จาก JSON file ที่ดาวน์โหลด
GOOGLE_SERVICE_ACCOUNT_EMAIL=xxx@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nABC...\n-----END RSA PRIVATE KEY-----"

# จาก URL ของ Spreadsheet
GOOGLE_SPREADSHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms

# Admin Login
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_strong_password_here

# JWT Secret (สุ่มอย่างน้อย 32 ตัวอักษร)
JWT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Cron Secret (ต้องตรงกับ Apps Script)
CRON_SECRET=your_cron_secret_here

NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=another_random_secret_here
```

> ⚠️ **สำคัญ**: `GOOGLE_PRIVATE_KEY` ต้องเปลี่ยน `\n` เป็น newline จริงๆ ใน .env.local
> แต่ถ้าใช้ Vercel ให้ใส่แบบ `\n` ปกติ

---

## ขั้นตอนที่ 5: รันโปรเจกต์

```bash
# ติดตั้ง dependencies
npm install

# รัน development
npm run dev

# เปิดเบราว์เซอร์
open http://localhost:3000
```

---

## ขั้นตอนที่ 6: Deploy บน Vercel

### 6.1 Push โค้ดขึ้น GitHub

```bash
git init
git add .
git commit -m "Initial commit: YouTube Family Manager"
git remote add origin https://github.com/YOUR_USERNAME/youtube-family-manager.git
git push -u origin main
```

### 6.2 Import บน Vercel

1. ไปที่ [vercel.com](https://vercel.com) → Sign in
2. คลิก **Add New > Project**
3. Import GitHub repo ที่สร้าง
4. Framework Preset: **Next.js**
5. คลิก **Deploy**

### 6.3 ตั้งค่า Environment Variables บน Vercel

1. Project → **Settings > Environment Variables**
2. เพิ่มทุกตัวจาก `.env.local`
3. สำหรับ `GOOGLE_PRIVATE_KEY` ให้ใส่ค่าทั้งหมดรวมถึง `-----BEGIN...-----`
4. **Redeploy** หลังตั้งค่า env

### 6.4 อัปเดต Apps Script Config

แก้ `NEXTJS_APP_URL` ใน `Code.gs` เป็น URL จาก Vercel

---

## 📱 การใช้งาน

### หน้าลูกค้า
```
https://your-app.vercel.app/
```
- กรอก Email ค้นหาสถานะ
- ดูวันหมดอายุ
- กดปุ่มชำระเงิน

### หน้า Admin
```
https://your-app.vercel.app/admin
```
- Login ด้วย Username/Password ที่ตั้ง
- Dashboard สรุปสถิติ
- จัดการสมาชิก (เพิ่ม/แก้ไข/ลบ)
- ประมวลผลการชำระเงิน

---

## 🔄 ระบบอัตโนมัติ

### Auto Expire Check
- Apps Script รันทุกวัน 00:01
- ตรวจสอบ ExpireDate ของสมาชิกทุกคน
- ถ้าเกินวันแล้ว → เปลี่ยนเป็น `Expired`

### Auto Payment Update
- Apps Script รันทุก 30 นาที
- ดึงข้อมูลจาก Sheet: Payments
- หา Email ใน Members → ตั้ง `Paid` + เพิ่ม 1 เดือน
- ลบแถวที่ประมวลผลแล้วออก

### วิธีรับการชำระเงิน
1. สร้าง **Google Form** เชื่อม Responses กับ Sheet: Payments
2. หรือเพิ่มข้อมูลใน Sheet: Payments โดยตรง (Timestamp, Email, Amount)
3. Apps Script จะประมวลผลอัตโนมัติ

---

## 🐛 Troubleshooting

### "ไม่พบข้อมูล" ทุกครั้ง
- ตรวจสอบ `GOOGLE_SPREADSHEET_ID`
- ตรวจสอบว่า Service Account มีสิทธิ์ Editor ใน Sheets
- ตรวจสอบชื่อ Sheet ต้องเป็น `Members` ตรงๆ

### GOOGLE_PRIVATE_KEY Error
ลองแก้ใน `src/lib/sheets.ts`:
```typescript
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
```

### Admin Login ไม่ได้
- ตรวจสอบ `ADMIN_USERNAME` และ `ADMIN_PASSWORD` ใน `.env.local`
- ตรวจสอบ `JWT_SECRET` ต้องมีอย่างน้อย 32 ตัวอักษร

---

## 📁 โครงสร้างไฟล์

```
youtube-family/
├── src/
│   ├── app/
│   │   ├── page.tsx              # หน้าลูกค้า
│   │   ├── layout.tsx            # Root Layout
│   │   ├── globals.css           # Global CSS
│   │   ├── admin/
│   │   │   ├── page.tsx          # หน้า Admin Dashboard
│   │   │   └── layout.tsx
│   │   └── api/
│   │       ├── auth/route.ts     # Login/Logout API
│   │       ├── members/route.ts  # CRUD Members
│   │       ├── members/[id]/route.ts
│   │       ├── payments/route.ts # Process Payments
│   │       ├── stats/route.ts    # Dashboard Stats
│   │       └── cron/expire/route.ts
│   ├── lib/
│   │   ├── sheets.ts             # Google Sheets API
│   │   ├── auth.ts               # Auth Utilities
│   │   └── utils.ts              # Helper Functions
│   └── types/index.ts            # TypeScript Types
├── apps-script/
│   └── Code.gs                   # Google Apps Script
├── .env.local.example
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 💡 Tips

- ใช้ Chrome DevTools บนมือถือ (Remote Debugging) สำหรับ debug
- Vercel Free Plan: 100GB bandwidth/เดือน, เพียงพอสำหรับใช้งานทั่วไป
- Google Sheets API: 300 requests/minute, เพียงพอมาก
- แนะนำให้เปลี่ยน `ADMIN_PASSWORD` เป็นอะไรที่แข็งแรงก่อน deploy จริง
