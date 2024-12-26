interface HairColors {
  list: ColorData[] = [
    { color: [ 22, 19, 19 ],        value: 0, },
    { color: [ 30, 28, 25 ],        value: 1, },
    { color: [ 76, 56, 45 ],        value: 2, },
    { color: [ 69, 34, 24 ],        value: 3, },
    { color: [ 123, 59, 31 ],       value: 4, },
    { color: [ 149, 68, 35 ],       value: 5, },
    { color: [ 165, 87, 50 ],       value: 6, },
    { color: [ 175, 111, 72 ],      value: 7, },
    { color: [ 159, 105, 68 ],      value: 8, },
    { color: [ 198, 152, 108 ],     value: 9, },
    { color: [ 213, 170, 115 ],     value: 10, },
    { color: [ 223, 187, 132 ],     value: 11, },
    { color: [ 202, 164, 110 ],     value: 12, },
    { color: [ 238, 204, 130 ],     value: 13, },
    { color: [ 229, 190, 126 ],     value: 14, },
    { color: [ 250, 225, 167 ],     value: 15, },
    { color: [ 187, 140, 96 ],      value: 16, },
    { color: [ 163, 92, 60 ],       value: 17, },
    { color: [ 144, 52, 37 ],       value: 18, },
    { color: [ 134, 21, 17 ],       value: 19, },
    { color: [ 164, 24, 18 ],       value: 20, },
    { color: [ 195, 33, 24 ],       value: 21, },
    { color: [ 221, 69, 34 ],       value: 22, },
    { color: [ 229, 71, 30 ],       value: 23, },
    { color: [ 208, 97, 56 ],       value: 24, },
    { color: [ 113, 79, 38 ],       value: 25, },
    { color: [ 132, 107, 95 ],      value: 26, },
    { color: [ 185, 164, 150 ],     value: 27, },
    { color: [ 218, 196, 180 ],     value: 28, },
    { color: [ 247, 230, 217 ],     value: 29, },
    { color: [ 102, 72, 93 ],       value: 30, },
    { color: [ 162, 105, 138 ],     value: 31, },
    { color: [ 171, 174, 11 ],      value: 32, },
    { color: [ 239, 61, 200 ],      value: 33, },
    { color: [ 255, 69, 152 ],      value: 34, },
    { color: [ 255, 178, 191 ],     value: 35, },
    { color: [ 12, 168, 146 ],      value: 36, },
    { color: [ 8, 146, 165 ],       value: 37, },
    { color: [ 11, 82, 134 ],       value: 38, },
    { color: [ 118, 190, 117 ],     value: 39, },
    { color: [ 52, 156, 104 ],      value: 40, },
    { color: [ 22, 86, 85 ],        value: 41, },
    { color: [ 152, 177, 40 ],      value: 42, },
    { color: [ 127, 162, 23 ],      value: 43, },
    { color: [ 241, 200, 98 ],      value: 44, },
    { color: [ 238, 178, 16 ],      value: 45, },
    { color: [ 224, 134, 14 ],      value: 46, },
    { color: [ 247, 157, 15 ],      value: 47, },
    { color: [ 243, 143, 16 ],      value: 48, },
    { color: [ 231, 70, 15 ],       value: 49, },
    { color: [ 255, 101, 21 ],      value: 50, },
    { color: [ 254, 91, 34 ],       value: 51, },
    { color: [ 252, 67, 21 ],       value: 52, },
    { color: [ 196, 12, 15 ],       value: 53, },
    { color: [ 143, 10, 14 ],       value: 54, },
    { color: [ 44, 27, 22 ],        value: 55, },
    { color: [ 80, 51, 37 ],        value: 56, },
    { color: [ 98, 54, 37 ],        value: 57, },
    { color: [ 60, 31, 24 ],        value: 58, },
    { color: [ 69, 43, 32 ],        value: 59, },
    { color: [ 8, 10, 14 ],         value: 60, },
    { color: [ 212, 185, 158 ],     value: 61, },
    { color: [ 212, 185, 158 ],     value: 62, },
    { color: [ 213, 170, 115 ],     value: 63, },
  ]
}

