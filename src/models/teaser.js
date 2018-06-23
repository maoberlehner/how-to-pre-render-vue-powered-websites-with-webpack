import { responseAdapter as imageResponseAdapter } from './image';

export class Teaser {
  constructor({
    id = null,
    image = ``,
    link = ``,
    text = ``,
    title = ``,
  } = {}) {
    this.id = id;
    this.image = image;
    this.link = link;
    this.text = text;
    this.title = title;
  }
}

export function responseAdapter(response) {
  const { fields, sys } = response.sys.type === `Array`
    ? response.items[0]
    : response;

  const image = imageResponseAdapter(fields.image);

  return new Teaser({ ...fields, ...sys, image });
}
