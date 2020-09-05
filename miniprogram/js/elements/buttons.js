import Sprite   from '../base/sprite'
import DataBus  from '../databus'

const BUTTON_IMG_SRC = 'images/button.png'
const BUTTON_WIDTH   = 100
const BUTTON_HEIGHT  = 50

// const __ = {
//   speed: Symbol('speed')
// }

let databus = new DataBus()

export default class Button extends Sprite {
  constructor() {
    super(BUTTON_IMG_SRC, BUTTON_WIDTH, BUTTON_HEIGHT)
  }

  init(x, y) {
    this.x = x
    this.y = y

    this.visible = true
  }

  // 更新button位置
  update() {
    // 超出屏幕外回收自身
    // if ( this.y < -this.height )
    //   databus.removeBUTTONs(this)
  }
}
