import { HorizontalDiveder } from '@/app/components/divider/horizontal';
import { SectionTitle } from '../../../section-title';



export const HighlightedProjects = () => {
    return(
        <section className="container py-16">
             <SectionTitle subtitle="Projetos em destaque" title="Projetos" />
             <HorizontalDiveder className='mb-16'/>
            
        </section>
    )
}