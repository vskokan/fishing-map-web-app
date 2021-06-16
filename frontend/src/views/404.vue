<template>
    <div class="empty">
        <div class="container">
            <div class="header">404</div>
            <div class="text">Не найдено, что-то пошло не так 🤔</div>
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
        height:84vh;
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