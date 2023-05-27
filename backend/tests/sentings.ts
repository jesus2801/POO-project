import * as fs from 'fs';
import * as csv from 'fast-csv';



export function extraerPrimeraFila(filePath:string): Promise<any> {
  return new Promise((resolve, reject) => {
    const csvData: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: false }))
      .on('data', (row: any) => {
        csvData.push(row);
      })
      .on('end', () => {
        if (csvData.length > 0) {
          resolve(csvData[0]);
        } else {
          reject(new Error('No se encontraron filas en el archivo CSV.'));
        }
      });
  });
}

