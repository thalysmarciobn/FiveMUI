<script lang="ts">
import { defineComponent } from "vue";
import { CreationComponent } from '../components/creation/CreationComponent'

import { useNotification } from "@kyvg/vue3-notification"

import fetchNui from "../utils/cfx"
import { useApp } from "../stores/useApp"
import { makeupColors, hairColors, eyeColors, maxOverlay, bestTorso, undershirtListByTop } from "../utils/helpers"

const notification = useNotification()

export default defineComponent({
  name: "Creation",
  setup() {
    const blockActions: boolean = false
    const store       = useApp()

    const maxHair = { male: 73, female: 77 }

    const hairList = {
      m: [0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73],
      f: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76]
    }

    const torso2List = {
      m: [0, 1, 13, 16, 26, 34, 38, 41, 42, 43, 44, 47, 50, 53, 61, 63, 65, 71, 80, 81, 82, 85, 89, 90, 95, 97, 111, 117, 123, 126, 133, 168, 182, 224, 226, 250],
      f: [1, 2, 3, 5, 9, 13, 14, 16, 27, 33, 38, 40, 49, 55, 73, 74, 78, 79, 80, 105, 109, 117, 118, 126, 141, 170, 171, 172, 173, 234, 236, 250, 258, 262, 280, 281]
    }

    const legsList = {
      m: [0, 1, 4, 7, 8, 9, 10, 13, 20, 24, 25, 26, 28, 30, 35, 38, 39, 45, 58, 63, 71, 73, 75, 76, 78, 79, 83, 90, 96, 105, 122, 126],
      f: [0, 1, 3, 4, 6, 7, 8, 11, 12, 18, 23, 27, 30, 31, 34, 36, 37, 38, 39, 43, 44, 47, 49, 50, 52, 60, 73, 74, 75, 76, 77, 78]
    }

    const shoesList = {
      m: [1, 3, 4, 7, 8, 9, 10, 14, 15, 20, 21, 22, 24, 25, 26, 27, 28, 29, 32, 35, 42, 48, 49, 97],
      f: [0, 1, 3, 4, 6, 7, 8, 13, 14, 15, 16, 18, 23, 24, 25, 26, 27, 28, 29, 30, 42, 49, 55, 77]
    }

    return {
      blockActions,
      makeupColors,
      hairColors,
      eyeColors,
      maxHair,
      maxOverlay,
      CreationComponent,
      hairList,
      torso2List,
      legsList,
      shoesList,
      store
    };
  },
  data() {
    const currentComponent: number = CreationComponent.Identity

    const charName: string = ''
    const charLastName: string = ''
    const charAge: number = 18

    return { currentComponent, charName, charLastName, charAge }
  },
  methods: {
    delay: (ms: number) => new Promise(res => {
        setTimeout(res, ms)
    }),
    notifyMessage: (type: string, duration: number, text: string) => {
      notification.notify({
        duration: duration,
        type: type,
        text: text
      })
    },
    upperCaseName(model: string) {
      this.charName = model.charAt(0).toUpperCase() + model.slice(1)
    },
    upperCaseLastName(model: string) {
      this.charLastName = model.charAt(0).toUpperCase() + model.slice(1)
    },
    numbersOnly(evt: any) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },
    async onRegister() {
      if (this.charAge < 18) {
        this.notifyMessage('warning', 3000, 'Não aceitamos menores de 18 anos.')
        return
      }
      if (this.charName == '' || this.charLastName == '') {
        this.notifyMessage('danger', 3000, 'Você deve preencher um nome e um sobrenome.')
        return
      }
      await fetchNui('registerCharacter', { name: this.charName,
        lastName: this.charLastName,
        age: this.charAge,
        slot: this.store.charSlot,
        appearance: this.store.pedAppearance
      }).then((data) => {
        if (data.status === 0) {
          fetchNui('characterRequest', this.store.charSlot)
        }
      }).finally(async () => {
        await this.delay(1500)
        this.blockActions = false
      })
    },
    isActive(valueOne: any, valueTwo: any): boolean {
      return valueOne === valueTwo
    },
    onChange(model: string): void {
      fetchNui('changeModel', model).finally(() => {
        this.store.resetAppearance(model)
        this.setPedHeadBlend()
        this.setPedFaceFeatures()
        this.setPedComponentVariation()
        this.setPedProps()
        this.sendPedHairColor()
      })
    },
    setPedHeadBlend(): void {
      fetchNui('setPedHeadBlend', this.store.pedAppearance.headBlend)
    },
    getMaxOverlay(overlay: number): number {
      switch (overlay) {
        default:
        case 0:
          return this.maxOverlay.blemishes
        case 1:
          return this.maxOverlay.facialHair
        case 2:
          return this.maxOverlay.eyeBrows
        case 3:
          return this.maxOverlay.ageing
        case 4:
          return this.maxOverlay.makeup
        case 5:
          return this.maxOverlay.blush
        case 6:
          return this.maxOverlay.complexion
        case 7:
          return this.maxOverlay.sunDamage
        case 8:
          return this.maxOverlay.lipstick
        case 9:
          return this.maxOverlay.molesFreckles
        case 10:
          return this.maxOverlay.chestHair
        case 11:
          return this.maxOverlay.bodyBlemishes
        case 12:
          return this.maxOverlay.addNodyBlemishes
      }
    },
    getMaxHair(): number {
      if (this.store.pedAppearance.model === 'mp_m_freemode_01')
        return this.maxHair.male
      else if (this.store.pedAppearance.model === 'mp_f_freemode_01')
        return this.maxHair.female
      return 0
    },
    setPedHead(): void {
      fetchNui('setPedHeadOverlay', this.store.pedAppearance.headOverlays)
      fetchNui('setPedHeadOverlayColor', this.store.pedAppearance.headOverlayColors)
    },
    setPedHeadOverlayColorByIndex(index: number, color: number, secondColor: number) {
      const data = this.store.getHeadOverlayColor(index)
      data.colorId = color
      data.secondColorId = secondColor
      this.setPedHead()
    },
    onNextPedHeadOverlay(index: number) {
      const max = this.getMaxOverlay(index)
      const data = this.store.getHeadOverlay(index)
      if (data.index >= max) return
      data.index++
      this.setPedHead()
    },
    onPreviousPedHeadOverlay(index: number) {
      const data = this.store.getHeadOverlay(index)
      if (data.index <= 0) return
      data.index--
      this.setPedHead()
    },
    setPedFaceFeatures(): void {
      fetchNui('setPedFaceFeatures', this.store.pedAppearance.faceFeatures)
    },
    setPedProps(): void {
      fetchNui('setPedProps', this.store.pedAppearance.props)
    },
    changeDrawableComponentVariation(index: number, drawableId: number): void {
      const component: PedComponentVariation = this.store.getComponent(index)
      component.drawableId = drawableId
      
      if (index === 11) {
        const appearance = this.store.pedAppearance

        const torso: PedComponentVariation = appearance.components.torso
        const undershirt: PedComponentVariation = appearance.components.undershirt

        const bestTorsoData = bestTorso(appearance.model, drawableId, 0)

        const undershirtList = undershirtListByTop(appearance.model, drawableId)
        
        undershirt.drawableId = undershirtList[0]
        undershirt.palleteId = 0
        undershirt.textureId = 0
        
        if (bestTorsoData?.bestTorsoDrawable !== torso.drawableId) {
          torso.drawableId = bestTorsoData?.bestTorsoDrawable as number
        }
      }

      this.setPedComponentVariation()
    },
    changePalletComponentVariation(index: number, palletId: number): void {
      const component: PedComponentVariation = this.store.getComponent(index)
      component.palleteId = palletId
      this.setPedComponentVariation()
    },
    sendPedHairColor(): void {
      fetchNui('setPedHairColor', this.store.pedAppearance.hair)
    },
    setPedHairColor(color: number): void {
      this.store.pedAppearance.hair.color = color
      this.sendPedHairColor()
    },
    setPedHairHighlight(color: number): void {
      this.store.pedAppearance.hair.highlight = color
      this.sendPedHairColor()
    },
    setPedComponentVariation(): void {
      fetchNui('setPedComponentVariation', this.store.pedAppearance.components)
    },
    async setEyeColor(eye: ColorData): Promise<void> {
      this.store.pedAppearance.eyeColor = eye.value
      await fetchNui('setPedEyeColor', eye.value)
    },
    onPreviousShapeFirst(): void {
      if (this.store.pedAppearance.headBlend.shapeFirst == 0) return
      this.store.pedAppearance.headBlend.shapeFirst--
      this.setPedHeadBlend()
    },
    onNextShapeFirst(): void {
      if (this.store.pedAppearance.headBlend.shapeFirst >= 45) return
      this.store.pedAppearance.headBlend.shapeFirst++
      this.setPedHeadBlend()
    },
    onPreviousShapeSecond(): void {
      if (this.store.pedAppearance.headBlend.shapeSecond == 0) return
      this.store.pedAppearance.headBlend.shapeSecond--
      this.setPedHeadBlend()
    },
    onNextShapeSecond(): void {
      if (this.store.pedAppearance.headBlend.shapeSecond >= 45) return
      this.store.pedAppearance.headBlend.shapeSecond++
      this.setPedHeadBlend()
    },
    onPreviousSkinFirst(): void {
      if (this.store.pedAppearance.headBlend.skinFirst == 0) return
      this.store.pedAppearance.headBlend.skinFirst--
      this.setPedHeadBlend()
    },
    onNextSkinFirst(): void {
      if (this.store.pedAppearance.headBlend.skinFirst >= 45) return
      this.store.pedAppearance.headBlend.skinFirst++
      this.setPedHeadBlend()
    },
    onPreviousSkinSecond(): void {
      if (this.store.pedAppearance.headBlend.skinSecond == 0) return
      this.store.pedAppearance.headBlend.skinSecond--
      this.setPedHeadBlend()
    },
    onNextSkinSecond(): void {
      if (this.store.pedAppearance.headBlend.skinSecond >= 45) return
      this.store.pedAppearance.headBlend.skinSecond++
      this.setPedHeadBlend()
    },
    onPrevious(): void {
      if (this.blockActions) return
      if (this.currentComponent === 0) return
      this.blockActions = true
      this.currentComponent--
      this.setCamera(this.currentComponent)
    },
    onNext(): void {
      if (this.blockActions) return
      if (this.currentComponent >= (Object.keys(CreationComponent).length / 2) - 1) return
      this.blockActions = true
      this.currentComponent++
      this.setCamera(this.currentComponent)
    },
    async setCamera(current: number): Promise<void> {
      if (current === CreationComponent.Identity)
        await fetchNui('setCamera', 'entity').finally(async () => {
          await this.delay(1500)
          this.blockActions = false
        })
      else if (current === CreationComponent.Face)
        await fetchNui('setCamera', 'face').finally(async () => {
          await this.delay(1500)
          this.blockActions = false
        })
      else if (current === CreationComponent.Style)
        await fetchNui('setCamera', 'hair').finally(async () => {
          await this.delay(1500)
          this.blockActions = false
        })
      else if (current === CreationComponent.Apparel)
        await fetchNui('setCamera', 'apparel').finally(async () => {
          await this.delay(1500)
          this.blockActions = false
        })
      else if (current === CreationComponent.Shoes)
        await fetchNui('setCamera', 'shoes').finally(async () => {
          await this.delay(1500)
          this.blockActions = false
        })
      else if (current === CreationComponent.Register)
        await fetchNui('setCamera', 'entity').finally(async () => {
          await this.delay(1500)
          this.blockActions = false
        })
    }
  }
});
</script>

