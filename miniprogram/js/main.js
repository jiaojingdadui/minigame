import DataBus    from './databus'
import Index      from './pages/index'
import Button from './elements/buttons'
import Room from './pages/room'

let ctx   = canvas.getContext('2d')
let databus = new DataBus()
let index =  new Index(ctx)
let room = new Room(ctx, databus)

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

    // 维护当前requestAnimationFrame的id
    this.aniId    = 0

    this.restart()
    this.login()
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

  touchEventStart() {
    wx.onTouchStart((result) => {
      // Index init
      let x = result.touches[0].clientX
      let y = result.touches[0].clientY
      let areaStart = this.index.background.btnAreaStart
      let areaIns = this.index.background.btnAreaIns // Implement Ins function here
      if ( x >= areaStart.startX
          && x <= areaStart.endX
          && y >= areaStart.startY
          && y <= areaStart.endY  ){ 
            window.pageIndex = 2
          } else if ( x >= areaIns.startX
          && x <= areaIns.endX
          && y >= areaIns.startY
          && y <= areaIns.endY  ){
            this.getIns();
      }

      // Home button
      let areaExit = this.index.background.btnAreaExit
      if ( x >= areaExit.startX
          && x <= areaExit.endX
          && y >= areaExit.startY
          && y <= areaExit.endY  ){ 
            window.pageIndex = 1
          }

      
      // Room page buttons 
      let areaButton1 = this.room.btnArea1
      if ( x >= areaButton1.startX
          && x <= areaButton1.endX
          && y >= areaButton1.startY
          && y <= areaButton1.endY  ){ 
            console.log("try 1")
          }

      let areaButton2 = this.room.btnArea2
      if ( x >= areaButton2.startX
          && x <= areaButton2.endX
          && y >= areaButton2.startY
          && y <= areaButton2.endY  ){
            console.log("try 2")
          }

      let areaButton3 = this.room.btnArea3
      if ( x >= areaButton3.startX
          && x <= areaButton3.endX
          && y >= areaButton3.startY
          && y <= areaButton3.endY  ){ 
            console.log("try 3")
          }
     
      // console.log(result.touches[0].clientX, result.touches[0].clientY, areaExit)
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

  // // 全局碰撞检测
  // collisionDetection() {
  //   let that = this

  //   databus.bullets.forEach((bullet) => {
  //     for ( let i = 0, il = databus.enemys.length; i < il;i++ ) {
  //       let enemy = databus.enemys[i]

  //       if ( !enemy.isPlaying && enemy.isCollideWith(bullet) ) {
  //         enemy.playAnimation()
  //         // that.music.playExplosion()

  //         bullet.visible = false
  //         databus.score  += 1

  //         break
  //       }
  //     }
  //   })

  //   for ( let i = 0, il = databus.enemys.length; i < il;i++ ) {
  //     let enemy = databus.enemys[i]

  //     if ( this.player.isCollideWith(enemy) ) {
  //       databus.gameOver = true

  //       // 获取历史高分
  //       if (this.personalHighScore) {
  //         if (databus.score > this.personalHighScore) {
  //           this.personalHighScore = databus.score
  //         }
  //       }

  //       // 上传结果
  //       // 调用 uploadScore 云函数
  //       wx.cloud.callFunction({
  //         name: 'uploadScore',
  //         // data 字段的值为传入云函数的第一个参数 event
  //         data: {
  //           score: databus.score
  //         },
  //         success: res => {
  //           if (this.prefetchHighScoreFailed) {
  //             this.prefetchHighScore()
  //           }
  //         },
  //         fail: err => {
  //           console.error('upload score failed', err)
  //         }
  //       })

  //       break
  //     }
  //   }
  // }

  // 游戏结束后的触摸事件处理逻辑

  // 实现游戏帧循环
  loop() {
    console.log(window.pageIndex)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    window.cancelAnimationFrame(this.aniId);
    
    //由于小游戏里面没有页面跳转，只能通过变量去设定渲染的界面
    if (window.pageIndex == 1){//主页面
      this.index.render()//主界面渲染
    } else if (window.pageIndex == 2) { //房间界面
      this.room.render()//游戏房间渲染
    }

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
