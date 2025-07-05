import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { FileManager } from "@/components/FileManager";
import { ChatInterface } from "@/components/ChatInterface";
import { CodeEditor } from "@/components/CodeEditor";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  extension?: string;
  content?: string;
}

export default function Index() {
  const [selectedFile, setSelectedFile] = useState<FileItem | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [generatedCode, setGeneratedCode] = useState<string>('');

  // Initialize Puter SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    script.onload = () => {
      console.log('Puter SDK loaded');
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
  };

  const handleCodeGenerated = (code: string) => {
    setGeneratedCode(code);
    // Auto-create a new file with generated code
    const newFile: FileItem = {
      id: Date.now().toString(),
      name: 'ai-generated.js',
      type: 'file',
      extension: 'js',
      content: code
    };
    setSelectedFile(newFile);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <Header onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Manager Sidebar */}
        <div 
          className={`transition-all duration-300 border-r border-border ${
            isSidebarOpen ? 'w-64' : 'w-0'
          } overflow-hidden`}
        >
          <FileManager 
            onFileSelect={handleFileSelect} 
            selectedFile={selectedFile?.id}
          />
        </div>

        {/* Sidebar Toggle Button */}
        {!isSidebarOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="absolute top-16 left-2 z-10 p-2 bg-card shadow-card border border-border"
          >
            <PanelLeftOpen className="h-4 w-4" />
          </Button>
        )}

        {/* Split View: Chat + Code Editor */}
        <div className="flex-1 flex">
          {/* Chat Interface */}
          <div className="w-1/2 border-r border-border">
            <ChatInterface onCodeGenerated={handleCodeGenerated} />
          </div>

          {/* Code Editor */}
          <div className="w-1/2">
            <CodeEditor 
              selectedFile={selectedFile}
              onCodeChange={(code) => {
                if (selectedFile) {
                  setSelectedFile({ ...selectedFile, content: code });
                }
              }}
            />
          </div>
        </div>

        {/* Sidebar Close Button */}
        {isSidebarOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="absolute top-16 left-60 z-10 p-1 opacity-60 hover:opacity-100"
          >
            <PanelLeftClose className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
}