<template>
  <div class="creation">
    <header>
      <div class="icon"><i class="fa-solid fa-highlighter"></i></div>
      <div class="text">
        <small>criação de</small>
        <span>Personagem</span>
      </div>
    </header>
    <div class="back flex">
      <template v-if="currentComponent !== CreationComponent.Register">
        <div class="sideSteps">
          <div v-bind:class = "(currentComponent == 0) ? 'step step-active':'step'">
            <div>
                <div class="circle">
                  <img src="../assets/icons/identity.svg">
                </div>
            </div>
          </div>
          <div v-bind:class = "(currentComponent == 1) ? 'step step-active':'step'">
            <div>
                <div class="circle">
                  <img src="../assets/icons/face.svg">
                </div>
            </div>
          </div>
          <div v-bind:class = "(currentComponent == 2) ? 'step step-active':'step'">
            <div>
                <div class="circle">
                  <img src="../assets/icons/style.svg">
                </div>
            </div>
          </div>
          <div v-bind:class = "(currentComponent == 3) ? 'step step-active':'step'">
            <div>
                <div class="circle">
                  <img src="../assets/icons/apparel.svg">
                </div>
            </div>
          </div>
          <div v-bind:class = "(currentComponent == 4) ? 'step step-active':'step'">
            <div>
                <div class="circle">
                  <img src="../assets/icons/legs.svg">
                </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="right">
      <template v-if="currentComponent === CreationComponent.Identity">
        <div class="register">
          <div class="column mr-5">
            <ul class="radioGender" id="sex">
              <li class="radioitem">
                <input type="radio" class="bt" name="sex" id="male" @change="onChange('mp_m_freemode_01')" :checked="store.pedAppearance.model === 'mp_m_freemode_01'"/>
                <label for="male">
                  <img src="../assets/icons/symbol-male.svg">
                </label>
              </li>
              <li class="radioitem">
                <input type="radio" class="bt" name="sex" id="female" @change="onChange('mp_f_freemode_01')" :checked="store.pedAppearance.model === 'mp_f_freemode_01'"/>
                <label for="female">
                  <img src="../assets/icons/symbol-female.svg">
                </label>
              </li>
            </ul>
            <div class="">
              <h2 class="mt-3">Rosto</h2>
              <div class="selector">
                <div class="label">Feições do Pai</div>
                <div class="items mt-2 mb-2">
                  <button class="py-2 px-4 rounded-l" @click="onPreviousShapeFirst">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
                  </button>
                  <div class="content">#{{ store.pedAppearance.headBlend.shapeFirst }}</div>
                  <button class="py-2 px-4 rounded-r" @click="onNextShapeFirst">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
                  </button>
                </div>
              </div>
              <div class="selector">
                <div class="label">Feições da Mãe</div>
                <div class="items mt-2 mb-2">
                  <button class="py-2 px-4 rounded-l" @click="onPreviousShapeSecond">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
                  </button>
                  <div class="content">#{{ store.pedAppearance.headBlend.shapeSecond }}</div>
                  <button class="py-2 px-4 rounded-r" @click="onNextShapeSecond">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
                  </button>
                </div>
              </div>
              <div class="selector">
                <div class="label">Mixenação</div>
                <input class="range" type="range" min="0" max="1" step="0.1" v-model="store.pedAppearance.headBlend.shapeMix" @input="setPedHeadBlend" > 
              </div>
            </div>
            <div class="">
              <h2 class="mt-3">Pele</h2>
              <div class="selector">
                <div class="label">Característica do Pai</div>
                <div class="items mt-2 mb-2">
                  <button class="py-2 px-4 rounded-l" @click="onPreviousSkinFirst">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
                  </button>
                  <div class="content">#{{ store.pedAppearance.headBlend.skinFirst }}</div>
                  <button class="py-2 px-4 rounded-r" @click="onNextSkinFirst">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
                  </button>
                </div>
              </div>
              <div class="selector">
                <div class="label">Característica da Mãe</div>
                <div class="items mt-2 mb-2">
                  <button class="py-2 px-4 rounded-l" @click="onPreviousSkinSecond">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
                  </button>
                  <div class="content">#{{ store.pedAppearance.headBlend.skinSecond }}</div>
                  <button class="py-2 px-4 rounded-r" @click="onNextSkinSecond">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
                  </button>
                </div>
              </div>
              <div class="selector">
                <div class="label">Mixenação</div>
                <input class="range" type="range" min="0" max="1" step="0.1" v-model="store.pedAppearance.headBlend.skinMix" @input="setPedHeadBlend" > 
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="currentComponent === CreationComponent.Face">
        <div class="register_r overflow-y-scroll">
          <div class="column mr-5">
            <div>
              <h2 class="mt-3">Olhos</h2>
              <div class="selector">
                <div class="label">eyeBrownHeight</div>
                <input v-model="store.pedAppearance.faceFeatures.eyeBrownHeight" class="range" type="range" min="-2" max="2" step="0.1" @input="setPedFaceFeatures" > 
              </div>
              <div class="selector">
                <div class="label">eyeBrownForward</div>
                <input v-model="store.pedAppearance.faceFeatures.eyeBrownForward" class="range" type="range" min="-2" max="2" step="0.1" @input="setPedFaceFeatures" > 
              </div>
              <div class="selector">
                <div class="label">Abertura dos Olhos</div>
                <input v-model="store.pedAppearance.faceFeatures.eyesOpening" class="range" type="range" min="-2" max="2" step="0.1" @input="setPedFaceFeatures" > 
              </div>
              <div class="grid grid-cols-4 gap-2 mb-1">
                <template v-for="item in eyeColors">
                  <div class="color" v-bind:class="{ active: isActive(store.pedAppearance.eyeColor, item.value) }" @click="setEyeColor(item)" :style="{backgroundColor: item.color}"></div>
                </template>
              </div>
            </div>
            <div>
              <h2 class="mt-3">Nariz</h2>
              <div class="selector">
                <div class="label">Largura</div>
                <input class="range" type="range" min="-2" max="2" step="0.1" v-model="store.pedAppearance.faceFeatures.noseWidth" @input="setPedFaceFeatures" > 
              </div>
              <div class="selector">
                <div class="label">Altura da Cartilagem</div>
                <input class="range" type="range" min="-2" max="2" step="0.1" v-model="store.pedAppearance.faceFeatures.nosePeakHeight" @input="setPedFaceFeatures" > 
              </div>
              <div class="selector">
                <div class="label">Tamanho da Cartilagem</div>
                <input class="range" type="range" min="-2" max="2" step="0.1" v-model="store.pedAppearance.faceFeatures.nosePeakSize" @input="setPedFaceFeatures" > 
              </div>
              <div class="selector">
                <div class="label">Altura do Osso</div>
                <input class="range" type="range" min="-2" max="2" step="0.1" v-model="store.pedAppearance.faceFeatures.noseBoneHeight" @input="setPedFaceFeatures" > 
              </div>
              <div class="selector">
                <div class="label">Parte de Baixo</div>
                <input class="range" type="range" min="-2" max="2" step="0.1" v-model="store.pedAppearance.faceFeatures.nosePeakLowering" @input="setPedFaceFeatures" > 
              </div>
              <div class="selector">
                <div class="label">Torção do Osso</div>
                <input class="range" type="range" min="-2" max="2" step="0.1" v-model="store.pedAppearance.faceFeatures.noseBoneTwist" @input="setPedFaceFeatures" > 
              </div>
            </div>
            <div>
              <h2 class="mt-3">Lábios</h2>
              <div class="selector">
                <div class="label">Espessura dos Lábios</div>
                <input v-model="store.pedAppearance.faceFeatures.lipsThickness" class="range" type="range" min="-2" max="2" step="0.1" @input="setPedFaceFeatures" > 
              </div>
              
              <div class="selector">
                <div class="label">Batom</div>
                <div class="items mt-2 mb-2">
                  <button class="py-2 px-4 rounded-l" @click="onPreviousPedHeadOverlay(8)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
                  </button>
                  <div class="content">#{{ store.getHeadOverlay(8).index }}</div>
                  <button class="py-2 px-4 rounded-r" @click="onNextPedHeadOverlay(8)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-7 gap-2 mb-1">
                <template v-for="item in makeupColors">
                  <div class="color" v-bind:class="{ active: isActive(store.getHeadOverlayColor(8).colorId, item.value) }" v-bind:style="{ backgroundColor: `rgb(${item.color[0]}, ${item.color[1]}, ${item.color[2]})` }" @click="setPedHeadOverlayColorByIndex(8, item.value, item.value)"></div>
                </template>
              </div>
              <div class="selector">
                <div class="label">Transparência</div>
                <input class="range" type="range" min="0" max="1" step="0.1" v-model="store.pedAppearance.headOverlays.lipstick.opacity" @input="setPedHead()" > 
              </div>
            </div>
            <div>
              <h2 class="mt-3">Bochechas</h2>
              <div class="selector">
                <div class="label">cheeksBoneHeight</div>
                <input v-model="store.pedAppearance.faceFeatures.cheeksBoneHeight" class="range" type="range" min="-2" max="2" step="0.1" @input="setPedFaceFeatures" > 
              </div>
              <div class="selector">
                <div class="label">cheeksBoneWidth</div>
                <input v-model="store.pedAppearance.faceFeatures.cheeksBoneWidth" class="range" type="range" min="-2" max="2" step="0.1" @input="setPedFaceFeatures" > 
              </div>
              <div class="selector">
                <div class="label">cheeksWidth</div>
                <input v-model="store.pedAppearance.faceFeatures.cheeksWidth" class="range" type="range" min="-2" max="2" step="0.1" @input="setPedFaceFeatures" > 
              </div>
              
              <div class="selector">
                <div class="label">Maquiagem</div>
                <div class="items mt-2 mb-2">
                  <button class="py-2 px-4 rounded-l" @click="onPreviousPedHeadOverlay(4)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
                  </button>
                  <div class="content">#{{ store.getHeadOverlay(4).index }}</div>
                  <button class="py-2 px-4 rounded-r" @click="onNextPedHeadOverlay(4)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
                  </button>
                </div>
              </div>
              <div class="selector">
                <div class="label">Transparência</div>
                <input class="range" type="range" min="0" max="1" step="0.1" v-model="store.pedAppearance.headOverlays.makeUp.opacity" @input="setPedHead()" > 
              </div>
            </div>
            <div>
              <h2 class="mt-3">Mandíbula</h2>
              <div class="selector">
                <div class="label">jawBoneWidth</div>
                <input v-model="store.pedAppearance.faceFeatures.jawBoneWidth" class="range" type="range" min="-2" max="2" step="0.1" @input="setPedFaceFeatures" > 
              </div>
              <div class="selector">
                <div class="label">jawBoneBackSize</div>
                <input v-model="store.pedAppearance.faceFeatures.jawBoneBackSize" class="range" type="range" min="-2" max="2" step="0.1" @input="setPedFaceFeatures" > 
              </div>
            </div>
            <div>
              <h2 class="mt-3">Queixo</h2>
              <div class="selector">
                <div class="label">chinBoneLowering</div>
                <input v-model="store.pedAppearance.faceFeatures.chinBoneLowering" class="range" type="range" min="-2" max="2" step="0.1" @input="setPedFaceFeatures" > 
              </div>
              <div class="selector">
                <div class="label">chinBoneLenght</div>
                <input v-model="store.pedAppearance.faceFeatures.chinBoneLenght" class="range" type="range" min="-2" max="2" step="0.1" @input="setPedFaceFeatures" > 
              </div>
              <div class="selector">
                <div class="label">chinBoneSize</div>
                <input v-model="store.pedAppearance.faceFeatures.chinBoneSize" class="range" type="range" min="-2" max="2" step="0.1" @input="setPedFaceFeatures" > 
              </div>
              <div class="selector">
                <div class="label">chinHole</div>
                <input v-model="store.pedAppearance.faceFeatures.chinHole" class="range" type="range" min="-2" max="2" step="0.1" @input="setPedFaceFeatures" > 
              </div>
            </div>
            <div>
              <h2 class="mt-3">Aspecto</h2>
              <div class="selector">
                <div class="label">Marca</div>
                <div class="items mt-2 mb-2">
                  <button class="py-2 px-4 rounded-l" @click="onPreviousPedHeadOverlay(5)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
                  </button>
                  <div class="content">#{{ store.getHeadOverlay(5).index }}</div>
                  <button class="py-2 px-4 rounded-r" @click="onNextPedHeadOverlay(5)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-7 gap-2 mb-1">
                <template v-for="item in makeupColors">
                  <div class="color" v-bind:class="{ active: isActive(store.getHeadOverlayColor(5).colorId, item.value) }" v-bind:style="{ backgroundColor: `rgb(${item.color[0]}, ${item.color[1]}, ${item.color[2]})` }" @click="setPedHeadOverlayColorByIndex(5, item.value, item.value)"></div>
                </template>
              </div>
              <div class="selector">
                <div class="label">Transparência</div>
                <input class="range" type="range" min="0" max="1" step="0.1" v-model="store.pedAppearance.headOverlays.blush.opacity" @input="setPedHead()" > 
              </div>
            </div>
            <div>
              <h2 class="mt-3">Sardas</h2>
              <div class="selector">
                <div class="items mt-2 mb-2">
                  <button class="py-2 px-4 rounded-l" @click="onPreviousPedHeadOverlay(9)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
                  </button>
                  <div class="content">#{{ store.getHeadOverlay(9).index }}</div>
                  <button class="py-2 px-4 rounded-r" @click="onNextPedHeadOverlay(9)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
                  </button>
                </div>
              </div>
              <div class="selector">
                <div class="label">Transparência</div>
                <input class="range" type="range" min="0" max="1" step="0.1" v-model="store.pedAppearance.headOverlays.moleAndFreckles.opacity" @input="setPedHead()" > 
              </div>
            </div>
            <div>
              <h2 class="mt-3">Envelhecimento</h2>
              <div class="selector">
                <div class="items mt-2 mb-2">
                  <button class="py-2 px-4 rounded-l" @click="onPreviousPedHeadOverlay(3)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
                  </button>
                  <div class="content">#{{ store.getHeadOverlay(3).index }}</div>
                  <button class="py-2 px-4 rounded-r" @click="onNextPedHeadOverlay(3)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
                  </button>
                </div>
              </div>
              <div class="selector">
                <div class="label">Transparência</div>
                <input class="range" type="range" min="0" max="1" step="0.1" v-model="store.pedAppearance.headOverlays.ageing.opacity" @input="setPedHead()" > 
              </div>
            </div>
            <div>
              <h2 class="mt-3">Manchas</h2>
              <div class="selector">
                <div class="items mt-2 mb-2">
                  <button class="py-2 px-4 rounded-l" @click="onPreviousPedHeadOverlay(0)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
                  </button>
                  <div class="content">#{{ store.getHeadOverlay(0).index }}</div>
                  <button class="py-2 px-4 rounded-r" @click="onNextPedHeadOverlay(0)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
                  </button>
                </div>
              </div>
              <div class="selector">
                <div class="label">Transparência</div>
                <input class="range" type="range" min="0" max="1" step="0.1" v-model="store.pedAppearance.headOverlays.blemishes.opacity" @input="setPedHead()" > 
              </div>
            </div>
            <div>
              <h2 class="mt-3">Dano do Sol</h2>
              <div class="selector">
                <div class="items mt-2 mb-2">
                  <button class="py-2 px-4 rounded-l" @click="onPreviousPedHeadOverlay(7)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
                  </button>
                  <div class="content">#{{ store.getHeadOverlay(7).index }}</div>
                  <button class="py-2 px-4 rounded-r" @click="onNextPedHeadOverlay(7)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
                  </button>
                </div>
              </div>
              <div class="selector">
                <div class="label">Transparência</div>
                <input class="range" type="range" min="0" max="1" step="0.1" v-model="store.pedAppearance.headOverlays.sunDamage.opacity" @input="setPedHead()" > 
              </div>
            </div>
            <div>
              <h2 class="mt-3">Pescoço</h2>
              <div class="selector">
                <div class="label">Espessura do Pescoço</div>
                <input v-model="store.pedAppearance.faceFeatures.neckThickness" class="range" type="range" min="-2" max="2" step="0.1" @input="setPedFaceFeatures" > 
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="currentComponent === CreationComponent.Style">
        <div class="register_r overflow-y-scroll">
          <div class="column mr-5">
            <div>
              <h2 class="mt-3">Sobrancelhas</h2>
              <div class="selector">
                <div class="label">Desenho</div>
                <div class="items mt-2 mb-2">
                  <button class="py-2 px-4 rounded-l" @click="onPreviousPedHeadOverlay(2)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
                  </button>
                  <div class="content">#{{ store.getHeadOverlay(2).index }}</div>
                  <button class="py-2 px-4 rounded-r" @click="onNextPedHeadOverlay(2)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-7 gap-2 mb-1">
                <template v-for="item in hairColors">
                  <div class="color" v-bind:class="{ active: isActive(store.getHeadOverlayColor(2).colorId, item.value) }" v-bind:style="{ backgroundColor: `rgb(${item.color[0]}, ${item.color[1]}, ${item.color[2]})` }" @click="setPedHeadOverlayColorByIndex(2, item.value, item.value)"></div>
                </template>
              </div>
              <div class="selector">
                <div class="label">Transparência</div>
                <input class="range" type="range" min="0" max="1" step="0.1" v-model="store.pedAppearance.headOverlays.eyebrows.opacity" @input="setPedHead()" > 
              </div>
            </div>
            <div>
              <h2 class="mt-3">Barba</h2>
              <div class="selector">
                <div class="label">Desenho</div>
                <div class="items mt-2 mb-2">
                  <button class="py-2 px-4 rounded-l" @click="onPreviousPedHeadOverlay(1)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
                  </button>
                  <div class="content">#{{ store.getHeadOverlay(1).index }}</div>
                  <button class="py-2 px-4 rounded-r" @click="onNextPedHeadOverlay(1)">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-32 w-32 [color]-$fill-color" style="stroke-width: var(--grid-item-icon-stroke-width); transform: scale(var(--grid-item-icon-scale));"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-7 gap-2 mb-1">
                <template v-for="item in hairColors">
                  <div class="color" v-bind:class="{ active: isActive(store.getHeadOverlayColor(1).colorId, item.value) }" v-bind:style="{ backgroundColor: `rgb(${item.color[0]}, ${item.color[1]}, ${item.color[2]})` }" @click="setPedHeadOverlayColorByIndex(1, item.value, item.value)"></div>
                </template>
              </div>
              <div class="selector">
                <div class="label">Transparência</div>
                <input class="range" type="range" min="0" max="1" step="0.1" v-model="store.pedAppearance.headOverlays.beard.opacity" @input="setPedHead()" > 
              </div>
            </div>
            
            <div>
              <h2 class="mt-3">Cabelo</h2>
              <div class="selector">
                <div class="label">Cor</div>
                <div class="grid grid-cols-7 gap-2 mb-1">
                  <template v-for="item in hairColors">
                    <div class="color" v-bind:class="{ active: isActive(store.pedAppearance.hair.color, item.value) }" v-bind:style="{ backgroundColor: `rgb(${item.color[0]}, ${item.color[1]}, ${item.color[2]})` }" @click="setPedHairColor(item.value)"></div>
                  </template>
                </div>
                <div class="label">Mechas</div>
                <div class="grid grid-cols-7 gap-2 mb-1">
                  <template v-for="item in hairColors">
                    <div class="color" v-bind:class="{ active: isActive(store.pedAppearance.hair.highlight, item.value) }" v-bind:style="{ backgroundColor: `rgb(${item.color[0]}, ${item.color[1]}, ${item.color[2]})` }" @click="setPedHairHighlight(item.value)"></div>
                  </template>
                </div>
                <div class="label">Corte</div>
                <div class="grid grid-cols-4 gap-2 mb-1">
                  <template v-if="store.pedAppearance.model === 'mp_m_freemode_01'">
                    <template v-for="index in hairList.m">
                      <div class="image" v-bind:class="{ active: isActive(store.getComponent(2).drawableId, index) }"><img :src="`./static/components/mp_m_freemode_01/hair/120px-Clothing_M_2_${index}.png`" @click="changeDrawableComponentVariation(2, index)"></div>
                    </template>
                  </template>
                  <template v-else-if="store.pedAppearance.model === 'mp_f_freemode_01'">
                    <template v-for="index in hairList.f">
                      <div class="image" v-bind:class="{ active: isActive(store.getComponent(2).drawableId, index) }"><img :src="`./static/components/mp_f_freemode_01/hair/120px-Clothing_F_2_${index}.png`" @click="changeDrawableComponentVariation(2, index)"></div>
                    </template>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="currentComponent === CreationComponent.Apparel">
        <div class="register_r overflow-y-scroll">
          <div class="column mr-5">
            <div>
              <h2 class="mt-3">Camisa</h2>
              <div class="selector">
                <div class="grid grid-cols-4 gap-2 mb-1">
                  <template v-if="store.pedAppearance.model === 'mp_m_freemode_01'">
                    <template v-for="index in torso2List.m">
                      <div class="image" v-bind:class="{ active: isActive(store.getComponent(11).drawableId, index) }" @click="changeDrawableComponentVariation(11, index)"><img :src="`./static/components/mp_m_freemode_01/shirt/83px-Clothing_M_11_${index}.jpg`"></div>
                    </template>
                  </template>
                  <template v-else-if="store.pedAppearance.model === 'mp_f_freemode_01'">
                    <template v-for="index in torso2List.f">
                      <div class="image" v-bind:class="{ active: isActive(store.getComponent(11).drawableId, index) }" @click="changeDrawableComponentVariation(11, index)"><img :src="`./static/components/mp_f_freemode_01/shirt/83px-Clothing_F_11_${index}.jpg`"></div>
                    </template>
                  </template>
                </div>
              </div>
            </div>
            <div>
              <h2 class="mt-3">Pernas</h2>
              <div class="selector">
                <div class="grid grid-cols-4 gap-2 mb-1">
                  <template v-if="store.pedAppearance.model === 'mp_m_freemode_01'">
                    <template v-for="index in legsList.m">
                      <div class="image" v-bind:class="{ active: isActive(store.getComponent(4).drawableId, index) }" @click="changeDrawableComponentVariation(4, index)"><img :src="`./static/components/mp_m_freemode_01/legs/90px-Clothing_M_4_${index}.jpg`"></div>
                    </template>
                  </template>
                  <template v-else-if="store.pedAppearance.model === 'mp_f_freemode_01'">
                    <template v-for="index in legsList.f">
                      <div class="image" v-bind:class="{ active: isActive(store.getComponent(4).drawableId, index) }" @click="changeDrawableComponentVariation(4, index)"><img :src="`./static/components/mp_f_freemode_01/legs/90px-Clothing_F_4_${index}.jpg`"></div>
                    </template>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="currentComponent === CreationComponent.Shoes">
        <div class="register_r overflow-y-scroll">
          <div class="column mr-5">
            <div>
              <h2 class="mt-3">Sapatos</h2>
              <div class="selector">
                <div class="grid grid-cols-4 gap-2 mb-1">
                  <template v-if="store.pedAppearance.model === 'mp_m_freemode_01'">
                    <template v-for="index in shoesList.m">
                      <div class="image" v-bind:class="{ active: isActive(store.getComponent(6).drawableId, index) }" @click="changeDrawableComponentVariation(6, index)"><img :src="`./static/components/mp_m_freemode_01/shoes/120px-Clothing_M_6_${index}.jpg`"></div>
                    </template>
                  </template>
                  <template v-else-if="store.pedAppearance.model === 'mp_f_freemode_01'">
                    <template v-for="index in shoesList.f">
                      <div class="image" v-bind:class="{ active: isActive(store.getComponent(6).drawableId, index) }" @click="changeDrawableComponentVariation(6, index)"><img :src="`./static/components/mp_f_freemode_01/shoes/120px-Clothing_F_6_${index}.jpg`"></div>
                    </template>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <bottom>
      <div class="content">
        <Transition name="fade">
          <div v-if="currentComponent === CreationComponent.Register">
            <div class="inputs mb-5">
              <input class="item" placeholder="Nome" v-model="charName" @input="upperCaseName(charName)">
              <input class="item" placeholder="Sobrenome" v-model="charLastName" @input="upperCaseLastName(charLastName)">
              <input class="item" placeholder="Idade" v-model="charAge" v-on:keypress="numbersOnly">
            </div>
            <div class="buttons">
              <button class="btn-success" @click="onRegister">Registrar Personagem</button>
            </div>
          </div>
        </Transition>
        <div class="buttons">
          <button class="btn-submit" :disabled="currentComponent === CreationComponent.Identity" @click="onPrevious">Voltar</button>
          <button class="btn-submit" :disabled="currentComponent === CreationComponent.Register" @click="onNext">Próximo</button>
        </div> 
      </div>
    </bottom>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

