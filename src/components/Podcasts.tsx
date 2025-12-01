import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, ExternalLink } from "lucide-react";

const Podcasts = () => {
  const playlists = [
    {
      title: "Ciência Suja - O Chip da Beleza",
      description: "Entendendo sobre o chip da beleza e como ele pode impactar sua vida.",
      image: "/img/chipdabeleza.png", // Imagem local
      spotifyUrl: "https://open.spotify.com/show/2bJvbVxZblK6E2mKkI5zbw?si=5745d51cca014b92"
    },
    {
      title: "Bonita de Pele",
      description: "O podcast da Bonita de Pele traz tudo o que a gente quer saber sobre beleza, saúde, autoestima, skincare, etc.",
      image: "img/bonitadepele33.jpg", // Imagem do Unsplash
      spotifyUrl: "https://open.spotify.com/show/4rJw40RupuJIrR1HbFWYW4?si=60274ab2c96b4453"
    },
    {
      title: "Músicas para se Maquear",
      description: "Coloque em aleatório e seja feliz se maqueando.",
      image: "img/maquer.jpg", // Imagem do Unsplash
      spotifyUrl: "https://open.spotify.com/playlist/6khYeZthKR6yR6XsSR5iCH?si=cd607919176c4823"
    },
    {
      title: "Relaxamento Profundo",
      description: "Sons relaxantes para uma noite de sono revigorante, visando sua saúde, bem-estar e calmaria.",
      image: "img/paz.jpg", // Imagem do Unsplash
      spotifyUrl: "https://open.spotify.com/playlist/2FRZDGeejLKvXW2hwzE7wW?si=70deacd1d4ce4cbe"
    }
  ];

  return (
    <section id="podcasts" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <Music className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Podcasts & Playlists</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Músicas e podcasts cuidadosamente selecionados para seu bem-estar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {playlists.map((playlist, index) => (
            <Card 
              key={index} 
              className="hover-lift border-primary/10 bg-card shadow-[var(--shadow-soft)] overflow-hidden"
            >
              <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center overflow-hidden">
                <img 
                  src={playlist.image} 
                  alt={playlist.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback para emoji caso a imagem não carregue
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full flex items-center justify-center text-6xl hidden">
                  🎵
                </div>
              </div>
              <CardContent className="pt-6">
                <h3 className="text-lg font-display font-semibold mb-2">{playlist.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{playlist.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full border-primary/30 hover:bg-primary/10"
                  onClick={() => window.open(playlist.spotifyUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ouvir no Spotify
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Podcasts;
