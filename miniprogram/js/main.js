import DataBus    from './databus'
import Index      from './pages/index'
import Button from './elements/buttons'
import Room from './pages/room'
import Instruction from './pages/instruction'

let ctx   = canvas.getContext('2d')
let databus = new DataBus()
let index =  new Index(ctx)
let room = new Room(ctx, databus)
let instruction = new Instruction(ctx)

wx.cloud.init({
  // env 参数说明：
  //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
  //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
  //   如不填则使用默认环境（第一个创建的环境）
  // env: 'my-env-id',
})
const db = wx.cloud.database()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.index = index
    this.room = room
    this.instruction = instruction

    // 维护当前requestAnimationFrame的id
    this.aniId    = 0

    this.restart()
    this.login()

    const m = wx.getGameServerManager()
    m.login().then(() => {
      console.warn('游戏服务登录成功')
    }).catch(err => {
      console.warn('游戏服务登录失败', err)
    })
  }

  login() {
    // 获取 openid
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        window.openid = res.result.openid
      },
      fail: err => {
        console.error('get openid failed with error', err)
      }
    })
  }
  
  restart() {
    window.pageIndex = 1
    this.bindLoop = this.loop.bind(this) //绑定渲染事件
    this.hasEventBind = false
    this.aniId = window.requestAnimationFrame(//界面重绘时执行 loop方法
      this.bindLoop,
      canvas
    )

    this.touchEventStart()
  }

  inBox(x,y,area) {
    if ( x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY  ) return true;
    else return false;
  }
  touchEventStart() {
    wx.onTouchStart((result) => {
      // Index init
      let x = result.touches[0].clientX
      let y = result.touches[0].clientY
      let areaStart = this.index.background.btnAreaStart
      let areaIns = this.index.background.btnAreaIns // Implement Ins function here
      let areaBack = this.instruction.btnAreaBack

      if ( this.inBox(x,y,areaStart) ){ 
            if (window.pageIndex == 1) {
              window.pageIndex = 2
              this.getState(1, 1)
            }
          } else if ( this.inBox(x,y,areaIns) ){
            if (window.pageIndex == 1) {
              window.pageIndex = 3
            }      
          }

      // Home button
      let areaExit = this.room.background.btnAreaExit
      if ( this.inBox(x,y,areaExit)  ){ 
            if (window.pageIndex == 2 || window.pageIndex == 3) {
              window.pageIndex = 1
            }
          }
      if(window.pageIndex == 3 && this.inBox(x,y,areaBack)){
        window.pageIndex = 1
      }
      
      // Room page buttons 
      if (window.pageIndex == 2) {
        let areaButton1 = this.room.btnArea1
        if ( this.inBox(x,y,areaButton1)  ){ 
              // console.log("try 1")
              this.action = this.getAction(1, 1, 1)
              console.log(this.action)
            }
  
        let areaButton2 = this.room.btnArea2
        if ( this.inBox(x,y,areaButton2)  ){
              console.log("try 2")
              this.action = this.getAction(1, 1, 2)
              console.log(this.action)
            }
  
        let areaButton3 = this.room.btnArea3
        if ( this.inBox(x,y,areaButton3) ){ 
              console.log("try 3")
              this.action = this.getAction(1, 1, 3)
              console.log(this.action)
            }  
      }
     
      console.log(result.touches[0].clientX, result.touches[0].clientY, areaExit)
    })
  }


  /**
   * 随着帧数变化的Button生成逻辑
   */
  buttonGenerate() {
      let button = databus.pool.getItemByClass('button', Button)
      button.init(3)
      databus.buttons.push(button)
  }

  getState(graphID, curStateID) {
    wx.cloud.callFunction({
      name: 'getRawState',
      data: {
        graphID: graphID,
        curStateID: curStateID
      },
      success: res => {
       this.state = res
      },
      fail: err => {
        console.error('get state failed', err)
      }
    })
  }

  getAction(graphID, curStateID, buttonID) {
    wx.cloud.callFunction({
      name: 'getRawAction',
      data: {
        graphID: graphID,
        curStateID: curStateID,
        btnID: buttonID
      },
      success: res => {
       this.action = action
      },
      fail: err => {
        console.error('get action failed', err)
      }
    })
  }

  uploadState(graphID, newStateList) {
    wx.cloud.callFunction({
      name: 'uploadState',
      data: {
        graphID: graphID,
        newStateList: newStateList
      },
      success: res => {
       return res
      },
      fail: err => {
        console.error('get action failed', err)
      }
    })
  }

  // 实现游戏帧循环
  loop() {
   // console.log(window.pageIndex)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    window.cancelAnimationFrame(this.aniId);

    // console.log(this.state, this.action)
    
    //由于小游戏里面没有页面跳转，只能通过变量去设定渲染的界面
    switch(window.pageIndex){
      case 1:
        this.index.render();
        break;
      case 2:
        this.room.render(this.state, this.action);
        break;
      case 3:
        this.instruction.render(ctx);
        break;
    }

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
