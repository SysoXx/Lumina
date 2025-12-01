import { Sparkles, Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-xl font-display font-bold text-primary">Lumina</span>
            </div>
            <p className="text-sm text-muted-foreground">
              
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sobre Nós</a></li>
              <li><a href="#news" className="text-sm text-muted-foreground hover:text-primary transition-colors">Notícias</a></li>
              <li><a href="#quiz" className="text-sm text-muted-foreground hover:text-primary transition-colors">Quiz</a></li>
              <li><a href="#forum" className="text-sm text-muted-foreground hover:text-primary transition-colors">Fórum</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><a href="#podcasts" className="text-sm text-muted-foreground hover:text-primary transition-colors">Podcasts</a></li>
              <li><a href="#game" className="text-sm text-muted-foreground hover:text-primary transition-colors">Jogo Interativo</a></li>
              <li><a href="#chat" className="text-sm text-muted-foreground hover:text-primary transition-colors">Chat</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4">Redes Sociais</h3>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/lumina_espro" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Lumina. Todos os direitos reservados. Desenvolvido para beleza e saúde por Espro.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
