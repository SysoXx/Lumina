import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, Plus } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

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

  // form state for new post
  const [newTitle, setNewTitle] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreatePost = (close?: () => void) => {
    if (!newTitle.trim()) return;
    const newPost = {
      author: "Você",
      avatar: newTitle.slice(0,2).toUpperCase(),
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
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#fef57e] text-black hover:bg-[#f0e86f]">
                <Plus className="w-4 h-4 mr-2" />
                Nova Publicação
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Publicação</DialogTitle>
                <DialogDescription>Compartilhe algo com a comunidade.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-2">
                <label className="text-sm">Título</label>
                <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Título da publicação" />
                <label className="text-sm">Categoria</label>
                <Input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Ex: Skincare, Bem-estar" />
                <label className="text-sm">Resumo</label>
                <Textarea value={newExcerpt} onChange={(e) => setNewExcerpt(e.target.value)} placeholder="Escreva um resumo ou conteúdo breve" />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button onClick={() => { handleCreatePost(() => setDialogOpen(false)); setDialogOpen(false); }}>
                  Publicar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
