import { About } from "@/components/about";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { OurPlatform } from "@/components/platform";
import { Sponsors } from "@/components/sponsors";
import { Story } from "@/components/story";

const App = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />

      <main>
        <Hero />
        <Sponsors />
        <About />
        <Features />
        <OurPlatform />
        <Story />
        <Blog />
        <Contact />
      </main>




      <Footer />
    </div>
  );
};
export default App;