*,*:before,*:after {
  box-sizing:border-box
}

::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}

.sideSteps {
  display: contents;
}
.step {
  position:relative;
  min-height:2em;
  display: table-caption;
  color:gray
}
.step+.step {
  margin-top:0.5em
}
.step>div:first-child {
  position:static;
  height:0
}
.step>div:not(:first-child){
  margin-left:1.5em;
  padding-left:1em
}
.step.step-active{
  color:#3BC117 
}
.step.step-active .circle{
  background-color: rgb(14, 137, 214, 0.75); 
}
.circle{
  background:rgba(0, 0, 0, 0.5);
  position:relative;
  display: inline-flex;
  width:2em;
  height:2em;
  padding: 6pt;
  line-height:1.5em;
  border-radius:100%;
  color:#fff;
  text-align:center;
}

.btn-submit {
    padding: 15pt;
    margin-top: 10pt;
    font-size: 8pt;
    font-weight: 400;
    text-transform: uppercase;
    border-radius: 3pt;
    background: linear-gradient(1deg,#1a75c3 0%,#049be6 100%);
}

.btn-success {
    background: linear-gradient(205deg,#6ACF15 0%,#209B44 100%);
    padding: 15pt;
    color: #ffff;
    font-weight: 500;
    border-radius: 4pt;
}

.btn-submit:disabled {
  opacity: 0.75;
}

.creation {
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.35), rgb(0 0 0 / 0%), rgba(0, 0, 0, 0)), linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  box-shadow: inset 0px 0px 75px 15px rgba(26,117,195,0.15);
}

