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

export function obtainTask() {
  Swal.fire({
    title: "Ingresa tu tarea: ",
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Tarea">' +
      '<input id="swal-input2" class="swal2-input" placeholder="categoría">' +
      `<div class="form-date">
        <label class="form-date__label" for="input-date">Fecha de inicio</label>
        <input class="form-date__input" type="date" id="input-date" name="input-date-start">
      </div>`,
    showCancelButton: true,
    confirmButtonText: "Agregar",
    preConfirm: async () => {
      return new Promise((resolve, reject) => {
        resolve({
          content: (document.getElementById("swal-input1") as HTMLInputElement)
            .value,
          category: (document.getElementById("swal-input2") as HTMLInputElement)
            .value,
          date: new Date(
            (document.getElementById("input-date") as HTMLInputElement).value
          ),
        });
      });
    },
  }).then((response: SweetAlertResult<Task> | SweetAlertResult) => {
    if (response.isConfirmed) {
      if (response.value!.date.toString() || response.value!.content === '' || response.value!.category === '') {
        
        return;
      }
    }
  });
}
