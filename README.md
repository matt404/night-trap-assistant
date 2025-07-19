# 🏚️ Night Trap Assistant

> *Your ultimate companion for mastering the classic 1992 horror game Night Trap*

A real-time assistant that provides precise timing and location guidance to help you achieve the perfect Night Trap playthrough. Never miss another Auger capture again!

## ✨ Features

- **⏰ Precision Timer** - Synchronized countdown with visual and audio cues
- **🎯 Location Guidance** - Shows exactly where to go and when
- **🔊 Voice Announcements** - Customizable speech synthesis with multiple voice options
- **⏸️ Pause & Resume** - Full control over timing with manual adjustments
- **🎮 Game-Critical Notes** - Important warnings for code changes and critical captures
- **🌙 Horror Theme** - Atmospheric dark interface matching the game's aesthetic

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/matt404/night-trap-assistant.git
cd night-trap-assistant

# Install dependencies
npm install

# Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) and start your Night Trap session!

## 🎮 How to Use

1. **Start the Timer** - Click the ▶️ Start button to begin the sequence
2. **Follow Instructions** - Listen for voice announcements and watch the display
3. **Pause if Needed** - Use ⏸️ Pause to stop timing during gameplay interruptions
4. **Adjust Timing** - Fine-tune the timer with +/- buttons when paused
5. **Change Voice** - Select your preferred speech voice from the dropdown

## 🎯 Game Strategy

The assistant tracks all 75+ critical moments in Night Trap, including:

- **Auger Captures** - Precise timing for each location
- **Code Changes** - Warnings for when to change security codes
- **Critical Moments** - Game over scenarios and checkpoints
- **Perfect Game Tips** - Bonus captures for completionists

## 🛠️ Technology Stack

- **React** - Modern UI framework
- **React Bootstrap** - Responsive styling components
- **Web Speech API** - Cross-platform voice synthesis
- **CSS3** - Custom horror-themed styling with gradients and shadows

## 🎨 Theme

The interface features a chilling dark theme with:
- Deep black gradient backgrounds with subtle red undertones
- Glowing text effects and atmospheric lighting
- Horror-themed icons and visual elements
- Responsive design that works on all devices

## 📱 Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
# Build and push (ARM64)
./.cicd/docker-publish.sh

# Deploy to Kubernetes
./.cicd/k8s-deploy.sh
```

## 🎮 About Night Trap

Night Trap is a 1992 interactive movie video game that became infamous for its controversial content and later became a cult classic. This assistant helps players navigate the complex timing required to successfully capture all the Augers and achieve the perfect ending.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs or suggest features
- Improve the timing data
- Enhance the UI/UX
- Add new voice options

## 📄 License

This project is open source and available under the MIT License.

---

*"It's a trap!" - Make sure you're ready for every one of them.* 🕷️