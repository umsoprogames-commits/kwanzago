"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { type Vehicle, type Collector, initialVehicles, initialCollectors, revenueDays, money } from "../owner-data";

const basePath = process.env.NODE_ENV === "production" ? "/kwanzago" : "";
function imgUrl(path: string) {
  return path.startsWith("/") ? `${basePath}${path}` : path;
}

type Section = "overview" | "vehicles" | "collectors" | "settlements" | "settings";

function formatPlate(raw: string) {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
  const groups = [clean.slice(0, 2), clean.slice(2, 4), clean.slice(4, 6), clean.slice(6, 8)];
  return groups.filter(Boolean).join("-");
}

function downloadCsv(filename: string, headers: string[], rows: (string | number)[][]) {
  const escape = (field: string | number) => `"${String(field).replace(/"/g, '""')}"`;
  const csv = [headers, ...rows].map(row => row.map(escape).join(",")).join("\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const path: Record<string, React.ReactNode> = {
    chart: <><path d="M4 20V11M10 20V5M16 20v-7M22 20H2" /></>,
    car: <><path d="m5 17-2-2v-4l2-5h14l2 5v4l-2 2Z" /><path d="M3 11h18M6 17v3M18 17v3M7 14h.01M17 14h.01" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    wallet: <><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 8h16M16 12h5v4h-5a2 2 0 0 1 0-4Z" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19 15.5a1.8 1.8 0 0 0 .3 2l-1.8 1.8a1.8 1.8 0 0 0-2-.3 1.8 1.8 0 0 0-1 1.6H12a1.8 1.8 0 0 0-1-1.6 1.8 1.8 0 0 0-2 .3l-1.8-1.8a1.8 1.8 0 0 0 .3-2 1.8 1.8 0 0 0-1.6-1V12a1.8 1.8 0 0 0 1.6-1 1.8 1.8 0 0 0-.3-2L9 7.2a1.8 1.8 0 0 0 2-.3 1.8 1.8 0 0 0 1-1.6h2.5a1.8 1.8 0 0 0 1 1.6 1.8 1.8 0 0 0 2 .3L19.3 9a1.8 1.8 0 0 0-.3 2 1.8 1.8 0 0 0 1.6 1v2.5a1.8 1.8 0 0 0-1.6 1Z" /></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
    check: <path d="m5 12 4.2 4.2L19.5 6" />,
    arrow: <><path d="M4 12h15M13 6l6 6-6 6" /></>,
    refresh: <><path d="M20 11a8.1 8.1 0 0 0-14.7-3L3 11" /><path d="M3 5v6h6M4 13a8.1 8.1 0 0 0 14.7 3L21 13" /><path d="M21 19v-6h-6" /></>,
    qr: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 20h2M20 14h1" /></>,
    download: <><path d="M12 3v12M7 10l5 5 5-5M4 21h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m8.8 12.2 2.1 2.1 4.4-5" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{path[name]}</svg>;
}

const qrCells = (seed: string) => {
  const cells: [number, number][] = [];
  const finder = (r: number, c: number, top: number, left: number) => { const y = r - top; const x = c - left; return y >= 0 && y < 7 && x >= 0 && x < 7 && (y === 0 || y === 6 || x === 0 || x === 6 || (y >= 2 && y <= 4 && x >= 2 && x <= 4)); };
  const salt = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  for (let r = 0; r < 25; r++) for (let c = 0; c < 25; c++) { const f = finder(r, c, 0, 0) || finder(r, c, 0, 18) || finder(r, c, 18, 0); const protectedCell = (r < 8 && c < 8) || (r < 8 && c > 16) || (r > 16 && c < 8); if (f || (!protectedCell && ((r * c + salt + 2 * r + 3 * c) % 9 < 4 || (r + c + salt) % 11 === 0))) cells.push([r, c]); }
  return cells;
};

function MockQr({ seed, small = false }: { seed: string; small?: boolean }) { const cells = useMemo(() => qrCells(seed), [seed]); return <svg className={`owner-qr ${small ? "small" : ""}`} viewBox="0 0 145 145" role="img" aria-label={`QR da viatura ${seed}`}><rect width="145" height="145" rx="12" fill="#fff" />{cells.map(([r, c]) => <rect key={`${r}-${c}`} x={10 + c * 5} y={10 + r * 5} width="5" height="5" rx=".45" fill="#0757d8" />)}<circle cx="72.5" cy="72.5" r="14" fill="#fff" /><circle cx="72.5" cy="72.5" r="9" fill="#0b76f5" /><circle cx="72.5" cy="72.5" r="4" fill="#fff" /></svg>; }

function downloadQrPdf(vehicle: Vehicle) {
  const seed = `KwanzaGo ${vehicle.plate}`;
  const commands = ["0 0 1 rg", "BT /F1 24 Tf 50 760 Td (KwanzaGo) Tj ET", `BT /F1 18 Tf 50 725 Td (${vehicle.plate}) Tj ET`, "0 0 0 rg"];
  qrCells(seed).forEach(([r, c]) => commands.push(`${50 + c * 5} ${500 - r * 5} 5 5 re f`));
  const collector = vehicle.collector.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "").replace(/[()]/g, "");
  commands.push(`BT /F1 12 Tf 50 450 Td (QR controlavel da viatura) Tj ET`, `BT /F1 10 Tf 50 430 Td (Cobrador: ${collector}) Tj ET`);
  const stream = commands.join("\n");
  const objects = [`<< /Type /Catalog /Pages 2 0 R >>`, `<< /Type /Pages /Kids [3 0 R] /Count 1 >>`, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>`, `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`, `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`];
  let pdf = "%PDF-1.4\n"; const offsets = [0]; objects.forEach((object, index) => { offsets.push(pdf.length); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; }); const xref = pdf.length; pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`; offsets.slice(1).forEach(offset => { pdf += `${String(offset).padStart(10, "0")} 00000 n \n`; }); pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([pdf], { type: "application/pdf" })); link.download = `KwanzaGo-QR-${vehicle.plate}.pdf`; link.click(); URL.revokeObjectURL(link.href);
}

