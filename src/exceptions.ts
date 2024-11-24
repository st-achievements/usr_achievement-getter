import {exception} from "@st-api/core";
import {StatusCodes} from "http-status-codes";

export const ACHIEVEMENT_NOT_FOUND = exception({
  status: StatusCodes.NOT_FOUND,
  errorCode: 'USR-ACH-GETTER-0001',
  error: 'Achievement not found',
  message: 'Achievement not found',
});