export class ImageUploaderHelper {
  getFileName(event: any, uuid: string): string {
    return `${uuid}.${this.getExtension(event)}`;
  }

  private getExtension(event: any): string {
    if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
      return;
    }

    const name = event.target.files[0].name;
    const lastDot = name.lastIndexOf('.');

    return name.substring(lastDot + 1);
  }
}