export default function OwnerDashboard() {
  const [section, setSection] = useState<Section>("overview");
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [collectors, setCollectors] = useState(initialCollectors);
  const [settled, setSettled] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [reserve, setReserve] = useState(12500);
  const [approvalLimit, setApprovalLimit] = useState(5000);
  const [qrVehicle, setQrVehicle] = useState<Vehicle | null>(null);
  const [addVehicleOpen, setAddVehicleOpen] = useState(false);
  const [addCollectorOpen, setAddCollectorOpen] = useState(false);
  const [viewedCollector, setViewedCollector] = useState<Collector | null>(null);
  const filteredVehicles = useMemo(() => vehicles.filter(v => `${v.plate} ${v.collector}`.toLowerCase().includes(query.toLowerCase())), [vehicles, query]);
  const notify = (text: string) => { setToast(text); window.setTimeout(() => setToast(""), 2600); };
  const reset = () => { setVehicles(initialVehicles); setCollectors(initialCollectors); setSettled(false); setQuery(""); setReserve(12500); setApprovalLimit(5000); notify("Demonstração reposta"); };
  const toggleVehicle = (plate: string) => setVehicles(items => items.map(v => v.plate === plate ? { ...v, status: v.status === "Suspensa" ? "Operacional" : "Suspensa" } : v));
  const addVehicle = (plate: string, collector: string) => { setVehicles(items => [...items, { plate, collector: collector || "Sem cobrador atribuído", payments: 0, revenue: 0, status: "Operacional" }]); setAddVehicleOpen(false); notify(`Viatura ${plate} adicionada`); };
  const addCollector = (name: string, vehicle: string) => { setCollectors(items => [...items, { name, vehicle: vehicle || "Sem viatura atribuída", payments: 0, status: "Activo" }]); setAddCollectorOpen(false); notify(`${name} adicionado como cobrador`); };
  const exportOverviewCsv = () => { downloadCsv("KwanzaGo-receita-7-dias.csv", ["Dia", "Receita (Kz)"], revenueDays.map(d => [d.day, d.value])); notify("CSV de receita exportado"); };
  const exportVehiclesCsv = () => { downloadCsv("KwanzaGo-viaturas.csv", ["Viatura", "Cobrador", "Pagamentos", "Receita (Kz)", "Estado"], filteredVehicles.map(v => [v.plate, v.collector, v.payments, v.revenue, v.status])); notify("CSV de viaturas exportado"); };

  const nav = (key: Section, label: string, icon: string, count?: string) => <button className={section === key ? "owner-nav active" : "owner-nav"} onClick={() => setSection(key)}><Icon name={icon} size={17} /> <span>{label}</span>{count && <b>{count}</b>}</button>;

  return <main className="owner-app">
    <aside className="owner-app-sidebar">
      <Link className="owner-app-brand" href="/"><img src={imgUrl("/kwanzago-symbol.png")} alt="KwanzaGo" /><span><strong>KwanzaGo</strong><small>Owner Console</small></span></Link>
      <div className="owner-app-account"><span className="owner-account-avatar">CJ</span><span><strong>Caetano José</strong><small>Proprietário</small></span></div>
      <nav aria-label="Menu do proprietário">{nav("overview", "Visão geral", "chart")}{nav("vehicles", "Viaturas", "car", "3")}{nav("collectors", "Cobradores", "user", "2")}{nav("settlements", "Liquidações", "wallet")}{nav("settings", "Definições", "settings")}</nav>
      <div className="owner-app-sidebar-bottom"><p><Icon name="check" size={15} /> Dados mockados activos</p><button onClick={reset}><Icon name="refresh" size={14} /> Repor demonstração</button><Link href="/">Voltar à apresentação</Link></div>
    </aside>
    <section className="owner-app-content">
      <header className="owner-app-header"><div><span className="owner-overline">CONTA DO PROPRIETÁRIO</span><h1>{section === "overview" ? "Visão geral" : section === "vehicles" ? "Viaturas" : section === "collectors" ? "Cobradores" : section === "settlements" ? "Liquidações" : "Definições"}</h1><p>{section === "overview" ? "Controlo financeiro e operacional da tua frota." : section === "vehicles" ? "Estado e receita verificada por viatura." : section === "collectors" ? "Pessoas autorizadas a iniciar cobranças." : section === "settlements" ? "Fechos, reservas e valores disponíveis." : "Configura os limites da operação."}</p></div><div className="owner-header-right"><span className="owner-sync"><i /> Actualizado agora</span><button className="owner-icon-button" aria-label="Notificações"><Icon name="bell" size={17} /><i /></button><span className="owner-header-date">23 Ago 2026</span></div></header>
      <AnimatePresence mode="wait"><motion.div key={section} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}>
        {section === "overview" && <Overview settled={settled} vehicles={vehicles} onSettle={() => { setSettled(true); notify("Fecho de 96.700 Kz concluído"); }} onSection={setSection} onExport={exportOverviewCsv} />}
        {section === "vehicles" && <Vehicles vehicles={filteredVehicles} query={query} setQuery={setQuery} onToggle={toggleVehicle} onNotify={notify} onGenerate={setQrVehicle} onAdd={() => setAddVehicleOpen(true)} onExport={exportVehiclesCsv} />}
        {section === "collectors" && <Collectors collectors={collectors} onAdd={() => setAddCollectorOpen(true)} onView={setViewedCollector} />}
        {section === "settlements" && <Settlements settled={settled} onSettle={() => { setSettled(true); notify("Lote liquidado e disponível"); }} />}
        {section === "settings" && <Settings reserve={reserve} approvalLimit={approvalLimit} setReserve={setReserve} setApprovalLimit={setApprovalLimit} onNotify={notify} />}
      </motion.div></AnimatePresence>
    </section>
    {toast && <motion.div className="owner-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><span><Icon name="check" size={15} /></span>{toast}</motion.div>}
    {qrVehicle && <QrModal vehicle={qrVehicle} onClose={() => setQrVehicle(null)} onDownload={() => { downloadQrPdf(qrVehicle); notify(`PDF do QR ${qrVehicle.plate} descarregado`); }} />}
    {addVehicleOpen && <AddVehicleModal collectors={collectors} onClose={() => setAddVehicleOpen(false)} onAdd={addVehicle} />}
    {addCollectorOpen && <AddCollectorModal vehicles={vehicles} onClose={() => setAddCollectorOpen(false)} onAdd={addCollector} />}
    {viewedCollector && <CollectorProfileModal collector={viewedCollector} onClose={() => setViewedCollector(null)} />}
  </main>;
}

