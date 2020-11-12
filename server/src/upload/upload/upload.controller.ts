import { Controller, UploadedFiles, UseInterceptors, Post } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('upload')
export class UploadController {

    @Post('mult')
    @UseInterceptors(FilesInterceptor('files', 3))
    uploadFile(@UploadedFiles() files) {
        // console.log(files);
        const uploadSavePath = path.join(__dirname, '..', '..', 'upload-data');
        if (!fs.existsSync(uploadSavePath)) {
            fs.mkdirSync(uploadSavePath, {recursive: true});
        }
        let ls = [];
        files.forEach(element => {
            console.log(typeof element);
            console.log(element);
            // ls.push(element.originalname);
            const filePath = path.join(uploadSavePath, element.originalname);
            ls.push('http://localhost:3000/temp/' + element.originalname);
            fs.writeFile(filePath, element.buffer, err => {
                console.log(err);
            });
        });
        // return 'files uploaded';
        return ls;
    }
}
