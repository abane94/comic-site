import { Controller, UploadedFiles, UseInterceptors, Post } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@Controller('upload')
export class UploadController {

    @Post('mult')
    @UseInterceptors(FilesInterceptor('files', 3))
    uploadFile(@UploadedFiles() files) {
        // console.log(files);
        let ls = [];
        files.forEach(element => {
            console.log(typeof element);
            console.log(element);
            ls.push(element.originalname);
            fs.writeFile(element.originalname, element.buffer, err => {
                console.log(err);
            });
        });
        // return 'files uploaded';
        return ls;
    }
}
