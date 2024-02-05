import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      elements: [],
      focusElement: null
    };
  },
  getters: {
    hasFocused: state => {return state.focusElement != null}
  },

  mutations: {
    addRectangle(state, payload) {
      // Добавить прямоугольник в список элементов
      state.elements.push({
        class_: "squadre",
        left: payload.left_,
        top: payload.top_,
        selected: false,
        width: 120,
        height: 70,
        text_: "простой блок",
        hasFill: true,
        borderColor: "hsl( 0, 100%, 50% )",
        fillColor: "hsl( 0, 100%, 75% )",
      });
    },
    setFocusElement(state, index){
      if (state.focusElement != null){
        state.elements[state.focusElement].selected = false
      }
      state.focusElement = index
      state.elements[index].selected = true
    },

    deleteElement(state, index) {
      // удалить элемент по индексу
      state.elements.splice(index, 1);
      state.focusElement = null
    },
    loadElements(state, elements) {
      // добавляет элементы. Служит для загрузки старых блок-схем
      state.elements = elements;
    },
    changeElement(state, indexAndnewData) {
      state.elements[indexAndnewData.index] = indexAndnewData.newData;
    },
  },
});

export default store;
