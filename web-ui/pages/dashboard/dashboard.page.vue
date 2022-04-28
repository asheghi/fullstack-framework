<template>
  <div class="DashboardPage">
    <div class="router-view-cover">
      <router-view v-slot="{ Component }">
        <Suspense>
          <div class="component">
            <component :is="Component" />
          </div>
        </Suspense>
      </router-view>
    </div>
  </div>
</template>

<script>
import {getDebug} from "../../../lib/utils.js";
const debug = getDebug("dashboard:page");

export default {

};
</script>

<style lang="scss">
.DashboardPage {
}
</style>
