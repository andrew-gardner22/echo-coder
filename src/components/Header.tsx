import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Terminal, 
  Zap, 
  Github, 
  Share2, 
  Menu,
  Sparkles 
} from "lucide-react";

interface HeaderProps {
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

export function Header({ onMenuToggle, isSidebarOpen = true }: HeaderProps) {
  return (
    <header className="h-14 bg-gradient-surface border-b border-border flex items-center justify-between px-4 shadow-card">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="p-2"
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Terminal className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Echo Coder</h1>
            <p className="text-xs text-muted-foreground -mt-1">AI Development Platform</p>
          </div>
        </div>

        <Badge variant="secondary" className="gap-1 text-xs">
          <Sparkles className="h-3 w-3" />
          Beta
        </Badge>
      </div>

      {/* Center Section */}
      <div className="hidden md:flex items-center gap-2">
        <Badge variant="outline" className="gap-1 text-xs">
          <Zap className="h-3 w-3 text-success" />
          AI Ready
        </Badge>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        
        <Button variant="ghost" size="sm" className="gap-2">
          <Github className="h-4 w-4" />
          GitHub
        </Button>

        <Button 
          variant="gradient"
          size="sm" 
          className="gap-2"
        >
          <Zap className="h-4 w-4" />
          Deploy
        </Button>
      </div>
    </header>
  );
}