# Echo Coder 🚀

**An AI-Powered Development Platform inspired by bolt.new, lovable.dev, and modern AI coding assistants**

Echo Coder is a professional web-based development environment that combines the power of AI chat assistance with a full-featured code editor and live preview capabilities. Built with React, TypeScript, and integrated with Puter.ai for free AI capabilities.

![Echo Coder](https://img.shields.io/badge/Echo%20Coder-AI%20Dev%20Platform-blue?style=for-the-badge&logo=terminal)

## ✨ Features

### 🤖 AI-Powered Development
- **Integrated AI Chat**: Uses Puter.ai's free AI capabilities (no API keys required)
- **Code Generation**: AI can generate code snippets and full applications
- **Development Assistance**: Get help with debugging, architecture, and best practices
- **Multiple AI Models**: Access to GPT, Claude, Grok, and other models through Puter

### 🛠️ Professional Development Environment
- **Split-Screen Layout**: Chat interface on the left, code editor on the right
- **File Management**: Full project file tree with syntax highlighting
- **Live Code Preview**: Run and preview your code instantly
- **Syntax Highlighting**: Support for HTML, CSS, JavaScript, TypeScript, React, and more
- **Code Editor Features**: Copy, download, and run code with one click

### 🎨 Modern Design
- **Dark Theme**: Professional dark theme optimized for coding
- **Responsive Layout**: Works seamlessly on desktop and tablet
- **Glass Morphism**: Modern UI with subtle glass effects
- **Gradient Accents**: Beautiful blue/purple gradient design system
- **Smooth Animations**: Polished transitions and interactions

### 🚀 Technical Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Shadcn/ui + Tailwind CSS
- **AI Integration**: Puter.ai SDK (free tier)
- **Code Editor**: Custom textarea with syntax highlighting
- **Icons**: Lucide React

## 🎯 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd echo-coder
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:8080` to start using Echo Coder!

## 🔥 How to Use

### 1. **Start a Conversation**
- Type your development request in the chat interface
- Ask for help with specific coding problems
- Request complete applications or features

### 2. **Generate Code**
- AI will generate code based on your requests
- Code is automatically extracted and can be edited
- Run code instantly in the preview panel

### 3. **Manage Files**
- Use the file manager sidebar to organize your project
- Create new files and navigate your project structure
- Select files to edit in the code editor

### 4. **Preview & Test**
- Switch between Editor and Preview tabs
- Run your code with the "Run" button
- See live results in the preview iframe

## 🌟 Example Use Cases

### **Build a React Component**
```
"Create a responsive card component with an image, title, and description"
```

### **Generate CSS Styles**
```
"Create modern button styles with hover effects and gradients"
```

### **Build a Full App**
```
"Create a todo app with add, delete, and mark complete functionality"
```

### **Debug Code**
```
"Help me fix this JavaScript function that's not working properly: [paste code]"
```

## 🎨 Design System

Echo Coder uses a comprehensive design system built with HSL colors and CSS custom properties:

### Colors
- **Primary**: Electric blue gradient (`#4F90FF` → `#B347FF`)
- **Background**: Dark navy (`#1A1F2E`)
- **Surface**: Elevated dark cards with subtle gradients
- **Text**: High contrast white/light gray for readability

### Components
- **Gradient Buttons**: Eye-catching CTAs with glow effects
- **Glass Surfaces**: Subtle backdrop blur effects
- **Chat Bubbles**: Rounded conversation interface
- **Code Blocks**: Monospace font with syntax highlighting

## 🔧 Architecture

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── ChatInterface.tsx    # AI chat functionality
│   ├── CodeEditor.tsx       # Code editing & preview
│   ├── FileManager.tsx      # Project file management
│   └── Header.tsx          # Top navigation bar
├── pages/
│   └── Index.tsx           # Main application layout
├── lib/
│   └── utils.ts           # Utility functions
└── index.css              # Design system & global styles
```

## 🌐 AI Integration

Echo Coder uses **Puter.ai** for AI capabilities:

- **No API Keys Required**: Uses Puter's "User Pays" model
- **Multiple Models**: Access to GPT-4, Claude, Grok, and more
- **Frontend Only**: No backend server required
- **Free Tier**: Generous free usage limits

The integration automatically:
1. Loads the Puter SDK
2. Sends chat messages to AI
3. Extracts code from responses
4. Creates new files with generated code

## 🚀 Deployment

Deploy Echo Coder to any static hosting platform:

### **Vercel**
```bash
npm run build
# Deploy dist folder to Vercel
```

### **Netlify**
```bash
npm run build
# Deploy dist folder to Netlify
```

### **GitHub Pages**
```bash
npm run build
# Push dist folder to gh-pages branch
```

## 🎭 Customization

### **Themes**
Modify the design system in `src/index.css`:
```css
:root {
  --primary: 217 91% 60%;        /* Change primary color */
  --gradient-primary: ...;        /* Update gradients */
  --background: 220 27% 8%;      /* Adjust background */
}
```

### **AI Behavior**
Customize AI responses in `ChatInterface.tsx`:
```typescript
// Add system prompts or modify AI behavior
const response = await puter.ai.chat(input, {
  systemPrompt: "You are a helpful coding assistant..."
});
```

## 📱 Browser Support

- **Chrome**: Full support
- **Firefox**: Full support  
- **Safari**: Full support
- **Edge**: Full support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Puter.ai** - For providing free AI capabilities
- **Shadcn/ui** - For beautiful UI components
- **Lucide** - For clean, modern icons
- **Tailwind CSS** - For utility-first styling
- **Bolt.new, Lovable.dev** - For inspiration

---

**Built with ❤️ by the Echo Coder team**

Ready to start coding with AI? [Launch Echo Coder](https://your-deployment-url.com) and build something amazing! 🚀