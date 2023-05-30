import Swal, { SweetAlertResult } from "sweetalert2";
import { Task } from "../config/interfaces.config";

export const loading = (bool: boolean) => {
  if (bool) {
    Swal.fire({
      title: "Cargando...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    return;
  }

  Swal.close();
};

const msgTitles = {
  success: "¡Listo!",
  error: "¡Error!",
  info: "Información",
};
export const showMessage = (
  msg: string,
  type: "success" | "error" | "info"
) => {
  Swal.fire(msgTitles[type], msg, type);
};

interface obtainInfoInput {
  label: string;
  type: "text" | "date";
  name: string;
}

interface obtainInfoOutput {
  [str: string]: string | Date;
}

const inputs = {
  text: (label: string) =>
    `<input id="${label}" class="swal2-input" placeholder="${label}">`,
  date: (label: string) => `<div class="form-date">
        <label class="form-date__label" for="${label}">${label}</label>
        <input class="form-date__input" type="date" id="${label}" name="input-date-start">
      </div>`,
};

export function obtainInfo(
  input: obtainInfoInput[],
  title: string,
  confirmButtonText: string = "Aceptar"
) {
  return new Promise((res, rej) => {
    let html = "";
    for (let i = 0, n = input.length; i < n; i++) {
      html += inputs[input[i].type](input[i].label);
    }

    Swal.fire({
      title,
      html,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: "Cancelar",
      preConfirm: async () => {
        return new Promise((resolve) => {
          const response: any = {};
          for (let i = 0, n = input.length; i < n; i++) {
            if (input[i].type === "text")
              response[input[i].name] = (
                document.getElementById(input[i].label) as HTMLInputElement
              ).value;
            else {
              const str = (
                document.getElementById(input[i].label) as HTMLInputElement
              ).value.split("-");
              const d = new Date();
              d.setMilliseconds(0);
              d.setSeconds(0);
              d.setMinutes(0);
              d.setHours(0);
              console.log(str);
              d.setDate(parseInt(str[2]) + 1);
              d.setMonth(parseInt(str[1]) - 1);
              d.setFullYear(parseInt(str[0]));
              console.log(d);
              response[input[i].name] = d;
            }
          }

          resolve(response);
        });
      },
    }).then(
      (response: SweetAlertResult<obtainInfoOutput> | SweetAlertResult) => {
        if (response.isConfirmed) {
          let empty = false;
          for (let i = 0, n = input.length; i < n; i++) {
            const v = response.value[input[i].name];
            if (v === "" || v.toString() === "Invalid Date") empty = true;
          }
          if (empty) {
            showMessage("Por favor, rellene todos los campos", "error");
            rej("unconfirmed");
          } else {
            res(response.value);
          }
        } else rej("unconfirmed");
      }
    );
  });
}
