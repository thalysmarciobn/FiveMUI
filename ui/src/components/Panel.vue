<script lang="ts">
import { defineComponent } from "vue";

import { usePanel } from "../stores/usePanel"

export default defineComponent({
  name: "Panel",
  setup() {
    const appPanel         = usePanel()
    
    return {
      appPanel
    }
  },
  methods: {
    open(link: string) {
      const wind = window as any
      wind.invokeNative('openUrl', link)
    }
  }
});
</script>

<template>
  <div class="back">
    <div class="flex justify-center panel">
      <div class="grid content-center">
        <div class="grid grid-cols-3 panel-gap mt-5 mb-4">
          <div class="flex-none">
            01
          </div>
          <div class="grow">
            02
          </div>
          <div class="flex-none">
            03
          </div>
        </div>
        <div class="flex justify-center extra-info mt-4 mb-4">
          <dis class="content">Acesse o nosso guia de informações e cartão postal em grupo</dis>
          <button class="btn-extra">Discord</button>
        </div>
        <div class="grid grid-cols-3 panel-gap">
          <div class="w-60 h-60 panel-grid crime-grid">
            <div class="content">
              <h1>Noite de Crimes</h1>
            </div>
            <div class="bottom mb-2 mr-2">
              <button class="button-down" @click="open('https://discord.com/channels/1073374093891608576/1085986001886908457')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.631c1.648 1.064 3.545 1.049 5.038.051l1.958 1.672c-2.851 3.671 1.004 7.384 1.004 11.011 0 2.964-2.273 4.17-4.18 4.66-1.975.507-2.887.847-3.82 1.466-.934-.619-1.846-.959-3.82-1.466-1.907-.49-4.18-1.696-4.18-4.66 0-3.635 3.859-7.336 1.004-11.011l1.959-1.673c1.475.982 3.355 1.032 5.037-.05zm5.016-2.631c-1.67 1.723-2.755 2.097-5.004.048-2.244 1.982-3.292 1.742-5.01-.03l-4.871 4.16c1.651 1.734 2.563 2.285 1.439 5.37-.843 2.309-1.57 3.991-1.57 5.817 0 3.266 2.07 5.67 5.682 6.597 2.596.666 2.989.951 4.318 2.038 1.329-1.087 1.722-1.372 4.318-2.038 3.612-.927 5.682-3.332 5.682-6.597 0-1.826-.727-3.507-1.569-5.817-1.125-3.084-.214-3.635 1.438-5.371-4.76-4.065-3.785-3.222-4.853-4.177zm-2.417 16l-2.599-1.367-2.599 1.367.494-2.895-2.102-2.049 2.906-.422 1.301-2.634 1.3 2.634 2.906.422-2.104 2.049.497 2.895z"/></svg>
                <div class="text">Horários</div>
              </button>
            </div>
            <div class="bg"></div>
          </div>
          <div class="w-60 h-60 panel-grid battlepass-grid">
            <div class="content">
              <h3>Tarefas Semanais e Mensais</h3>
              <h1>Battle Pass</h1>
              <div class="bottom mb-2 mr-2">
                <button class="button-down" @click="open('https://discord.com/channels/1073374093891608576/1085986001886908457')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.834 9.686l-4.166.575 3.032 2.914-.74 4.139 3.708-1.982 3.708 1.983-.74-4.139 3.032-2.915-4.166-.575-1.834-3.784-1.834 3.784z"/></svg>
                  <div class="text">Acessar</div>
                </button>
              </div>
            </div>
            <div class="bg"></div>
          </div>
          <div class="w-60 h-110 panel-grid row-span-3 panel-full">
            <div class="content">
              <h3>Organizações</h3>
              <h1>Sistema de Facções e Organizações</h1>
              <p>Saiba mais sobre os nossos sistemas de empregos ilegais e facções</p>
              <div class="bottom mb-5">
                <button class="button-down" @click="open('https://discord.com/channels/1073374093891608576/1085986001886908457')">
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#fff" fill-rule="evenodd" clip-rule="evenodd"><path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z"/></svg>
                  <div class="text">Saiba Mais</div>
                </button>
              </div>
            </div>
            <div class="bg"></div>
          </div>
          <div class="w-60 h-60 panel-grid race-grid">
            <div class="content">
              <h3>Corridas e Desafios em Alta Velocidade</h3>
              <h1>Corridas Ilegais</h1>
            </div>
            <div class="bottom mb-2 mr-2">
              <button class="button-down" @click="open('https://discord.com/channels/1073374093891608576/1085986001886908457')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.246 4.042c-3.36 0-3.436-2.895-7.337-2.895-2.108 0-4.075.98-4.909 1.694v-2.841h-2v24h2v-9.073c1.184-.819 2.979-1.681 4.923-1.681 3.684 0 4.201 2.754 7.484 2.754 2.122 0 3.593-1.359 3.593-1.359v-12.028s-1.621 1.429-3.754 1.429zm1.754 5.223c-2.417 1.777-5.029-.34-6.35-1.212v3.669l.003.001c-.757-.279-1.645-.477-2.73-.477-1.979 0-3.71.679-4.923 1.339v-3.79c2.26-1.972 5.545-2.233 7.65-.742v-3.803c.966.756 2.288 1.792 4.596 1.792.627 0 1.215-.086 1.754-.223v3.446z"/></svg>
                <div class="text">Locais</div>
              </button>
            </div>
            <div class="bg"></div>
          </div>
          <div class="w-60 h-60 panel-grid farm-grid">
            <div class="content">
              <h3>Seja dono do seu negócio</h3>
              <h1>Farms</h1>
            </div>
            <div class="bottom mb-2 mr-2">
              <button class="button-down" @click="open('https://discord.com/channels/1073374093891608576/1085986001886908457')">
                <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m22 17.75c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm-19.749-1.377 2.172 1.936c.144.128.324.191.502.191.204 0 .408-.082.557-.244l3.677-4.02c.131-.145.197-.326.197-.506 0-.413-.334-.751-.753-.751-.205 0-.408.082-.558.244l-3.174 3.47-1.616-1.44c-.144-.128-.323-.191-.502-.191-.418 0-.753.338-.753.751 0 .206.084.412.251.56zm15.749-2.623c0-.414-.336-.75-.75-.75h-5.5c-.414 0-.75.336-.75.75s.336.75.75.75h5.5c.414 0 .75-.336.75-.75zm-15.749-5.356 2.172 1.936c.144.128.324.191.502.191.204 0 .408-.082.557-.244l3.677-4.02c.131-.144.197-.326.197-.506 0-.412-.334-.751-.753-.751-.205 0-.408.082-.558.244l-3.174 3.471-1.616-1.44c-.144-.128-.323-.192-.502-.192-.418 0-.753.338-.753.752 0 .206.084.411.251.559zm17.749 1.356c0-.414-.336-.75-.75-.75h-7.5c-.414 0-.75.336-.75.75s.336.75.75.75h7.5c.414 0 .75-.336.75-.75zm2-4c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75z" fill-rule="nonzero"/></svg>
                <div class="text">Negócios</div>
              </button>
            </div>
            <div class="bg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back {
  position: relative;
  z-index: 5;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
}

