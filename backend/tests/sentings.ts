import * as fs from 'fs';
import * as csv from 'fast-csv';

const obtenerPrimerDato = (archivoCsv: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    let primerDato: string | null = null;

    fs.createReadStream(archivoCsv)
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => {
        reject(error);
      })
      .on('data', (dato: any) => {
        // Obtener el primer dato
        if (!primerDato) {
          primerDato = dato[Object.keys(dato)[0]];
        }
      })
      .on('end', () => {
        if (primerDato) {
          resolve(primerDato);
        } else {
          reject(new Error('No se encontró ningún dato en el archivo CSV.'));
        }
      });
  });
};

export default obtenerPrimerDato;