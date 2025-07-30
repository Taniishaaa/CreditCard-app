# 💰 Expense Tracker App

A simple React Native app built with Supabase for user onboarding, profile setup, and monthly expense tracking.

---

## 🚀 Features

- ✅ Login / Create Account (email + password)
- ✅ Profile Setup: name, DOB, city, income range, primary bank
- ✅ Monthly Expenses: Travel, Utilities, Groceries, Shopping, Dining, Food Delivery
- ✅ Consent screen with T&C
- ✅ Dashboard showing stored user profile and expenses
- ✅ All data stored in **Supabase (PostgreSQL)** – no local storage used

---

## 📱 Tech Stack

- React Native (Expo)
- Supabase (Auth + Database)
- TypeScript
- Async Form Handling

---

## ⚙️ How to Run the App (Personal Use)

> This app uses **my personal Supabase instance**, so you do **not** need to set up Supabase on your end.

### 1. 📦 Clone the Repo

```bash
git clone https://github.com/your-username/expense-tracker-app.git
cd expense-tracker-app

2. 🧶 Install Dependencies
bash
Copy
Edit
npm install
# or
yarn install
3. ▶️ Run the App
bash
Copy
Edit
npx expo start
Open Expo Go app on your mobile.

Scan the QR code to launch the app.

🛠 Built With
✅ Supabase Auth (Email/password)

✅ Supabase Realtime DB (PostgreSQL)

✅ React Native UI

✅ Client-side form validation

✅ Remote persistence only

⚠️ Notes
This version is meant for demo and personal use only. The Supabase URL and anon key are already embedded in the app (supabaseClient.ts). If you're forking this repo or building your own backend, consider setting up your own Supabase instance for better security and isolation.

📧 Contact
Created by Tanisha Gupta