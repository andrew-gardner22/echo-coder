import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  File, 
  Folder, 
  FolderOpen, 
  Plus, 
  FileText, 
  Code,
  Image,
  Settings
} from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  extension?: string;
  content?: string;
  children?: FileItem[];
  isOpen?: boolean;
}

interface FileManagerProps {
  onFileSelect?: (file: FileItem) => void;
  selectedFile?: string;
}

export function FileManager({ onFileSelect, selectedFile }: FileManagerProps) {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'src',
      type: 'folder',
      isOpen: true,
      children: [
        {
          id: '2',
          name: 'components',
          type: 'folder',
          isOpen: false,
          children: [
            {
              id: '3',
              name: 'App.tsx',
              type: 'file',
              extension: 'tsx',
              content: 'import React from "react";\n\nfunction App() {\n  return (\n    <div className="App">\n      <h1>Hello Echo Coder!</h1>\n    </div>\n  );\n}\n\nexport default App;'
            }
          ]
        },
        {
          id: '4',
          name: 'index.html',
          type: 'file',
          extension: 'html',
          content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Echo Coder Project</title>\n</head>\n<body>\n  <div id="root"></div>\n</body>\n</html>'
        },
        {
          id: '5',
          name: 'styles.css',
          type: 'file',
          extension: 'css',
          content: 'body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, "Inter", sans-serif;\n}\n\n.App {\n  text-align: center;\n  padding: 2rem;\n}'
        }
      ]
    },
    {
      id: '6',
      name: 'package.json',
      type: 'file',
      extension: 'json',
      content: '{\n  "name": "echo-coder-project",\n  "version": "1.0.0",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build"\n  }\n}'
    }
  ]);

  const getFileIcon = (item: FileItem) => {
    if (item.type === 'folder') {
      return item.isOpen ? FolderOpen : Folder;
    }

    switch (item.extension) {
      case 'tsx':
      case 'ts':
      case 'jsx':
      case 'js':
        return Code;
      case 'html':
      case 'css':
      case 'json':
        return FileText;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'svg':
        return Image;
      default:
        return File;
    }
  };

  const getFileColor = (extension?: string) => {
    switch (extension) {
      case 'tsx':
      case 'ts':
        return 'text-blue-400';
      case 'jsx':
      case 'js':
        return 'text-yellow-400';
      case 'html':
        return 'text-orange-400';
      case 'css':
        return 'text-purple-400';
      case 'json':
        return 'text-green-400';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'svg':
        return 'text-pink-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const toggleFolder = (folderId: string) => {
    const updateFolder = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.id === folderId && item.type === 'folder') {
          return { ...item, isOpen: !item.isOpen };
        }
        if (item.children) {
          return { ...item, children: updateFolder(item.children) };
        }
        return item;
      });
    };

    setFiles(updateFolder(files));
  };

  const handleFileClick = (item: FileItem) => {
    if (item.type === 'folder') {
      toggleFolder(item.id);
    } else {
      onFileSelect?.(item);
    }
  };

  const createNewFile = () => {
    const newFile: FileItem = {
      id: Date.now().toString(),
      name: 'new-file.js',
      type: 'file',
      extension: 'js',
      content: '// New file created by Echo Coder\n'
    };

    setFiles(prev => [...prev, newFile]);
    onFileSelect?.(newFile);
  };

  const renderFileTree = (items: FileItem[], depth = 0) => {
    return items.map(item => {
      const Icon = getFileIcon(item);
      const colorClass = getFileColor(item.extension);
      const isSelected = selectedFile === item.id;

      return (
        <div key={item.id}>
          <div
            className={`flex items-center gap-2 px-2 py-1 hover:bg-muted/50 cursor-pointer rounded-md transition-colors ${
              isSelected ? 'bg-primary/20 border-l-2 border-primary' : ''
            }`}
            style={{ paddingLeft: `${8 + depth * 16}px` }}
            onClick={() => handleFileClick(item)}
          >
            <Icon className={`h-4 w-4 ${colorClass}`} />
            <span className="text-sm text-foreground truncate flex-1">
              {item.name}
            </span>
            {item.type === 'file' && item.extension && (
              <Badge variant="outline" className="text-xs px-1 py-0">
                {item.extension}
              </Badge>
            )}
          </div>
          
          {item.type === 'folder' && item.isOpen && item.children && (
            <div>
              {renderFileTree(item.children, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-sidebar">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <h3 className="font-semibold text-sidebar-foreground">Files</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={createNewFile}
          className="h-8 w-8 p-0 hover:bg-sidebar-accent"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* File Tree */}
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {renderFileTree(files)}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Settings className="h-4 w-4" />
          Project Settings
        </Button>
      </div>
    </div>
  );
}