<template>
  <div>
    <h2>Поле редактирования</h2>
    <div @drop="paintFigure" id="editorField" @dragover="allowDrop">
      <EditorElement v-for="(item, index) in editorElements" draggable="false" @dblclick="ElementFocus(index)" :key="index" :editElement="editElement" :data_="item" />
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
      editorElements: [],
      focusElement: null
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

      this.$data.editorElements.push(
        {
          class_: "squadre",
          left: x,
          top: y,
          selected: false,
          width: 120,
          height: 70,
          text_: 'простой блок'
        }
      )
    },

    ElementFocus(index) {
      console.log('focus')
      if (this.focusElement != null) {
        this.editorElements[this.focusElement].selected = false
      }
      this.focusElement = index
      this.editorElements[this.focusElement].selected = true

    },
    editElement(index, updatedData) {
      // Обновляем данные по индексу
      this.editorElements[index] = updatedData
    },
    handleKeyDown() {
      // Проверяем, что была нажата клавиша "Delete" и элемент выбран
      if (event.key === 'Delete') {
        this.deleteElement();
      }
    },
    deleteElement() {
      this.editorElements.splice(this.focusElement, 1);
      this.focusElement = null
    }
  }
}
</script>