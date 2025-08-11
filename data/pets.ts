import { ReactNode } from "react";

export interface Pet {
  description: ReactNode;
  id: number;
  name: string;
  type: string;
  image: string;
  adopted: 0 | 1;
}
