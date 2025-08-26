import { HeroSection } from './components/pages/home/sections';
import  {KnowTechs}  from './components/pages/home/know-techs';
import { HighlightedProjects } from './components/pages/home/highlighted-projects';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaAws } from 'react-icons/fa';
import { SiTypescript, SiKubernetes, SiGraphql, SiMongodb, SiPostgresql, SiTailwindcss, SiNextdotjs, SiRedux } from 'react-icons/si';
type Tech = {
    icon: React.ReactNode;
    name: string;
    startDate: string;
    color?: string;
    backgroundColor?: string;
};
export default async function Home() {
  


const minhasTechs: Tech[] = [

  { name: 'React', icon: <FaReact size={24} />, startDate: '2021-05-10', backgroundColor: '#20232A', color: '#61DAFB' },
  { name: 'Node.js', icon: <FaNodeJs size={24} />, startDate: '2020-08-15', backgroundColor: '#3C873A', color: '#FFFFFF' },
  { name: 'Python', icon: <FaPython size={24} />, startDate: '2019-01-20', backgroundColor: '#3776AB', color: '#FFD43B' },
  { name: 'TypeScript', icon: <SiTypescript size={24} />, startDate: '2021-01-12', backgroundColor: '#3178C6', color: '#FFFFFF' },
  { name: 'Docker', icon: <FaDocker size={24} />, startDate: '2020-03-05', backgroundColor: '#0db7ed', color: '#FFFFFF' },
  { name: 'Kubernetes', icon: <SiKubernetes size={24} />, startDate: '2021-07-22', backgroundColor: '#326ce5', color: '#FFFFFF' },
  { name: 'GraphQL', icon: <SiGraphql size={24} />, startDate: '2022-02-18', backgroundColor: '#E10098', color: '#FFFFFF' },
  { name: 'AWS', icon: <FaAws size={24} />, startDate: '2019-11-30', backgroundColor: '#FF9900', color: '#232F3E' },
  { name: 'MongoDB', icon: <SiMongodb size={24} />, startDate: '2020-06-14', backgroundColor: '#47A248', color: '#FFFFFF' },
  { name: 'PostgreSQL', icon: <SiPostgresql size={24} />, startDate: '2019-09-10', backgroundColor: '#336791', color: '#FFFFFF' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss size={24} />, startDate: '2021-10-01', backgroundColor: '#38BDF8', color: '#1E293B' },
  { name: 'Next.js', icon: <SiNextdotjs size={24} />, startDate: '2022-04-07', backgroundColor: '#000000', color: '#FFFFFF' },
  { name: 'Redux', icon: <SiRedux size={24} />, startDate: '2020-12-25', backgroundColor: '#764ABC', color: '#FFFFFF' },
];

return (
    <>
      <HeroSection/> 
      
      <KnowTechs techs={minhasTechs} />
      <HighlightedProjects />
      
    </>
  )
}