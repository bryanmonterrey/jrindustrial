import ColorScrollPage from "./components/ColorScrollPage";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProcessCards from "./components/ProcessCards";
import ServicesCards from "./components/ServicesCards";
import Showcase from "./components/Showcase";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <ColorScrollPage initial="#F6F8FF">
      <Header />
      <main>
        <Hero />
        <ProcessCards />
        <ServicesCards />
        <Showcase />
      </main>
      <Footer />
    </ColorScrollPage>
  );
}
