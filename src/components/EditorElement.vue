<template>
    <div @contextmenu.prevent="showContextMenu($event)" :style="dynamicStyle" draggable="false" :class="dynamicClass">
        <SvgElement :data_="data_"/>
        <div v-if="DynamicSelect">
            <div v-for="(point, index) in getUpperPointCoordinate" draggable="true" class="resize-point" :key="index" :id="point.id" :style="point.style" @dragend="point.dragend"></div>
        </div>
        <!-- <p contenteditable ref="editableP" @input="handleInput">{{ }}</p> -->

        <!-- Контекстное меню -->
        <div v-if="menu.contextMenuVisible" class="context-menu" :style="dynamicMenu">
            <ul class="list-group">
                <button class="list-group-item list-group-item-action">Удалить блок</button>
                <button class="list-group-item list-group-item-action">Копировать</button>
                <label class="list-group-item">
                    <input class="form-check-input" type="checkbox" v-model="hasFill"> Есть заливка
                </label>
                <button class="list-group-item list-group-item-action" @click="chooseColor">Выбрать цвет</button>
            </ul>
        </div>
    </div>
</template>

<style>
.circle {
    width: 50px;
    height: 50px;
    border: solid #333;
    border-radius: 50px;
    border-width: 3px 3px 3px 3px;
    background-color: cadetblue;
    position: absolute;
}

.squadre {
    /* border: solid #333;
    border-radius: 5px;
    border-width: 3px 3px 3px 3px;
    background-color: #55a; */
    position: absolute;
    /* display: flex; */

    /* align-items: center;
    justify-content: center; */

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


.context-menu {
    width: 10rem;
    font-size: 0.7rem;
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 5px;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>

<script>
import SvgElement from './SvgElement.vue'


export default {
    name: 'EditorElement',
    props: {
        data_: Object,
        editElement: Function,
        ElementIndex: Number,
    },
    components:{
        SvgElement
    },

    data() {
        return {
            EditedData: this.data_,
            menu: {
                contextMenuVisible: false,
                contextMenuTop: 0,
                contextMenuLeft: 0,
                hasFill: false
            }
        }
    },
    computed: {
        dynamicClass() {
            /**
             * Метод отвечает за отрисовку класса обьекта
             */
            let class_ = []
            if (this.data_.selected) {
                class_.push('selected')
            }
            class_.push(this.data_.class_)
            return class_;
        },
        dynamicStyle() {
            /**
             * Отвечает за положение и размер обьекта
             */
            return {
                left: this.EditedData.left -2 + "px",
                top: this.EditedData.top -2 + "px",
                width: this.EditedData.width +2 + "px",
                height: this.EditedData.height +2 + "px",
            }
        },
        DynamicSelect() {
            return this.data_.selected
        },
        dynamicMenu() {
            // Положение меню
            return {
                left: this.menu.contextMenuLeft - this.EditedData.left + "px",
                top: this.menu.contextMenuTop - this.EditedData.top + "px",
            }
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
            this.editElement(this.ElementIndex, this.EditedData);
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
        handleInput() {
            // Обработка изменений в редактируемом теге p
            const editedText = this.$refs.editableP.innerText;
            console.log('Изменения:', editedText);
        }
    }

}
</script>