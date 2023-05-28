import { messages } from "@/config/messages";
import { Session } from "../config/interfaces.config";

export const dueDate = (date: Date): string => {
  const diff = date.getTime() - Date.now();
  if (diff <= 0) return "Vencida";

  if (diff < 60000 * 60 * 24) return "Hoy";

  const d = Math.floor(diff / (60000 * 60 * 24));
  return `${d} ${d <= 1 ? "día" : "días"}`;
};

export const parseSessionsStatistics = (s: Session[]): [string[], number[]] => {
  const labels = [];
  const data = [];
  const sessions = [...s];
  sessions.reverse();
  let current2 = convertToHalf(sessions[0].endDate);
  for (let i = 0, n = sessions.length; i < n; i++) {
    console.log("----");
    printDate(sessions[i].initDate);
    printDate(sessions[i].endDate);
    console.log("----");
  }
  for (let x = 0, m = 7; x < m; x++) {
    let current1 = new Date(current2.getTime() - 30 * 60000);
    labels.push(
      twoDigits(current1.getHours()) + ":" + twoDigits(current1.getMinutes())
    );
    let t = 0;
    for (let i = 0, n = sessions.length; i < n; i++) {
      const s = sessions[i];

      if (s.initDate <= current2 && s.endDate >= current1) {
        //izquierda afuera, derecha adentro
        if (s.initDate <= current1) {
          if (s.endDate <= current2) {
            t += (s.endDate.getTime() - current1.getTime()) / 60000;
          } else {
            t = 30;
          }
          //ambos adentro
        } else if (s.endDate <= current2) {
          t += (s.endDate.getTime() - s.initDate.getTime()) / 60000;
          //iquierda adentro, derecha afuera
        } else {
          t += (current2.getTime() - s.initDate.getTime()) / 60000;
        }
      }
    }
    data.push(t);
    current2 = new Date(current1.getTime());
  }

  return [labels, data];
};

function convertToHalf(date: Date) {
  const d = new Date(date);
  const minutes = d.getMinutes();
  d.setSeconds(0);
  if (minutes <= 30) d.setMinutes(30);
  else {
    d.setHours(d.getHours() + 1);
    d.setMinutes(0);
  }
  return d;
}

export function twoDigits(number: number) {
  return number < 10 ? "0" + number : number;
}

function printDate(date: Date) {
  const opcionesHora: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  console.log(date.toLocaleTimeString("es-ES", opcionesHora));
}

export const randomMessage = () =>
  messages[Math.floor(Math.random() * (43 + 1))];
