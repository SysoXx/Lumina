import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import News from "@/components/News";
import Quiz from "@/components/Quiz";
import Podcasts from "@/components/Podcasts";
import Forum from "@/components/Forum";
import Game from "@/components/Game";
import Chat from "@/components/Chat";
// import GeminiChat from "@/components/GeminiChat";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <News />
      <Quiz />
      <Podcasts />
      <Forum />
      <Game />
      <Chat />
      {/* <GeminiChat /> */}
      <Footer />
    </div>
  );
};

export default Index;