.creation .back {
  width: 100%;
  height: 100%;
  display: flex;
  padding-left: 25pt;
  flex-direction: column;
  justify-content: center;
  color: #fff;
}

.creation header {
  color: #fff;
  position: absolute;
  padding-top: 20pt;
  padding-left: 25pt;
  font-family: 'Arial';
  text-transform: uppercase;
}

.creation bottom {
  position: absolute;
  display: inline-flex;
  bottom: 0;
  width: 100%;
  z-index: 10;
}

.creation bottom .content {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20pt;
}

.creation bottom .buttons {
  color: #ffffff;
}

.creation bottom .buttons button:first-child {
  margin-right: 5pt;
}

.creation bottom .buttons button.btn-submit {
  width: 125pt;
}

.creation bottom .buttons button.btn-success {
  width: 100%;
}

.creation bottom .inputs {
    display: grid;
}

.creation bottom .inputs .item {
  background: #111212;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 3pt;
  padding: 10pt;
  font-size: 9pt;
}

.creation bottom .inputs .item:not(:last-child) {
  margin-bottom: 6pt;
}

.creation header .text {
    display: flex;
    font-size: 12pt;
    letter-spacing: 2pt;
    flex-direction: column;
}

.creation header .text small {
  color: #63f2ff;
}

.creation header .text span {
    font-size: 22pt;
    font-weight: bold;
    color: #ededf3;
}

