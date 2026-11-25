# ❌⭕ Tic Tac Toe

A neon arcade-style Tic Tac Toe game built with **React + TypeScript**. Play with a friend on the same screen or take on the computer.

## ✨ Features

- 👫 **Two modes**: vs Friend or vs Computer
- 🤖 **Smart computer**: wins when it can, blocks when you're about to win
- 🏆 **Live scoreboard**: wins and draws tracked across rounds
- 🎉 **Winning line glow** and confetti celebration
- 🤝 **Draw detection**
- 📱 **Fully responsive**: works on phone, tablet and desktop
- ♿ **Keyboard friendly** and respects reduced-motion settings

## 🛠️ Tech Stack

- React 18 + TypeScript
- Create React App
- Plain CSS (no extra libraries)

## 🚀 Run Locally

```bash
git clone https://github.com/0081hawkeye-design/TIC-TAC-TOE.git
cd TIC-TAC-TOE
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## 📦 Build

```bash
npm run build
```

## 🌐 Deploy on Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and click **Add New → Project**
3. Import the `TIC-TAC-TOE` repo
4. Keep the defaults (Framework: Create React App) and click **Deploy**

## 📁 Project Structure

```
src/
├── App.tsx            # game logic, modes, scoreboard
├── App.css            # all styling and animations
└── components/
    └── Block.tsx      # a single square
```

## 🎮 How to Play

1. X goes first, then players take turns
2. Get 3 in a row (horizontal, vertical or diagonal) to win
3. Hit **Play again** for a new round, or **Reset scores** to start fresh

## 🙌 Credits

Built while learning React from [Piyush Garg's ReactJS series](https://www.youtube.com/playlist?list=PLinedj3B30sBm5wu3ixPRQ0gDqHJUlxQf).