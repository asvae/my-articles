<template>
    <div class="click-target-modal">
        <div class="click-target-modal__content"
             v-if="isDisplayed"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
  import DomHelpers from './Utility/DomHelpers.js'

  export default {
    name: 'ClickTargetModal',
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
        this.isListening || this.listen(true)
      },
      hide () {
        this.isDisplayed = false
        this.$emit('input', false)
        this.isListening && this.listen(false)
      },
      click (event) {
        DomHelpers.isChild(this.$el, event.target) || this.hide()
      },
      listen (on: Boolean = true) {
        // So that we won't add or remove same listener twice
        if (this.isListening === on) {
          return
        }

        // Adding or removing listeners.
        if (on) {
          setTimeout(() => {
            document.body.addEventListener('click', this.click, false)
          })
        } else {
          document.body.removeEventListener('click', this.click, false)
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
    .click-target-modal {
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
