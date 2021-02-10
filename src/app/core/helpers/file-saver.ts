import { saveAs } from 'file-saver';

export class FileSaver {
  public static saveToFileSystem(response): void {
    const contentDispositionHeader: string = response.headers.get('content-disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = JSON.parse(parts[1].split('=')[1]);
    console.log('filename', filename);
    const blob = new Blob([response.body]);
    saveAs(blob, filename);
  }
}