function Kpi({ title, value, note, tone = "" }: { title: string; value: string; note: string; tone?: string }) { return <article className={`owner-full-kpi ${tone}`}><span>{title}</span><strong>{value}</strong><small>{note}</small></article>; }

function Overview({ settled, vehicles, onSettle, onSection, onExport }: { settled: boolean; vehicles: Vehicle[]; onSettle: () => void; onSection: (key: Section) => void; onExport: () => void }) {
  const maxRevenue = Math.max(...revenueDays.map(d => d.value));
  return <>
    <div className="owner-full-kpis"><Kpi title="Receita verificada hoje" value="128.400 Kz" note="+12,8% vs. ontem" tone="primary" /><Kpi title="Pendente de fecho" value={settled ? "0 Kz" : "96.700 Kz"} note={settled ? "Lote fechado" : "Disponível amanhã às 08:00"} /><Kpi title="Saldo disponível" value={settled ? "381.050 Kz" : "284.350 Kz"} note="Valor elegível para movimentar" /><Kpi title="Reserva operacional" value="12.500 Kz" note="Limite diário autorizado" tone="reserve" /></div>
    <div className="owner-full-grid"><article className="owner-full-card owner-full-chart"><div className="owner-full-card-head"><div><span>RECEITA DA FROTA</span><h2>Últimos 7 dias</h2></div><button onClick={onExport}>Exportar CSV <Icon name="arrow" size={13} /></button></div><div className="owner-full-bars">{revenueDays.map((d, index) => <div key={index}><span className="bar-tooltip">{money(d.value)}</span><i style={{ height: `${(d.value / maxRevenue) * 100}%` }} /><small>{d.day}</small></div>)}</div></article><article className="owner-full-card owner-full-settlement"><div className="owner-full-card-head"><div><span>PRÓXIMO FECHO</span><h2>{settled ? "Lote concluído" : "Hoje às 23:59"}</h2></div><b className={settled ? "settled" : "pending"}>{settled ? "Liquidado" : "Pendente"}</b></div><strong className="owner-full-settlement-value">{settled ? "0 Kz" : "96.700 Kz"}</strong><p>{settled ? "O valor já está no saldo disponível." : "O valor será libertado após o fecho."}</p><div className="owner-full-progress"><span className="done"><Icon name="check" size={13} /></span><i /><span className="done"><Icon name="check" size={13} /></span><i /><span className={settled ? "done" : ""}>{settled ? <Icon name="check" size={13} /> : "3"}</span></div><div className="owner-full-progress-labels"><small>Confirmado</small><small>Reserva</small><small>Disponível</small></div><button className="owner-primary-button" onClick={onSettle}>{settled ? "Ver lote liquidado" : "Simular fecho"}</button></article></div>
    <article className="owner-full-card owner-full-table"><div className="owner-full-card-head"><div><span>DESEMPENHO POR VIATURA</span><h2>Frota activa</h2></div><button onClick={() => onSection("vehicles")}>Ver todas <Icon name="arrow" size={13} /></button></div><div className="owner-table-scroll"><div className="owner-full-row owner-full-row-head"><span>Viatura</span><span>Cobrador</span><span>Pagamentos</span><span>Receita</span><span>Estado</span></div>{vehicles.map(v => <div className="owner-full-row" key={v.plate}><strong><span className="vehicle-symbol"><Icon name="car" size={14} /></span>{v.plate}</strong><span>{v.collector}</span><span>{v.payments}</span><strong>{money(v.revenue)}</strong><span className={`owner-state ${v.status === "Atenção" ? "attention" : ""}`}><i />{v.status}</span></div>)}</div></article>
  </>;
}

