// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const data = await db.collection('graphs').doc(event.graphID).get()
  console.log(data)
  return data ? {
    success: true,
    data: data
  } : {
    success: false
  }
}
