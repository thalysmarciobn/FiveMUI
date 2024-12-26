<script lang="ts">
import { defineComponent } from "vue"

import { useHud } from "../stores/useHud"

import { zeroPad } from "../utils/helpers"
import { WeatherEnum } from "./hud/weatherEnum"

export default defineComponent({
  name: "Hud",
  setup() {
    const appHud         = useHud()
    
    return {
      appHud,
      WeatherEnum
    }
  },
  methods: {
    zeroPadNumber(number: number, count: number): string {
      return zeroPad(number, count)
    },
    isDay(hours: number): boolean {
      return hours > 6 && hours < 20
    }
  }
});
</script>

<template>
  <div class="hud">
    <div class="right-top">
        <div class="mic">

          <!-- mic 1 -->
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M16 24h-8v-1h3.5v-3.018c-3.63-.256-6.5-3.287-6.5-6.982v-2h1v2.01c.005 3.307 2.692 5.99 6 5.99 3.311 0 6-2.689 6-6v-2h1v2c0 3.695-2.87 6.726-6.5 6.982v3.018h3.5v1zm-9-19c0-2.76 2.24-5 5-5s5 2.24 5 5v8c0 2.76-2.24 5-5 5s-5-2.24-5-5v-8zm9 0c0-2.208-1.792-4-4-4s-4 1.792-4 4v8c0 2.208 1.792 4 4 4s4-1.792 4-4v-8z"/></svg>
          <!--
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M 12 20 z m 4 -9 c 0 2.209 -1.791 4 -4 4 s -4 -1.791 -4 -4 v -7 c 0 -2.209 1.791 -4 4 -4 s 4 1.791 4 4 v 7 z m 4 -2 v 2 c 0 4.418 -3.582 8 -8 8 s -8 -3.582 -8 -8 v -2 h 2 v 2 c 0 3.309 2.691 6 6 6 s 6 -2.691 6 -6 v -2 h 2 z"/></svg>

          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M 12 20 z m 6 -11 v 2 c 0 3.309 -2.691 6 -6 6 s -6 -2.691 -6 -6 v -2 h -2 v 2 c 0 4.418 3.582 8 8 8 s 8 -3.582 8 -8 v -2 h -2 z m -10 2 v -7 c 0 -2.209 1.791 -4 4 -4 s 4 1.791 4 4 v 7 c 0 2.209 -1.791 4 -4 4 s -4 -1.791 -4 -4 z m 2 -7 v 4 h 4 v -4 c 0 -1.103 -0.896 -2 -2 -2 c -1.103 0 -2 0.897 -2 2 z"/></svg>
          -->
        </div>
        <div class="clock">
          <div class="time">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="#fff" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z"/></svg>
            </div>
            <div class="content">
              <div class="value">{{ zeroPadNumber(appHud.hour, 2) }}:{{ zeroPadNumber(appHud.minute, 2) }}:{{ zeroPadNumber(appHud.second, 2) }}</div>
            </div>
          </div>
        </div>
        <div class="weather">
        </div>
    </div>
  </div>
</template>

<style scoped>
.hud {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
}

.hud .right-top {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 0.75em;
  flex-flow: row wrap;
  -webkit-flex-flow: row wrap;
  justify-content: end;
}

