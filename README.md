# Finance App 💸

[![React Native](https://img.shields.io/badge/React%20Native-0.73.0-blue)](https://reactnative.dev)  
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)  
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-brightgreen)]()

A comprehensive mobile application for managing personal finances, offering **budget tracking**, **expense management**, and **financial insights**.

---

## Video for IOS
https://github.com/user-attachments/assets/94868e33-d4de-4436-ac93-2f0d3af1d289

---

## Video for Android
https://github.com/user-attachments/assets/c6eea320-885a-42c3-8b61-6af857a1289d

---

## 📸 Screenshots 
View app screenshots in the [`/screenshots`](./screenshots/) folder.  

---

## ✨ Features
- **Financial Insights**: Charts and reports.
- **Budget Tracking**: Set and monitor monthly budgets.
- **Expense Management**: Categorize transactions.
- **Multi-Currency**: Real-time rates via OpenExchange.

---

## 🚀 Installation

### Prerequisites
- Node.js ≥ 16.x
- npm/yarn
- Xcode (iOS) or Android Studio (Android)

## 1. Clone Repository
```bash
git clone git@github.com:milanhirani27/FinanceApp.git
cd FinanceApp
```

## 2: Install Dependencies

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

## 3: API Configuration

### Add OpenExchange Rates API Key
1. Create a `.env` file in the root directory of your project
2. Add your API key using this format:

```env
OPEN_EXCHANGE_API=your_api_key_here
```

## 4: Start Metro

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## 5: Start your Application

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# install pods
cd ios
pod install
cd ..

# using npm
npm run ios

# OR using Yarn
yarn ios
```

## Login Credentials

> **Note**: This app uses dummy data for demonstration purposes.  
> Use the following credentials to log in:
> - **Username**: `Admin`  
> - **Password**: `123` 