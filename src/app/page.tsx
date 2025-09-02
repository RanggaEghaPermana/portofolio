import Intro from "@/components/Intro";
import ProjectsSection from "@/components/Projects";
import SkillsSection from "@/components/Skills";
import TimelineSection from "@/components/Timeline";
import ContactSection from "@/components/Contact";

export default function Home() {
  return (<div className="min-h-screen">
    <Intro/>
    <ProjectsSection/>
    <SkillsSection/>
    <TimelineSection/>
    <ContactSection/>
  </div>);
}
