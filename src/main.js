import Vue from 'vue';

import injectInitialState from './utils/inject-initial-state';
import router from './router';
import store from './store';

import App from './components/App.vue';

const app = new Vue({
  router,
  store,
  render: h => h(App),
});

// During pre-rendering the initial state is
// injected into the global scope, here we
// fill the store with the initial state.
// eslint-disable-next-line no-underscore-dangle
if (window.__INITIAL_STATE__) store.replaceState(window.__INITIAL_STATE__);

router.beforeResolve(async (to, from, next) => {
  try {
    const components = router.getMatchedComponents(to);

    // By using `await` we make sure to wait
    // for the API request made by the `fetch()`
    // method to resolve before rendering the view.
    await Promise.all(components.map(x => x.fetch && x.fetch({ store })));

    // The `injectInitialState()` function injects
    // the current state as a global variable
    // `__INITIAL_STATE__` if the page is currently
    // pre-rendered.
    // eslint-disable-next-line no-underscore-dangle
    if (window.__PRERENDER_INJECTED) injectInitialState(store.state);
  } catch (error) {
    // This is the place for error handling in
    // in case the API request fails for example.
    // eslint-disable-next-line no-console
    console.log(error);
  }

  return next();
});

app.$mount(`#app`);
