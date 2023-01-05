<template>
    <div class="common-layout">
        <Wait/>
        <el-container>
            <el-header class="vaccine_header"><VaccineHeader/></el-header>
            <el-container>
                <Container/>

                <el-main class="vaccine_main">
                     <VaccineMain/>
                     <content-split
                        class="split"
                        :btnText="'疫情地图'"
                        :text="'全球疫苗疫情接种分布'"
                    ></content-split>
                     <VaccineMap/>
                     <p>各国接种疫苗人数</p>
                </el-main>
            </el-container>
        </el-container>
        
    </div>
    
    
</template>

<script setup >
import Container from '@/components/navigator/Container.vue'
import VaccineHeader from '@/components/navigator/VaccineHeader.vue'
import VaccineMain from '@/components/navigator/VaccineMain.vue'
import VaccineMap from './childs/VaccineMap.vue';
import { onUnmounted } from 'vue';
import Wait from '@/components/wait/Wait.vue';
</script>

<style scoped>
.vaccine_header{
  position: relative;
  height: 170px ;
  margin: 0;
  padding: 0;
}

.vaccine_main {
  padding: 0;
  margin: 0;
}

.split{
    padding-left: 20px;
    padding-top:30px;
}
p{
    text-align: center;
    margin-top:15px ;
    font-size:20px
}
</style>
