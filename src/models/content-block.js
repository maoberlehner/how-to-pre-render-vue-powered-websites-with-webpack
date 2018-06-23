import { responseAdapter as imageResponseAdapter } from './image';

export class ContentBlock {
  constructor({
    id = null,
    image = ``,
    position = ``,
    text = ``,
    title = ``,
  } = {}) {
    this.id = id;
    this.image = image;
    this.position = position;
    this.text = text;
    this.title = title;
  }
}

export function responseAdapter(response) {
  const { fields, sys } = response.sys.type === `Array`
    ? response.items[0]
    : response;

  const image = imageResponseAdapter(fields.image);

  return new ContentBlock({ ...fields, ...sys, image });
}
