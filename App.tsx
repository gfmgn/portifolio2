import { useEffect, useState } from "react"

type Category = "Todos" | "Experiência" | "Projetos" | "Formação"

type TimelineItem = {
  id: number
  period: string
  category: Exclude<Category, "Todos">
  title: string
  org: string
  description: string
  details: string
  tags: string[]
  accent: string
  githubUrl?: string
}

const timeline: TimelineItem[] = [
  {
    id: 5,
    period: "JAN 2023 — JUL 2027",
    category: "Formação",
    title: "Bacharelado em Sistemas de Informação",
    org: "Universidade Federal de Goiás",
    description:
      "Graduanda em Sistemas de Informação, com conclusão prevista para julho de 2027.",
    details:
      "Curso de Bacharelado em Sistemas de Informação pela Universidade Federal de Goiás, iniciado em janeiro de 2023 e com previsão de conclusão em julho de 2027.",
    tags: ["Sistemas de Informação", "UFG", "Graduação"],
    accent: "blue",
  },
  {
    id: 1,
    period: "JUL 2019 — DEZ 2020",
    category: "Experiência",
    title: "Assistente de TI",
    org: "FS Business",
    description:
      "Suporte técnico presencial e remoto, instalação de equipamentos e apoio aos usuários.",
    details:
      "Atuação presencial de julho de 2019 a fevereiro de 2020 e remota de junho a dezembro de 2020. Prestei suporte técnico a usuários em problemas de hardware e software, incluindo acesso remoto às máquinas; instalei e configurei equipamentos de informática; e criei e mantive planilhas, documentos e apresentações no Microsoft Office.",
    tags: ["Suporte Técnico", "Hardware", "Microsoft Office"],
    accent: "lime",
  },
  {
    id: 2,
    period: "PROJETO ACADÊMICO",
    category: "Projetos",
    title: "Sistema de Gerenciamento de Livraria",
    org: "Aplicação Java",
    description:
      "Aplicação com interface gráfica para controlar clientes, estoque, carrinho e vendas de uma livraria.",
    details:
      "O sistema aplica conceitos de Orientação a Objetos para gerenciar diferentes produtos, clientes e o carrinho de compras. Os dados são persistidos em arquivos JSON utilizando a biblioteca Gson.",
    tags: ["Java", "POO", "Gson", "JSON"],
    accent: "pink",
    githubUrl: "https://github.com/gfmgn",
  },
  {
    id: 3,
    period: "PROJETO ACADÊMICO",
    category: "Projetos",
    title: "MeSalva",
    org: "Backend com Spring Boot",
    description:
      "Plataforma acadêmica que ajuda universitários a escolherem disciplinas com mais confiança.",
    details:
      "Desenvolvi o backend da aplicação com Spring Boot, PostgreSQL e Thymeleaf. O sistema permite avaliar professores por critérios específicos, como didática e clareza, utilizando Spring Web, JPA/Hibernate, validação de dados e APIs REST.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "REST", "React"],
    accent: "blue",
    githubUrl: "https://github.com/gfmgn",
  },
  {
    id: 4,
    period: "PROJETO ACADÊMICO",
    category: "Projetos",
    title: "Chat4All",
    org: "Gateway de mensageria multicanal",
    description:
      "Sistema que unifica a comunicação por WhatsApp e Instagram em uma API escalável.",
    details:
      "Projeto em Python baseado em gRPC, Apache Kafka, MongoDB e Docker. A arquitetura orientada a eventos oferece chats em grupo, roteamento assíncrono e rastreamento do status de mensagens em tempo real.",
    tags: ["Python", "gRPC", "Kafka", "MongoDB", "Docker"],
    accent: "orange",
    githubUrl: "https://github.com/gfmgn",
  },
  {
    id: 6,
    period: "COMPETÊNCIAS",
    category: "Projetos",
    title: "Competências Técnicas",
    org: "Tecnologia, dados e design",
    description:
      "Experiência acadêmica com diferentes tecnologias, projetos, ferramentas de dados e design.",
    details:
      "Conhecimentos: C, Java, Python, SQL e HTML; SQL Server, Oracle e PostgreSQL; Excel e Power BI; React, Thymeleaf e Spring Boot; Figma, Canva, Bizagi e Lucidchart. Soft skills: aprendizado rápido, resolução de problemas, organização e responsabilidade.",
    tags: [
      "C",
      "Lua",
      "Figma",
      "SQL",
      "Power BI",
      "Google Colab",
      "Canva",
      "Cybersecurity",
    ],
    accent: "violet",
  },
  {
    id: 8,
    period: "CERTIFICAÇÕES",
    category: "Formação",
    title: "Certificações",
    org: "Formação complementar",
    description:
      "AWS Cloud Practitioner e Análise de dados como suporte à tomada de decisão.",
    details:
      "O curso aborda a introdução à análise de dados, o pré-processamento, a análise descritiva e o desenvolvimento de painéis de Business Intelligence. Destinado a gestores, analistas e servidores que buscam desenvolver competências básicas em análise de dados e uso de ferramentas de BI para transformar dados em informações acionáveis que qualifiquem as decisões.",
    tags: [
      "AWS Cloud Practitioner",
      "Análise de dados",
      "Business Intelligence",
      "Power BI",
    ],
    accent: "violet",
  },
  {
    id: 7,
    period: "IDIOMAS",
    category: "Formação",
    title: "Competências Linguísticas",
    org: "Comunicação",
    description:
      "Inglês avançado e português fluente para comunicação em diferentes contextos.",
    details:
      "Português fluente e domínio avançado de inglês, com capacidade para leitura, escrita e comunicação em ambientes acadêmicos e profissionais.",
    tags: ["Inglês avançado", "Português fluente"],
    accent: "blue",
  },
]

