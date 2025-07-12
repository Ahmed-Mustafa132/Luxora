import FadeInWhenVisible from "../../components/FadeInWhenVisible/FadeInWhenVisible";
import Hero from "../../components/Home/Hero";
import Offer from "../../components/Home/offer";
import About from "../../components/Home/About";
import Services from "../../components/Home/Services";

export default function Home() {
  return (
    <>
      <FadeInWhenVisible direction="right" duration={700} delay={1}>
        <Hero />
        <Offer />
        <About />
        <Services />
      </FadeInWhenVisible>
    </>
  );
}
