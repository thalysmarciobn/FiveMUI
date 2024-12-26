<script setup lang="ts">
  import { ref } from "vue"
  import Hud from "./components/Hud.vue"
  import Creation from "./components/Creation.vue"
  import Panel from "./components/Panel.vue"

  import { useApp } from "./stores/useApp"
  import { useHud } from "./stores/useHud"
  import { useCreation } from "./stores/useCreation"
  import { usePanel } from "./stores/usePanel"

  import { useNotification } from "@kyvg/vue3-notification"

  const appStore        = useApp()
  const appHud          = useHud()
  const appCreation     = useCreation()
  const appPanel        = usePanel()

  const { notify }      = useNotification()

  window.addEventListener("message", (event) => {

    const action: string    = event.data.Action
    const key: string       = event.data.Key
    const params: any[]     = event.data.Params

    if (action === 'interface') {
      switch (key) {
        case 'notification':
          const s_type: string    =  params[0] as string
          const s_message: string =  params[1] as string
          notify({
            type: s_type,
            text: s_message
          })
          break;
        case 'world':
          appHud.weather            = params[0] as number
          appHud.rainLevel          = params[1] as number
          appHud.windSpeed          = params[2] as number
          appHud.windDirecion       = params[3] as number
          appHud.hour               = params[4] as number
          appHud.minute             = params[5] as number
          appHud.second             = params[6] as number
          break
        case 'panel':
          appPanel.display          = params[0] as string
          break
        case 'creation':
          appCreation.display       = params[0] as string
          appStore.charSlot         = params[1] as number
          break
      }
    }
  });
</script>

<template>
  <notifications :max="5" :width="500" :closeOnClick="false" position="center" class="mt-4">
    <template #body="props">
      <div class="project-notification" v-bind:class="props.item.type">
        <div class="content">
          <template v-if="props.item.type === 'success'">
            <svg class="bx--inline-notification__icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.293-11.332L6.75 9.21 4.707 7.168 3.293 8.582 6.75 12.04l5.957-5.957-1.414-1.414z" fill-rule="evenodd"></path>
            </svg>
          </template>
          <template v-else-if="props.item.type === 'warning'">
            <svg class="bx--inline-notification__icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M.75 16a.75.75 0 0 1-.67-1.085L7.33.415a.75.75 0 0 1 1.34 0l7.25 14.5A.75.75 0 0 1 15.25 16H.75zm6.5-10v5h1.5V6h-1.5zM8 13.5A.75.75 0 1 0 8 12a.75.75 0 0 0 0 1.5z" fill-rule="nonzero"></path>
            </svg>
          </template>
          <template v-else-if="props.item.type === 'info'">
            <svg class="bx--inline-notification__icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm1-3V7H7v6h2zM8 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill-rule="evenodd"></path>
            </svg>
          </template>
          <template v-else-if="props.item.type === 'danger'">
            <svg class="bx--inline-notification__icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM3.293 4.707l8 8 1.414-1.414-8-8-1.414 1.414z" fill-rule="evenodd"></path>
            </svg>
          </template>
          <div class="data" v-html="props.item.text"></div>
        </div>
      </div>
    </template>
  </notifications>
  <template v-if="appCreation.display === 'true'">
    <Creation></Creation>
  </template>
  <template v-else>
    <Transition name="fade">
      <Panel v-if="appPanel.display === 'true'"></Panel>
    </Transition>
  </template>
  <Hud></Hud>
</template>

<style>
/* cyrillic-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459W1hyzbi.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459WZhyzbi.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wdhyzbi.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459W1hyzbi.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459WZhyzbi.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wdhyzbi.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459W1hyzbi.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459WZhyzbi.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wdhyzbi.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459W1hyzbi.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459WZhyzbi.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wdhyzbi.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459W1hyzbi.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459WZhyzbi.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wdhyzbi.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  /* background-color: #1A2643; */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#app {
  height: 100%;
  width: 100%;
  font-family: Montserrat;
}

.project-notification {
    background: #111212;
    color: #fff;
    font-weight: 300;
    padding-left: 7pt;
    padding-right: 8pt;
    height: 25pt;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.vue-notification-wrapper:not(:last-child) {
  margin-bottom: 5pt;
}

.project-notification svg {
  margin-right: 8pt;
}

.project-notification .content {
  display: inline-flex;
  font-size: 9pt;
}

.project-notification .content .data {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-notification.success {
  border-left: 3px solid #42be65;
}

.project-notification.success svg {
  fill: #42be65;
}

.project-notification.warning {
  border-left: 3px solid #f1c21b;
}

.project-notification.warning svg {
  fill: #f1c21b;
}

.project-notification.info {
  border-left: 3px solid #4589ff;
}

.project-notification.info svg {
  fill: #4589ff;
}

.project-notification.danger {
  border-left: 3px solid #fa4d56;
}

.project-notification.danger svg {
  fill: #fa4d56;
}
</style>