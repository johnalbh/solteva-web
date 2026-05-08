export interface FAQ {
  id: string
  questionEs: string
  questionEn: string
  answerEs: string
  answerEn: string
  category: "general" | "products" | "installation" | "maintenance" | "financing"
}

export const faqs: FAQ[] = [
  {
    id: "precio-silla",
    category: "general",
    questionEs: "¿Cuánto cuesta una silla salvaescaleras?",
    questionEn: "How much does a stairlift cost?",
    answerEs: "El precio varía según el modelo y la complejidad de la instalación. Las sillas para escaleras rectas empiezan desde 2.490 €. Las curvas a medida tienen un precio superior al ser fabricadas individualmente para cada escalera. Ofrecemos financiación desde 38,91 €/mes. Solicita presupuesto sin compromiso y te damos precio exacto en menos de 24 horas.",
    answerEn: "The price varies depending on the model and installation complexity. Straight stairlifts start from €2,490. Curved models are priced higher as they are custom-made for each staircase. We offer financing from €38.91/month. Request a free no-obligation quote and we'll give you an exact price in under 24 hours.",
  },
  {
    id: "tiempo-instalacion",
    category: "installation",
    questionEs: "¿Cuánto tiempo tarda la instalación?",
    questionEn: "How long does installation take?",
    answerEs: "Los plazos dependen del modelo elegido: una silla salvaescaleras recta se instala en 3-5 días desde el pedido; una silla curva a medida tarda entre 3-4 semanas (por la fabricación personalizada); los elevadores verticales y plataformas curvas, entre 4-8 semanas.",
    answerEn: "Timelines depend on the chosen model: a straight stairlift is installed in 3-5 days from order; a curved model takes 3-4 weeks (due to custom manufacturing); vertical lifts and curved platform lifts take between 4-8 weeks.",
  },
  {
    id: "obras-necesarias",
    category: "installation",
    questionEs: "¿Necesito hacer obras en casa?",
    questionEn: "Do I need construction work at home?",
    answerEs: "No. La gran mayoría de nuestras soluciones no requieren obras. Las sillas salvaescaleras se instalan directamente sobre los peldaños existentes sin dañar la escalera. Los elevadores de corta altura como el Dizalo tampoco necesitan obras. Solo algunos elevadores verticales de gran altura pueden requerir pequeñas adaptaciones.",
    answerEn: "No. The vast majority of our solutions require no construction work. Stairlifts are installed directly onto existing steps without damaging the staircase. Short-rise lifts like the Dizalo also need no construction. Only some high-rise vertical lifts may require minor adaptations.",
  },
  {
    id: "garantia",
    category: "products",
    questionEs: "¿Qué garantía tienen los productos?",
    questionEn: "What warranty do the products carry?",
    answerEs: "Todos nuestros productos incluyen garantía de fabricante. Adicionalmente, ofrecemos contratos de mantenimiento preventivo y correctivo, con asistencia técnica propia en toda nuestra zona de cobertura. Disponemos de taller móvil con piezas de recambio para una reparación rápida.",
    answerEn: "All our products include manufacturer's warranty. Additionally, we offer preventive and corrective maintenance contracts, with in-house technical support throughout our coverage area. We have a mobile workshop with spare parts for fast repairs.",
  },
  {
    id: "mantenimiento-otras-marcas",
    category: "maintenance",
    questionEs: "¿Hacéis mantenimiento de otras marcas?",
    questionEn: "Do you service other brands?",
    answerEs: "Sí. Realizamos mantenimiento y reparación de prácticamente todas las marcas del mercado actual: HANDICARE, MINIVATOR, FREELIFT, EP, THYSSEN, KRUPP, EXTREMA, ACORN, BISON, VIMEC, HIROLIFT, LIFTUP y muchas más. Cubrimos aproximadamente el 95% del parque instalado en el mercado.",
    answerEn: "Yes. We carry out maintenance and repair for virtually all current market brands: HANDICARE, MINIVATOR, FREELIFT, EP, THYSSEN, KRUPP, EXTREMA, ACORN, BISON, VIMEC, HIROLIFT, LIFTUP and many more. We cover approximately 95% of installed units on the market.",
  },
  {
    id: "financiacion",
    category: "financing",
    questionEs: "¿Ofrecéis financiación?",
    questionEn: "Do you offer financing?",
    answerEs: "Sí. Buscamos el plan de financiación que mejor se adapte a tu situación económica. Te ayudamos en todas las gestiones necesarias para acceder al plan adecuado. Una vez aprobada, puedes fraccionar el pago en cómodas mensualidades desde 38,91 €/mes. Consulta sin compromiso.",
    answerEn: "Yes. We find the financing plan that best suits your financial situation. We handle all the necessary paperwork. Once approved, you can split the payment into comfortable monthly instalments from €38.91/month. Ask us without obligation.",
  },
  {
    id: "funciona-sin-luz",
    category: "products",
    questionEs: "¿Funciona si se va la luz?",
    questionEn: "Does it work if the power goes out?",
    answerEs: "Sí. Todos nuestros modelos de silla salvaescaleras cuentan con sistema de batería de reserva que garantiza el funcionamiento incluso durante un corte de suministro eléctrico. El Handicare 950, por ejemplo, tiene un sistema de recarga continua a lo largo de todo el raíl que asegura siempre energía disponible.",
    answerEn: "Yes. All our stairlift models include a backup battery system that ensures operation even during a power cut. The Handicare 950, for example, has a continuous charging system along the entire rail that always ensures available power.",
  },
  {
    id: "escalera-exterior",
    category: "products",
    questionEs: "¿Puedo instalarlo en una escalera exterior?",
    questionEn: "Can it be installed on an outdoor staircase?",
    answerEs: "Sí. Tenemos modelos específicos para escaleras exteriores, como la Handicare 2000 Exterior, con protección IP65 contra agua y polvo, materiales de acero inoxidable y cubierta protectora incluida. También existen plataformas y elevadores verticales aptos para exterior.",
    answerEn: "Yes. We have specific models for outdoor staircases, such as the Handicare 2000 Outdoor, with IP65 protection against water and dust, stainless steel materials, and included protective cover. There are also outdoor-suitable platform lifts and vertical lifts.",
  },
  {
    id: "parado-en-escalera",
    category: "products",
    questionEs: "¿Qué pasa si me quedo parado en medio de la escalera?",
    questionEn: "What happens if I get stuck mid-staircase?",
    answerEs: "Todos nuestros equipos disponen de sistemas de seguridad certificados que evitan situaciones de peligro. En caso de cualquier incidencia, puedes llamar a nuestro servicio técnico y acudimos en el menor tiempo posible. Además, la batería de reserva garantiza que puedas completar el recorrido incluso si se va la luz.",
    answerEn: "All our equipment has certified safety systems that prevent dangerous situations. In case of any incident, you can call our technical service and we'll attend as quickly as possible. Additionally, the backup battery ensures you can complete the journey even if the power goes out.",
  },
  {
    id: "permisos-licencias",
    category: "installation",
    questionEs: "¿Necesito permisos o licencias para instalarlo?",
    questionEn: "Do I need permits or licences to install it?",
    answerEs: "Para las sillas salvaescaleras residenciales normalmente no se necesita ningún permiso especial. En comunidades de propietarios puede ser necesaria la aprobación de la junta, aunque la ley de propiedad horizontal protege el derecho a la accesibilidad. Nuestro equipo te asesora sobre los trámites necesarios en tu caso concreto.",
    answerEn: "For residential stairlifts, no special permits are normally needed. In residents' communities, approval from the owners' meeting may be required, although horizontal property law protects the right to accessibility. Our team advises you on the necessary procedures for your specific case.",
  },
  {
    id: "escalera-curva-estrecha",
    category: "products",
    questionEs: "¿Se puede instalar en una escalera curva muy estrecha?",
    questionEn: "Can it be installed on a very narrow curved staircase?",
    answerEs: "Sí. La Platinum Ergo ocupa solo 10-12 cm de anchura con su doble raíl de perfil súper reducido, siendo una de las soluciones más compactas del mercado para escaleras curvas. Realizamos un estudio personalizado con nuestro sistema E-Survey para garantizar la viabilidad de la instalación.",
    answerEn: "Yes. The Platinum Ergo occupies only 10-12 cm width with its super-slim dual rail, being one of the most compact curved staircase solutions on the market. We carry out a personalised study with our E-Survey system to guarantee installation viability.",
  },
  {
    id: "silla-vs-plataforma",
    category: "general",
    questionEs: "¿Qué diferencia hay entre una silla salvaescaleras y una plataforma?",
    questionEn: "What is the difference between a stairlift and a platform lift?",
    answerEs: "La silla salvaescaleras está diseñada para personas que pueden sentarse y que tienen cierta movilidad. La plataforma salvaescaleras está pensada para usuarios de silla de ruedas o con movilidad muy reducida, ya que permite subir y bajar la escalera sin levantarse. Las plataformas son más anchas y pueden transportar también a un acompañante.",
    answerEn: "A stairlift is designed for people who can sit down and have some mobility. A platform lift is designed for wheelchair users or those with very limited mobility, as it allows going up and down stairs without standing. Platform lifts are wider and can also transport a companion.",
  },
]

export function getFaqsByCategory(category: FAQ["category"]): FAQ[] {
  return faqs.filter((f) => f.category === category)
}
