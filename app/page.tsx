"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { initialVehicles, revenueDays, money } from "./owner-data";

function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
    if (!gl) return;
    const vertexSrc = `attribute vec2 a_position; void main(){ gl_Position = vec4(a_position,0.0,1.0); }`;
    const fragmentSrc = `precision highp float; uniform float u_time; uniform vec2 u_resolution;
      void main(){
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec3 color1 = vec3(0.011,0.015,0.368);
        vec3 color2 = vec3(0.0,0.466,0.713);
        vec3 color3 = vec3(0.0,0.705,0.847);
        float t = u_time * 0.2;
        float noise = sin(uv.x*3.0+t)*cos(uv.y*2.0-t*0.5);
        noise += sin(uv.y*5.0+t*0.8)*cos(uv.x*4.0-t*1.2);
        float mixFactor = clamp(noise*0.5+uv.y*0.5,0.0,1.0);
        vec3 finalColor = mix(color1,color2,mixFactor);
        finalColor = mix(finalColor,color3,pow(uv.y,3.0)*0.3);
        gl_FragColor = vec4(finalColor,1.0);
      }`;
    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSrc));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSrc));
    gl.linkProgram(program);
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    let raf = 0;
    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    };
    const render = (t: number) => {
      resize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTime, t * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} className="hero-shader-canvas" aria-hidden="true" />;
}

type Role = "passenger" | "collector" | "owner";
type IconName = "wallet" | "scan" | "shield" | "check" | "arrow" | "lock" | "clock" | "chart" | "user" | "close" | "bell" | "car" | "qr" | "settings";

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: .52, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

