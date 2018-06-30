<template>
  <div
    class="About"
    data-view
  >
    <div class="About__hero mb-4 mb-md-5 mx-auto text-center">
      <h1 class="display-4">{{ title }}</h1>
      <p class="lead">
        {{ intro }}
      </p>
    </div>
    <div class="About__content-blocks mb-5">
      <app-content-block
        v-for="contentBlock in contentBlocks"
        :key="contentBlock.id"
        v-bind="contentBlock"
      />
    </div>
    <ul class="About__teasers mb-5">
      <li
        v-for="teaser in teasers"
        :key="teaser.id"
      >
        <app-teaser v-bind="teaser"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { ABOUT } from '../../models/landing-page';
import { GET_LANDING_PAGE } from '../../store/action-types';
import landingPage from '../../store/modules/landing-page';
import registerStoreModule from '../../utils/register-store-module';

import AppContentBlock from '../app/AppContentBlock.vue';
import AppTeaser from '../app/AppTeaser.vue';

const STORE_NAMESPACE = `landingPage/about`;

export default {
  name: `About`,
  components: {
    AppContentBlock,
    AppTeaser,
  },
  computed: {
    ...mapState(STORE_NAMESPACE, [
      `contentBlocks`,
      `intro`,
      `teasers`,
      `title`,
    ]),
  },
  fetch({ store }) {
    registerStoreModule({ module: landingPage, name: STORE_NAMESPACE, store });

    // Do not load data again if already in store.
    if (store.state[STORE_NAMESPACE].id) return false;

    return store.dispatch(`${STORE_NAMESPACE}/${GET_LANDING_PAGE}`, ABOUT);
  },
};
</script>

<style lang="scss">
.About {
  &__hero {
    max-width: 36em;
  }

  &__content-blocks {
    > :not(:last-child) {
      margin-bottom: 4em;
    }
  }

  &__teasers {
    display: flex;
    flex-wrap: wrap;
    margin-top: -1em;
    margin-left: -1em;
    padding-left: 0;
    list-style-type: none;

    > * {
      flex-basis: 16em;
      flex-grow: 9999;
      padding-top: 1em;
      padding-left: 1em;
    }
  }
}
</style>
