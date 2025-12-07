import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageCircle } from "lucide-react";

const socket = io("http://localhost:4000");

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Olá! Bem-vindo ao chat da Lumina. Como posso ajudar você hoje?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handleReceive = (msg) => {
      setMessages(prev => [...prev, msg]);
    };
    socket.on("receive_message", handleReceive);
    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg = inputValue;
    const msgObj = { sender: "user", text: userMsg };
    setMessages([...messages, msgObj]);
    socket.emit("send_message", msgObj);
    setInputValue("");
  };

  return (
    <section id="chat" className="py-20 px-4 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Chat ao Vivo</h2>
          <p className="text-lg text-muted-foreground">
            Tire suas dúvidas e converse com nossa equipe
          </p>
        </div>

        <Card className="shadow-[var(--shadow-soft)] border-primary/10">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/20">
            <CardTitle className="text-xl font-display">Conversa com Lumina</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-yellow-100 text-black shadow-[var(--shadow-soft)]"
                          : "bg-secondary"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1"
                />
                <Button 
                  onClick={handleSend}
                  className="bg-yellow-100 text-black hover:bg-yellow-300 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Chat;
