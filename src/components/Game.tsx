import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Trophy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Game = () => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const cards = [
    { 
      type: "missao", 
      text: "Nossa missão é promover bem-estar integral através de conteúdos de qualidade",
      isCorrect: true 
    },
    { 
      type: "visao", 
      text: "Nossa visão é ser a maior empresa de fast-food do mundo",
      isCorrect: false 
    },
    { 
      type: "valor", 
      text: "Valorizamos autenticidade e respeito pela individualidade",
      isCorrect: true 
    },
    { 
      type: "missao", 
      text: "Ajudamos pessoas a descobrir sua melhor versão",
      isCorrect: true 
    },
    { 
      type: "valor", 
      text: "Focamos apenas em lucro financeiro",
      isCorrect: false 
    }
  ];

  const handleAnswer = (userAnswer: boolean) => {
    const correct = cards[currentCard].isCorrect === userAnswer;
    
    if (correct) {
      setScore(score + 1);
      toast({
        title: "Correto! 🎉",
        description: "Você conhece bem nossos valores!",
      });
    } else {
      toast({
        title: "Ops! ❌",
        description: "Essa não representa nossos valores.",
        variant: "destructive",
      });
    }

    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      setGameStarted(false);
      toast({
        title: "Jogo Finalizado! 🏆",
        description: `Você acertou ${score + (correct ? 1 : 0)} de ${cards.length} questões!`,
      });
    }
  };

  const startGame = () => {
    setScore(0);
    setCurrentCard(0);
    setGameStarted(true);
  };

  return (
    <section id="game" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12 animate-fade-in">
          <Gamepad2 className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Jogo Interativo</h2>
          <p className="text-lg text-muted-foreground">
            Teste seus conhecimentos sobre missão, visão e valores da Lumina
          </p>
        </div>

        <Card className="shadow-[var(--shadow-soft)] border-primary/10">
          {!gameStarted ? (
            <CardContent className="pt-8 text-center">
              <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl font-display mb-4">
                Pronto para o Desafio?
              </CardTitle>
              <CardDescription className="text-base mb-6">
                Você verá afirmações sobre a Lumina. Decida se cada uma representa 
                corretamente nossa missão, visão ou valores!
              </CardDescription>
              <Button 
                onClick={startGame}
                className="bg-yellow-100 text-black hover:bg-yellow-300 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all"
              >
                <Gamepad2 className="w-4 h-4 mr-2" />
                Começar Jogo
              </Button>
            </CardContent>
          ) : (
            <>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Badge className="bg-primary/10 text-primary">
                    {cards[currentCard].type.toUpperCase()}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Trophy className="w-4 h-4" />
                    Pontuação: {score}/{cards.length}
                  </div>
                </div>
                <CardTitle className="text-2xl font-display">
                  Esta afirmação representa nossos valores?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary/30 p-6 rounded-lg mb-6">
                  <p className="text-lg text-center">{cards[currentCard].text}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleAnswer(true)}
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    ✓ Sim
                  </Button>
                  <Button
                    onClick={() => handleAnswer(false)}
                    size="lg"
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    ✗ Não
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Pergunta {currentCard + 1} de {cards.length}
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </section>
  );
};

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

export default Game;
