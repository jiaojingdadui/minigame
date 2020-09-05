import BackGround from '../runtime/background'
import Music      from '../runtime/music'
import Button     from '../elements/buttons'
 
export default class Room {
 
  constructor(ctx, databus) {
    this.ctx = ctx
    this.databus = databus
    this.init()
  }
 
  
  /**
   * 初始化
   */
  init(){
 
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

  update() {

  }

 
  //界面渲染，主要渲染子组件
  render() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.background.render(this.ctx)
    this.background.renderExit(this.ctx)

    // console.log(this.databus.buttons.length)
    for (let i = 200; i <= 400; i += 100) {
      this.ctx.drawImage(this.button, 80, i, 150, 75)
    }

    this.btnArea1 = {
      startX: 70,
      startY: 180,
      endX  : 250,
      endY  : 270
    }

    this.btnArea2 = {
      startX: 70,
      startY: 280,
      endX  : 250,
      endY  : 370
    }

    this.btnArea3 = {
      startX: 70,
      startY: 380,
      endX  : 250,
      endY  : 470
    }
    


    // this.databus.buttons
    //     .forEach((item) => {
    //       item.drawToCanvas(this.ctx)
    //     })
  }
}
