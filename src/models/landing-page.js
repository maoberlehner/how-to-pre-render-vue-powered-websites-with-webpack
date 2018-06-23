import api from '../utils/api';
import { responseAdapter as contentBlockResponseAdapter } from './content-block';

// This is the ID of the landing
// page we've created earlier.
export const HOME = `7D8zXfigvuaWiK0IASKiO2`;

// The LandingPage class returns a clean
// LandingPage object with only the data we need.
export class LandingPage {
  constructor({
    contentBlocks = [],
    id = null,
    intro = ``,
    title = ``,
  } = {}) {
    this.contentBlocks = contentBlocks;
    this.id = id;
    this.intro = intro;
    this.title = title;
  }
}

// We use an adapter to bring the API response
// from the Contentful API into the correct format
// for our LandingPage class.
export function responseAdapter(response) {
  const { fields, sys } = response.sys.type === `Array`
    ? response.items[0]
    : response;

  const contentBlocks = fields.contentBlocks
    .map(x => contentBlockResponseAdapter(x));

  return new LandingPage({ ...fields, ...sys, contentBlocks });
}

// We wrap the Contentful API client to format
// the response exactly the way we like it.
export default {
  async get(id) {
    return responseAdapter(await api.getEntries({ 'sys.id': id }));
  },
};
