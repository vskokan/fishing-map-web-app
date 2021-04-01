<template>
    <div class="mainSettings">
       Смена пароля для {{ user.login }}
    </div>
</template>

<script>

//import { mapGetters } from 'vuex'
//import { mapActions } from 'vuex'

export default {
    props: ['user'],
    methods: {
        //...mapActions([''])
    }
}
</script>