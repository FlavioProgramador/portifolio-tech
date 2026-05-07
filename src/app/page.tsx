import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Workflow from '@/components/Workflow/Workflow';
import Skills from '@/components/Skills/Skills';
import Experience from '@/components/Experience/Experience';
import Certificates from '@/components/Certificates/Certificates';
import Projects from '@/components/Projects/Projects';
import Testimonials from '@/components/Testimonials/Testimonials';
import Contact from '@/components/Contact/Contact';
import OSWrapper from '@/components/OSWrapper/OSWrapper';

export default function Home() {
  return (
    <OSWrapper>
      <main>
        <Navbar />
        <Hero />
        <About />
        <Workflow />
        <Skills />
        <Experience />
        <Certificates />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
    </OSWrapper>
  );
}
