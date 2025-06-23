import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>EliHelp - O App que Todo Residente em Pediatria Precisa</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Cabeçalho */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <Image
              src="/imgs/elihelp-logo1.png"
              alt="EliHelp Logo"
              width={150}
              height={50}
            />
          </div>
          <nav className="main-nav">
            <ul>
              <li>
                <Link href="#problem">Desafios</Link>
              </li>
              <li>
                <Link href="#solution">Nós</Link>
              </li>
              <li>
                <Link href="#features">Ferramentas</Link>
              </li>
              <li>
                <Link href="#pricing">Planos</Link>
              </li>
            </ul>
          </nav>
          <div className="nav-cta">
            <Link href="/dashboard">
              <Button>ACESSE AQUI!!</Button>
            </Link>
          </div>
          {/*
          <div className="nav-cta">
            <Link href="/sign-in">
              <Button>Login</Button>
            </Link>
          </div>
          <div className="nav-cta">
            <Link href="/sign-up">
              <Button>Registrar</Button>
            </Link>
          </div>
          */}
        </div>
      </header>

      {/* Seção Hero */}
      <section className="hero">
        <div className="container">
          <h1>
            Domine a Pediatria com
            <span className="highlight"> Confiança e Agilidade</span>
          </h1>
          <p className="subtitle">
            <strong>
              Calculadoras inteligentes + Dicas objetivas + Consultoria
              especializada
            </strong>
            <br />
            Tudo o que você precisa para tomar decisões precisas durante a
            residência e chegar impressionando os preceptores
          </p>
          <Link href="#pricing" className="cta-button">
            QUERO APRENDER MAIS RÁPIDO →
          </Link>
          <Image
            src="/elihelp-exemplo.jpeg"
            alt="App EliHelp mostrando calculadora pediátrica"
            className="hero-image"
            width={200}
            height={80}
          />
          <p className="small-text">
            <Image
              src="/imgs/shield-black-icon.svg"
              alt="Seguro"
              width={16}
              height={16}
            />
            Seus colegas já usam o EliHelp
          </p>
        </div>
      </section>

      {/* Seção Problema */}
      <section className="problem" id="problem">
        <div className="container">
          <h2 className="section-title">
            A Residência em Pediatria Está te
            <span className="underline"> Desgastando?</span>
          </h2>
          <div className="problem-content">
            <div className="problem-text">
              <h3>Você se identifica com algum desses desafios?</h3>
              <ul>
                <li>
                  <strong>⏱️ Pressão no plantão:</strong> Fórmulas e doses que
                  precisam ser calculadas em segundos
                </li>
                <li>
                  <strong>📚 Conteúdo disperso:</strong> Resumos incompletos e
                  protocolos difíceis de memorizar
                </li>
                <li>
                  <strong>💊 Dúvidas frequentes:</strong> &quot;Qual a dose de
                  amoxicilina para esta criança de 12kg?&quot;
                </li>
                <li>
                  <strong>📉 Medo de errar:</strong> Aquele frio na barriga ao
                  prescrever medicações complexas
                </li>
                <li>
                  <strong>👨‍⚕️ Falta de mentoria:</strong> Sem tempo para tirar
                  dúvidas com preceptores
                </li>
              </ul>
              <div className="problem-quote">
                <p>
                  &quot;O EliHelp facilitou todo o processo de início da minha
                  residência de pediatria.&quot;
                </p>
                <p className="author">— Testemunho 1</p>
              </div>
            </div>
            <div className="problem-image">
              <Image
                src="/imgs/doctor.jpg"
                alt="Médico residente sobrecarregado"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Seção Solução */}
      <section className="solution" id="solution">
        <div className="container">
          <h2 className="section-title">
            O <span className="brand-color">EliHelp</span> é Como Ter um
            Preceptor
            <span className="underline"> No Seu Bolso</span>
          </h2>
          <div className="solution-cards">
            <div className="solution-card">
              <Image
                src="/imgs/calculator-icon.svg"
                alt="Calculadora"
                width={50}
                height={50}
              />
              <h3>Calculadoras que Ensinam</h3>
              <p>
                Não apenas resultados - <strong>entenda a lógica</strong> por
                trás de cada fórmula pediátrica enquanto calcula.
              </p>
            </div>
            <div className="solution-card">
              <Image
                src="/imgs/e-learning-icon.svg"
                alt="Aulas"
                width={50}
                height={50}
              />
              <h3>Resumos profissionais</h3>
              <p>
                <strong>Resumos em texto ou vídeos de 5-10min</strong> sobre os
                temas que mais aparecem na prática clínica.
              </p>
            </div>
            <div className="solution-card">
              <Image
                src="/imgs/interview-icon.svg"
                alt="Consultoria"
                width={50}
                height={50}
              />
              <h3>Contato direto</h3>
              <p>
                Dúvidas sobre o uso?
                <strong>Entre em contato conosco</strong> Acesso direto para
                sanar suas dúvidas
              </p>
            </div>
          </div>
          <div className="solution-cta">
            <Link href="#pricing" className="cta-button secondary">
              VER PLANOS →
            </Link>
            <p className="small-text">Disponível para Web</p>
            <p className="small-text">Logo logo, disponível para Android</p>
          </div>
        </div>
      </section>

      {/* Seção Recursos */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">
            Facilitando sua vida em
            <span className="brand-color"> Um Único App</span>
          </h2>
          <div className="features-container">
            <div className="feature">
              <div className="feature-icon">🧮</div>
              <div className="feature-text">
                <h3>Calculadoras</h3>
                <p>
                  <strong>Dosagem de medicamentos</strong>, fluidoterapia, DVAs
                  e dicas para emergências - todas com explicações.
                </p>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">🎥</div>
              <div className="feature-text">
                <h3>Resumos em Notion, Obsidian e Drive</h3>
                <p>
                  <strong>Os principais protocolos e aulas resumidos</strong>{" "}
                  para facilitar seu processo de estudos e aprendizado.
                </p>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">📝</div>
              <div className="feature-text">
                <h3>Fluxogramas para Download</h3>
                <p>
                  <strong>Algoritmos prontos</strong> para impressão e consulta
                  rápida no plantão.
                </p>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">🔄</div>
              <div className="feature-text">
                <h3>Atualizações Constantes</h3>
                <p>
                  Conteúdo sempre alinhado com as
                  <strong>últimas diretrizes e protocolos</strong>
                </p>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">👨‍⚕️</div>
              <div className="feature-text">
                <h3>Feito por Residente</h3>
                <p>
                  Desenvolvido por um
                  <strong>residente de pediatria que vive suas dores</strong> -
                  não por uma empresa sem experiência clínica.
                </p>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <div className="feature-text">
                <h3>Sugestões de produtos para a residência</h3>
                <p>
                  Encontre <strong>os melhores produtos</strong> - cruciais para
                  plantões como pediatra ou residente de pediatria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Depoimentos */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">
            Quem Usa <span className="underline">Recomenda</span>
          </h2>
          <div className="testimonial-slider">
            <div className="testimonial active">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">
                &quot;O EliHelp facilita muito meus plantões, especialmente por
                minimizar o tempo para calcular muitas das coisas que acabamos
                gastando muito tempo em pediatria. É como um curso introdutório
                que deveria ser obrigatório para a residência.&quot;
              </p>
              <div className="testimonial-author">
                <Image
                  src="/imgs/avatar-icon.svg"
                  alt="Residente"
                  className="testimonial-photo"
                  width={50}
                  height={50}
                />
                <div>
                  <p className="name">Testemunho 2</p>
                  <p className="role">Residente</p>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">&quot;&quot;</p>
              <div className="testimonial-author">
                <Image
                  src="/imgs/profile-girl-icon.svg"
                  alt="Staff"
                  className="testimonial-photo"
                  width={50}
                  height={50}
                />
                <div>
                  <p className="name">Testemunho 3</p>
                  <p className="role">Residente</p>
                </div>
              </div>
            </div>
            <div className="slider-controls">
              <div className="slider-dot active" data-slide="0"></div>
              <div className="slider-dot" data-slide="1"></div>
            </div>
          </div>
          <div className="trust-badges">
            <Image
              src="/imgs/made-in-brazil-icon.svg"
              alt="Utilizado por residentes de todo o Brasil"
              width={30}
              height={30}
            />
            Utilizado por residentes de todo o Brasil
          </div>
        </div>
      </section>

      {/* Seção Preço */}
      <section className="pricing" id="pricing">
        <div className="container">
          <h2 className="section-title">
            Invista no Seu{" "}
            <span className="brand-color">Futuro como Pediatra</span>
          </h2>
          <p className="pricing-subtitle">
            Menos que um café por dia para ter segurança nas suas decisões
          </p>

          <div className="pricing-cards">
            <div className="pricing-card">
              <h3>Residente</h3>
              <div className="price">
                R$ por enquanto grátis<span>/dia</span>
              </div>
              <p className="billing-info">*Por enquanto é grátis</p>
              <ul className="pricing-features">
                <li>✔ Principais calculadoras pediátricas</li>
                <li>✔ Descontos nos resumos</li>
                <li>✔ Receitas básicas para download</li>
                <li>✔ Atualizações constantes</li>
              </ul>
              <Link href="#" className="cta-button secondary">
                ASSINAR
              </Link>
            </div>

            <div className="pricing-card popular">
              <div className="popular-tag">MELHOR CUSTO-BENEFÍCIO</div>
              <h3>Residente PRO</h3>
              <div className="price">
                R$ por enquanto é grátis<span>/mês*</span>
              </div>
              <p className="billing-info">*Por enquanto é tudo de graça</p>
              <ul className="pricing-features">
                <li>✔ Tudo do plano Residente</li>
                <li>✔ Acesso a TODAS as calculadoras</li>
                <li>
                  ✔ Direito solicitações mensais de aplicativos ou fluxogramas
                </li>
                <li>✔ Materiais exclusivos</li>
                <li>✔ Desconto generoso nos resumos</li>
              </ul>
              <Link href="#" className="cta-button">
                QUERO SER PRO →
              </Link>
              <p className="guarantee">3 dias de garantia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção CTA Final */}
      <section className="cta-final">
        <div className="container">
          <h2>
            Comece Agora e Ganhe <span className="highlight"> + Confiança</span>{" "}
            na Sua Prática
          </h2>
          <div className="cta-benefits">
            <div className="benefit">
              <Image
                src="/imgs/sand-clock-full-icon.svg"
                alt="Rápido"
                width={40}
                height={40}
              />
              <p>Configuração em 2 minutos</p>
            </div>
            <div className="benefit">
              <Image
                src="/imgs/mobile-icon.svg"
                alt="Dispositivos"
                width={40}
                height={40}
              />
              <p>Use no celular, tablet ou computador</p>
            </div>
            <div className="benefit">
              <Image
                src="/imgs/cloud-data-icon.svg"
                alt="Atualizações"
                width={40}
                height={40}
              />
              <p>Conteúdo sempre atualizado</p>
            </div>
          </div>
          <div className="cta-buttons">
            <Link href="#pricing" className="cta-button">
              QUERO APRENDER MAIS →
            </Link>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>EliHelp</h3>
              <p>Seu companheiro nos estudos</p>
              <p>
                Desenvolvido por
                <strong>
                  Dr. Eliabe R. S., Usuário experiente de IA, Residente de
                  pediatria e Empreendedor Digital
                </strong>
              </p>
              <div className="social-links">
                <Link href="#">Instagram</Link>
                <Link href="#">LinkedIn</Link>
                <Link href="#">E-mail</Link>
              </div>
            </div>
            <div className="footer-column">
              <h3>Recursos</h3>
              <ul>
                <li>
                  <Link href="#">Calculadoras</Link>
                </li>
                <li>
                  <Link href="#">Resumos</Link>
                </li>
                <li>
                  <Link href="#">Indicações de produtos</Link>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Institucional</h3>
              <ul>
                <li>
                  <Link href="#">Sobre o Criador</Link>
                </li>
                <li>
                  <Link href="#">Trabalhe Conosco</Link>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Suporte</h3>
              <ul>
                <li>
                  <Link href="#">FAQ</Link>
                </li>
                <li>
                  <Link href="#">Contato</Link>
                </li>
                <li>
                  <Link href="#">Política de Privacidade</Link>
                </li>
                <li>
                  <Link href="#">Termos de Uso</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>© 2025 EliHelp - Todos os direitos reservados</p>
            <p>
              Não substitui a orientação de preceptores ou instituições de
              ensino
            </p>
            <p>A melhor recomendação é: faça residência!</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
