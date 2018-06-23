<template>
  <div class="Home">
    <div class="Home__hero mb-4 mb-md-5 mx-auto text-center">
      <h1 class="display-4">{{ title }}</h1>
      <p class="lead">
        {{ intro }}
      </p>
    </div>
    <div class="Home__content-blocks mb-5">
      <app-content-block
        v-for="contentBlock in contentBlocks"
        :key="contentBlock.id"
        v-bind="contentBlock"
      />
    </div>
    <ul class="Home__teasers mb-5">
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
import { mapActions, mapState } from 'vuex';

import { GET_LANDING_PAGE } from '../../store/action-types';
import { HOME } from '../../models/landing-page';
import landingPage from '../../store/modules/landing-page';

import AppContentBlock from '../app/AppContentBlock.vue';
import AppTeaser from '../app/AppTeaser.vue';

const STORE_NAMESPACE = `landingPage/home`;

export default {
  name: `Home`,
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
  created() {
    // Dynamically register the landing page store module in
    // a custom namespace which is only used by this component.
    this.$store.registerModule(STORE_NAMESPACE, landingPage);

    // Do not fetch data again if it has been fetched already.
    if (this.$store.state[STORE_NAMESPACE].id) return;

    this.getLandingPage(HOME);
  },
  methods: {
    ...mapActions(STORE_NAMESPACE, {
      getLandingPage: GET_LANDING_PAGE,
    }),
  },
};
</script>

<style lang="scss">
.Home {
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
