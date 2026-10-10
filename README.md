# 🛒 বাজার দর / BazarDor

> প্রয়োজনীয় পণ্যের দাম এক নজরে

**বাজার দর** হলো একটি বাংলা ভাষার ডেইলি মার্কেট প্রাইস ট্র্যাকার — যেখানে ব্যবহারকারীরা চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দৈনিক দাম দেখতে পারেন, আজকের রাইজার/ফলার জানতে পারেন এবং বাজারভিত্তিক দাম তুলনা করতে পারেন।

---

## 🌐 Live Demo

🔗 **Live URL:**  https://a7-bazardor.netlify.app/

---

## 🚀 Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 16 (App Router)** | UI ও server-side rendering |
| **TypeScript** | Type safety |
| **Tailwind CSS + daisyUI** | Styling ও responsive design |
| **BetterAuth** | Email/Password + Google + GitHub auth |
| **@libsql/client + Kysely** | SQLite database (libSQL) |
| **react-hot-toast** | Toast notifications |
| **lucide-react** | Icons |

---

## ✨ Key Features

### 1. 📊 আজকের বাজারদর — রাইজার ও ফলার সেকশন
হোম পেজে আজকের **সর্বোচ্চ ৬টি দাম বেড়ে যাওয়া** এবং **সর্বোচ্চ ৬টি দাম কমে যাওয়া** পণ্যের লিস্ট — রঙিন ▲/▼ badge সহ।

### 2. 🧭 ক্যাটাগরি ব্রাউজিং + Numeric-Aware Sort
৮টি ক্যাটাগরি (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা)। Sort dropdown — **ডিফল্ট | দাম: কম থেকে বেশি | দাম: বেশি থেকে কম** — বাংলা সংখ্যায় সঠিক numeric sort।

### 3. 🏪 বাজারভিত্তিক দাম তুলনা (Protected Route)
প্রতিটি পণ্যের ডিটেইল পেজে **১২টি বাজার** (ঢাকা, চট্টগ্রাম, রাজশাহী, ময়মনসিংহ, খুলনা, সিলেট) এর সর্বনিম্ন, সর্বোচ্চ ও গড় দাম সহ flat table। Login ছাড়া এই পেজ দেখা যায় না — middleware দিয়ে সুরক্ষিত।

### 4. 🔐 BetterAuth — Email/Password + Google + GitHub OAuth
সম্পূর্ণ authentication সিস্টেম:
- Email/Password দিয়ে সাইন আপ ও সাইন ইন
- Signup সফল হলে **অটো সাইন ইন**
- **Google ও GitHub** দিয়ে One-Click Social Login
- টোস্ট notification (সফল/ব্যর্থ উভয় ক্ষেত্রে)

### 5. 👤 প্রোফাইল ম্যানেজমেন্ট (C3 — Update Information)
ইউজার প্রোফাইল পেজে নিজের নাম পরিবর্তন করতে পারেন — `authClient.updateUser()` API দিয়ে। সাথে **avatar, নাম, ইমেইল এবং সাইন আউট** বাটন।

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# এডিট .env.local — BETTER_AUTH_SECRET, GOOGLE_CLIENT_ID, ইত্যাদি

# Run dev server
npm run dev

# Build for production
npm run build
