import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Download, Copy, Eye, Code2 } from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  extension?: string;
  content?: string;
}

interface CodeEditorProps {
  selectedFile?: FileItem;
  onCodeChange?: (code: string) => void;
}

export function CodeEditor({ selectedFile, onCodeChange }: CodeEditorProps) {
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (selectedFile?.content) {
      setCode(selectedFile.content);
    }
  }, [selectedFile]);

  useEffect(() => {
    onCodeChange?.(code);
  }, [code, onCodeChange]);

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const runCode = () => {
    if (!previewRef.current) return;

    let previewContent = '';
    
    if (selectedFile?.extension === 'html' || code.includes('<html>')) {
      previewContent = code;
    } else if (selectedFile?.extension === 'css') {
      previewContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>${code}</style>
        </head>
        <body>
          <div style="padding: 20px;">
            <h1>CSS Preview</h1>
            <p>Your CSS styles are applied to this page.</p>
          </div>
        </body>
        </html>
      `;
    } else {
      // For JS/React code, create a simple preview
      previewContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; margin: 0; padding: 20px; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            ${code}
          </script>
        </body>
        </html>
      `;
    }

    const blob = new Blob([previewContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    previewRef.current.src = url;

    // Clean up the URL after the iframe loads
    previewRef.current.onload = () => {
      URL.revokeObjectURL(url);
    };

    setActiveTab('preview');
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const downloadCode = () => {
    const filename = selectedFile?.name || 'code.txt';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getLanguage = (extension?: string) => {
    switch (extension) {
      case 'tsx':
      case 'ts':
        return 'TypeScript';
      case 'jsx':
      case 'js':
        return 'JavaScript';
      case 'html':
        return 'HTML';
      case 'css':
        return 'CSS';
      case 'json':
        return 'JSON';
      default:
        return 'Text';
    }
  };

  return (
    <div className="flex flex-col h-full bg-editor">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          {selectedFile ? (
            <>
              <Code2 className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">{selectedFile.name}</span>
              <Badge variant="secondary" className="text-xs">
                {getLanguage(selectedFile.extension)}
              </Badge>
            </>
          ) : (
            <span className="text-muted-foreground">Select a file to edit</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyCode}
            className="h-8"
            disabled={!code}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={downloadCode}
            className="h-8"
            disabled={!code}
          >
            <Download className="h-4 w-4" />
          </Button>
        <Button
          variant="gradient"
          size="sm"
          onClick={runCode}
          className="h-8"
          disabled={!code}
        >
          <Play className="h-4 w-4 mr-1" />
          Run
        </Button>
        </div>
      </div>

      {/* Editor/Preview Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 bg-card m-2">
          <TabsTrigger value="editor" className="gap-2">
            <Code2 className="h-4 w-4" />
            Editor
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="flex-1 m-0 p-4">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-full h-full bg-background text-foreground font-mono text-sm border border-border rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={selectedFile ? `Edit ${selectedFile.name}...` : "Select a file to start coding..."}
            spellCheck={false}
          />
        </TabsContent>

        <TabsContent value="preview" className="flex-1 m-0 p-4">
          <iframe
            ref={previewRef}
            className="w-full h-full bg-white rounded-lg border border-border"
            title="Code Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}