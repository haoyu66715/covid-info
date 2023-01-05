<template>
    <div>
        <div class="domesticTopImg">
            <div class="domesticTop">
            <div class="domesticTop_firstTitle">新型冠状病毒</div>
            <div class="domesticTop_secondTitle">疫情实时大数据报告</div>
            <div class="domesticTop_resource">数据来源：国家及各地卫健委每日信息发布</div>
            
        </div>

        <img src="@/assets/image/homePageBgImage.png" alt="" />
        </div>
        
        <div id="domesticNum">

        </div>
    </div>
    
</template>

<script setup>

</script>

<style lang="less" scoped>
.domesticTopImg{
    width: 100%;
    position: relative;
    z-index: 0;
    height: 170px;
    padding-left: 0;
    img{
        width: 100%;
        height: 100%;
    }
}
.domesticTop {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  text-align: center;
  color: #fff;
}
.domesticTop_firstTitle{
    font-size: 18px;
    letter-spacing: 1px;
    margin-bottom: 3px;
}
.domesticTop_secondTitle{
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 10px;
    letter-spacing: 2px;
}
.domesticTop_resource{
    font-size: 15px;
    color: rgb(221, 221, 221);
    letter-spacing: 0.5px;
}
</style>