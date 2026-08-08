import { StatusTranslator } from "../enums/active-status";

export function translateStatus(status: boolean): string {
  return status
    ? StatusTranslator.ACTIVE
    : StatusTranslator.INACTIVE;
}