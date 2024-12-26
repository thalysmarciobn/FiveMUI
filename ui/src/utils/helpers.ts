import torsoDataMale from "../data/mp_m_besttorso.json"
import torsoDataFemale from "../data/mp_f_besttorso.json"

import undershirtDataMale from "../data/mp_m_undershirt.json"
import undershirtDataFemale from "../data/mp_f_undershirt.json"

const freeModeModels = [ "mp_m_freemode_01", "mp_f_freemode_01" ]

export const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')

interface Payload {
    resource: string
    type?: string
    function: string
    args: object
}

interface TorsoData {
  [key: string]: { [key: string]: TorsoDataBest }
}

interface TorsoDataBest {
  bestTorsoDrawable: number
  bestTexture: number
}

interface Undershirt {
  [key: string]: number[]
}

export const hairColors: ColorData[] = [
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
]

export const makeupColors: ColorData[] = [
  { value: 0, color: [ 153, 37, 50 ] },
  { value: 1, color: [ 200, 57, 93 ] },
  { value: 2, color: [ 189, 81, 108 ] },
  { value: 3, color: [ 184, 99, 122 ] },
  { value: 4, color: [ 166, 82, 107 ] },
  { value: 5, color: [ 177, 67, 76 ] },
  { value: 6, color: [ 127, 49, 51 ] },
  { value: 7, color: [ 164, 100, 93 ] },
  { value: 8, color: [ 193, 135, 121 ] },
  { value: 9, color: [ 203, 160, 150 ] },
  { value: 10, color: [ 198, 145, 143 ] },
  { value: 11, color: [ 171, 111, 99 ] },
  { value: 12, color: [ 176, 96, 80 ] },
  { value: 13, color: [ 168, 76, 51 ] },
  { value: 14, color: [ 180, 113, 120 ] },
  { value: 15, color: [ 202, 127, 146 ] },
  { value: 16, color: [ 237, 156, 190 ] },
  { value: 17, color: [ 231, 117, 164 ] },
  { value: 18, color: [ 222, 62, 129 ] },
  { value: 19, color: [ 179, 76, 110 ] },
  { value: 20, color: [ 113, 39, 57 ] },
  { value: 21, color: [ 79, 31, 42 ] },
  { value: 22, color: [ 170, 34, 47 ] },
  { value: 23, color: [ 222, 32, 52 ] },
  { value: 24, color: [ 207, 8, 19 ] },
  { value: 25, color: [ 229, 84, 112 ] },
  { value: 26, color: [ 220, 63, 181 ] },
  { value: 27, color: [ 194, 39, 178 ] },
  { value: 28, color: [ 160, 28, 169 ] },
  { value: 29, color: [ 110, 24, 117 ] },
  { value: 30, color: [ 115, 20, 101 ] },
  { value: 31, color: [ 86, 22, 92 ] },
  { value: 32, color: [ 109, 26, 157 ] },
  { value: 33, color: [ 27, 55, 113 ] },
  { value: 34, color: [ 29, 78, 167 ] },
  { value: 35, color: [ 30, 116, 187 ] },
  { value: 36, color: [ 33, 163, 206 ] },
  { value: 37, color: [ 37, 194, 210 ] },
  { value: 38, color: [ 35, 204, 165 ] },
  { value: 39, color: [ 39, 192, 125 ] },
  { value: 40, color: [ 27, 156, 50 ] },
  { value: 41, color: [ 20, 134, 4 ] },
  { value: 42, color: [ 112, 208, 65 ] },
  { value: 43, color: [ 197, 234, 52 ] },
  { value: 44, color: [ 225, 227, 47 ] },
  { value: 45, color: [ 255, 221, 38 ] },
  { value: 46, color: [ 250, 192, 38 ] },
  { value: 47, color: [ 247, 138, 39 ] },
  { value: 48, color: [ 254, 89, 16 ] },
  { value: 49, color: [ 190, 110, 25 ] },
  { value: 50, color: [ 247, 201, 127 ] },
  { value: 51, color: [ 251, 229, 192 ] },
  { value: 52, color: [ 245, 245, 245 ] },
  { value: 53, color: [ 179, 180, 179 ] },
  { value: 54, color: [ 145, 145, 145 ] },
  { value: 55, color: [ 86, 78, 78 ] },
  { value: 56, color: [ 24, 14, 14 ] },
  { value: 57, color: [ 88, 150, 158 ] },
  { value: 58, color: [ 77, 111, 140 ] },
  { value: 59, color: [ 26, 43, 85 ] },
  { value: 60, color: [ 160, 126, 107 ] },
  { value: 61, color: [ 130, 99, 85 ] },
  { value: 62, color: [ 109, 83, 70 ] },
]

export const eyeColors: ColorDataString[] = [
  {
    color: '#634e34',
    value: 0
  },
  {
    color: '#263419',
    value: 1
  },
  {
    color: '#83b7d5',
    value: 2
  },
  {
    color: '#3e66a3',
    value: 3
  },
  {
    color: '#8d6833',
    value: 4
  },
  {
    color: '#523711',
    value: 5
  },
  {
    color: '#d08418',
    value: 6
  },
  {
    color: '#0d0d0c',
    value: 12
  },
]

export const maxOverlay = {
  blemishes: 23,
  facialHair: 28,
  eyeBrows: 33,
  ageing: 14,
  makeup: 71,
  blush: 32,
  complexion: 11,
  sunDamage: 10,
  lipstick: 9,
  molesFreckles: 17,
  chestHair: 16,
  bodyBlemishes: 11,
  addNodyBlemishes: 1
}

export const bestTorso = function (
  model: string,
  drawable: number,
  texture: number
): TorsoDataBest {
  let data: TorsoData | undefined

  if (model === freeModeModels[0]) {
    data = torsoDataMale as TorsoData
  } else if (model === freeModeModels[1]) {
    data = torsoDataFemale as TorsoData
  }

  if (data && data[drawable] && data[drawable][texture]) {
    return data[drawable][texture]
  } else {
    return { bestTorsoDrawable: -1, bestTexture: -1 }
  }
};

export const undershirtListByTop = function (
  model: string,
  drawable: number,
): number[] {
  let data: Undershirt | undefined

  if (model === freeModeModels[0]) {
    data = undershirtDataMale as Undershirt
  } else if (model === freeModeModels[1]) {
    data = undershirtDataFemale as Undershirt
  }

  if (data && data[drawable]) {
    return data[drawable] as number[]
  }
  return [ -1 ]
};

export const invoke = function(payload: Payload) {
    return fetch(`https://${location.host}/invoke`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resource: payload.resource,
        function: payload.function,
        args: payload.args,
      }),
    })
      .then(r => r.json())
      .then(responce => {
        if (responce.ok) {
          return responce.result;
        } else {
          throw responce.result;
        }
      });
  };
  
  export const invokeJson = function(payload:Payload) {
    return fetch(`https://${location.host}/invoke`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resource: payload.resource,
        function: payload.function,
        args: payload.args,
      }),
    })
      .then(r => r.json())
      .then(responce => {
        if (responce.ok) {
          return responce.json();
        } else {
          throw responce.result;
        }
      });
  };
  
  export const trigger = function(payload:Payload) {
    return fetch(`https://${location.host}/trigger`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: payload.type,
        function: payload.function,
        args: payload.args,
      }),
    })
      .then(r => r.json())
      .then(responce => {
        if (responce.ok) {
          return responce.result;
        } else {
          throw responce.result;
        }
      });
  };