const roleContent: Record<Role, { eyebrow: string; title: string; description: string; value: string }> = {
  passenger: {
    eyebrow: "PASSAGEIRO",
    title: "Mostra o QR. Confirma no teu telefone.",
    description: "O teu QR é pessoal e controlável. Ele inicia a cobrança, mas só o teu dispositivo pode aprovar o débito.",
    value: "Paga sem entregar dinheiro ou o teu PIN.",
  },
  collector: {
    eyebrow: "COBRADOR",
    title: "Indica a quantidade. Lê o QR. Aguarda a confirmação.",
    description: "O valor é calculado antes da leitura. O cobrador não pode alterar a cobrança depois da confirmação do passageiro.",
    value: "Recebe confirmação clara, sem gerir dinheiro do proprietário.",
  },
  owner: {
    eyebrow: "PROPRIETÁRIO",
    title: "Vê o que entrou, o que está reservado e o que já podes usar.",
    description: "A KwanzaGo separa receita pendente, saldo disponível e verba operacional. Assim, o controlo não depende da entrega manual de numerário.",
    value: "Ganha visibilidade, controlo de custos e previsibilidade de liquidação.",
  },
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    wallet: <><rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 8h16M16 12h5v4h-5a2 2 0 0 1 0-4Z"/></>,
    scan: <><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M7 12h10"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m8.8 12.2 2.1 2.1 4.4-5"/></>,
    check: <path d="m5 12 4.2 4.2L19.5 6"/>,
    arrow: <><path d="M4 12h15M13 6l6 6-6 6"/></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></>,
    chart: <><path d="M4 20V11M10 20V5M16 20v-7M22 20H2"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
    car: <><path d="m5 17-2-2v-4l2-5h14l2 5v4l-2 2Z"/><path d="M3 11h18M6 17v3M18 17v3M7 14h.01M17 14h.01"/></>,
    qr: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 20h2M20 14h1"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19 15.5a1.8 1.8 0 0 0 .3 2l-1.8 1.8a1.8 1.8 0 0 0-2-.3 1.8 1.8 0 0 0-1 1.6H12a1.8 1.8 0 0 0-1-1.6 1.8 1.8 0 0 0-2 .3l-1.8-1.8a1.8 1.8 0 0 0 .3-2 1.8 1.8 0 0 0-1.6-1V12a1.8 1.8 0 0 0 1.6-1 1.8 1.8 0 0 0-.3-2L9 7.2a1.8 1.8 0 0 0 2-.3 1.8 1.8 0 0 0 1-1.6h2.5a1.8 1.8 0 0 0 1 1.6 1.8 1.8 0 0 0 2 .3L19.3 9a1.8 1.8 0 0 0-.3 2 1.8 1.8 0 0 0 1.6 1v2.5a1.8 1.8 0 0 0-1.6 1Z"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Logo() {
  return <span className="brand-lockup"><img className="brand-logo" src="/kwanzago-symbol.png" alt="" /><strong>KwanzaGo</strong></span>;
}

function QrCode({ small = false }: { small?: boolean }) {
  const cells = useMemo(() => {
    const out: [number, number][] = [];
    const finder = (r: number, c: number, a: number, b: number) => {
      const y = r - a; const x = c - b;
      return y >= 0 && y < 7 && x >= 0 && x < 7 && (y === 0 || y === 6 || x === 0 || x === 6 || (y >= 2 && y <= 4 && x >= 2 && x <= 4));
    };
    for (let r = 0; r < 25; r++) for (let c = 0; c < 25; c++) {
      const f = finder(r,c,0,0) || finder(r,c,0,18) || finder(r,c,18,0);
      const protectedCell = (r < 8 && c < 8) || (r < 8 && c > 16) || (r > 16 && c < 8);
      if (f || (!protectedCell && ((r * c + 2 * r + 3 * c) % 9 < 4 || (r + c) % 11 === 0))) out.push([r,c]);
    }
    return out;
  }, []);
  return <svg className={`qr-code ${small ? "small" : ""}`} viewBox="0 0 145 145" role="img" aria-label="QR pessoal KwanzaGo"><rect width="145" height="145" rx="14" fill="white"/>{cells.map(([r,c]) => <rect key={`${r}-${c}`} x={10+c*5} y={10+r*5} width="5" height="5" rx=".45" fill="#0757d8"/>)}<circle cx="72.5" cy="72.5" r="15" fill="white"/><circle cx="72.5" cy="72.5" r="10" fill="#0b76f5"/><circle cx="72.5" cy="72.5" r="4" fill="white"/></svg>;
}

function FlowStep({ number, title, text, icon }: { number: string; title: string; text: string; icon: IconName }) {
  return <motion.article className="flow-step" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} whileHover={{ y: -4, boxShadow: "0 14px 28px rgba(18,78,160,.10)" }} transition={{ duration: .35 }}><span className="step-number">{number}</span><span className="step-icon"><Icon name={icon}/></span><div><h3>{title}</h3><p>{text}</p></div></motion.article>;
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return <motion.div className="modal-layer" role="dialog" aria-modal="true" onMouseDown={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.section className="modal-box" onMouseDown={e => e.stopPropagation()} initial={{ opacity: 0, scale: .96, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .97, y: 8 }} transition={{ type: "spring", stiffness: 330, damping: 27 }}><button className="modal-close" aria-label="Fechar" onClick={onClose}><Icon name="close"/></button>{children}</motion.section></motion.div>;
}

function PassengerDemo() {
  return <div className="role-layout passenger-layout">
    <div className="passenger-img-wrap">
      <img src="/express.png" alt="Passageiro Express" className="passenger-express-img" />
    </div>
    <div className="explanation passenger-explanation">
      <p className="section-eyebrow">PASSAGEIRO · COMO FUNCIONA</p>
      <h2>Mostra o QR. Confirma no teu telefone.</h2>
      <ul className="point-list">
        <li><span><Icon name="check" size={14}/></span> Autorização pessoal — só tu aprovas o débito</li>
        <li><span><Icon name="check" size={14}/></span> Valores transparentes antes de confirmar</li>
        <li><span><Icon name="check" size={14}/></span> PIN obrigatório para vários passageiros</li>
      </ul>
    </div>
  </div>;
}

function CollectorDemo({ quantity, setQuantity, onScan, scanState }: { quantity: number; setQuantity: (n: number) => void; onScan: () => void; scanState: "idle" | "waiting" | "success" }) {
  const total = quantity * 300;
  return <div className="role-layout collector-layout">
    <div className="phone-frame collector-phone">
      <div className="phone-status"><span>09:41</span><span>●●●</span></div>
      <div className="phone-app-head"><div><small>Cobrador</small><h3>Nova cobrança</h3></div><span className="collector-avatar">AM</span></div>
      <section className="collector-context"><span>Viatura atribuída</span><strong>LD-42-18-KW</strong><p>Recebido hoje <b>48.600 Kz</b></p></section>
      <section className="charge-form"><p className="tiny-label">QUANTAS PESSOAS VÃO PAGAR?</p><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><strong>{quantity}<small>{quantity === 1 ? " passageiro" : " passageiros"}</small></strong><button onClick={() => setQuantity(Math.min(8, quantity + 1))}>+</button></div><div className="fare-summary"><span>Tarifa por pessoa</span><b>300 Kz</b></div><div className="total-summary"><span>Total a cobrar</span><strong>{total} Kz</strong></div><button className="scan-action" onClick={onScan}>{scanState === "idle" ? <><Icon name="scan"/> Ler QR do passageiro</> : scanState === "waiting" ? <><Icon name="clock"/> A aguardar confirmação</> : <><Icon name="check"/> Pagamento confirmado</>}</button></section>
      <section className="collector-qr-card"><div><small>QR DA VIATURA</small><strong>LD-42-18-KW</strong><p>Mostra este código no táxi para iniciar a cobrança.</p></div><QrCode small/></section><section className="collector-allowance"><span><Icon name="wallet"/></span><p><small>VERBA OPERACIONAL</small><strong>2.500 Kz disponíveis</strong></p><Icon name="arrow" size={16}/></section>
    </div>
    <div className="explanation">
      <p className="section-eyebrow">COMO FUNCIONA PARA O COBRADOR</p>
      <h2>Cobrar sem tocar no saldo do proprietário.</h2>
      <p className="lead">A aplicação calcula o valor antes da leitura e mostra uma única mensagem decisiva: aguardando, confirmado ou recusado.</p>
      <div className="collector-flow"><FlowStep number="1" icon="user" title="Indica a quantidade" text="A tarifa activa calcula o total."/><FlowStep number="2" icon="scan" title="Lê o QR" text="O QR inicia um pedido seguro."/><FlowStep number="3" icon="check" title="Recebe confirmação" text="Só depois do passageiro aprovar."/></div>
      <div className="callout-inline"><span><Icon name="wallet"/></span><p><strong>Custos sob controlo</strong><small>Vês apenas a verba operacional que o proprietário autorizou.</small></p></div>
    </div>
  </div>;
}

function OwnerPreview() {
  const topVehicles = initialVehicles.slice(0, 3);
  const maxRevenue = Math.max(...revenueDays.map(d => d.value));
  return (
    <div className="max-w-5xl mx-auto glass-card rounded-3xl shadow-2xl p-6 lg:p-10 border border-white/60 text-left">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-950 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between min-h-[140px] transform hover:-translate-y-1 transition-transform">
          <p className="text-sm font-medium text-blue-100 opacity-90">Receita verificada hoje</p>
          <div>
            <h4 className="text-3xl font-extrabold mb-1">128.400 Kz</h4>
            <p className="text-xs text-blue-200 font-medium">+12,8% vs. ontem</p>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm border border-white rounded-2xl p-6 shadow-md flex flex-col justify-between min-h-[140px] transform hover:-translate-y-1 transition-transform">
          <p className="text-sm font-semibold text-gray-500">Pendente de fecho</p>
          <div>
            <h4 className="text-3xl font-extrabold text-slate-900 mb-1">96.700 Kz</h4>
            <p className="text-xs text-gray-400 font-medium">Disponível amanhã às 08:00</p>
          </div>
        </div>
        <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-100/50 rounded-2xl p-6 shadow-md flex flex-col justify-between min-h-[140px] transform hover:-translate-y-1 transition-transform">
          <p className="text-sm font-semibold text-amber-700/80">Reserva operacional</p>
          <div>
            <h4 className="text-3xl font-extrabold text-slate-900 mb-1">12.500 Kz</h4>
            <p className="text-xs text-amber-600/80 font-medium">Para custos autorizados</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm border border-white rounded-2xl p-6 mb-8 shadow-md">
        <div className="owner-preview-chart border-0 p-0 h-auto">
          <div className="chart-bars h-44">
            {revenueDays.map((d, index) => (
              <div className="chart-bar-wrap" key={index}>
                <span className="bar-tooltip">{money(d.value)}</span>
                <div
                  className="chart-bar"
                  style={{ height: `${(d.value / maxRevenue) * 100}%` }}
                />
                <small>{d.day}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="vehicle-table mb-6">
        <div className="vehicle-row vehicle-header">
          <span>Viatura</span>
          <span>Cobrador</span>
          <span>Receita hoje</span>
          <span>Estado</span>
        </div>
        {topVehicles.map(vehicle => (
          <div className="vehicle-row" key={vehicle.plate}>
            <span className="vehicle-name">
              <i><Icon name="car" size={15}/></i>
              <strong>{vehicle.plate}</strong>
            </span>
            <span>{vehicle.collector}</span>
            <strong>{money(vehicle.revenue)}</strong>
            <span className={`vehicle-status ${vehicle.status === "Atenção" ? "attention" : ""}`}>
              <i/>{vehicle.status}
            </span>
          </div>
        ))}
      </div>

      <a className="cta-button w-full py-4 px-6 rounded-full text-white font-semibold flex items-center justify-center gap-2 shadow-lg" href="/owner">
        Abrir dashboard completo do proprietário <Icon name="arrow" size={16}/>
      </a>
    </div>
  );
}

export default function Home() {
  const [role, setRole] = useState<Role>("passenger");
  const [quantity, setQuantity] = useState(2);
  const [qrOpen, setQrOpen] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [scanState, setScanState] = useState<"idle" | "waiting" | "success">("idle");
  const [toast, setToast] = useState("");
  const [isOverDarkSection, setIsOverDarkSection] = useState(true);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const darkSections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme='dark']"));
    if (darkSections.length === 0) return;
    const intersecting = new Set<Element>();
    let observer: IntersectionObserver;
    const setup = () => {
      observer?.disconnect();
      const navHeight = navRef.current?.getBoundingClientRect().height ?? 70;
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => { entry.isIntersecting ? intersecting.add(entry.target) : intersecting.delete(entry.target); });
          setIsOverDarkSection(intersecting.size > 0);
        },
        { rootMargin: `-${Math.round(navHeight)}px 0px -100% 0px`, threshold: 0 }
      );
      darkSections.forEach(el => observer.observe(el));
    };
    setup();
    window.addEventListener("resize", setup);
    return () => { observer?.disconnect(); window.removeEventListener("resize", setup); };
  }, []);

  const content = roleContent[role];
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 3000); };
  const scan = () => {
    if (scanState === "idle") { setScanState("waiting"); window.setTimeout(() => { setScanState("success"); notify(`Pagamento de ${quantity * 300} Kz confirmado`); }, 1100); }
  };
  const submitPin = () => { if (pin.length === 4) { setPinOpen(false); setPin(""); notify("Pagamento de 600 Kz autorizado com PIN"); } };

  return <main>
    <div className="hero-shell" data-nav-theme="dark">
      <header className="top-nav" ref={navRef}><div className={`nav-pill ${isOverDarkSection ? "nav-pill-light" : "nav-pill-dark"}`}><a className="logo-link" href="#inicio"><Logo/></a><nav><a href="#como-funciona">Como funciona</a><a href="#perfis">Perfis</a><a href="#seguranca">Segurança</a></nav><span className="demo-badge"><i/> Protótipo interactivo</span></div></header>
      <HeroShader/>
      <div className="hero-orbs"><span className="hero-orb a"/><span className="hero-orb b"/><span className="hero-orb c"/></div>
      <section className="hero" id="inicio"><motion.div className="hero-copy" initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .62, ease: [0.22, 1, 0.36, 1] }}><p className="eyebrow">CARTEIRA DIGITAL PARA TÁXIS</p><h1>Pagar é simples.<br/><span>Controlar o dinheiro também.</span></h1><p className="hero-text">A KwanzaGo permite ao passageiro pagar por QR e dá ao proprietário uma visão clara do que entrou, do que está reservado e de quando o valor fica disponível.</p><div className="hero-actions"><motion.a className="white-hero-button" href="/owner" whileHover={{ y: -2, scale: 1.015 }} whileTap={{ scale: .98 }}>Abrir dashboard do proprietário <Icon name="arrow" size={18}/></motion.a><span><Icon name="shield" size={18}/> QR controlável e confirmação no dispositivo</span></div></motion.div><motion.div className="hero-illustration-wrap" initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .62, delay: .14, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -4 }}><img src="/hero-candongueiro.png" alt="Táxi Candongueiro KwanzaGo" className="hero-candongueiro-img" /></motion.div></section>
      <div className="hero-fade"/>
    </div>

    <section className="flow-section" id="como-funciona"><Reveal className="section-heading"><p className="eyebrow">UMA COBRANÇA, TRÊS CONFIRMAÇÕES</p><h2>O processo é fácil de explicar em menos de um minuto.</h2></Reveal><div className="steps-row"><FlowStep number="01" icon="qr" title="QR pessoal" text="O passageiro apresenta um QR estático que pode bloquear ou substituir."/><FlowStep number="02" icon="scan" title="Pedido claro" text="O cobrador escolhe a quantidade e a app envia o valor exacto ao passageiro."/><FlowStep number="03" icon="shield" title="Aprovação segura" text="O passageiro confirma. Múltiplos pagamentos exigem PIN."/><FlowStep number="04" icon="chart" title="Receita controlada" text="O proprietário acompanha pendente, reserva e disponível."/></div></section>

    <section className="roles-section" id="perfis"><Reveal className="section-heading compact"><p className="eyebrow">UM SISTEMA, TRÊS EXPERIÊNCIAS</p><h2>Escolhe um perfil e testa o fluxo.</h2></Reveal><div className="role-tabs" role="tablist">{(["passenger","collector","owner"] as Role[]).map(item => <motion.button role="tab" aria-selected={role === item} key={item} className={role === item ? "active" : ""} whileTap={{ scale: .97 }} whileHover={{ y: -1 }} onClick={() => setRole(item)}><span>{item === "passenger" ? <Icon name="wallet"/> : item === "collector" ? <Icon name="scan"/> : <Icon name="chart"/>}</span>{item === "passenger" ? "Passageiro" : item === "collector" ? "Cobrador" : "Proprietário"}</motion.button>)}</div><AnimatePresence mode="wait"><motion.div key={role} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .32, ease: "easeOut" }}><div className="role-intro"><p className="section-eyebrow">{content.eyebrow}</p>{role !== "passenger" && <><h2>{content.title}</h2><p>{content.description}</p></>}</div><div className="role-surface">{role === "passenger" && <PassengerDemo/>} {role === "collector" && <CollectorDemo quantity={quantity} setQuantity={setQuantity} onScan={scan} scanState={scanState}/>} {role === "owner" && <OwnerPreview/>}</div><p className="role-value"><span><Icon name="check" size={16}/></span>{content.value}</p></motion.div></AnimatePresence></section>

    <section className="security-section" id="seguranca"><Reveal className="security-copy"><p className="eyebrow">SEGURANÇA QUE NÃO COMPLICA</p><h2>O QR é visível. A autorização continua privada.</h2><p>O modelo foi desenhado para reduzir burla sem tornar o pagamento lento: QR revogável, confirmação no dispositivo, PIN reforçado, limites e sinais de risco.</p></Reveal><div className="security-grid">{[{icon:"qr" as IconName,title:"QR controlável",text:"Bloqueia, substitui e usa novamente sem mexer no saldo."},{icon:"shield" as IconName,title:"Dispositivo confirma",text:"O QR inicia o pedido; só o passageiro autoriza o débito."},{icon:"lock" as IconName,title:"PIN quando importa",text:"Obrigatório para múltiplos passageiros, risco ou valor elevado."},{icon:"clock" as IconName,title:"Protecção contínua",text:"Limites, período de restrição e geolocalização pontual."}].map((item, index) => <motion.article key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .45, delay: index * .07 }} whileHover={{ y: -4, boxShadow: "0 16px 30px rgba(18,78,160,.11)" }}><span><Icon name={item.icon}/></span><h3>{item.title}</h3><p>{item.text}</p></motion.article>)}</div></section>

    <Reveal><section className="future-section"><div><p className="eyebrow">EVOLUÇÃO FUTURA</p><h2>Cartão electrónico e BI entrarão como novas formas de aceitar o mesmo pagamento.</h2><p>Não são necessários para provar o MVP. Quando forem viáveis, ligam-se à mesma carteira, ao mesmo ledger e às mesmas regras de autorização.</p></div><span className="future-icon"><Icon name="qr" size={34}/></span></section></Reveal>

    <footer><Logo/><p>KwanzaGo · Toca, paga, segue.</p><span>Protótipo com fundos e integrações simulados.</span></footer>

    <AnimatePresence>{qrOpen && <Modal onClose={() => setQrOpen(false)}><div className="qr-modal-content"><span className="tag tag-green">QR activo</span><h2>O teu QR KwanzaGo</h2><p>Mostra ao cobrador. Nenhum valor será debitado sem a tua confirmação neste dispositivo.</p><QrCode/><strong>KG · 7K2A · 91</strong><small>Identificador público. Não contém saldo, PIN ou dados pessoais.</small><div><button className="outline-button" onClick={() => { setQrOpen(false); notify("QR bloqueado no protótipo"); }}><Icon name="lock" size={16}/> Bloquear</button><button className="blue-button" onClick={() => { setQrOpen(false); notify("Novo QR criado no protótipo"); }}>Substituir QR</button></div></div></Modal>}</AnimatePresence>

    {pinOpen && <Modal onClose={() => { setPinOpen(false); setPin(""); }}><div className="pin-modal"><span className="modal-icon"><Icon name="lock" size={26}/></span><p className="section-eyebrow">CONFIRMAÇÃO REFORÇADA</p><h2>Confirma o pagamento</h2><p>600 Kz · 2 passageiros · Adilson · LD-42-18</p><div className="pin-dots">{[0,1,2,3].map(i => <i className={pin.length > i ? "filled" : ""} key={i}/>)}</div><div className="keypad">{[1,2,3,4,5,6,7,8,9].map(n => <button key={n} onClick={() => pin.length < 4 && setPin(pin + n)}>{n}</button>)}<span/><button onClick={() => pin.length < 4 && setPin(pin + "0")}>0</button><button onClick={() => setPin(pin.slice(0,-1))}>⌫</button></div><button className="blue-button full" disabled={pin.length !== 4} onClick={submitPin}>Autorizar pagamento</button></div></Modal>}

    {toast && <div className="toast"><span><Icon name="check" size={16}/></span>{toast}</div>}
  </main>;
}
