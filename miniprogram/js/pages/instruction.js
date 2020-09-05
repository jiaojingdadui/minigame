import BackGround from '../runtime/background'
import Music      from '../runtime/music'

let atlas = new Image()
atlas.src = 'images/Common.png'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

export default class Instruction {
 
  constructor(ctx) {
    this.ctx = ctx
    this.init()
  }
 
  
  /**
   * 初始化
   */
  init(){
 
    // 维护当前requestAnimationFrame的id
    this.background = new BackGround(this.ctx)
    this.aniId = 0
 
    //this.hasEventBind = false
 
    // if (!this.hasEventBind) {
    //   this.hasEventBind = true
    //   this.initHandler = this.initEventHandler.bind(this)
    //   canvas.addEventListener('init', this.initHandler)
    // }
  }
 
 
  restart() {
    // canvas.removeEventListener(
    //   'init',
    //   this.initHandler
    // )
 
    this.hasEventBind = false
  }

 
  //界面渲染，主要渲染子组件
  render(ctx) {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.background.render(this.ctx)
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 160, 300, 350)

    ctx.fillStyle = "#ffffff"
    ctx.font    = "20px Arial"

    ctx.fillText(
      '新手教程',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 
    )

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 ,
      screenHeight / 2 + 175,
      120, 40
    )

    ctx.fillText(
      '返回首页',
      screenWidth / 2 + 20,
      screenHeight / 2 + 200
    )
    
    ctx.font    = "16px Arial"
    ctx.fillText(
      '根据故事线选择想要的回答,你们的目标是xxx！',
      //'你们的目标是xxx！',
      screenWidth / 2 -98,
      screenHeight / 2 -20,
      100
    )
  }
}
