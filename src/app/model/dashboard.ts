import { Type } from "@angular/core";

export interface  Widget{
  _id: string;
  label: string;
  content: Type<unknown>;
}
