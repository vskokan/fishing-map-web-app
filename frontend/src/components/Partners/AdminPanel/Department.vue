<template>
  <div class="departmentContainer">
    <div class="department">
      <div class="info">
        <div class="location">
          <i class="fas fa-city"></i>
          {{ department.location }}
        </div>
        <div class="adress">
          <i class="fas fa-building"></i>
          {{ department.adress }}
        </div>
      </div>
      <div class="actions">
        <i class="fas fa-pen"></i>
        <i class="fas fa-trash"></i>
      </div>
    </div>
    <div class="department-edit"></div>
  </div>
</template>

<script>
export default {
  props: ["department"],
};
</script>

<style scoped>
.department {
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  width: 30vw;
}

.info,
.location,
.adress {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #000;
  font-size: 20px;
  font-family: "Inter", sans-serif;
  /* text-transform: uppercase; */
}

.info .fas {
  margin-right: 5px;
}

.adress {
  margin-left: 20px;
}

.actions .fas {
    margin: 0px 5px;
    color: var(--color-darkgray)
}

.actions .fas:hover {
    cursor: pointer;
    color: var(--color-violet)
}

</style>
