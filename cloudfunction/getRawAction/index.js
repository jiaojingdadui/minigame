/**
 * para: graphID, buttonID:0, 1, 2, curStateID, 
 * return: rawActionMedia, nextStateID
 */

const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {

  const graphID = event.graphID
  const btnID = event.buttonID
  const curStateID = event.curStateID
  const res = await db.collection('graphs').doc(graphID).get()
  const rawAction = res.data.stateList[curStateID].actionList[btnID]

  console.log(res)
  
  if (rawAction) {
    // update
    return {
        success: true,
        media: rawAction.mediaSrc,
        nextStateID : rawAction.toState
    }

  } else {
    return {
      success: false
    }
  }
}
