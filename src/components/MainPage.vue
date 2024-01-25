<template>
    <div class="header">
      <h1>Редактирование блок-схемы</h1>
    </div>
    <div class="container-fluid">
      <div class="row mt-2">
        <div class="col-2">
            <MenuComponent></MenuComponent>
        </div>
        <div class="col editor">
            <EditorComponent></EditorComponent>
        </div>
      </div>
    </div>
</template>

<style>
      .header {
        background-color: #333;
        color: #fff;
        padding: 10px;
        text-align: center;
        width: 100%;
      }
</style>

<script>
import EditorComponent from './EditorComponent.vue'
import MenuComponent from './MenuComponent.vue'

export default {
  name: 'MainPage',
  components: {
    EditorComponent,
    MenuComponent
  }

}
</script>