export interface AddFormFields {
  id?: string;
  name: string;
  amount: number;
  dimension: string;
  usage: string;
  picture?: string;
  storage?: string;
  status?: string;
}

export interface AddFormProps {
  initialValues?: Partial<AddFormFields>;
  onSubmit: (data: AddFormFields) => void;
  isEdit?: boolean;
}
