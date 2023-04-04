import { existsSync, writeFileSync } from "fs"
import { join } from "path";
import logger from "../config/logger";


class FileUtils {
    //create a file
    public async createEmptyFile(file_name: string, file_path: string) {
        //get the file path
        const path = join(file_path, file_name)

        //check if the file exists
        if (!existsSync(path)) {
            //create the file
            try {
                writeFileSync(path, '');
                logger(`File ${file_name} created at ${file_path}`);
            } catch {
                logger(`There was an error creating ${file_name} at ${file_path}`)
            }
        }
    }
}

export default new FileUtils();