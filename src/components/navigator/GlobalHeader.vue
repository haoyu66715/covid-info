<template>
    <div>
        <div class="globalTopImg">
            <div class="globalTop">
            <div class="globalTop_firstTitle">新型冠状病毒</div>
            <div class="globalTop_secondTitle">全球疫情实时追踪</div>
            <div class="globalTop_resource">数据来源：WHO与霍普金斯大学网站</div>
            
        </div>

        <img src="@/assets/image/worldPageBgImage.png" alt="" />
        </div>
        
        <div id="globalNum">

        </div>
    </div>
    
</template>

<script setup>

</script>

<style lang="less" scoped>
.globalTopImg{
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
.globalTop {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  text-align: center;
  color: #fff;
}
.globalTop_firstTitle{
    font-size: 18px;
    letter-spacing: 1px;
    margin-bottom: 3px;
}
.globalTop_secondTitle{
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 10px;
    letter-spacing: 2px;
}
.globalTop_resource{
    font-size: 15px;
    color: rgb(221, 221, 221);
    letter-spacing: 0.5px;
}
</style>