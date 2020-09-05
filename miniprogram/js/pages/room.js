import BackGround from '../runtime/background'
import Music      from '../runtime/music'
import Button     from '../elements/buttons'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight


export default class Room {
 
  constructor(ctx, databus) {
    this.ctx = ctx
    this.databus = databus
    this.init()
  }
 
  
  /**
   * 初始化
   */
  init() {
 
    // 维护当前requestAnimationFrame的id
    this.background = new BackGround(this.ctx)
    this.aniId = 0

    // let button = this.databus.pool.getItemByClass('button', Button)
    // button.init(100, 30)
    // this.databus.buttons.push(button)
    let button = new Image()
    button.src = "images/button.jpg"
    this.button = button
  }
 
 
  restart() {}

  update() {}

 
  //界面渲染，主要渲染子组件
  render(state, action) {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.background.render(this.ctx)
    this.background.renderExit(this.ctx)

    // console.log(this.databus.buttons.length)
    for (let i = -200; i <= 0; i += 100) {
      this.ctx.drawImage(this.button, screenWidth / 2 - 120, screenHeight / 2 - i, 230, 75)
    }

    this.btnArea1 = {
      startX: screenWidth / 2 - 120,
      startY: screenHeight / 2,
      endX  : screenWidth / 2 + 110,
      endY  : screenHeight / 2 + 80
    }

    this.btnArea2 = {
      startX: screenWidth / 2 - 120,
      startY: screenHeight / 2 + 100,
      endX  : screenWidth / 2 + 110,
      endY  : screenHeight / 2 + 180
    }

    this.btnArea3 = {
      startX: screenWidth / 2 - 120,
      startY: screenHeight / 2 + 200,
      endX  : screenWidth / 2 + 110,
      endY  : screenHeight / 2 + 280
    }


    this.ctx.fillText(
      '目前状态',
      screenWidth / 2 - 65,
      screenHeight / 2 - 100 
    )


    this.btnState = {
      startX: screenWidth / 2 - 120,
      startY: screenHeight / 2 + 200,
      endX  : screenWidth / 2 + 110,
      endY  : screenHeight / 2 + 280
    }

    // this.databus.buttons
    //     .forEach((item) => {
    //       item.drawToCanvas(this.ctx)
    //     })
  }
}
