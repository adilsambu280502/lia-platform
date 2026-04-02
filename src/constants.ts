import { Slide, Feature, EducationLevel, Activity, Testimonial } from './types';

export const THEME = {
  primary: '#003366', // Institutional Blue
  secondary: '#E31E24', // Institutional Red
  white: '#FFFFFF',
  gray: '#F5F5F5',
  text: '#1A1A1A',
};

export const SLIDES: Slide[] = [
  {
    id: 1,
    headline: 'O Mundo Começa Aqui. Educação Multilingue de Excelência em Luanda.',
    subheadline: 'Escola Internacional licenciada pela Cambridge. Preparamos os líderes de amanhã com um currículo global. Imersão em Português, Inglês e Francês, com introdução ao Árabe, num ambiente seguro e estimulante na Vila Alice.',
    cta: 'Agende uma Visita ao Campus',
    image: '/images/home-slider-1.jpg',
  },
  {
    id: 2,
    headline: 'Aprender com Alegria e Descoberta',
    subheadline: 'Metodologia inovadora centrada no aluno',
    cta: 'Conhecer o Ensino',
    image: '/images/home-slider-2.jpg',
  },
  {
    id: 3,
    headline: 'Comunicação Escolar Inteligente',
    subheadline: 'Acompanhe o progresso do seu filho em tempo real',
    cta: 'Aceder à Área do Encarregado',
    image: '/images/home-slider-3.jpg',
  },
];

export const FEATURES: Feature[] = [
  {
    id: 1,
    title: 'Ensino Trilíngue',
    description: 'Português, Inglês e Francês integrados no currículo.',
    icon: 'Languages',
  },
  {
    id: 2,
    title: 'Professores Qualificados',
    description: 'Corpo docente internacional com vasta experiência.',
    icon: 'GraduationCap',
  },
  {
    id: 3,
    title: 'Tecnologia',
    description: 'Laboratórios modernos e ensino digital avançado.',
    icon: 'Cpu',
  },
  {
    id: 4,
    title: 'Desenvolvimento Integral',
    description: 'Foco no bem-estar emocional e social do aluno.',
    icon: 'Heart',
  },
];

export const EDUCATION_LEVELS: EducationLevel[] = [
  {
    id: 1,
    name: 'Ensino Infantil e Primário',
    description: 'Foco absoluto no desenvolvimento motor, cognitivo e social da criança, respeitando o ritmo individual de cada aluno.',
    image: '/images/home-nivel-1.jpg',
  },
  {
    id: 2,
    name: 'Imersão Multilingue',
    description: 'Aulas planeadas para garantir uma aquisição de vocabulário natural e fluente nas línguas mais relevantes do cenário global.',
    image: '/images/home-nivel-2.jpg',
  },
  {
    id: 3,
    name: 'Atividades de Enriquecimento',
    description: 'Oficinas extracurriculares desenhadas para estimular a criatividade, a resolução de problemas e o trabalho de equipa.',
    image: '/images/home-nivel-3.jpg',
  },
];