const filters: Category[] = ["Todos", "Experiência", "Projetos", "Formação"]

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="M3 8h9M8 4l4 4-4 4" />
    </svg>
  )
}

function TinyIcon({ type }: { type: "folder" | "document" | "mail" }) {
  if (type === "folder") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path className="icon-shadow" d="M3 9h12l3 3h11v16H3z" />
        <path className="icon-main" d="M3 7h12l3 3h11v15H3z" />
        <path className="icon-light" d="M5 13h22v3H5z" />
      </svg>
    )
  }
  if (type === "mail") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <rect className="icon-shadow" x="3" y="7" width="27" height="20" />
        <rect className="icon-paper" x="2" y="5" width="27" height="20" />
        <path className="icon-line" d="m3 7 12.5 10L28 7M3 23l8-8m17 8-8-8" />
      </svg>
    )
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <path className="icon-paper" d="M7 3h13l7 7v19H7z" />
      <path className="icon-shadow" d="M20 3v8h7" />
      <path className="icon-line" d="M11 16h12M11 20h12M11 24h8" />
    </svg>
  )
}

function WindowControls() {
  return (
    <div className="window-controls" aria-hidden="true">
      <span>_</span>
      <span>□</span>
      <span>×</span>
    </div>
  )
}

function App() {
  const [activeFilter, setActiveFilter] = useState<Category>("Todos")
  const [openItem, setOpenItem] = useState<number | null>(null)
  const [aboutOpen, setAboutOpen] = useState(false)

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAboutOpen(false)
        setOpenItem(null)
      }
    }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [])

  const filteredTimeline =
    activeFilter === "Todos"
      ? timeline
      : timeline.filter((item) => item.category === activeFilter)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main>
      <section className="desktop" id="home" aria-labelledby="intro-title">
        <div className="wallpaper-noise" />

        <nav className="desktop-icons" aria-label="Desktop shortcuts">
          <button type="button" onClick={() => scrollTo("work")}>
            <TinyIcon type="folder" />
            <span>meus_projetos</span>
          </button>
          <button type="button" onClick={() => setAboutOpen(true)}>
            <TinyIcon type="document" />
            <span>sobre_mim.txt</span>
          </button>
          <a href="mailto:giovanna.formigoni.santos@gmail.com">
            <TinyIcon type="mail" />
            <span>contato</span>
          </a>
        </nav>

        <div className="hero-window retro-window">
          <div className="title-bar">
            <span className="title-bar-mark">G</span>
            <span>giovanna's homepage</span>
            <WindowControls />
          </div>
          <div className="browser-menu" aria-hidden="true">
            <span>file</span>
            <span>edit</span>
            <span>view</span>
            <span>favorites</span>
            <span>help</span>
          </div>
          <div className="browser-address" aria-hidden="true">
            <span>←</span>
            <span>→</span>
            <div className="browser-address-edited">
              http://www.gfmg-world.net/home
            </div>
            <b>GO</b>
          </div>
          <div className="hero-content hero-content-edited">
            <div className="status-row">
              <span className="status-dot" />
              DISPONÍVEL PARA APRENDER E COLABORAR
            </div>
            <p className="eyebrow">Estudante / DEv</p>
            <h1 id="intro-title">
              {"Hello world!          I'm "}
              <span className="fg-inline-font-normal" data-fge-id="fge-538">
                Giovanna
              </span>
              {". I make pixels do useful things."}
            </h1>
            <p className="hero-copy">
              Desenvolvedora em início de carreira, com experiência em suporte
              de TI e projetos acadêmicos em Java, Spring Boot e Python.
            </p>
            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => scrollTo("work")}
              >
                Conheça meus projetos <ArrowIcon />
              </button>
              <button
                className="text-button"
                onClick={() => setAboutOpen(true)}
              >
                Abrir sobre_mim.txt
              </button>
            </div>
          </div>
          <div className="window-status">
            <span>{timeline.length} registros</span>
            <span>ANÁPOLIS · GO</span>
          </div>
        </div>

        <div className="scroll-cue">
          <span>ROLE PARA EXPLORAR</span>
          <i />
        </div>
      </section>

      <section
        className="timeline-section"
        id="work"
        aria-labelledby="work-title"
      >
        <div className="section-heading">
          <p className="path">C:\GIOVANNA\TRAJETÓRIA</p>
          <h2 id="work-title">Experiência e projetos.</h2>
          <p>
            Um registro do que já desenvolvi, aprendi e coloquei em prática.
          </p>
        </div>

        <div className="filter-window retro-window">
          <div className="mini-title-bar">
            <span>FILTRAR_POR:</span>
            <span>▴</span>
          </div>
          <div
            className="filters filters-edited"
            role="group"
            aria-label="Filter timeline"
          >
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={activeFilter === filter ? "active" : ""}
                aria-pressed={activeFilter === filter}
                onClick={() => {
                  setActiveFilter(filter)
                  setOpenItem(null)
                }}
              >
                <span className="filter-pixel" />
                {filter}
                <small>
                  {filter === "Todos"
                    ? timeline.length
                    : timeline.filter((item) => item.category === filter)
                        .length}
                </small>
              </button>
            ))}
          </div>
        </div>

        <div className="timeline-list" aria-live="polite">
          {filteredTimeline.map((item, index) => {
            const isOpen = openItem === item.id
            const selectedSurfaceClass =
              item.id === 1 || item.id === 3
                ? " selected-surface-paper"
                : item.id === 2 || item.id === 4
                  ? " selected-surface-sage"
                  : ""
            const latestPaperSurfaceClass =
              item.id === 5 || item.id === 1
                ? " latest-selected-surface-paper"
                : ""
            return (
              <article
                className={`timeline-item timeline-item-${item.id} accent-${item.accent}`}
                key={item.id}
              >
                <div className="timeline-rail">
                  <span
                    className={`timeline-number timeline-number-${item.id}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <i />
                </div>
                <div className="timeline-card retro-window">
                  <div className="card-topline">
                    <span className={`period-label period-label-${item.id}`}>
                      {item.period}
                    </span>
                    <span
                      className={`category-label category-label-${item.id}`}
                      data-category={item.category}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div
                    className={`card-content${selectedSurfaceClass}${latestPaperSurfaceClass}`}
                  >
                    <div>
                      <p className="item-org">{item.org}</p>
                      <h3>{item.title}</h3>
                      <p className="item-description">{item.description}</p>
                    </div>
                    <button
                      className="expand-button"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`detail-${item.id}`}
                      onClick={() => setOpenItem(isOpen ? null : item.id)}
                    >
                      <span>{isOpen ? "Fechar detalhes" : "Ver detalhes"}</span>
                      <b aria-hidden="true">{isOpen ? "−" : "+"}</b>
                    </button>
                  </div>
                  <div
                    className={`tag-row tag-row-details tag-row-${item.id}${selectedSurfaceClass}${latestPaperSurfaceClass}`}
                  >
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div
                    id={`detail-${item.id}`}
                    className={`detail-panel ${isOpen ? "open" : ""}`}
                  >
                    {isOpen && (
                      <>
                        <p>{item.details}</p>
                        <div className="detail-links">
                          {item.githubUrl && (
                            <a
                              href={item.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Ver no GitHub <ArrowIcon />
                            </a>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="contact-window retro-window">
          <div className="title-bar">
            <span className="title-bar-mark contact-title-mark">@</span>
            <span>new_message.msg</span>
            <WindowControls />
          </div>
          <div className="contact-inner contact-inner-edited">
            <div>
              <p className="eyebrow">VAMOS CONVERSAR</p>
              <h2 id="contact-title">Entre em contato comigo.</h2>
            </div>
            <div className="contact-copy">
              <p>
                Estou em Anápolis, Goiás, e aberta a oportunidades para
                aprender, colaborar e desenvolver novas ideias :)
              </p>
              <a
                className="primary-button contact-email-button"
                href="mailto:giovanna.formigoni.santos@gmail.com"
              >
                Enviar um e-mail <ArrowIcon />
              </a>
              <div className="social-links">
                <a
                  href="https://github.com/gfmgn"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a href="mailto:giovanna.formigoni.santos@gmail.com">E-mail</a>
                <a href="tel:+5562994536159">(62) 99453-6159</a>
              </div>
            </div>
          </div>
        </div>
        <p className="footer-note">Anápolis · GO · Giovanna Formigoni Santos</p>
      </section>

      {aboutOpen && (
        <div
          className="dialog-backdrop"
          role="presentation"
          onMouseDown={() => setAboutOpen(false)}
        >
          <div
            className="about-dialog retro-window"
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="title-bar">
              <span className="title-bar-mark">i</span>
              <span>sobre_mim.txt</span>
              <button
                className="dialog-close"
                type="button"
                aria-label="Close about dialog"
                onClick={() => setAboutOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="about-content">
              <span className="avatar" aria-hidden="true">
                GFS
              </span>
              <div>
                <p className="eyebrow">UM BREVE README</p>
                <h2 id="about-title">
                  Curiosa por tecnologia. Pronta para aprender.
                </h2>
                <p>
                  Sou Giovanna Formigoni Santos, desenvolvedora em início de
                  carreira com experiência em suporte de TI. Tenho conhecimentos
                  em Java, Python, C, SQL, Spring Boot, React, bancos de dados,
                  análise de dados e ferramentas de design. Sou AWS Cloud
                  Practitioner, falo português fluentemente e tenho inglês
                  avançado.
                </p>
                <button
                  className="primary-button"
                  onClick={() => {
                    setAboutOpen(false)
                    scrollTo("contact")
                  }}
                >
                  Entrar em contato <ArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="taskbar" aria-label="Primary navigation">
        <button
          className="start-button"
          type="button"
          onClick={() => scrollTo("home")}
        >
          <span className="start-mark start-mark-edited">G</span>
          GIO.OS
        </button>
        <div className="taskbar-links">
          <button type="button" onClick={() => scrollTo("home")}>
            Início
          </button>
          <button type="button" onClick={() => scrollTo("work")}>
            Projetos
          </button>
          <button type="button" onClick={() => scrollTo("contact")}>
            Contato
          </button>
        </div>
        <div className="taskbar-status">
          <span className="online-dot" />
          ONLINE
        </div>
      </nav>
    </main>
  )
}

export default App
