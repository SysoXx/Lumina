import { Heart, Target, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Nossa Missão",
      description: "Promover saúde, beleza e bem-estar através de soluções acessíveis, seguras e inovadoras, incentivando o autocuidado, a autoestima e contribuindo para o desenvolvimento social."
    },
    {
      icon: Eye,
      title: "Nossa Visão",
      description: "Ser uma referência no mercado de saúde e beleza, reconhecida pela qualidade, excelência no atendimento e pelo impacto social positivo nas comunidades onde atuamos."
    },
    {
      icon: Target,
      title: "Nossos Valores",
      description: "Qualidade, inovação, sustentabilidade, respeito, transparência e impacto social."
    }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Sobre a Lumina</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Somos uma plataforma dedicada a conectar pessoas aos melhores recursos de beleza e saúde
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card 
                key={index} 
                className="hover-lift border-primary/10 bg-card shadow-[var(--shadow-soft)]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