interface Vector3 {
    x: number;
    y: number;
    z: number;
}

interface ColorData {
  color: list
  value: number
}

interface ColorDataString {
  color: string
  value: number
}

interface Camera {
    coords: Vector3;
    point: Vector3;
}

interface PedAppearance {
  model: string;
  headBlend: PedHeadBlend;
  eyeColor: number;
  hair: PedHair;
  components: PedComponent
  props: PedProps;
  faceFeatures: PedFaceFeatures;
  headOverlays: PedHeadOverlays;
  headOverlayColors: PedHeadOverlayColors;
}

interface PedComponent {
  face: PedComponentVariation
  mask: PedComponentVariation
  hair: PedComponentVariation
  torso: PedComponentVariation
  legs: PedComponentVariation
  bag: PedComponentVariation
  shoes: PedComponentVariation
  accessory: PedComponentVariation
  undershirt: PedComponentVariation
  kevlar: PedComponentVariation
  badge: PedComponentVariation
  torso2: PedComponentVariation
}

interface PedComponentVariation {
  componentId: number
  drawableId: number
  textureId: number
  palleteId: number
}

interface PedProps {
  hat: PedProp
  glasses: PedProp
  earPieces: PedProp
  watches: PedProp
  wristbands: PedProp
}

interface PedProp {
  propId: number
  componentId: number
  drawableId: number
  textureId: number
  attach: boolean
}

interface PedHeadBlend {
  shapeFirst: number;
  shapeSecond: number;
  skinFirst: number;
  skinSecond: number;
  shapeMix: float;
  skinMix: float;
}

interface PedFaceFeatures {
  noseWidth: number;
  nosePeakHeight: number;
  nosePeakSize: number;
  noseBoneHeight: number;
  nosePeakLowering: number;
  noseBoneTwist: number;
  eyeBrownHeight: number;
  eyeBrownForward: number;
  cheeksBoneHeight: number;
  cheeksBoneWidth: number;
  cheeksWidth: number;
  eyesOpening: number;
  lipsThickness: number;
  jawBoneWidth: number;
  jawBoneBackSize: number;
  chinBoneLowering: number;
  chinBoneLenght: number;
  chinBoneSize: number;
  chinHole: number;
  neckThickness: number;
}

interface PedHeadOverlays {
  blemishes: PedHeadOverlayValue
  beard: PedHeadOverlayValue
  eyebrows: PedHeadOverlayValue
  ageing: PedHeadOverlayValue
  makeUp: PedHeadOverlayValue
  blush: PedHeadOverlayValue
  complexion: PedHeadOverlayValue
  sunDamage: PedHeadOverlayValue
  lipstick: PedHeadOverlayValue
  moleAndFreckles: PedHeadOverlayValue
  chestHair: PedHeadOverlayValue
  bodyBlemishes: PedHeadOverlayValue
  addBodyBlemishes: PedHeadOverlayValue
}

interface PedHeadOverlayColors {
  blemishes: PedHeadOverlayColorValue
  beard: PedHeadOverlayColorValue
  eyebrows: PedHeadOverlayColorValue
  ageing: PedHeadOverlayColorValue
  makeUp: PedHeadOverlayColorValue
  blush: PedHeadOverlayColorValue
  complexion: PedHeadOverlayColorValue
  sunDamage: PedHeadOverlayColorValue
  lipstick: PedHeadOverlayColorValue
  moleAndFreckles: PedHeadOverlayColorValue
  chestHair: PedHeadOverlayColorValue
  bodyBlemishes: PedHeadOverlayColorValue
  addBodyBlemishes: PedHeadOverlayColorValue
}

interface PedHeadOverlayValue {
  overlay: number
  opacity: number
  index: number
}

interface PedHeadOverlayColorValue {
  overlay: number
  colorType: number
  colorId: number
  secondColorId: number
}

interface PedHair {
  color: number
  highlight: number
}

interface TattooList {
  [key: string]: Tattoo[];
}

interface Tattoo {
  name: string;
  label: string;
  hashMale: string;
  hashFemale: string;
  zone: string;
  collection: string;
}