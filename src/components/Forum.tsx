import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, Plus } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

const Forum = () => {
  const [posts, setPosts] = useState([
    {
      author: "Maria Silva",
      avatar: "MS",
      title: "Minha rotina matinal de skincare",
      excerpt: "Queria compartilhar minha rotina que mudou completamente a aparência da minha pele...",
      category: "Skincare",
      likes: 24,
      comments: 12,
      time: "2h atrás"
    },
    {
      author: "João Santos",
      avatar: "JS",
      title: "Exercícios para relaxamento facial",
      excerpt: "Descobri técnicas incríveis de yoga facial que ajudam a reduzir tensão...",
      category: "Bem-estar",
      likes: 18,
      comments: 8,
      time: "5h atrás"
    },
    {
      author: "Ana Costa",
      avatar: "AC",
      title: "Dicas de alimentação para pele saudável",
      excerpt: "Mudei minha dieta há 3 meses e os resultados são visíveis. Vou compartilhar o que funcionou...",
      category: "Nutrição",
      likes: 31,
      comments: 15,
      time: "1 dia atrás"
    }
  ]);

  const auth = useAuth();

  // auth dialog state
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  // form state for new post
  const [newTitle, setNewTitle] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreatePost = (close?: () => void) => {
    if (!newTitle.trim()) return;
    const authorName = auth.currentUser ? auth.currentUser.name : "Você";
    const avatar = auth.currentUser ? (auth.currentUser.name.slice(0,2).toUpperCase()) : newTitle.slice(0,2).toUpperCase();
    const newPost = {
      author: authorName,
      avatar,
      title: newTitle,
      excerpt: newExcerpt || "",
      category: newCategory || "Geral",
      likes: 0,
      comments: 0,
      time: "Agora"
    };
    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewExcerpt("");
    setNewCategory("");
    if (close) close();
  };

  return (
    <section id="forum" className="py-20 px-4 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Fórum da Comunidade</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Conecte-se com outras pessoas, compartilhe experiências e aprenda
          </p>
          <>
            <Button
              className="bg-[#fef57e] text-black hover:bg-[#f0e86f]"
              onClick={() => {
                if (auth.currentUser) setDialogOpen(true);
                else setAuthDialogOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Publicação
            </Button>

            <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{isRegisterMode ? "Registrar" : "Entrar"}</DialogTitle>
                  <DialogDescription>
                    {isRegisterMode ? "Crie uma conta para publicar no fórum." : "Faça login para publicar no fórum."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-2">
                  {isRegisterMode && (
                    <>
                      <label className="text-sm">Nome</label>
                      <Input value={authName} onChange={(e) => setAuthName(e.target.value)} placeholder="Seu nome" />
                    </>
                  )}
                  <label className="text-sm">E-mail</label>
                  <Input value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="email@exemplo.com" />
                  <label className="text-sm">Senha</label>
                  <Input type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="Senha" />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Fechar</Button>
                  </DialogClose>
                  {isRegisterMode ? (
                    <Button onClick={() => {
                      const res = auth.register(authName, authEmail, authPassword);
                      if (!res.success) alert(res.message || "Erro ao registrar");
                      else setAuthDialogOpen(false);
                    }}>
                      Registrar
                    </Button>
                  ) : (
                    <Button onClick={() => {
                      const res = auth.login(authEmail, authPassword);
                      if (!res.success) alert(res.message || "Falha no login");
                      else setAuthDialogOpen(false);
                    }}>
                      Entrar
                    </Button>
                  )}
                </DialogFooter>
                <div className="mt-2 text-center text-sm">
                  <button className="underline" onClick={() => setIsRegisterMode(!isRegisterMode)}>
                    {isRegisterMode ? "Já tem conta? Entrar" : "Não tem conta? Registrar"}
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {posts.map((post, index) => (
            <Card 
              key={index} 
              className="hover-lift border-primary/10 bg-card shadow-[var(--shadow-soft)] cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {post.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg font-display">{post.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">{post.author}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{post.time}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {post.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Forum;
