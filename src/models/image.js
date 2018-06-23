export class Image {
  constructor({
    id = null,
    url = ``,
  } = {}) {
    this.id = id;
    this.url = url;
  }
}

export function responseAdapter({ fields, sys }) {
  return new Image({ ...sys, url: fields.file.url });
}
