import Sprite   from '../base/sprite'

const BUTTON_IMG_SRC = '../../images/button.jpg'
const BUTTON_WIDTH   = 100
const BUTTON_HEIGHT  = 50

export default class Button extends Sprite {
  constructor() {
    super(BUTTON_IMG_SRC, BUTTON_WIDTH, BUTTON_HEIGHT)
  }

  init(x, y) {
    this.x = x
    this.y = y

    this.visible = true
  }

}
