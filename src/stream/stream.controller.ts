import { Controller, Get } from '@nestjs/common';
import axios from 'axios';
import { Readable } from 'stream';

@Controller('stream')
export class StreamController {
  @Get('test')
  async test() {
    const response = await axios.get('http://localhost:3000/static/test.txt', {
      responseType: 'stream',
    });
    const { data: fileStream, headers } = response;

    const fileSize = parseInt(headers['content-length']);
    console.log('[p1.0] fileSize', fileSize);

    const chunkSize = 1024;
    let start = 0;
    let end = chunkSize - 1;
    let partNumber = 1;

    // response.data.on('data', (chunk) => {
    //   writeStream.write(chunk);
    //   if (writeStream.bytesWritten >= s3ChunkSize) {
    //     // 上传分片到S3
    //     this.uploadToS3('temp_file', chunkNumber);
    //     chunkNumber++;
    //   }
    // });

    // response.data.on('end', () => {
    //   // 上传最后一个分片
    //   this.uploadToS3('temp_file', chunkNumber);
    //   writeStream.end();
    //   fs.unlinkSync('temp_file'); // 删除临时文件
    // });

    return fileSize;
  }
}

class RangeStream extends Readable {
  private start: number;
  private end: number;
  private position: number;

  constructor(start: number, end: number) {
    super();
    this.start = start;
    this.end = end;
    this.position = start;
  }

  _read(size: number) {
    if (this.position <= this.end) {
      const chunkSize = Math.min(size, this.end - this.position + 1);
      const chunk = Buffer.alloc(chunkSize);

      // Read the chunk from the file here
      // You can use fs.read or any other method to read the chunk from the file

      this.push(chunk);
      this.position += chunkSize;
    } else {
      this.push(null);
    }
  }
}