.extra-info {
  background-image: linear-gradient(90deg,#da499b,#ff7663 50%,#ffb35c);
  border-radius: 3px;
  padding: 0.5rem 1rem;
  gap: 1rem 0.75rem;
}

.extra-info .content {
  color: #000000;
}

.extra-info .btn-extra {
  border: 1px solid #000;
  font-weight: 500;
  padding: 0 0.5rem;
}

.panel {
  height: 100%;
}

.panel-gap {
  gap: 1rem 0.75rem;
}

.panel-full {
  height: calc(100% - 1rem);
}

.panel-grid {
  position: relative;
  background: rgb(255 255 255 / 10%);
  border-radius: 3px;
}

.panel-grid .content {
  height: 100%;
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 3px;
  padding: 0.5rem;
  z-index: 1;
}
.panel-grid .content h1 {
  position: relative;
  color: #ffffff;
  text-transform: uppercase;
  z-index: 3;
}

.panel-grid .content h3 {
  position: relative;
  font-size: 9pt;
  font-weight: 300;
  color: #ffffff;
  text-transform: uppercase;
  z-index: 3;
}

.panel-grid .bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
  right: 0;
  z-index: 3;
}

.panel-full .button-down {
  position: relative!important;
  border: 1px solid #bbbbbb!important;
  color: #ffffff!important;
  margin: 0 auto;
  bottom: 0;
}

.panel-grid .button-down {
  position: absolute;
  border: 1px solid #282828;
  color: #000;
  bottom: 0;
  right: 0;
}

.crime-grid .button-down {
  background-image: linear-gradient(90deg,#ff7ebc,#ff3697);
}

.battlepass-grid .button-down {
  background-image: linear-gradient(90deg,#fff383,#dacd58);
}

.farm-grid .button-down {
  background-image: linear-gradient(90deg,#9cdebf,#4eeba1);
}

.race-grid .button-down {
  background-image: linear-gradient(90deg,#8e51d7,#432aa2);
}

.panel-full .button-down {
  padding: 0.45rem 1rem!important;
}

.panel-grid .button-down {
  padding: 0.25rem 0.75rem;
}

.panel-grid .button-down,
.panel-full .button-down {
  display: flex;
  font-size: 8pt;
  text-transform: uppercase;
}

.panel-full .button-down svg {
  padding: 0!important;
}

.panel-grid .button-down svg {
  margin-right: 0.3rem;
  padding: 0.25rem;
}

.panel-grid .button-down .text {
  padding: 0.25rem;
  font-weight: 500;
}

.panel-full .content {
  padding: 1.25rem 0.5rem!important;
}

.panel-full .bg {
  position: absolute;
  background: url(/src/assets/crew/panel.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 100%;
  width: 100%;
  bottom: 0;
  z-index: 2;
}

.battlepass-grid .bg {
  position: absolute;
  background: url(/src/assets/crew/battlepass.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 100%;
  width: 100%;
  bottom: 0;
  z-index: 2;
}

.farm-grid .bg {
  position: absolute;
  background: url(/src/assets/crew/farm.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 100%;
  width: 100%;
  bottom: 0;
  z-index: 2;
}

.crime-grid .bg {
  position: absolute;
  background: url(/src/assets/crew/crime.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 100%;
  width: 100%;
  bottom: 0;
  z-index: 2;
}

.race-grid .bg {
  position: absolute;
  background: url(/src/assets/crew/race.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 100%;
  width: 100%;
  bottom: 0;
  z-index: 2;
}

.panel-full h1 {
  font-weight: 500;
  text-align: center;
}

.panel-full h3 {
  text-align: center;
  font-size: 11pt;
  font-weight: 300;
}

.panel-full p {
  color: #d5d5d5;
  text-align: justify;
  text-align-last: center;
  font-size: 10pt;
  padding: 0.75rem;
}
</style>