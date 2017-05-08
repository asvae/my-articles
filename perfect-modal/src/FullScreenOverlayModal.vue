<template>
    <div class="full-screen-overlay-modal">
        <div class="full-screen-overlay-modal__background"
             @click="hide()"
             v-if="isDisplayed"
        />
        <div class="full-screen-overlay-modal__content"
             v-if="isDisplayed"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'FullScreenOverlayModal',
    data (){
      return {
        isDisplayed: this.value,
        isListening: false,
      }
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      }
    },
    methods: {
      show () {
        this.isDisplayed = true
        this.$emit('input', true)
      },
      hide () {
        this.isDisplayed = false
        this.$emit('input', false)
      },
    },
    watch: {
      value (value) {
        this.isDisplayed = value
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
    .full-screen-overlay-modal {
        &__background {
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
        &__content {
            position: fixed;
            z-index: 2000;
            // Closing multiple modals won't work without that line. No idea as to why.
            transform: translateY(4px);

            box-sizing: border-box;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 4px 4px 30px 0px rgba(60, 112, 153, 0.4);
        }
    }
</style>
