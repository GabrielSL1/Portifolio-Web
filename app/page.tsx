
import { KnowTechs } from './components/pages/home/know-techs';
import { HeroSection } from './components/pages/home/sections';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaAws,
} from 'react-icons/fa';
import {
  SiKubernetes,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiNextdotjs,
  SiRedux,
  SiTypescript,
} from 'react-icons/si';

export default async function Home() {
 

const minhasTechs: any[] = [

{ name: 'React', icon: <FaReact size={24} />, startDate: '2021-05-10' },
  { name: 'Node.js', icon: <FaNodeJs size={24} />, startDate: '2020-08-15' },
  { name: 'Python', icon: <FaPython size={24} />, startDate: '2019-01-20' },

  // +10 novas:
  { name: 'TypeScript', icon: <SiTypescript size={24} />, startDate: '2021-01-12' },
  { name: 'Docker', icon: <FaDocker size={24} />, startDate: '2020-03-05' },
  { name: 'Kubernetes', icon: <SiKubernetes size={24} />, startDate: '2021-07-22' },
  { name: 'GraphQL', icon: <SiGraphql size={24} />, startDate: '2022-02-18' },
  { name: 'AWS', icon: <FaAws size={24} />, startDate: '2019-11-30' },
  { name: 'MongoDB', icon: <SiMongodb size={24} />, startDate: '2020-06-14' },
  { name: 'PostgreSQL', icon: <SiPostgresql size={24} />, startDate: '2019-09-10' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss size={24} />, startDate: '2021-10-01' },
  { name: 'Next.js', icon: <SiNextdotjs size={24} />, startDate: '2022-04-07' },
  { name: 'Redux', icon: <SiRedux size={24} />, startDate: '2020-12-25' },


  
  // ...adicione quantas quiser
];


  return (
    <>
      <HeroSection/> 
     
      <KnowTechs techs={minhasTechs} />
    </>
  )
}
