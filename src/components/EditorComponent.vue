<template>
  <div>
    <h2>Поле редактирования</h2>
    <div @drop="paintFigure" id="editorField" @dragover="allowDrop">
      <EditorElement v-for="(item, index) in getData"
                                                                                                                                                                                                                                                                          draggable="false"
                                                                                                                                                                                                                                                                          @dblclick="ElementFocus(index)"
                                                                                                                                                                                                                                                                          :key="index"
                                                                                                                                                                                                                                                                          :ElementIndex="index" />
    </div>

  </div>
</template>

<style>
#editorField {
  width: 95%;
  height: 60vh;
  background-image: linear-gradient(rgba(204, 204, 204, 0.5) 1px,
      transparent 1px),
    linear-gradient(90deg, rgba(204, 204, 204, 0.5) 1px, transparent 1px);
  background-size: 20px 20px;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
}
</style>

<script>
import EditorElement from './EditorElement.vue'

export default {
  name: 'EditorComponent',
  data() {
    return {
      // editorElements: [],
      focusElement: null
    }
  },
  computed:
  {
    getData() {
      return this.$store.state.elements
    }
  },
  components: {
    EditorElement
  },
  mounted() {
    // Добавляем слушатель события нажатия клавиши "Delete" на уровне родительского компонента
    window.addEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    allowDrop() {
      // Разрешаем событие "drop"
      event.preventDefault();

      const draggedElementId = event.dataTransfer.getData('text/plain')
      // Проверяем, содержит ли перетаскиваемый элемент нужный класс
      if (draggedElementId == 'SquareMenuButton') {
        // Разрешаем событие drop
        event.dataTransfer.dropEffect = 'move';
      } else {
        // Запрещаем событие drop, если класс не совпадает
        event.dataTransfer.dropEffect = 'none';
      }
    },
    paintFigure() {
      var x = event.clientX
      var y = event.clientY

      console.log("Элемент отпущен по координатам: X=" + x + ", Y=" + y)

      this.$store.commit('addRectangle', {'left_':x, 'top_': y})
    },

    ElementFocus(index) {
      console.log('focus')
      this.$store.commit('setFocusElement', index)
    },

    handleKeyDown() {
      // Проверяем, что была нажата клавиша "Delete" и элемент выбран
      if (event.key === 'Delete') {
        this.deleteElement();
      }
    },
    deleteElement() {
      if (this.$store.getters.hasFocused) {
        this.$store.commit('deleteElement', this.$store.state.focusElement)
      }
    }
  }
}
</script>