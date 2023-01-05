<template>
  <div id="ContentSplit">
    <div class="split_text">{{text}}</div>
    <div  class="split_btn" >
      <!-- <img src="@/assets/image/shareBlueIcon.svg" alt="">{{props.btnText}} -->
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    text: {
      type: String,
      default: '分割线'
    },
    // btnText: {
    //   type: String,
    //   default: ''
    // }
})
 
</script>
<style scoped>
#ContentSplit{
  width: 100%;
  height: 20px;
  /* background-color: #000; */
  box-sizing: border-box;
  border-left: 4px solid var(--color);
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
  position: relative;
  color: #0099FF;
}
.split_text{
  color: var(--color);
  font-size: 18px;
  text-indent: 8px;
  display: flex;
  align-items: center;
  font-weight: 550;
  position: relative;
  top: -0.5px;
  letter-spacing: 2px;
}
.split_btn {
  border: 1px solid var(--color);
  color: var(--color);
  padding: 3px 12px 3px 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
  border-radius: 20px;
}
.split_btn:active {
  background-color: rgb(247, 247, 247);
}
.split_btn img {
  width: 20px;
  margin-right: 3px;
}
</style>