interface IDataProps {
  date: Date;
  value: number | string;
}

export interface IDateTimeModalPickerProps {
  defaultValue?: Date;
  onSubmit?: (value: Date) => void;
  onChange?: (value: IDataProps) => void;
}
