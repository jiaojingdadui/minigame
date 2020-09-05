class Graph {
  constructor(data) {
    this.data = data;
    this.entryState = new State(this, data.startID);
  }

  getStateData(stateID) {
    return this.data.stateList[stateID];
  }
}

class State {
  constructor(graph, stateID) {
    const data = graph.getStateData(stateID);
    this.actionList = [];
    data.actionList.forEach((actionData) => {
      this.actionList.push(new Action(
        graph,
        actionData.toState, {
          "text": actionData["text"],
          "mediaSrc": actionData["mediaSrc"]
        }
      ))
    });
    this.frontData = {
      "mediaSrc": data["mediaSrc"]
    };
  }
}

class Action {
  constructor(graph, stateNext, frontData) {
    this.graph = graph;
    this.stateNext = stateNext;
    this.frontData = frontData;
  }

  getNext() {
    return new State(graph, stateNext);
  }
}

const defaultGraphID = 1;

export default class DataBus {
  constructor() {
    loadGraph(defaultGraphID);
  }

  loadGraph(graphID) {
    const raw = getRawGraph(graphID);
    if (raw.success) {
      this.graph = new Graph(raw.data);
      this.state = graph.entryState();
    } else {
      console.log("failed");
    }
  }

  act(action) {
    this.state = action.getNext();
  }
}
