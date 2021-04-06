<template>
    <div class="footer">
        <div class="mail">
            <i class="fas fa-envelope"></i>
            <span>victoriaskokan@gmail.com</span>
        </div>
        <div class="copyright">
            2021 Made by Skokan V
        </div>
        <div class="socials">
            <i class="fab fa-vk"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-telegram-plane"></i>
        </div>
    </div>
</template>

<style scoped>
    .footer {
        height: 6vh;
        font-size: 22px;
        background-color: var(--color-violet);
        color: rgb(255, 255, 255);
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: 'Rubik', sans-serif;
    }

    .mail, .socials, .copyright {
        width: 16vw;
        font-size: 18px;

    }

    .fas, .fab {
        margin: 0px 5px;
    }
</style>