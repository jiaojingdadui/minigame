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



  }
 
 
  restart() {
  }

 
  //界面渲染，主要渲染子组件
  render() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.background.render(this.ctx)
    this.background.renderStart(this.ctx)
  }
}
