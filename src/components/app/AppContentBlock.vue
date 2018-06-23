<template>
  <div class="AppContentBlock">
    <div class="AppContentBlock__body">
      <h2>{{ title }}</h2>
      <p>{{ text }}</p>
    </div>
    <div
      v-if="image"
      :class="{ 'AppContentBlock__figure--left': position === `left` }"
      class="AppContentBlock__figure"
    >
      <img
        :src="imageSrc"
        :srcset="imageSrcset"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: `AppContentBlock`,
  props: {
    image: {
      type: Object,
      default: null,
    },
    position: {
      type: String,
      default: `right`,
    },
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    imageSrc() {
      if (!this.image) return null;
      return `${this.image.url}?w=360&h=250&fit=thumb&fm=jpg&fl=progressive&q=70`;
    },
    imageSrcset() {
      if (!this.image) return null;
      return `${this.image.url}?w=720&h=500&fit=thumb&fm=jpg&fl=progressive&q=40 2x`;
    },
  },
};
</script>

<style lang="scss">
.AppContentBlock {
  margin-left: -2em;
  margin-top: -1em;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  &__body,
  &__figure {
    padding-left: 2em;
    padding-top: 1em;
  }

  &__body {
    flex-grow: 9999;
    flex-basis: 24em;
  }

  &__figure {
    flex-grow: 1;
    flex-basis: 18em;
    text-align: center;

    &--left {
      order: -1;
    }
  }
}
</style>
