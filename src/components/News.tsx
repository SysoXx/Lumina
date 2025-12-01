import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const News = () => {
  const articles = [
    {
      category: "Saúde",
      title: "Os Benefícios da Meditação para a Pele",
      excerpt: "Descubra como práticas mindfulness podem melhorar a saúde da sua pele e reduzir sinais de estresse.",
      date: "15 Mar 2024",
      image: "💆‍♀️"
    },
    {
      category: "Beleza",
      title: "Tendências de Skincare para 2024",
      excerpt: "Conheça os ingredientes e produtos que estão revolucionando a rotina de cuidados com a pele.",
      date: "12 Mar 2024",
      image: "✨"
    },
    {
      category: "Bem-estar",
      title: "Alimentação e Beleza: A Conexão",
      excerpt: "Como uma dieta equilibrada pode transformar não só sua saúde, mas também sua aparência.",
      date: "10 Mar 2024",
      image: "🥗"
    }
  ];

  return (
    <section id="news" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Notícias & Artigos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fique por dentro das últimas novidades sobre beleza e saúde
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {articles.map((article, index) => (
            <Card 
              key={index} 
              className="hover-lift border-primary/10 bg-card shadow-[var(--shadow-soft)] overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center text-6xl">
                {article.image}
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {article.category}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {article.date}
                  </div>
                </div>
                <CardTitle className="text-xl font-display">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                <Button variant="link" className="text-primary p-0 h-auto">
                  Ler mais <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
            Ver Todas as Notícias
          </Button>
        </div>
      </div>
    </section>
  );
};

export default News;
