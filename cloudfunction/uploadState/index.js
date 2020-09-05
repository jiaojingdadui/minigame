/**
 * 后台上传graph数据
 */

const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

const _ = db.command

exports.main = async (event, context) => {
    // 每张graph对应不同的游戏场景 -> states/actions
  const graphID = event.graphID
  const newStateList = event.newStateList

  try {
    const raw = await db.collection('graphs').doc(graphID).get()
  } catch(err) {
  }

  if (raw) {
    // update
    const updateResult = await db.collection('graphs').doc(graphID).update({
      data: {
        stateList: raw.data.stateList.concat(newStateList),
        startID: event.newStart,
        endID: event.newEnd,
        stateCount: raw.data.stateCount + newStateList.length
      }
    })

    if (updateResult.stats.updated === 0) {
      return {
        success: false
      }
    }

    return {
      success: true,
      updated: true
    }

  } else {
    await db.collection('graphs').add({
      data: {
        _id: graphID,
        stateList: newStateList,
        startID: event.newStart,
        endID: event.newEnd,
        stateCount: newStateList.length
      }
    })

    return {
      success: true,
      created: true,
    }
  }
}
