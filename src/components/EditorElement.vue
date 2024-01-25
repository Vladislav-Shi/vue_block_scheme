<template>
    <div :style="dynamicStyle" draggable="false" :class="dynamicClass">
        <div v-if="DynamicSelect">
            <div v-for="(point, index) in getUpperPointCoordinate" draggable="true" class="resize-point" :key="index" :id="point.id" :style="point.style" @dragend="point.dragend"></div>
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
    border: solid #333;
    border-radius: 5px;
    border-width: 3px 3px 3px 3px;
    background-color: #55a;
    position: absolute;
}
.squadre:hover {
    outline: 1px solid aquamarine;
}

.selected {
    border: dotted #333;
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

export default {
    name: 'EditorElement',
    props: {
        data_: Object,
        editElement: Function,
        ElementIndex: Number
    },

    data() {
        return {
            EditedData: this.data_,
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
                left: this.EditedData.left + "px",
                top: this.EditedData.top + "px",
                width: this.EditedData.width + "px",
                height: this.EditedData.height + "px",
            }
        },
        DynamicSelect() {
            return this.data_.selected
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
        bottResize(){
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
        }
    }

}
</script>