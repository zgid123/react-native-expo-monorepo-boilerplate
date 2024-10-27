import type { JSX } from 'react';

export type TModalKey = 'global' | Omit<string, 'global'>;

interface IOnSubmitParams {
  close: () => void;
}

export interface IConfirmProps {
  title?: string;
  description?: string;
  getLoading?: () => boolean;
  render?: () => JSX.Element;
  onSubmit?: (params: IOnSubmitParams) => void;
  closeProps?: {
    title?: string;
  };
  confirmProps?: {
    title?: string;
  };
}
