"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

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

function PassengerDemo({ onShowQr, onPin }: { onShowQr: () => void; onPin: () => void }) {
  return <div className="role-layout passenger-layout">
    <div className="phone-frame">
      <div className="phone-status"><span>09:41</span><span>●●●</span></div>
      <div className="phone-app-head"><div><small>Express · Olá, Manuel</small><h3>Viagem em curso</h3></div><span className="round-icon"><Icon name="bell" size={17}/></span></div>
      <section className="express-context"><span className="express-badge">EXPRESS</span><div><strong>Táxi azul e branco</strong><small>LD-42-18-KW · Adilson Manuel</small></div><Icon name="car" size={18}/></section>
      <section className="wallet-blue"><span>Carteira KwanzaGo · Saldo disponível</span><strong>18.450 <small>Kz</small></strong><p><i/> Protegido neste dispositivo</p><button>+ Carregar saldo</button></section>
      <section className="qr-preview"><div><span className="tag tag-green">QR activo</span><h4>O teu código pessoal</h4><p>O cobrador lê. Tu confirmas.</p><button onClick={onShowQr}>Mostrar QR <Icon name="arrow" size={15}/></button></div><QrCode small/></section>
      <section className="payment-request"><div className="request-head"><span><Icon name="scan"/></span><p><small>PEDIDO RECEBIDO</small><strong>Pagamento no táxi</strong></p><b>600 Kz</b></div><div className="request-line"><span>2 passageiros · Adilson · LD-42-18</span><button onClick={onPin}>Confirmar</button></div></section>
    </div>
    <div className="explanation">
      <p className="section-eyebrow">COMO FUNCIONA PARA O PASSAGEIRO</p>
      <h2>O QR não leva o teu dinheiro. O teu dispositivo autoriza.</h2>
      <p className="lead">Mesmo que alguém fotografe o QR, só consegue criar um pedido. O débito só acontece depois de veres e confirmares o valor.</p>
      <div className="check-list"><p><span><Icon name="check" size={15}/></span> Bloqueia ou substitui o QR a qualquer momento.</p><p><span><Icon name="check" size={15}/></span> Vês a quantidade, a tarifa e o total antes de pagar.</p><p><span><Icon name="check" size={15}/></span> Múltiplas pessoas exigem o teu PIN.</p></div>
      <div className="callout-inline"><span><Icon name="shield"/></span><p><strong>Protecção contra burla</strong><small>O cobrador não consegue alterar o valor depois da tua confirmação.</small></p></div>
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

function OwnerDemo({ settled, onSettle, onAllowance }: { settled: boolean; onSettle: () => void; onAllowance: () => void }) {
  const [panel, setPanel] = useState<"overview" | "vehicles" | "settlement">("overview");
  const vehicles = [
    { plate: "LD-42-18-KW", collector: "Adilson Manuel", payments: 18, revenue: "48.600 Kz", status: "Operacional" },
    { plate: "LD-91-03-KW", collector: "Jorge Domingos", payments: 15, revenue: "41.300 Kz", status: "Operacional" },
    { plate: "LD-07-25-KW", collector: "Marta João", payments: 10, revenue: "28.500 Kz", status: "Atenção" },
  ];
  return <div className="owner-console">
    <aside className="owner-sidebar">
      <div className="owner-workspace"><span className="owner-mark"><Icon name="car" size={18}/></span><div><strong>Minha frota</strong><small>Conta proprietário</small></div></div>
      <nav aria-label="Navegação do proprietário">
        <button className={panel === "overview" ? "active" : ""} onClick={() => setPanel("overview")}><Icon name="chart" size={16}/> Visão geral</button>
        <button className={panel === "vehicles" ? "active" : ""} onClick={() => setPanel("vehicles")}><Icon name="car" size={16}/> Viaturas <b>3</b></button>
        <button><Icon name="user" size={16}/> Cobradores <b>2</b></button>
        <button className={panel === "settlement" ? "active" : ""} onClick={() => setPanel("settlement")}><Icon name="wallet" size={16}/> Liquidações</button>
        <button><Icon name="settings" size={16}/> Definições</button>
      </nav>
      <div className="owner-sidebar-note"><Icon name="shield" size={15}/><span>Dados verificados<br/><small>Actualização em tempo real</small></span></div>
    </aside>
    <section className="owner-main">
      <header className="owner-main-head"><div><p className="section-eyebrow">PAINEL DO PROPRIETÁRIO</p><h2>{panel === "vehicles" ? "Viaturas" : panel === "settlement" ? "Liquidações" : "Bom dia, Caetano"}</h2><p>{panel === "overview" ? "Acompanha o dinheiro da tua frota sem depender de relatos manuais." : panel === "vehicles" ? "Estado, cobrador e receita verificada por viatura." : "O que está pendente fica separado do valor já disponível."}</p></div><div className="owner-head-actions"><span className="owner-date">23 Ago 2026 <Icon name="clock" size={14}/></span><button className="owner-notification" aria-label="Notificações"><Icon name="bell" size={17}/><i/></button></div></header>
      {panel === "overview" && <>
        <div className="owner-kpis"><article className="owner-kpi highlight"><span>Receita verificada hoje</span><strong>128.400 Kz</strong><small><b>+12,8%</b> vs. ontem</small></article><article className="owner-kpi"><span>Pendente de fecho</span><strong>96.700 Kz</strong><small>Disponível amanhã às 08:00</small></article><article className="owner-kpi"><span>Saldo disponível</span><strong>284.350 Kz</strong><small>Valor já elegível</small></article><article className="owner-kpi reserve"><span>Reserva operacional</span><strong>12.500 Kz</strong><small>Para custos autorizados</small></article></div>
        <div className="owner-content-grid"><article className="owner-chart-card"><div className="owner-card-head"><div><span className="tiny-label">RECEITA POR DIA</span><h3>Movimento da frota</h3></div><span className="chart-period">Últimos 7 dias ▾</span></div><div className="owner-chart"><div className="chart-y"><span>150k</span><span>100k</span><span>50k</span><span>0</span></div><div className="chart-bars">{[54,68,48,82,72,88,64].map((height, index) => <div className="chart-bar-wrap" key={index}><div className="chart-bar" style={{ height: `${height}%` }}><span>{index === 5 ? "128k" : ""}</span></div><small>{["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][index]}</small></div>)}</div></div></article><article className="owner-settlement-card"><div className="owner-card-head"><div><span className="tiny-label">PRÓXIMO FECHO</span><h3>{settled ? "Lote fechado" : "Hoje às 23:59"}</h3></div><span className={`settlement-status ${settled ? "done" : "pending"}`}>{settled ? "Concluído" : "Pendente"}</span></div><div className="settlement-amount"><strong>{settled ? "0 Kz" : "96.700 Kz"}</strong><span>{settled ? "Já disponível no saldo" : "Será libertado após validação"}</span></div><div className="settlement-steps"><p className="done"><Icon name="check" size={13}/> Pagamentos verificados</p><p className="done"><Icon name="check" size={13}/> Reserva operacional separada</p><p className={settled ? "done" : "current"}>{settled ? <Icon name="check" size={13}/> : <Icon name="clock" size={13}/>} {settled ? "Valor disponível" : "A aguardar fecho"}</p></div><button className="blue-button full-width" onClick={onSettle}>{settled ? "Abrir lote de hoje" : "Simular fecho"}</button></article></div>
        <section className="owner-table-card"><div className="owner-card-head"><div><span className="tiny-label">DESEMPENHO DA FROTA</span><h3>Viaturas activas</h3></div><button className="text-action" onClick={() => setPanel("vehicles")}>Ver todas <Icon name="arrow" size={14}/></button></div><div className="vehicle-table"><div className="vehicle-row vehicle-header"><span>Viatura</span><span>Cobrador</span><span>Pagamentos</span><span>Receita hoje</span><span>Estado</span></div>{vehicles.map(vehicle => <div className="vehicle-row" key={vehicle.plate}><span className="vehicle-name"><i><Icon name="car" size={15}/></i><strong>{vehicle.plate}</strong></span><span>{vehicle.collector}</span><span>{vehicle.payments}</span><strong>{vehicle.revenue}</strong><span className={`vehicle-status ${vehicle.status === "Atenção" ? "attention" : ""}`}><i/>{vehicle.status}</span></div>)}</div></section>
      </>}
      {panel === "vehicles" && <section className="owner-detail-panel"><div className="owner-detail-toolbar"><button className="outline-button" onClick={() => setPanel("overview")}>← Voltar</button><button className="blue-button" onClick={() => onAllowance()}><Icon name="settings" size={16}/> Configurar limites</button></div><div className="vehicle-detail-grid">{vehicles.map(vehicle => <article className="vehicle-detail-card" key={vehicle.plate}><div className="vehicle-detail-top"><span className="vehicle-large-icon"><Icon name="car" size={22}/></span><span className={`vehicle-status ${vehicle.status === "Atenção" ? "attention" : ""}`}><i/>{vehicle.status}</span></div><h3>{vehicle.plate}</h3><p>{vehicle.collector} · cobrador atribuído</p><div><span>Receita hoje</span><strong>{vehicle.revenue}</strong></div><div><span>Pagamentos</span><strong>{vehicle.payments}</strong></div><button className="text-action" onClick={() => { setPanel("overview"); }}>Abrir desempenho <Icon name="arrow" size={14}/></button></article>)}</div></section>}
      {panel === "settlement" && <section className="owner-detail-panel"><div className="owner-settlement-banner"><span className="owner-mark"><Icon name="wallet" size={20}/></span><div><span className="tiny-label">CICLO DE LIQUIDAÇÃO</span><h3>O proprietário decide quando movimentar.</h3><p>A receita é verificada durante o dia. O valor pendente fica protegido até ao fecho e a verba operacional permanece separada.</p></div></div><div className="settlement-history"><div className="owner-card-head"><div><span className="tiny-label">HISTÓRICO</span><h3>Últimos lotes</h3></div><span className="chart-period">Todos ▾</span></div>{["22 Ago · 184.300 Kz", "21 Ago · 201.850 Kz", "20 Ago · 176.400 Kz"].map((item, index) => <div className="history-row" key={item}><span className="history-check"><Icon name="check" size={14}/></span><div><strong>{item}</strong><small>{index === 0 ? "Disponível para movimentar" : "Liquidado com sucesso"}</small></div><span className="history-time">08:00</span></div>)}</div><button className="blue-button" onClick={onAllowance}><Icon name="settings" size={16}/> Rever reserva operacional</button></section>}
    </section>
  </div>;
}

export default function Home() {
  const [role, setRole] = useState<Role>("passenger");
  const [quantity, setQuantity] = useState(2);
  const [qrOpen, setQrOpen] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [scanState, setScanState] = useState<"idle" | "waiting" | "success">("idle");
  const [settled, setSettled] = useState(false);
  const [allowanceOpen, setAllowanceOpen] = useState(false);
  const [toast, setToast] = useState("");
  const content = roleContent[role];
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 3000); };
  const scan = () => {
    if (scanState === "idle") { setScanState("waiting"); window.setTimeout(() => { setScanState("success"); notify(`Pagamento de ${quantity * 300} Kz confirmado`); }, 1100); }
  };
  const submitPin = () => { if (pin.length === 4) { setPinOpen(false); setPin(""); notify("Pagamento de 600 Kz autorizado com PIN"); } };

  return <main>
    <header className="top-nav"><a className="logo-link" href="#inicio"><Logo/></a><nav><a href="#como-funciona">Como funciona</a><a href="#perfis">Perfis</a><a href="#seguranca">Segurança</a></nav><span className="demo-badge"><i/> Protótipo interactivo</span></header>

    <section className="hero" id="inicio"><motion.div className="hero-copy" initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .62, ease: [0.22, 1, 0.36, 1] }}><p className="eyebrow">CARTEIRA DIGITAL PARA TÁXIS</p><h1>Pagar é simples.<br/><span>Controlar o dinheiro também.</span></h1><p className="hero-text">A KwanzaGo permite ao passageiro pagar por QR e dá ao proprietário uma visão clara do que entrou, do que está reservado e de quando o valor fica disponível.</p><div className="hero-actions"><motion.a className="blue-button" href="/owner" whileHover={{ y: -2, scale: 1.015 }} whileTap={{ scale: .98 }}>Abrir dashboard do proprietário <Icon name="arrow" size={18}/></motion.a><span><Icon name="shield" size={18}/> QR controlável e confirmação no dispositivo</span></div></motion.div><motion.div className="hero-flow-card" initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .62, delay: .14, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -3 }}><p className="tiny-label">O DINHEIRO FLUI COM CLAREZA</p><div className="flow-money"><article><span className="flow-pictogram passenger"><Icon name="wallet"/></span><p>Carteira do passageiro</p><strong>600 Kz</strong></article><motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}><Icon name="arrow" size={20}/></motion.div><article><span className="flow-pictogram pending"><Icon name="clock"/></span><p>Receita pendente</p><strong>600 Kz</strong></article><motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.8, delay: .25, repeat: Infinity, ease: "easeInOut" }}><Icon name="arrow" size={20}/></motion.div><article><span className="flow-pictogram available"><Icon name="check"/></span><p>Disponível após fecho</p><strong>600 Kz</strong></article></div><div className="hero-flow-note"><span><Icon name="lock" size={17}/></span><p><strong>O cobrador não recebe o saldo.</strong><small>Ele cobra e recebe a confirmação. O crédito pertence ao proprietário.</small></p></div></motion.div></section>

    <section className="flow-section" id="como-funciona"><Reveal className="section-heading"><p className="eyebrow">UMA COBRANÇA, TRÊS CONFIRMAÇÕES</p><h2>O processo é fácil de explicar em menos de um minuto.</h2></Reveal><div className="steps-row"><FlowStep number="01" icon="qr" title="QR pessoal" text="O passageiro apresenta um QR estático que pode bloquear ou substituir."/><FlowStep number="02" icon="scan" title="Pedido claro" text="O cobrador escolhe a quantidade e a app envia o valor exacto ao passageiro."/><FlowStep number="03" icon="shield" title="Aprovação segura" text="O passageiro confirma. Múltiplos pagamentos exigem PIN."/><FlowStep number="04" icon="chart" title="Receita controlada" text="O proprietário acompanha pendente, reserva e disponível."/></div></section>

    <section className="roles-section" id="perfis"><Reveal className="section-heading compact"><p className="eyebrow">UM SISTEMA, TRÊS EXPERIÊNCIAS</p><h2>Escolhe um perfil e testa o fluxo.</h2></Reveal><div className="role-tabs" role="tablist">{(["passenger","collector","owner"] as Role[]).map(item => <motion.button role="tab" aria-selected={role === item} key={item} className={role === item ? "active" : ""} whileTap={{ scale: .97 }} whileHover={{ y: -1 }} onClick={() => setRole(item)}><span>{item === "passenger" ? <Icon name="wallet"/> : item === "collector" ? <Icon name="scan"/> : <Icon name="chart"/>}</span>{item === "passenger" ? "Passageiro" : item === "collector" ? "Cobrador" : "Proprietário"}</motion.button>)}</div><AnimatePresence mode="wait"><motion.div key={role} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .32, ease: "easeOut" }}><div className="role-intro"><p className="section-eyebrow">{content.eyebrow}</p><h2>{content.title}</h2><p>{content.description}</p></div><div className="role-surface">{role === "passenger" && <PassengerDemo onShowQr={() => setQrOpen(true)} onPin={() => setPinOpen(true)}/>} {role === "collector" && <CollectorDemo quantity={quantity} setQuantity={setQuantity} onScan={scan} scanState={scanState}/>} {role === "owner" && <OwnerDemo settled={settled} onSettle={() => { setSettled(true); notify("Fecho demonstrativo concluído"); }} onAllowance={() => setAllowanceOpen(true)}/>}</div><p className="role-value"><span><Icon name="check" size={16}/></span>{content.value}</p></motion.div></AnimatePresence></section>

    <section className="security-section" id="seguranca"><div className="security-copy"><p className="eyebrow">SEGURANÇA QUE NÃO COMPLICA</p><h2>O QR é visível. A autorização continua privada.</h2><p>O modelo foi desenhado para reduzir burla sem tornar o pagamento lento: QR revogável, confirmação no dispositivo, PIN reforçado, limites e sinais de risco.</p></div><div className="security-grid"><article><span><Icon name="qr"/></span><h3>QR controlável</h3><p>Bloqueia, substitui e usa novamente sem mexer no saldo.</p></article><article><span><Icon name="shield"/></span><h3>Dispositivo confirma</h3><p>O QR inicia o pedido; só o passageiro autoriza o débito.</p></article><article><span><Icon name="lock"/></span><h3>PIN quando importa</h3><p>Obrigatório para múltiplos passageiros, risco ou valor elevado.</p></article><article><span><Icon name="clock"/></span><h3>Protecção contínua</h3><p>Limites, período de restrição e geolocalização pontual.</p></article></div></section>

    <section className="future-section"><div><p className="eyebrow">EVOLUÇÃO FUTURA</p><h2>Cartão electrónico e BI entrarão como novas formas de aceitar o mesmo pagamento.</h2><p>Não são necessários para provar o MVP. Quando forem viáveis, ligam-se à mesma carteira, ao mesmo ledger e às mesmas regras de autorização.</p></div><span className="future-icon"><Icon name="qr" size={34}/></span></section>

    <footer><Logo/><p>KwanzaGo · Toca, paga, segue.</p><span>Protótipo com fundos e integrações simulados.</span></footer>

    <AnimatePresence>{qrOpen && <Modal onClose={() => setQrOpen(false)}><div className="qr-modal-content"><span className="tag tag-green">QR activo</span><h2>O teu QR KwanzaGo</h2><p>Mostra ao cobrador. Nenhum valor será debitado sem a tua confirmação neste dispositivo.</p><QrCode/><strong>KG · 7K2A · 91</strong><small>Identificador público. Não contém saldo, PIN ou dados pessoais.</small><div><button className="outline-button" onClick={() => { setQrOpen(false); notify("QR bloqueado no protótipo"); }}><Icon name="lock" size={16}/> Bloquear</button><button className="blue-button" onClick={() => { setQrOpen(false); notify("Novo QR criado no protótipo"); }}>Substituir QR</button></div></div></Modal>}</AnimatePresence>

    {pinOpen && <Modal onClose={() => { setPinOpen(false); setPin(""); }}><div className="pin-modal"><span className="modal-icon"><Icon name="lock" size={26}/></span><p className="section-eyebrow">CONFIRMAÇÃO REFORÇADA</p><h2>Confirma o pagamento</h2><p>600 Kz · 2 passageiros · Adilson · LD-42-18</p><div className="pin-dots">{[0,1,2,3].map(i => <i className={pin.length > i ? "filled" : ""} key={i}/>)}</div><div className="keypad">{[1,2,3,4,5,6,7,8,9].map(n => <button key={n} onClick={() => pin.length < 4 && setPin(pin + n)}>{n}</button>)}<span/><button onClick={() => pin.length < 4 && setPin(pin + "0")}>0</button><button onClick={() => setPin(pin.slice(0,-1))}>⌫</button></div><button className="blue-button full" disabled={pin.length !== 4} onClick={submitPin}>Autorizar pagamento</button></div></Modal>}

    {allowanceOpen && <Modal onClose={() => setAllowanceOpen(false)}><div className="allowance-modal"><span className="modal-icon"><Icon name="wallet" size={25}/></span><p className="section-eyebrow">RESERVA OPERACIONAL</p><h2>Custos necessários, sem perder o controlo.</h2><p>A reserva vem do saldo já disponível. O cobrador pode pedir uma despesa, mas não movimenta o dinheiro livremente.</p><label>Valor diário reservado <span><input defaultValue="15.000"/> Kz</span></label><label>Despesa que exige aprovação <span><input defaultValue="5.000"/> Kz</span></label><button className="blue-button full" onClick={() => { setAllowanceOpen(false); notify("Limites de reserva actualizados"); }}>Guardar configuração</button></div></Modal>}
    {toast && <div className="toast"><span><Icon name="check" size={16}/></span>{toast}</div>}
  </main>;
}
