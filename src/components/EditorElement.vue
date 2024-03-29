<template>
    <div ref="ElementBoard" @contextmenu.prevent="showContextMenu($event)" :style="dynamicStyle" draggable="true" @mousedown="startDrag" @mouseup="stopDrag" :class="dynamicClass">
        <SvgElement :data_="EditedData" />
        <div v-if="DynamicSelect">
            <div v-for="(point, index) in getUpperPointCoordinate" draggable="true" class="resize-point" :key="index" :id="point.id" :style="point.style" @dragend="point.dragend"></div>
        </div>
        <!-- <p contenteditable ref="editableP" @input="handleInput">{{ }}</p> -->

        <!-- Контекстное меню -->
        <ElementMenuComponent v-if="menu.contextMenuVisible" :ElementIndex="ElementIndex" :menu="menu">
        </ElementMenuComponent>
    </div>
</template>

<style>
.squadre {
    position: absolute;
}


.squadre:hover {
    outline: 2px solid aquamarine;
}

.selected {
    outline: dotted #333;
}

.resize-point {
    width: 7px;
    height: 7px;
    border-radius: 7px;
    background-color: darkgrey;
    position: absolute;
}

.resize-point:hover {
    width: 8px;
    height: 8px;
    outline: 1px solid aquamarine;
    cursor: all-scroll;
}
</style>

<script>
import SvgElement from './SvgElement.vue'
import ElementMenuComponent from './ElementMenuComponent.vue'


export default {
    name: 'EditorElement',
    props: {
        ElementIndex: Number,
    },
    components: {
        SvgElement,
        ElementMenuComponent
    },

    data() {
        return {
            EditedData: null,
            menu: {
                contextMenuVisible: false,
                contextMenuTop: 0,
                contextMenuLeft: 0,
            },
            isDragging: false,
            initialMouseX: 0,
            initialMouseY: 0,
        }
    },
    computed: {
        getData(){
            return this.$store.state.elements[this.ElementIndex]
        },
        dynamicClass() {
            /**
             * Метод отвечает за отрисовку класса обьекта
             */
            let class_ = []
            if (this.EditedData.selected) {
                class_.push('selected')
            }
            class_.push(this.EditedData.class_)
            return class_;
        },
        dynamicStyle() {
            /**
             * Отвечает за положение и размер обьекта
             */
            return {
                left: this.EditedData.left - 2 + "px",
                top: this.EditedData.top - 2 + "px",
                width: this.EditedData.width + 2 + "px",
                height: this.EditedData.height + 2 + "px",
            }
        },
        DynamicSelect() {
            return this.EditedData.selected
        },

        getUpperPointCoordinate() {
            /**
             * Координаты верхней точки для редактирования
             */
            return [
                {
                    id: 'upper-poit',
                    style: { left: Math.floor(this.EditedData.width / 2) - 6 + "px", top: -6 + "px" },
                    dragend: this.upperResize
                },
                {
                    id: 'bott-poit',
                    style: { left: Math.floor(this.EditedData.width / 2) - 6 + "px", top: this.EditedData.height - 6 + "px" },
                    dragend: this.bottResize
                },
                {
                    id: 'left-poit',
                    style: { left: -6 + "px", top: Math.floor(this.EditedData.height / 2) - 6 + "px" },
                    dragend: this.leftResize
                },
                {
                    id: 'right-poit',
                    style: { left: this.EditedData.width - 6 + "px", top: Math.floor(this.EditedData.height / 2) - 6 + "px" },
                    dragend: this.rightResize
                }
            ]
        },
    },
    methods: {
        saveChanges() {
            // Вызываем метод из родительского компонента для обновления данных
            this.$store.commit('changeElement', {'index':this.ElementIndex, 'newData': this.EditedData})
        },

        // Перетаскивание элемента
        startDrag(event) {
            if (this.EditedData.selected) {
                this.isDragging = true;
                this.initialMouseX = event.clientX;
                this.initialMouseY = event.clientY;
                this.initialElementX = this.$refs.ElementBoard.offsetLeft
                this.initialElementY = this.$refs.ElementBoard.offsetTop;

                document.addEventListener('mousemove', this.handleMouseMove);
                document.addEventListener('mouseup', this.stopDrag);
            }
        },
        handleMouseMove(event) {
            if (this.isDragging) {
                const deltaX = event.clientX - this.initialMouseX;
                const deltaY = event.clientY - this.initialMouseY;

                this.EditedData.left = this.initialElementX + deltaX;
                this.EditedData.top = this.initialElementY + deltaY;

                this.saveChanges()
            }
        },
        stopDrag() {
            this.isDragging = false;
            document.removeEventListener('mousemove', this.handleMouseMove);
            document.removeEventListener('mouseup', this.stopDrag);
        },

        /**
         * 
         * Кнопки управления размерами блока
         * 
         * */
        upperResize() {
            const stopPosition = event.clientY
            // Нижняя точка фигуры
            const botHeight = this.EditedData.top + this.EditedData.height
            if (stopPosition > botHeight) {
                this.EditedData.height = stopPosition - botHeight
                this.EditedData.top = botHeight
            }
            else {
                this.EditedData.height = botHeight - stopPosition
                this.EditedData.top = stopPosition
            }
            this.saveChanges()
        },
        bottResize() {
            const stopPosition = event.clientY
            if (stopPosition < this.EditedData.top) {
                this.EditedData.height = this.EditedData.top - stopPosition
                this.EditedData.top = stopPosition
            }
            else {
                this.EditedData.height = stopPosition - this.EditedData.top
            }
        },
        leftResize() {
            const stopPosition = event.clientX
            const botWidh = this.EditedData.left + this.EditedData.width
            if (stopPosition > botWidh) {
                this.EditedData.width = stopPosition - botWidh
                this.EditedData.left = botWidh
            }
            else {
                this.EditedData.width = botWidh - stopPosition
                this.EditedData.left = stopPosition
            }
            this.saveChanges()
        },
        rightResize() {
            const stopPosition = event.clientX
            if (stopPosition < this.EditedData.left) {
                this.EditedData.width = this.EditedData.left - stopPosition
                this.EditedData.left = stopPosition
            }
            else {
                this.EditedData.width = stopPosition - this.EditedData.left
            }
        },

        showContextMenu(event) {
            // Показываем контекстное меню
            this.menu.contextMenuVisible = true;

            // Устанавливаем позицию контекстного меню
            this.menu.contextMenuTop = event.clientY;
            this.menu.contextMenuLeft = event.clientX;

            console.log(event.clientY, event.clientX)

            // Закрываем контекстное меню при клике вне него
            const closeMenu = () => {
                this.menu.contextMenuVisible = false;
                window.removeEventListener('click', closeMenu);
            };

            window.addEventListener('click', closeMenu);

            // Предотвращаем стандартное контекстное меню браузера
            event.preventDefault();
        },
        closeContextMenu() {
            // Закрываем контекстное меню при клике вне него
            this.menu.contextMenuVisible = false;
        },
    },
    created(){
        this.EditedData = this.getData
    },

}
</script>