.creation .right {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  z-index: 99;
  color: #fff;
}

.creation .right .register {
  width: 100%;
  height: 100%;
  padding-left: 25pt;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.creation .right .register_r {
  width: 100%;
  height: 100%;
}

.creation .column {
  width: 160pt;
}

.creation .color {
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 8pt;
}

.creation .active {
  border: 1px solid #ffffff!important;
}

.creation .image {
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.creation .column2 {
  display: flex;
    flex-direction: column;
  justify-content: right;
  right: 35pt;
}

.creation .selector {
  width: 100%;
}

.creation .selector .label {
  font-size: 8pt;
  padding: 0;
}

.creation .selector .range {
    background: #111212;
    border: 1px solid #ebebeb!important;
    border-radius: 0;
    padding: 0 4pt;
    --range-shdw: none;
    height: 2.1rem;
}

.creation .selector .items {
  display: inline-flex;
  border: 1px solid #ebebeb!important;
  background: #111212;
  padding: 0.25rem;
  width: 100%;
}

.creation .selector .items .content {
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;
  display: flex;
}

.creation .selector .items button {
  background: #191a1b;
  border-radius: 0;
}

.creation .selector .items button:hover {
  background: #252525;
}

.creation .selector .items button svg {
  width: 20pt;
  height: 20pt;
}

.creation .radioGender {
  display: flex;
}

.creation .radioGender .radioitem {
  width: 100%;
}

.creation .radioGender .radioitem:first-child {
  padding-right: 5pt; 
}

.creation .radioGender .radioitem input {
  appearance: none;
  display: none;
}

.creation .radioGender .radioitem label {
    cursor: pointer;
    display: flex;
    height: 100%;
    background: #151617;
    border: 1px solid rgba(0, 0, 0, 0.65);
    border-radius: 3pt;
    padding: 10pt 29pt;
    transition: 0.5s ease;
}

.creation .radioGender .radioitem label img {
  margin: auto auto;
}

.creation .radioGender .radioitem input[type="radio"]:checked+label {
    background: #252525!important;
    box-shadow: 0 0 0 1px rgb(255 236 28 / 75%);
}

.creation .radioGender .radioitem input.bt[type="radio"]:hover+label {
  background: #252525;
}
</style>
