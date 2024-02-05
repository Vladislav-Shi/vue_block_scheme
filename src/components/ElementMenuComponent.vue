<template>
    <div class="context-menu" :style="dynamicMenu">
        <ul class="list-group">
            <button class="list-group-item list-group-item-action">Удалить блок</button>
            <button class="list-group-item list-group-item-action">Копировать</button>
            <label class="list-group-item">
                <input class="form-check-input" type="checkbox" v-model="EditedData.hasFill" @change="ChangeFill"> Есть заливка
            </label>
            <button class="list-group-item list-group-item-action" @click="chooseColor">Выбрать цвет</button>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ElementMenuComponent',
    props: {
        ElementIndex: Number,
        menu: Object
    },
    data() {
        return {
            EditedData: null,
        }
    },
    computed: {
        getData() {
            return this.$store.state.elements[this.ElementIndex]
        },
        dynamicMenu() {
            // Положение меню
            return {
                left: this.menu.contextMenuLeft - this.EditedData.left + "px",
                top: this.menu.contextMenuTop - this.EditedData.top + "px",
            }
        },
    },
    methods: {
        saveChanges() {
            // Вызываем метод из родительского компонента для обновления данных
            this.$store.commit('changeElement', { 'index': this.ElementIndex, 'newData': this.EditedData })
        },

        ChangeFill(){
            // Меняет режим заливки
            console.log('ChangeFill')
            this.saveChanges()
        }

    },
    created() {
        console.log('element menu', this.ElementIndex)
        this.EditedData = this.getData
    },

}
</script>

<style>
.context-menu {
    width: 10rem;
    font-size: 0.7rem;
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 5px;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    position: absolute;
}
</style>