import lib from "dayjs";
import "dayjs/locale";
import relativeTime from "dayjs/plugin/relativeTime";

lib.locale("pt-BR");
lib.extend(relativeTime);

export const dayjs = lib;
