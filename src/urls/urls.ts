type paths = {
  home: string;
  dashboard: string;
  login: string;
  register: string;
  qrScanner: string;
  invoices: string;
  charts: string;
  pdfs: string;
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
  pdfs: "/pdfs",
  edit: "/edit/:id",
  lives: "/lives",
};
