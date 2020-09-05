import Sprite from '../base/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC   = 'images/bg2.jpg'
const BG_WIDTH     = 512
const BG_HEIGHT    = 512

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    this.top = 0

    this.render(ctx)
  }

  update() {
    // this.top += 2

    // if ( this.top >= screenHeight )
    //   this.top = 0
  }

  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx) {
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      -screenHeight + this.top,
      screenWidth,
      screenHeight
    )

    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      this.top,
      screenWidth,
      screenHeight
    )

    // this.renderStart(ctx)
  }

  renderStart(ctx) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    ctx.fillText(
      'Start',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 205
    )

    ctx.fillText(
      'Instructions',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 130
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击 
     */
    this.btnAreaStart = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 180,
      endX  : screenWidth / 2  + 50,
      endY  : screenHeight / 2 - 100 + 235
    }

    this.btnAreaIns = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 100,
      endX  : screenWidth / 2  + 50,
      endY  : screenHeight / 2 - 100 + 155
    }
  }

  renderExit(ctx) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    ctx.fillText(
      'Home',
      screenWidth / 2 - 150,
      screenHeight / 2 - 100 - 100
    )

    this.btnAreaExit = {
      startX: screenWidth / 2 - 170,
      startY: screenHeight / 2 - 100 - 130,
      endX  : screenWidth / 2  - 100,
      endY  : screenHeight / 2 - 100 - 70
    }
  }
}