function Vehicles({ vehicles, query, setQuery, onToggle, onNotify, onGenerate, onAdd, onExport }: { vehicles: Vehicle[]; query: string; setQuery: (value: string) => void; onToggle: (plate: string) => void; onNotify: (text: string) => void; onGenerate: (vehicle: Vehicle) => void; onAdd: () => void; onExport: () => void }) {
  return <section className="owner-page-stack"><div className="owner-toolbar"><label><span>Pesquisar</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Matrícula ou cobrador" /></label><button className="owner-primary-button" onClick={onAdd}>+ Adicionar viatura</button></div><article className="owner-full-card owner-full-table"><div className="owner-full-card-head"><div><span>{vehicles.length} RESULTADOS</span><h2>Gestão de viaturas</h2></div><button onClick={onExport}>Exportar CSV <Icon name="arrow" size={13} /></button></div><div className="owner-table-scroll"><div className="owner-full-row owner-full-row-head"><span>Viatura</span><span>Cobrador</span><span>Pagamentos hoje</span><span>Receita verificada</span><span>Acções</span></div>{vehicles.map(v => <div className="owner-full-row" key={v.plate}><strong><span className="vehicle-symbol"><Icon name="car" size={14} /></span>{v.plate}</strong><span>{v.collector}</span><span>{v.payments}</span><strong>{money(v.revenue)}</strong><span className="owner-row-actions"><button className="owner-row-action qr-action" onClick={() => onGenerate(v)}><Icon name="qr" size={13} /> Gerar QR</button><button className="owner-row-action" onClick={() => { onToggle(v.plate); onNotify(`${v.plate} actualizada`); }}>{v.status === "Suspensa" ? "Reactivar" : "Suspender"}</button></span></div>)}</div>{vehicles.length === 0 && <div className="owner-empty">Nenhuma viatura encontrada. Tenta outra pesquisa.</div>}</article></section>;
}

