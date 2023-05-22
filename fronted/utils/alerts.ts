import Swal from "sweetalert2";

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
