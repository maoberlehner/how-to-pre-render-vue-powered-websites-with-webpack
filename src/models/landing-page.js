import api from '../utils/api';

// This is the ID of the landing
// page we've created earlier.
export const HOME = `7D8zXfigvuaWiK0IASKiO2`;

// The LandingPage class returns a clean
// LandingPage object with only the data we need.
export class LandingPage {
  constructor({
    id = null,
    intro = ``,
    title = ``,
  } = {}) {
    this.id = id;
    this.intro = intro;
    this.title = title;
  }
}

// We use an adapter to bring the API response
// from the Contentful API into the correct format
// for our LandingPage class.
export function responseAdapter({ fields, sys }) {
  return new LandingPage({ ...fields, ...sys });
}

// We wrap the Contentful API client to format
// the response exactly the way we like it.
export default {
  async get(id) {
    return responseAdapter(await api.getEntry(id));
  },
};