function QrModal({ vehicle, onClose, onDownload }: { vehicle: Vehicle; onClose: () => void; onDownload: () => void }) {
  return <div className="owner-qr-overlay" role="dialog" aria-modal="true" aria-label={`QR da viatura ${vehicle.plate}`} onMouseDown={onClose}><motion.section className="owner-qr-modal" onMouseDown={event => event.stopPropagation()} initial={{ opacity: 0, scale: .96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}><button className="owner-qr-close" onClick={onClose} aria-label="Fechar"><Icon name="close" size={18} /></button><span className="owner-overline">CREDENCIAL DA VIATURA</span><h2>QR de {vehicle.plate}</h2><p>Este QR mockado está associado à viatura e pode ser colocado no interior do táxi.</p><MockQr seed={vehicle.plate} /><strong className="owner-qr-token">KG · {vehicle.plate} · QR</strong><span className="owner-qr-note"><Icon name="shield" size={14} /> Não contém saldo nem PIN. Inicia apenas o pedido de pagamento.</span><div className="owner-qr-actions"><button className="owner-secondary-button" onClick={onClose}>Fechar</button><button className="owner-primary-button" onClick={onDownload}><Icon name="download" size={15} /> Baixar PDF</button></div></motion.section></div>;
}

function Collectors({ collectors, onAdd, onView }: { collectors: Collector[]; onAdd: () => void; onView: (collector: Collector) => void }) { return <section className="owner-page-stack"><div className="owner-toolbar"><div><span className="owner-overline">COBRADORES AUTORIZADOS</span><h2 className="owner-section-title">Quem pode iniciar cobranças</h2></div><button className="owner-primary-button" onClick={onAdd}>+ Adicionar cobrador</button></div><div className="owner-people-grid">{collectors.map(c => <article className="owner-person-card" key={c.name}><div className="owner-person-avatar">{c.name.split(" ").map(n => n[0]).join("")}</div><div><h3>{c.name}</h3><p>{c.vehicle} · {c.payments} pagamentos</p></div><span className="owner-state"><i />{c.status}</span><button onClick={() => onView(c)}>Ver perfil <Icon name="arrow" size={13} /></button></article>)}{collectors.length === 0 && <div className="owner-empty">Nenhum cobrador registado.</div>}</div></section>; }

function Settlements({ settled, onSettle }: { settled: boolean; onSettle: () => void }) { return <section className="owner-page-stack"><article className="owner-settlement-hero"><span className="owner-settlement-icon"><Icon name="wallet" size={24} /></span><div><span className="owner-overline">CICLO DE LIQUIDAÇÃO</span><h2>O proprietário decide quando movimentar.</h2><p>A receita é verificada durante o dia. O valor pendente fica separado até ao fecho.</p></div></article><article className="owner-full-card owner-history"><div className="owner-full-card-head"><div><span>HISTÓRICO DE LOTES</span><h2>Fechos anteriores</h2></div><button onClick={onSettle}>{settled ? "Abrir lote de hoje" : "Simular fecho"} <Icon name="arrow" size={13} /></button></div>{["22 Ago · 184.300 Kz", "21 Ago · 201.850 Kz", "20 Ago · 176.400 Kz"].map(item => <div className="owner-history-row" key={item}><span><Icon name="check" size={14} /></span><div><strong>{item}</strong><small>Liquidado com sucesso · disponível às 08:00</small></div><time>08:00</time></div>)}</article></section>; }

function Settings({ reserve, approvalLimit, setReserve, setApprovalLimit, onNotify }: { reserve: number; approvalLimit: number; setReserve: (value: number) => void; setApprovalLimit: (value: number) => void; onNotify: (text: string) => void }) { return <section className="owner-page-stack"><article className="owner-settings-card"><span className="owner-settlement-icon"><Icon name="settings" size={22} /></span><div><span className="owner-overline">RESERVA OPERACIONAL</span><h2>Custos necessários, sob controlo.</h2><p>Define o valor que pode ser usado para custos da operação e a partir de que montante precisas de aprovação.</p><label>Limite diário reservado<input type="number" value={reserve} onChange={e => setReserve(Number(e.target.value))} /> Kz</label><label>Despesa que exige aprovação<input type="number" value={approvalLimit} onChange={e => setApprovalLimit(Number(e.target.value))} /> Kz</label><button className="owner-primary-button" onClick={() => onNotify("Limites guardados com sucesso")}>Guardar configuração</button></div></article></section>; }

function AddVehicleModal({ collectors, onClose, onAdd }: { collectors: Collector[]; onClose: () => void; onAdd: (plate: string, collector: string) => void }) {
  const [plate, setPlate] = useState("");
  const [collector, setCollector] = useState("");
  const [touched, setTouched] = useState(false);
  const valid = /^[A-Z]{2}-\d{2}-\d{2}-[A-Z]{2}$/.test(plate);
  const showError = touched && plate.length > 0 && !valid;
  return <div className="owner-qr-overlay" role="dialog" aria-modal="true" aria-label="Adicionar viatura" onMouseDown={onClose}><motion.section className="owner-qr-modal" onMouseDown={event => event.stopPropagation()} initial={{ opacity: 0, scale: .96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
    <button className="owner-qr-close" onClick={onClose} aria-label="Fechar"><Icon name="close" size={18} /></button>
    <span className="owner-overline">NOVA VIATURA</span><h2>Adicionar viatura à frota</h2>
    <label className="owner-modal-field"><span>Matrícula</span><input value={plate} onChange={e => setPlate(formatPlate(e.target.value))} onBlur={() => setTouched(true)} placeholder="LD-00-00-KW" className={showError ? "field-error" : ""} /><small className={showError ? "field-hint error" : "field-hint"}>{showError ? "Formato inválido. Usa 2 letras, 2 números, 2 números, 2 letras." : "Ex.: LD-42-18-KW"}</small></label>
    <label className="owner-modal-field"><span>Cobrador atribuído</span><select value={collector} onChange={e => setCollector(e.target.value)}><option value="">Sem cobrador atribuído</option>{collectors.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}</select></label>
    <div className="owner-qr-actions"><button className="owner-secondary-button" onClick={onClose}>Cancelar</button><button className="owner-primary-button" disabled={!valid} onClick={() => onAdd(plate, collector)}>Adicionar viatura</button></div>
  </motion.section></div>;
}

function AddCollectorModal({ vehicles, onClose, onAdd }: { vehicles: Vehicle[]; onClose: () => void; onAdd: (name: string, vehicle: string) => void }) {
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  return <div className="owner-qr-overlay" role="dialog" aria-modal="true" aria-label="Adicionar cobrador" onMouseDown={onClose}><motion.section className="owner-qr-modal" onMouseDown={event => event.stopPropagation()} initial={{ opacity: 0, scale: .96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
    <button className="owner-qr-close" onClick={onClose} aria-label="Fechar"><Icon name="close" size={18} /></button>
    <span className="owner-overline">NOVO COBRADOR</span><h2>Adicionar cobrador autorizado</h2>
    <label className="owner-modal-field"><span>Nome completo</span><input value={name} onChange={e => setName(e.target.value)} placeholder="Nome do cobrador" /></label>
    <label className="owner-modal-field"><span>Viatura atribuída</span><select value={vehicle} onChange={e => setVehicle(e.target.value)}><option value="">Sem viatura atribuída</option>{vehicles.map(v => <option key={v.plate} value={v.plate}>{v.plate}</option>)}</select></label>
    <div className="owner-qr-actions"><button className="owner-secondary-button" onClick={onClose}>Cancelar</button><button className="owner-primary-button" disabled={!name.trim()} onClick={() => onAdd(name.trim(), vehicle)}>Adicionar cobrador</button></div>
  </motion.section></div>;
}

function CollectorProfileModal({ collector, onClose }: { collector: Collector; onClose: () => void }) {
  return <div className="owner-qr-overlay" role="dialog" aria-modal="true" aria-label={`Perfil de ${collector.name}`} onMouseDown={onClose}><motion.section className="owner-qr-modal" onMouseDown={event => event.stopPropagation()} initial={{ opacity: 0, scale: .96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
    <button className="owner-qr-close" onClick={onClose} aria-label="Fechar"><Icon name="close" size={18} /></button>
    <div className="owner-person-avatar" style={{ width: 56, height: 56, fontSize: "1.3rem" }}>{collector.name.split(" ").map(n => n[0]).join("")}</div>
    <h2>{collector.name}</h2>
    <p>Viatura atribuída: <strong>{collector.vehicle}</strong></p>
    <p>Pagamentos processados: <strong>{collector.payments}</strong></p>
    <p>Estado: <span className="owner-state"><i />{collector.status}</span></p>
    <div className="owner-qr-actions"><button className="owner-secondary-button" onClick={onClose}>Fechar</button></div>
  </motion.section></div>;
}
