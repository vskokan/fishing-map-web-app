<template>
    <div class="reviewCard">
        <div class="header">
            <div class="shortData">
                <div class="userData">
                    <div class="userpic">
                    </div>
                    <div class="data">
                        <div class="login">
                            {{review.login}}
                        </div>
                        <div class="location">
                            <img class="pin" src="../assets/icons/review/placeholder.svg">
                            <!-- <div class="waterbody">
                                {{review.waterbody.name}}
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="reviewDate">
                    {{review.reviewDate}}
                </div>
            </div>
            
        </div>
        <div class="main">
            <div class="mainInfo">
                <div class="feedback">
                    <img class="icon" src="../assets/icons/review/fishing.svg">
                    <div class="feedbacktext" >
                        {{review.isBaiting ? 'Клюет' : 'Не клюет'}}
                    </div>
                </div>
                <div class="description">
                    {{review.description}}
                </div>
                <div class="roadQuality">
                    <img class="icon" src="../assets/icons/review/car.svg">
                    <div class="qualitytext">
                        {{review.roadQuality ? 'Легко проехать' : 'Плохая дорога'}}
                    </div>
                </div>
            </div>
            <div class="tableContainer">
                <table class="catch">
                <tr class="tableHeader">
                    <th>
                        <img class="icon" src="../assets/icons/review/bucket.svg">
                    </th>
                    <th>
                        <img class="icon" src="../assets/icons/review/bait.svg">
                    </th>
                    <th>
                        <img class="icon" src="../assets/icons/review/rod.svg">
                    </th>
                </tr>
                <tr class="catchRow" v-for="row of review.catch" :key = "row">
                    <td class="fishes">
                        <span class="fish" v-for="fish of row.fish" :key = "fish">
                            {{fish}}
                        </span>
                    </td>
                    <td class="bait">
                        <span class="baittext">{{row.combination.bait.name}}</span>
                    </td>
                    <td class="method">
                        <span class="methodtext">{{row.combination.method.name}}</span>
                    </td>
                </tr>
            </table>
            </div>
            
            <div class="fishingTime">
                    <img class="icon" src="../assets/icons/review/clock.svg">
                    <div class="timeText">{{review.fishingTime}}</div>
            </div>
            <!-- <div class="photos">
                <div class="photo"></div>
            </div> -->
        </div>
       
        <button>Закрыть</button>
    </div>
</template>

<script>

    export default {
        props: {
            review: {
                type: Object,
                required: true
            },
            index: Number
        },
    }

</script>

<style scoped>
    
    .reviewCard {
        width: 600px;
        box-shadow: 0 0 25px rgba(14,42,71,.25);  
        border-radius: 5px;
        padding: 0px 0px 20px 0px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        min-height: 500px;
        z-index: 5;
    }

    .header {
        display: flex;
        flex-direction: column;
        padding-top: 20px;
        padding-bottom: 20px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background: linear-gradient(to right, #7c8e51, #69afce);
        margin-bottom: 30px;
        padding-left: 20px;
        color: #fff;
        font-family: 'Rubik', sans-serif;
       
    }

    .userpic {
        width: 55px;
        height: 55px;
        background-color: #69afce;
        border-radius: 5px;
    }

    .shortData {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .userData {
        display: flex;
        flex-direction: row;
        
    }

    .location {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .pin {
        height: 20px;
        width: 20px;
        margin-right: 2px;
    }

    .data {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        margin-left: 10px;
        height: 50px;
    }

    .login {
        font-weight: bold;
        font-size: 24px;
    }

    .reviewDate {
        margin-right: 20px;
    }

    /* MAIN INFO */

    .main {
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        overflow-y: auto;
        max-height: 500px;
        scroll-behavior: smooth;
    }

    .mainInfo {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 20px;
        margin-right: 40px;
    }

    .icon {
        height: 40px;
        width: 40px;
        margin-right: 10px;
    }

    .feedback, .roadQuality, .fishingTime {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: bold;
        font-family: 'Marmelad', sans-serif;
    }

    .roadQuality {
        margin-top: 20px;
    }
    .feedbacktext {
        font-size: 24px;
    }

    .description {
        width: 100%;
        margin-right: 20px;
        /* box-shadow: inset 0 0 2px rgba(14,42,71,.15); */
        background-color: #69b0ce09;
        text-align: left;
        padding: 10px;
        margin-top: 20px;
        margin-bottom: 5px;
        font-family: 'Rubik', sans-serif;
        border-radius: 5px;
    }

    .catch {
        margin-top: 20px;
        border-collapse: collapse;
        font-family: 'Rubik', sans-serif;
        /* display: flex;
        flex-direction: column; */
        /* justify-content: flex-start; */
        
        /* border: 1px solid rgb(241, 240, 240); */
        
        /* width: 700px; */
        
        /* display: flex;
        flex-direction: column;
        align-items: center; */
    }

    .fishingTime {
        padding-left: 20px;
        margin-top: 20px;
        align-self: start;
    }

    /* .catchRow {
        display: flex;
        flex-direction: row;
        margin-left: 20px;
        justify-content: space-between;
        margin-bottom: 10px;
    } */

    /* .fishList, .bait, .method  {
        width: 190px;
        
    } */
    
    /* .fish, .baitText, .methodText {
        
        box-shadow: inset 0 0 2px rgba(14,42,71,.15);
        background-color: #fafafa8a;
        margin: 5px;
        padding: 5px;
        border-radius: 5px;
        word-wrap: normal;
        
    }  */
    
    .photos {
        height: 110px;
        width: 550px;
        background-color: rgb(196, 196, 196);
        align-self: center;
        margin-top: 20px;
        display: flex;
        flex-direction: row;
    }

    button {
        width: 200px;
        align-self: center;
        margin-top: 20px;
    }

    .photo {
        width: 110px;
        height: 110px;
        box-shadow: inset 0 0 1px rgba(121, 143, 167, 0.75);
        background-color: #eff2f78a;  
    }
    
    th {
        
        width: 190px;
    }
    td {
        
        margin-top: 5px;
        margin-bottom: 5px;
        width: 190px;
    }

    tr {
        
        margin-top: 5px;
    }

    tr:nth-child(even) {
    background-color: #7c8e511a;
    }
    
    tr:nth-child(odd) {
    background-color:#69b0ce23;
    }
    th {
    background-color: #fff;
    }

    .tableContainer {
        display: flex;
        justify-content: center;
        /* margin-left: 20px; */
    }

    .fishes {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .fish, .baittext, .methodtext {
        margin-right: 5px;
        background-color:#ffffff;
        color: #000;
        border-radius: 5px;
        padding: 3px;
    }

    .baittext {
        width: auto;
    }
    
</style>