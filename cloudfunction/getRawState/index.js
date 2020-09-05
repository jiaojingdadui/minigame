/**
 * para: graphID, curStateID, 
 * return: rawStateMedia, btnList[{key, text}]
 */

const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {

  const graphID = event.graphID
  const curStateID = event.curStateID
  const res = await db.collection('graphs').doc(graphID).get()
  const rawState = res.data.stateList[curStateID]

  console.log (res)

  if (rawState) {
    let btnList = []
    for (let i = 0; i < rawState.actionCount; i ++) {
        let rawAction = rawState.actionList[i]
        let key = rawAction.actionKey
        let text = rawAction.text
        btnList = btnList.concat ([{key, text}])
    }

    return {
        success: true,
        media: rawState.mediaSrc,
        btnList: btnList
    }
  } else {
    return {
      success: false
    }
  }
}
