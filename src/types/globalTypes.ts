export interface PdfSearchParams {
  name?: string;
  sortBy: "name" | "size" | "createdAt";
  order: "asc" | "desc";
}
