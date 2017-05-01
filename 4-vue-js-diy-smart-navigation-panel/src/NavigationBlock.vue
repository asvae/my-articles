<template>
    <div>
        <div class="navigation-block"
             v-for="parent in nestedParents"
        >
            <router-link class="navigation-block__item"
                         v-for="route in parent.children"
                         :key="route.name"
                         :to="{name: route.name}"
                         v-text="composeName(route)"
            />
        </div>
        <div class="breadcrumbs">
            <router-link class="breadcrumbs__item"
                         v-for="route in nestedRoutes"
                         :key="route.name"
                         :to="{name: route.name}"
                         v-text="composeName(route)"
            />
        </div>
    </div>
</template>

<script>
  // Component creates navigation panel for your routes.
  // Routes you want to be displayed should have name attribute.

  import ObjectHelpers from '../../../classes/Utility/ObjectHelpers.js'

  export default {
    name: 'NavigationBlock',
    props: {
      routes: {
        type: Array,
        required: true,
      }
    },
    methods: {
      composeName (route){
        if (route.meta && route.meta.title) {
          return route.meta.title
        }

        return route.name
      }
    },
    computed: {
      nestedRoutes () {
        return ObjectHelpers
            .traverseBranch(this.routes, { name: this.$route.name })
            .filter(route => !Array.isArray(route))
      },
      nestedParents () {
        return this.nestedRoutes.filter(route => route.children)
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
    .navigation-block {
        display: flex;
        background-color: white;
        margin-bottom: 10px;
        box-shadow: 4px 4px 3 0px 0px rgba(60, 112, 153, 0.4);
        padding: 4px;
        &__item {
            color: #43485f;
            font-size: 18px;
            padding: 5px;
            border: 1px solid transparent;
            border-radius: 5px;
            margin: 0 3px;
            &:hover {
                border-color: #91b3d7;
            }
            &.is-active {
                color: #fff;
                background-color: #1388d6;
            }
        }
    }

    .breadcrumbs {
        display: flex;
        margin-bottom: 10px;
        padding: 3px;
        &__item {
            & + & {
                margin-left: 5px;
                &:before {
                    content: '/';
                    margin-right: 5px;
                }
            }
        }
    }
</style>
