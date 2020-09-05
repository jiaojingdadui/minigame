import BackGround from '../runtime/background'
import Music      from '../runtime/music'
 
export default class Index {
 
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
 
    // this.hasEventBind = false
 
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
 
    // this.hasEventBind = false
  }
 
  initEventHandler(e) {
    e.preventDefault()
    
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let areaStart = this.background.btnAreaStart
    let areaIns = this.background.btnAreaIns // Implement Ins function here

    if ( x >= areaStart.startX
        && x <= areaStart.endX
        && y >= areaStart.startY
        && y <= areaStart.endY  ){ 
          console.log("Dsdsd")
          this.begin();
    } else if ( x >= areaIns.startX
        && x <= areaIns.endX
        && y >= areaIns.startY
        && y <= areaIns.endY  ){
          this.getIns();
    }
  }

 
  //界面渲染，主要渲染子组件
  render() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.background.render(this.ctx)
    this.background.renderStart(this.ctx)
  }
}
