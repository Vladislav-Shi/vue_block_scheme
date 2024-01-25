<template>
    <div id="leftMenu">
    <h2>Список фигур</h2>
    <ul class="list-group">
        <li class="list-group-item" draggable="true" id="SquareMenuButton" @dragstart="dragStartEvent">Квадрат</li>
        <li class="disabled list-group-item">A second item</li>
        <li class="list-group-item disabled">A third item</li>
        <li class="list-group-item disabled">A fourth item</li>
        <li class="list-group-item disabled">And a fifth one</li>
    </ul>
    </div>
</template>

<style>
    #leftMenu {
    text-align: center;
    }
    #leftMenu li:hover {
    cursor: grab;
    }
    #leftMenu li.a:hover {
    cursor: pointer;
    }
</style>

<script>
export default {
name: 'MenuComponent',
methods: {
    dragStartEvent(){
        event.dataTransfer.clearData();
        event.dataTransfer.setData("text/plain", event.target.id)
    }
}
}
</script>