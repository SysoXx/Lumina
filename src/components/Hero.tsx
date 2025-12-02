import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="container mx-auto text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Bem-vindo à Lumina</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-foreground">
          Beleza & Saúde
          <br />
          <span className="text-primary">em Harmonia</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Descubra o equilíbrio perfeito entre bem-estar e beleza. 
          Na Lumina, acreditamos que cuidar de si é um ato de amor próprio.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-[#fef57e] text-black hover:bg-[#f0e86f] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all"
          >
            Explorar Conteúdos
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/30 hover:bg-primary/10 transition-all"
          >
            Fazer Quiz
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
