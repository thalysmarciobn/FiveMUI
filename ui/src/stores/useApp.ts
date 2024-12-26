import { defineStore } from "pinia";

// useApp could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useApp = defineStore('app', {
  state: () => {
    return {
      charSlot: 0,
      charAge: 0,
      charFirstName: '',
      charSecondName: '',
      pedAppearance: {
        model: 'mp_m_freemode_01',
        headBlend: {
          shapeFirst: 0,
          shapeSecond: 0,
          skinFirst: 0,
          skinSecond: 0,
          shapeMix: 0.5,
          skinMix: 0.5
        },
        eyeColor: 0,
        hair: {
          color: 0,
          highlight: 0
        },
        components: {
          face: {
            componentId: 0,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          mask: {
            componentId: 1,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          hair: {
            componentId: 2,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          torso: {
            componentId: 3,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          legs: {
            componentId: 4,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          bag: {
            componentId: 5,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          shoes: {
            componentId: 6,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          accessory: {
            componentId: 7,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          undershirt: {
            componentId: 8,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          kevlar: {
            componentId: 9,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          badge: {
            componentId: 10,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          torso2: {
            componentId: 11,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
        },
        props: {
          hat: {
            propId: 0,
            componentId: -1,
            drawableId: 0,
            textureId: 0,
            attach: false
          },
          glasses: {
            propId: 1,
            componentId: -1,
            drawableId: 0,
            textureId: 0,
            attach: false
          },
          earPieces: {
            propId: 2,
            componentId: -1,
            drawableId: 0,
            textureId: 0,
            attach: false
          },
          watches: {
            propId: 6,
            componentId: -1,
            drawableId: 0,
            textureId: 0,
            attach: false
          },
          wristbands: {
            propId: 7,
            componentId: -1,
            drawableId: 0,
            textureId: 0,
            attach: false
          }
        },
        faceFeatures: {
          noseWidth: 0,
          nosePeakHeight: 0,
          nosePeakSize: 0,
          noseBoneHeight: 0,
          nosePeakLowering: 0,
          noseBoneTwist: 0,
          eyeBrownHeight: 0,
          eyeBrownForward: 0,
          cheeksBoneHeight: 0,
          cheeksBoneWidth: 0,
          cheeksWidth: 0,
          eyesOpening: 0,
          lipsThickness: 0,
          jawBoneWidth: 0,
          jawBoneBackSize: 0,
          chinBoneLowering: 0,
          chinBoneLenght: 0,
          chinBoneSize: 0,
          chinHole: 0,
          neckThickness: 0,
        },
        headOverlays: {
          blemishes: {
            overlay: 0,
            index: 0,
            opacity: 0,
          },
          beard: {
            overlay: 1,
            index: 0,
            opacity: 0,
          },
          eyebrows: {
            overlay: 2,
            index: 0,
            opacity: 0,
          },
          ageing: {
            overlay: 3,
            index: 0,
            opacity: 0,
          },
          makeUp: {
            overlay: 4,
            index: 0,
            opacity: 0,
          },
          blush: {
            overlay: 5,
            index: 0,
            opacity: 0,
          },
          complexion: {
            overlay: 6,
            index: 0,
            opacity: 0,
          },
          sunDamage: {
            overlay: 7,
            index: 0,
            opacity: 0,
          },
          lipstick: {
            overlay: 8,
            index: 0,
            opacity: 0,
          },
          moleAndFreckles: {
            overlay: 9,
            index: 0,
            opacity: 0,
          },
          chestHair: {
            overlay: 10,
            index: 0,
            opacity: 0,
          },
          bodyBlemishes: {
            overlay: 11,
            index: 0,
            opacity: 0,
          },
          addBodyBlemishes: {
            overlay: 12,
            index: 0,
            opacity: 0,
          },
        },
        headOverlayColors: {
          blemishes: {
            overlay: 0,
            colorType: 0,
            colorId: 1,
            secondColorId: 1,
          },
          beard: {
            overlay: 1,
            colorType: 1,
            colorId: 1,
            secondColorId: 1,
          },
          eyebrows: {
            overlay: 2,
            colorType: 1,
            colorId: 1,
            secondColorId: 1,
          },
          ageing: {
            overlay: 3,
            colorType: 0,
            colorId: 1,
            secondColorId: 1,
          },
          makeUp: {
            overlay: 4,
            colorType: 0,
            colorId: 1,
            secondColorId: 1,
          },
          blush: {
            overlay: 5,
            colorType: 2,
            colorId: 1,
            secondColorId: 1,
          },
          complexion: {
            overlay: 6,
            colorType: 0,
            colorId: 1,
            secondColorId: 1,
          },
          sunDamage: {
            overlay: 7,
            colorType: 0,
            colorId: 1,
            secondColorId: 1,
          },
          lipstick: {
            overlay: 8,
            colorType: 2,
            colorId: 1,
            secondColorId: 1,
          },
          moleAndFreckles: {
            overlay: 9,
            colorType: 0,
            colorId: 1,
            secondColorId: 1,
          },
          chestHair: {
            overlay: 10,
            colorType: 1,
            colorId: 1,
            secondColorId: 1,
          },
          bodyBlemishes: {
            overlay: 11,
            colorType: 0,
            colorId: 1,
            secondColorId: 1,
          },
          addBodyBlemishes: {
            overlay: 12,
            colorType: 0,
            colorId: 1,
            secondColorId: 1,
          },
        }
      }
    }
  },
  actions: {
    resetAppearance(model: string) {
      this.pedAppearance = {
        model: model,
        headBlend: {
          shapeFirst: 0,
          shapeSecond: 0,
          skinFirst: 0,
          skinSecond: 0,
          shapeMix: 0.5,
          skinMix: 0.5
        },
        eyeColor: 0,
        hair: {
          color: 0,
          highlight: 0
        },
        components: {
          face: {
            componentId: 0,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          mask: {
            componentId: 1,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          hair: {
            componentId: 2,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          torso: {
            componentId: 3,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          legs: {
            componentId: 4,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          bag: {
            componentId: 5,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          shoes: {
            componentId: 6,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          accessory: {
            componentId: 7,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          undershirt: {
            componentId: 8,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          kevlar: {
            componentId: 9,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          badge: {
            componentId: 10,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
          torso2: {
            componentId: 11,
            drawableId: 0,
            textureId: 0,
            palleteId: 0,
          },
        },
        props: {
          hat: {
            propId: 0,
            componentId: -1,
            drawableId: 0,
            textureId: 0,
            attach: false
          },
          glasses: {
            propId: 1,
            componentId: -1,
            drawableId: 0,
            textureId: 0,
            attach: false
          },
          earPieces: {
            propId: 2,
            componentId: -1,
            drawableId: 0,
            textureId: 0,
            attach: false
          },
          watches: {
            propId: 6,
            componentId: -1,
            drawableId: 0,
            textureId: 0,
            attach: false
          },
          wristbands: {
            propId: 7,
            componentId: -1,
            drawableId: 0,
            textureId: 0,
            attach: false
          }
        },
        faceFeatures: {
          noseWidth: 0,
          nosePeakHeight: 0,
          nosePeakSize: 0,
          noseBoneHeight: 0,
          nosePeakLowering: 0,
          noseBoneTwist: 0,
          eyeBrownHeight: 0,
          eyeBrownForward: 0,
          cheeksBoneHeight: 0,
          cheeksBoneWidth: 0,
          cheeksWidth: 0,
          eyesOpening: 0,
          lipsThickness: 0,
          jawBoneWidth: 0,
          jawBoneBackSize: 0,
          chinBoneLowering: 0,
          chinBoneLenght: 0,
          chinBoneSize: 0,
          chinHole: 0,
          neckThickness: 0,
        },
        headOverlays: {
          blemishes: {
            overlay: 0,
            index: 0,
            opacity: 0,
          },
          beard: {
            overlay: 1,
            index: 0,
            opacity: 0,
          },
          eyebrows: {
            overlay: 2,
            index: 0,
            opacity: 0,
          },
          ageing: {
            overlay: 3,
            index: 0,
            opacity: 0,
          },
          makeUp: {
            overlay: 4,
            index: 0,
            opacity: 0,
          },
          blush: {
            overlay: 5,
            index: 0,
            opacity: 0,
          },
          complexion: {
            overlay: 6,
            index: 0,
            opacity: 0,
          },
          sunDamage: {
            overlay: 7,
            index: 0,
            opacity: 0,
          },
          lipstick: {
            overlay: 8,
            index: 0,
            opacity: 0,
          },
          moleAndFreckles: {
            overlay: 9,
            index: 0,
            opacity: 0,
          },
          chestHair: {
            overlay: 10,
            index: 0,
            opacity: 0,
          },
          bodyBlemishes: {
            overlay: 11,
            index: 0,
            opacity: 0,
          },
          addBodyBlemishes: {
            overlay: 12,
            index: 0,
            opacity: 0,
          },
        },
        headOverlayColors: {
          blemishes: {
            overlay: 0,
            colorType: 0,
            colorId: 1,
            secondColorId: 1,
          },
          beard: {
            overlay: 1,
            colorType: 1,
            colorId: 1,
            secondColorId: 1,
          },
          eyebrows: {
            overlay: 2,
            colorType: 1,
            colorId: 1,
            secondColorId: 1,
          },
          ageing: {
            overlay: 3,
            colorType: 0,
            colorId: 1,
            secondColorId: 1,
          },
          makeUp: {
            overlay: 4,
            colorType: 0,
            colorId: 1,
            secondColorId: 1,
          },
          blush: {
            overlay: 5,
            colorType: 2,
            colorId: 1,
            secondColorId: 1,
          },
          complexion: {
            overlay: 6,
            colorType: 0,
            colorId: 1,
            secondColorId: 1,
          },
          sunDamage: {
            overlay: 7,
            colorType: 0,
            colorId: 1,
            secondColorId: 1,
          },
          lipstick: {
            overlay: 8,
            colorType: 2,
            colorId: 1,
            secondColorId: 1,
          },
          moleAndFreckles: {
            overlay: 9,
            colorType: 0,
            colorId: 1,
            secondColorId: 1,
          },
          chestHair: {
            overlay: 10,
            colorType: 1,
            colorId: 1,
            secondColorId: 1,
          },
          bodyBlemishes: {
            overlay: 11,
            colorType: 0,
            colorId: 1,
            secondColorId: 1,
          },
          addBodyBlemishes: {
            overlay: 12,
            colorType: 0,
            colorId: 1,
            secondColorId: 1,
          },
        }
      }
    },
  },
  getters: {
    // automatically infers the return type
    pedAppearanceState: (state): PedAppearance => {
      return state.pedAppearance
    },
    getHeadOverlay: (state) => (overlay: number): PedHeadOverlayValue => {
      switch (overlay) {
        default:
        case 0:
          return state.pedAppearance.headOverlays.blemishes
        case 1:
          return state.pedAppearance.headOverlays.beard
        case 2:
          return state.pedAppearance.headOverlays.eyebrows
        case 3:
          return state.pedAppearance.headOverlays.ageing
        case 4:
          return state.pedAppearance.headOverlays.makeUp
        case 5:
          return state.pedAppearance.headOverlays.blush
        case 6:
          return state.pedAppearance.headOverlays.complexion
        case 7:
          return state.pedAppearance.headOverlays.sunDamage
        case 8:
          return state.pedAppearance.headOverlays.lipstick
        case 9:
          return state.pedAppearance.headOverlays.moleAndFreckles
        case 10:
          return state.pedAppearance.headOverlays.chestHair
        case 11:
          return state.pedAppearance.headOverlays.bodyBlemishes
        case 12:
          return state.pedAppearance.headOverlays.addBodyBlemishes
      }
    },
    getHeadOverlayColor: (state) => (overlay: number): PedHeadOverlayColorValue => {
      switch (overlay) {
        default:
        case 0:
          return state.pedAppearance.headOverlayColors.blemishes
        case 1:
          return state.pedAppearance.headOverlayColors.beard
        case 2:
          return state.pedAppearance.headOverlayColors.eyebrows
        case 3:
          return state.pedAppearance.headOverlayColors.ageing
        case 4:
          return state.pedAppearance.headOverlayColors.makeUp
        case 5:
          return state.pedAppearance.headOverlayColors.blush
        case 6:
          return state.pedAppearance.headOverlayColors.complexion
        case 7:
          return state.pedAppearance.headOverlayColors.sunDamage
        case 8:
          return state.pedAppearance.headOverlayColors.lipstick
        case 9:
          return state.pedAppearance.headOverlayColors.moleAndFreckles
        case 10:
          return state.pedAppearance.headOverlayColors.chestHair
        case 11:
          return state.pedAppearance.headOverlayColors.bodyBlemishes
        case 12:
          return state.pedAppearance.headOverlayColors.addBodyBlemishes
      }
    },
    getComponent: (state) => (component: number): PedComponentVariation => {
      switch (component) {
        default:
        case 0:
          return state.pedAppearance.components.face
        case 1:
          return state.pedAppearance.components.mask
        case 2:
          return state.pedAppearance.components.hair
        case 3:
          return state.pedAppearance.components.torso
        case 4:
          return state.pedAppearance.components.legs
        case 5:
          return state.pedAppearance.components.bag
        case 6:
          return state.pedAppearance.components.shoes
        case 7:
          return state.pedAppearance.components.accessory
        case 8:
          return state.pedAppearance.components.undershirt
        case 9:
          return state.pedAppearance.components.kevlar
        case 10:
          return state.pedAppearance.components.badge
        case 11:
          return state.pedAppearance.components.torso2
      }
    },
    getTorsoByTop: (state) => (drawable: number): number => {
      switch (drawable) {
        case 38:
          return 41
        default:
          return -1
      }
    }
  },
})