.hud .mic {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.hud .clock {
    font-family: 'Montserrat';
    color: #fff;
    float: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.hud .clock .time {
  display: inline-flex;
}

.hud .clock .time .icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hud .clock .time .content .value,
.hud .clock .time .content .date {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}

.hud .clock .time .content .value {
  font-size: 14pt;
  letter-spacing: 2pt;
}

.hud .clock .time .content .date {
  font-size: 9pt;
  letter-spacing: 1pt;
  font-weight: 300;
}

.element {
  height: 50px;
  width: 50px;
  margin: 10px;
 }

 .elements {
   display: flex;
   justify-content: center;
   flex-wrap: wrap;
   
 }


















 .wi_fog{
    fill:#404041;
    stroke:#404041
}
.wi_cloud {
    fill:#ffffff;
    stroke:#ffffff
}
.wi_rain,.wi_snow{
    fill:#309bff;
    stroke:#309bff
}
.wi_thunder{
    fill:#ff5d2b
}
.wi_sun,.wi_sun-semi{
    fill:#fcc756
}
.wi_sunshine{
    fill:#fbb040;
    stroke:#fbb040
}
.wi_moon-semi,.wi_moon{
    fill:#fcc756
}
.wi_stars{
    fill:#ffcf47
}
.ww-animation-hr-move{
    -webkit-animation-name:ww-animation-hr-move;
    -moz-animation-name:ww-animation-hr-move;
    -o-animation-name:ww-animation-hr-move;
    animation-name:ww-animation-hr-move;
    -webkit-animation-duration:7s;
    -moz-animation-duration:7s;
    -o-animation-duration:7s;
    animation-duration:7s;
    -webkit-animation-timing-function:linear;
    -moz-animation-timing-function:linear;
    -o-animation-timing-function:linear;
    animation-timing-function:linear;
    -webkit-animation-iteration-count:infinite;
    -moz-animation-iteration-count:infinite;
    -o-animation-iteration-count:infinite;
    animation-iteration-count:infinite
}
@-webkit-keyframes ww-animation-hr-move{
    0%{
        -webkit-transform:translate(-7px,0) rotate(0.02deg);
        transform:translate(-7px,0) rotate(0.02deg)
    }
    50%{
        -webkit-transform:translate(7px,0) rotate(0.02deg);
        transform:translate(7px,0) rotate(0.02deg)
    }
    100%{
        -webkit-transform:translate(-7px,0) rotate(0.02deg);
        transform:translate(-7px,0) rotate(0.02deg)
    }
}
@-moz-keyframes ww-animation-hr-move{
    0%{
        -moz-transform:translate(-7px,0) rotate(0.02deg);
        transform:translate(-7px,0) rotate(0.02deg)
    }
    50%{
        -moz-transform:translate(7px,0) rotate(0.02deg);
        transform:translate(7px,0) rotate(0.02deg)
    }
    100%{
        -moz-transform:translate(-7px,0) rotate(0.02deg);
        transform:translate(-7px,0) rotate(0.02deg)
    }
}
@-o-keyframes ww-animation-hr-move{
    0%{
        -o-transform:translate(-7px,0) rotate(0.02deg);
        transform:translate(-7px,0) rotate(0.02deg)
    }
    50%{
        -o-transform:translate(7px,0) rotate(0.02deg);
        transform:translate(7px,0) rotate(0.02deg)
    }
    100%{
        -o-transform:translate(-7px,0) rotate(0.02deg);
        transform:translate(-7px,0) rotate(0.02deg)
    }
}
@keyframes ww-animation-hr-move{
    0%{
        -webkit-transform:translate(-7px,0) rotate(0.02deg);
        -moz-transform:translate(-7px,0) rotate(0.02deg);
        -o-transform:translate(-7px,0) rotate(0.02deg);
        transform:translate(-7px,0) rotate(0.02deg)
    }
    50%{
        -webkit-transform:translate(7px,0) rotate(0.02deg);
        -moz-transform:translate(7px,0) rotate(0.02deg);
        -o-transform:translate(7px,0) rotate(0.02deg);
        transform:translate(7px,0) rotate(0.02deg)
    }
    100%{
        -webkit-transform:translate(-7px,0) rotate(0.02deg);
        -moz-transform:translate(-7px,0) rotate(0.02deg);
        -o-transform:translate(-7px,0) rotate(0.02deg);
        transform:translate(-7px,0) rotate(0.02deg)
    }
}
.wi_cloud_gradient,.wi_cloud_gradient-2{
    opacity:.35;
    isolation:isolate
}
.wi_cloud_gradient{
    fill:url(#wi_cloud_gradient)
}
.wi_cloud_gradient-2{
    fill:url(#wi_cloud_gradient-2)
}
.ww-animation-sun{
    -webkit-animation-name:ww-animation-sun;
    -moz-animation-name:ww-animation-sun;
    -o-animation-name:ww-animation-sun;
    animation-name:ww-animation-sun;
    -webkit-animation-duration:14s;
    -moz-animation-duration:14s;
    -o-animation-duration:14s;
    animation-duration:14s;
    -webkit-animation-timing-function:ease-in-out;
    -moz-animation-timing-function:ease-in-out;
    -o-animation-timing-function:ease-in-out;
    animation-timing-function:ease-in-out;
    -webkit-animation-iteration-count:infinite;
    -moz-animation-iteration-count:infinite;
    -o-animation-iteration-count:infinite;
    animation-iteration-count:infinite
}
@-webkit-keyframes ww-animation-sun{
    0%{
        -webkit-transform:rotate(0deg);
        transform:rotate(0deg)
    }
    100%{
        -webkit-transform:rotate(360deg);
        transform:rotate(360deg)
    }
}
@-moz-keyframes ww-animation-sun{
    0%{
        -moz-transform:rotate(0deg);
        transform:rotate(0deg)
    }
    100%{
        -moz-transform:rotate(360deg);
        transform:rotate(360deg)
    }
}
@-o-keyframes ww-animation-sun{
    0%{
        -o-transform:rotate(0deg);
        transform:rotate(0deg)
    }
    100%{
        -o-transform:rotate(360deg);
        transform:rotate(360deg)
    }
}
@keyframes ww-animation-sun{
    0%{
        -webkit-transform:rotate(0deg);
        -moz-transform:rotate(0deg);
        -o-transform:rotate(0deg);
        transform:rotate(0deg)
    }
    100%{
        -webkit-transform:rotate(360deg);
        -moz-transform:rotate(360deg);
        -o-transform:rotate(360deg);
        transform:rotate(360deg)
    }
}
.ww-animation-sunshine{
    -webkit-animation-name:ww-animation-sunshine;
    -moz-animation-name:ww-animation-sunshine;
    -o-animation-name:ww-animation-sunshine;
    animation-name:ww-animation-sunshine;
    -webkit-animation-duration:3s;
    -moz-animation-duration:3s;
    -o-animation-duration:3s;
    animation-duration:3s;
    -webkit-animation-timing-function:linear;
    -moz-animation-timing-function:linear;
    -o-animation-timing-function:linear;
    animation-timing-function:linear;
    -webkit-animation-iteration-count:infinite;
    -moz-animation-iteration-count:infinite;
    -o-animation-iteration-count:infinite;
    animation-iteration-count:infinite
}
@-webkit-keyframes ww-animation-sunshine{
    0%{
        stroke-dasharray:1px 10px;
        stroke-dashoffset:0
    }
    50%{
        stroke-dasharray:6px 20px;
        stroke-dashoffset:-1px
    }
    100%{
        stroke-dasharray:1px 10px;
        stroke-dashoffset:0
    }
}
@-moz-keyframes ww-animation-sunshine{
    0%{
        stroke-dasharray:1px 10px;
        stroke-dashoffset:0
    }
    50%{
        stroke-dasharray:6px 20px;
        stroke-dashoffset:-1px
    }
    100%{
        stroke-dasharray:1px 10px;
        stroke-dashoffset:0
    }
}

</style>