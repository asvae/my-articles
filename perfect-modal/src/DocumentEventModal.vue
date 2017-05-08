<template>
    <div class="document-event-modal">
        <div class="document-event-modal__content"
             @click.stop
             v-if="isDisplayed"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'DocumentEventModal',
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
    created (){
    },
    methods: {
      show () {
        this.isDisplayed = true
        this.$emit('input', true)
        this.listen(true)
      },
      hide () {
        this.isDisplayed = false
        this.$emit('input', false)
        this.listen(false)
      },
      listen(on: Boolean = true){
        // So that we won't add or remove same listener twice
        if (this.isListening === on) {
          return
        }

        // Adding or removing listeners.
        if (on) {
          setTimeout(() => {
            document.body.addEventListener('click', this.hide, false)
          })
        } else {
          document.body.removeEventListener('click', this.hide, false)
        }

        // Flag to know if listener is already registered.
        this.isListening = on
      }
    },
    watch: {
      value (value) {
        this.isDisplayed = value
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
    .document-event-modal {
        &__content {
            position: fixed;
            box-sizing: border-box;
            z-index: 2000;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 4px 4px 30px 0px rgba(60, 112, 153, 0.4);
        }
    }
</style>
