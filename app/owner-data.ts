export type VehicleStatus = "Operacional" | "Atenção" | "Suspensa";
export type Vehicle = { plate: string; collector: string; payments: number; revenue: number; status: VehicleStatus };
export type Collector = { name: string; vehicle: string; payments: number; status: "Activo" | "Inactivo" };
export type RevenueDay = { day: string; value: number };

export const initialVehicles: Vehicle[] = [
  { plate: "LD-42-18-KW", collector: "Adilson Manuel", payments: 18, revenue: 48600, status: "Operacional" },
  { plate: "LD-91-03-KW", collector: "Jorge Domingos", payments: 15, revenue: 41300, status: "Operacional" },
  { plate: "LD-07-25-KW", collector: "Marta João", payments: 10, revenue: 28500, status: "Atenção" },
];

export const initialCollectors: Collector[] = [
  { name: "Adilson Manuel", vehicle: "LD-42-18-KW", payments: 18, status: "Activo" },
  { name: "Jorge Domingos", vehicle: "LD-91-03-KW", payments: 15, status: "Activo" },
];

export const revenueDays: RevenueDay[] = [
  { day: "Seg", value: 78791 },
  { day: "Ter", value: 99218 },
  { day: "Qua", value: 70036 },
  { day: "Qui", value: 119645 },
  { day: "Sex", value: 105055 },
  { day: "Sáb", value: 128400 },
  { day: "Dom", value: 93382 },
];

export const money = (value: number) => `${value.toLocaleString("pt-AO")} Kz`;
