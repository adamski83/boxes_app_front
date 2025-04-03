type paths = {
  home: string;
  dashboard: string;
  login: string;
  register: string;
  qrScanner: string;
  invoices: string;
  charts: string;
  edit: string;
  lives: string;
};

export const PATHS: paths = {
  home: "/",
  dashboard: "/dashboard",
  qrScanner: "/qr-scanner",
  register: "/register",
  login: "/login",
  invoices: "/invoices",
  charts: "/charts",
  edit: "/edit/:id",
  lives: "/lives",
};
