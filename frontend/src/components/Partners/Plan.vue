<template>
    <div class="plan">
        {{plan.name}} {{plan.description}}
    </div>
</template>

<script>
export default {
    props: ['plan']
}
</script>