export const ACTIVITIES: Activity[] = [
  {
    id: 1,
    category: 'Linguagem',
    name: 'Escrita Criativa',
    description: 'Desenvolvimento da caligrafia e expressão escrita.',
    icon: 'PenTool',
  },
  {
    id: 2,
    category: 'Linguagem',
    name: 'Língua Portuguesa',
    description: 'Domínio da gramática e literatura lusófona.',
    icon: 'BookOpen',
  },
  {
    id: 3,
    category: 'Artes',
    name: 'Educação Musical',
    description: 'Teoria musical e prática de instrumentos.',
    icon: 'Music',
  },
  {
    id: 4,
    category: 'Artes',
    name: 'Belas Artes',
    description: 'Pintura, desenho e história da arte.',
    icon: 'Palette',
  },
  {
    id: 5,
    category: 'Tecnologia',
    name: 'Robótica & IA',
    description: 'Introdução à programação e automação.',
    icon: 'Bot',
  },
  {
    id: 6,
    category: 'Tecnologia',
    name: 'Informática',
    description: 'Literacia digital e ferramentas de produtividade.',
    icon: 'Monitor',
  },
  {
    id: 7,
    category: 'Desporto',
    name: 'Educação Física',
    description: 'Desenvolvimento motor e saúde desportiva.',
    icon: 'Dumbbell',
  },
  {
    id: 8,
    category: 'Desporto',
    name: 'Krav Maga',
    description: 'Defesa pessoal e disciplina mental.',
    icon: 'Sword',
  },
  {
    id: 9,
    category: 'Desporto',
    name: 'Natação',
    description: 'Prática em piscina semi-olímpica.',
    icon: 'Waves',
  },
  {
    id: 10,
    category: 'Cidadania',
    name: 'Ed. Financeira',
    description: 'Gestão básica de recursos e poupança.',
    icon: 'Coins',
  },
  {
    id: 11,
    category: 'Linguagem',
    name: 'Língua Inglesa',
    description: 'Imersão em Inglês nível Cambridge.',
    icon: 'Globe',
  },
  {
    id: 12,
    category: 'Académico',
    name: 'Estudo Acompanhado',
    description: 'Apoio personalizado nas tarefas escolares.',
    icon: 'Library',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Maria António',
    role: 'Encarregada de Educação',
    text: 'Nunca ganhei nenhum jogo de xadrez mas sempre a Chinoya a me ensina como se joga.',
    image: 'https://i.pravatar.cc/150?u=maria',
  },
  {
    id: 2,
    name: 'Eraldina de Sousa',
    role: 'Encarregada de Educação',
    text: 'Cada dia a melhorar. 😄. Sempre dar sorriso a ter algo que dar para lembrar a LIA. Que continua a somar e tambem gostaria da ver as crianças a partcipar mas em limpeza ao seus rodeios tipo poe a mesa Plato copo garfo colher etc. ajudar limpar loiça e fogao...como parte de actividade apos de cozinha.',
    image: 'https://i.pravatar.cc/150?u=eraldina',
  },
  {
    id: 3,
    name: 'Elie Saad',
    role: 'Pai / Encarregado',
    text: 'Thank you very much, your work gets better every year!!! Thank you for teaching the little ones to care and protect themselves.',
    image: 'https://i.pravatar.cc/150?u=elie',
  },
];

export const FAQS = [
  {
    question: 'A escola tem alguma certificação internacional?',
    answer: 'Sim, a Luanda International Academy é uma escola internacional oficialmente licenciada pela Cambridge, o que garante que o nosso currículo e métodos de avaliação cumprem os mais altos padrões globais de excelência académica.',
  },
  {
    question: 'Qual é o processo de admissão?',
    answer: 'O processo inicia-se com o preenchimento do formulário online, seguido de uma visita à escola e uma breve avaliação diagnóstica do aluno.',
  },
  {
    question: 'Quais são os documentos necessários?',
    answer: 'Cópia do documento de identificação do aluno e encarregados, boletim de vacinas atualizado e certificados académicos da escola anterior.',
  },
  {
    question: 'A escola oferece transporte escolar?',
    answer: 'Sim, dispomos de uma frota moderna de autocarros que cobre as principais zonas de Luanda.',
  },
  {
    question: 'Como funciona o ensino trilíngue?',
    answer: 'O nosso currículo integra Português, Inglês e Francês desde os primeiros anos, com professores nativos e metodologias imersivas.',
  },
  {
    question: 'Qual é a estrutura do currículo?',
    answer: 'O nosso currículo baseia-se em padrões internacionais rigorosos, combinando o programa nacional com metodologias globais focadas no pensamento crítico, resolução de problemas e literacia digital.',
  },
  {
    question: 'Que atividades extracurriculares estão disponíveis?',
    answer: 'Oferecemos uma vasta gama de clubes e atividades, incluindo robótica, artes visuais, natação, xadrez, música e várias modalidades desportivas, para garantir o desenvolvimento integral do aluno.',
  },
  {
    question: 'Qual é o calendário de admissões?',
    answer: 'As candidaturas estão abertas durante todo o ano letivo, sujeitas à disponibilidade de vagas. Recomendamos a inscrição com antecedência, especialmente para o início do ano letivo em Setembro.',
  },
  {
    question: 'Como funciona o reconhecimento de notas internacionais?',
    answer: 'A LIA segue padrões curriculares globais. O nosso histórico escolar e as certificações emitidas são amplamente reconhecidos por instituições internacionais, facilitando a transição de alunos para escolas ou universidades no exterior.',
  },
  {
    question: 'Qual é o processo de equivalência de estudos para alunos estrangeiros?',
    answer: 'Para alunos vindos de sistemas de ensino estrangeiros, a nossa equipa pedagógica realiza uma análise detalhada do histórico escolar para garantir a correta equivalência e integração no ano letivo adequado, em conformidade com as diretrizes do Ministério da Educação.',
  },
  {
    question: 'Existe apoio para alunos que não dominam o Português ou Inglês?',
    answer: 'Sim. Oferecemos programas de imersão e apoio linguístico intensivo (ESL/PTL) para garantir que alunos estrangeiros ou com dificuldades no idioma principal se integrem rapidamente e acompanhem o currículo com sucesso.',
  },
];
