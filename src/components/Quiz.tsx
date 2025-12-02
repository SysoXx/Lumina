import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "Qual é sua principal preocupação com a pele?",
      options: ["Hidratação", "Acne", "Envelhecimento", "Manchas"]
    },
    {
      question: "Com que frequência você pratica exercícios físicos?",
      options: ["Diariamente", "3-4 vezes/semana", "1-2 vezes/semana", "Raramente"]
    },
    {
      question: "Quantas horas de sono você tem por noite?",
      options: ["Menos de 5h", "5-6h", "7-8h", "Mais de 8h"]
    }
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <section id="quiz" className="py-20 px-4 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Quiz de Beleza & Saúde</h2>
          <p className="text-lg text-muted-foreground">
            Descubra qual é o seu perfil e receba dicas personalizadas
          </p>
        </div>

        <Card className="shadow-[var(--shadow-soft)] border-primary/10">
          {!showResult ? (
            <>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Pergunta {currentQuestion + 1} de {questions.length}
                  </span>
                  <div className="flex gap-1">
                    {questions.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 w-8 rounded-full transition-colors ${
                          index <= currentQuestion ? 'bg-primary' : 'bg-secondary'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <CardTitle className="text-2xl font-display">
                  {questions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[currentQuestion]}
                  onValueChange={handleAnswer}
                  className="space-y-3"
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion]}
                  className="w-full mt-6 bg-[#fef57e] text-black hover:bg-[#f0e86f]"
                >
                  {currentQuestion < questions.length - 1 ? "Próxima" : "Ver Resultado"}
                </Button>
              </CardContent>
            </>
          ) : (
            <CardContent className="pt-8 text-center">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl font-display mb-4">Resultado</CardTitle>
              <CardDescription className="text-base mb-6">
                Baseado nas suas respostas, você demonstra interesse em manter uma rotina 
                equilibrada de cuidados. Recomendamos explorar nossa seção de podcasts 
                sobre bem-estar e conferir nossos artigos sobre skincare personalizado.
              </CardDescription>
              <div className="flex gap-4 justify-center">
                <Button onClick={handleRestart} variant="outline">
                  Refazer Quiz
                </Button>
                <Button className="bg-amber-100 text-black hover:bg-amber-300">
                  Ver Recomendações
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </section>
  );
};

export default Quiz;
