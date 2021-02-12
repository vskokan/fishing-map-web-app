<template>
    <div class="empty">
        <div class="container">
            <div class="header">Пусто...</div>
            <div class="text">Здесь будут таблички из базы данных</div>
        </div>
    </div>
</template>

<script>

//import TablesList from "@/components/Tables/TablesList"

export default {
    //components: { TablesList }
}
</script>

<style scoped>
    .empty {
        height:100%;
    }
    .container {
        height:90%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .empty .header {
        font-size: 100px;
    }
    .empty .text {
        font-size: 50px;
    }
</style>