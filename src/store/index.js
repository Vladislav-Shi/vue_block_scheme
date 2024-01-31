import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    elements: [],
  },
  mutations: {
    addRectangle(state, left, top) {
    // Добавить прямоугольник в список элементов
      state.elements.push({
        class_: "squadre",
        left: left,
        top: top,
        selected: false,
        width: 120,
        height: 70,
        text_: "простой блок",
        hasFill: true,
        borderColor: "hsl( 0, 100%, 50% )",
        fillColor: "hsl( 0, 100%, 75% )",
      });
    },
    deleteElement(state, index){
        // удалить элемент по индексу
        state.elements.splice(index, 1)
    },
    addElements(state, elements){
        // добавляет элементы. Служит для загрузки старых блок-схем
        state.elements = elements
    },
    changeElement(state, index, newData){
        state.elements[index] = newData
    }
  },
  getters: {},
});

export default store;
