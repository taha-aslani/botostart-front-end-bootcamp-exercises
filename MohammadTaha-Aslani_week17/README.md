# مخاطبین — Contact Manager

یک اپلیکیشن مدیریت مخاطبین با رابط کاربری فارسی و راست‌به‌چپ (RTL) که با React ساخته شده و برای ذخیره‌سازی داده‌ها از یک API ساختگی با `json-server` استفاده می‌کند. این پروژه بدون کتابخانه‌های آماده‌ی UI/State/Form نوشته شده و معماری Flux را با `useReducer` و `useContext` پیاده‌سازی می‌کند.

## راه‌اندازی سریع

```bash
npm install
npm run server
npm run dev
```

سپس آدرس زیر را باز کنید:

- برنامه: `http://localhost:5173`
- API ساختگی: `http://localhost:3001`

## اسکریپت‌ها

- `npm run dev`: اجرای محیط توسعه Vite
- `npm run build`: ساخت خروجی production
- `npm run preview`: پیش‌نمایش خروجی build
- `npm run server`: اجرای `json-server` و نگه‌داری داده‌ها در `db.json`

## ویژگی‌ها

- افزودن مخاطب (نام اجباری، ایمیل و تلفن اختیاری)
- جستجوی لحظه‌ای بر اساس نام، ایمیل یا تلفن
- انتخاب تکی و چندتایی + «انتخاب همه»
- حذف با مودال تأیید و امکان Undo تا ۵ ثانیه
- رابط کاربری فارسی، چیدمان RTL و اعداد فارسی در جاهای لازم
- اعتبارسنجی ایمیل و شماره موبایل ایران
- کاملاً ریسپانسیو با افکت‌های CSS

## معماری و وضعیت

- مدیریت وضعیت مرکزی به سبک Flux با Context API و `useReducer`
- تفکیک State و Actions در کانتکست برای بهینه‌سازی رندر
- هوک‌های کوچک و مستقل برای جستجو، انتخاب، مودال‌ها و Toast

## API ساختگی (json-server)

داده‌ها در فایل `db.json` نگه‌داری می‌شوند و این مسیرها در دسترس‌اند:

- `GET /contacts`
- `POST /contacts`
- `PATCH /contacts/:id`
- `DELETE /contacts/:id`

## ساختار پوشه‌ها

- `src/api/`: توابع ارتباط با API
- `src/components/`: کامپوننت‌های UI
- `src/context/`: کانتکست و ردیوسر
- `src/hooks/`: هوک‌های کوچک و قابل استفاده مجدد
- `src/utils/`: توابع کمکی
- `src/styles/`: استایل‌ها

## نکات مهم

- برای ذخیره اطلاعات، حتماً `npm run server` را اجرا کنید.

## تکنولوژی‌ها

- React + JSX + CSS
- `useState`, `useEffect`, `useReducer`, `useContext`
- `json-server`
- Vite
