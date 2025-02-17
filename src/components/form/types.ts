export interface FormFields {
  id?: string;
  name: string;
  amount: number;
  dimension: string;
  usage: string;
  picture?: string;
  storage?: string;
  status?: string;
}

export interface FormProps {
  initialValues?: Partial<FormFields>;
  onSubmit: (data: FormFields) => void;
  isEdit?: boolean;
}
