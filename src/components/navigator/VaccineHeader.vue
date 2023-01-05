<template>
    <div id="VaccineInformation">
      <div class="vac_top_container">
        <div class="vac_top_bgImg">
          <img src="@/assets/image/vaccinePageBgImage.jpg" alt="">
        </div>
        <div class="vac_top_textBox">
          <div class="textBox_title">全球新冠疫苗</div>
          <div class="textBox_title2">接种情况实时追踪</div>
          <div class="textBox_title3">数据来源：ourworldindata，WHO等官方数据</div>
        </div>
      </div>
    </div>
</template>
<style scoped>

#VaccineInformation{
  width: 100%;
  margin-bottom: calc(45px + var(--marginB));
  background-color: #fff;
}
.vac_top_container{
  width: 100%;
  position: relative;
}
.vac_top_bgImg{
  width: 100%;
  height: 170px;
  position: relative;
  overflow: hidden;
}
.vac_top_bgImg img{
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.vac_top_textBox{
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  text-align: center;
  color: #fff;
}
.textBox_title{
  font-size: 18px;
  /* font-weight: bold; */
  letter-spacing: 2px;
  margin-bottom: 3px;
}
.textBox_title2{
  font-size: 35px;
  letter-spacing: 2px;
  margin-bottom: 3px;
}
.textBox_title3{
  font-size: 15px;
  color: rgba(255, 255, 255, 0.63);
}
</style>
