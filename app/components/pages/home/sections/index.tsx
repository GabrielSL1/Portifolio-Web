import { TechBadge } from "@/app/components/tech-badge"
import { array } from "zod"
import { Button } from "@/app/components/button"
import { HiArrowNarrowRight } from "react-icons/hi"
import { TbBrandLinkedin, TbBrandGithub, TbBrandWhatsapp } from "react-icons/tb"

import React from "react"
const Mock_contatos = [
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/gabrielliima1/",
        icon: TbBrandLinkedin
    },
    {
        name: "GitHub",
        url: "https://github.com/GabrielSL1",
        icon: TbBrandGithub
    },
    {
        nome: "WhatsApp",
        url: "https://api.whatsapp.com/send?phone=5535991135568",
        icon: TbBrandWhatsapp
    }
]

export const HeroSection = () => {
    return (
        <section className=" relative w-full lg: h-[755px] bg-hero-image bg-cover bg-center bg-no-repeat flex flex-col justify-end pb-10 sm:pb-32 py-32 lg:pb-[110px] ">
            <div
                className="
      pointer-events-none 
      absolute bottom-0 left-0 right-0 
      h-[80px] 
      bg-gradient-to-t 
      from-[rgba(0,0,0,0.5)] 
      to-transparent
    "
            />


            <div className="container flex flex-items-start justify-between flex-col-reverse lg:flex-row">
                <div className="w-full lg:max-w-[530px]">
                    <p className="font-mono py-2 text-green-400">Seja Bem Vindo ao meu Portfólio </p>
                    <h2 className="text-4xl font-medium -mt-2">Gabriel Da Silva Lima</h2>
                    <p className="text-gray-400 my-6 text-sm sm:text-base">
                        Olá! Me chamo Gabriel e atualmente estou cursando Análise e Desenvolvimento de Sistemas, no 3º período. Sou apaixonado por tecnologia e estou em busca de uma oportunidade de estágio ou emprego na área de TI para colocar meus conhecimentos em prática e continuar evoluindo.
                        Aqui abaixo você pode conferir meus projetos e também me encontrar nas redes sociais. Bora trocar uma ideia!
                    </p>

                    <div className="flex flex-wrap gap-x-2 gap-y-3 lg:max-w[340px]">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <TechBadge name="Next.js" />


                        ))}
                    </div>

                    <div className="mt-6 lg:mt-10 flex sm:items-center sm:gap-5 flex-col sm:flex-row">
                        <Button className="w-max shadow-button">
                            Entre em contato
                            <HiArrowNarrowRight size={18} />
                        </Button>

                        <div className="text-2xl text-gray-600 flex items-center h-20 gap-3 ">
                            {Mock_contatos.map((contato, index) => (
                                <a
                                    href={contato.url}
                                    key={`contato-${index}`}
                                    target="_blank"
                                    className="hover text-gray-100 transition-colors"
                                    rel="noopener noreferrer"
                                >
                                    <contato.icon />
                                </a>
                            ))}
                        </div>

                    </div>
                </div>
                <div>
                    <img
                        width={420}
                        height={404}
                        src="/images/profile-pic.jpg"
                        alt="foto de perfil do Gabriel Da Silva Lima"
                        className="w-[300px] h-[300px] lg:w-[420px] lg:h-[404px] mb-6 lg:mb-0 shadow-2xl rounded-lg object-cover"
                    />
                </div>
            </div>
        </section>
    )
}