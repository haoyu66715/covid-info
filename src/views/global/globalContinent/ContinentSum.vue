<template>
    <div class="common-layout">
        <Wait/>
        <el-container>
            <el-header class="global_header"><GlobalHeader/></el-header>
            <el-container>
                <Container/>

                <el-main class="global_main">
                     <GlobalMain/>
                     <content-split
                        class="split"
                        :btnText="'疫情地图'"
                        :text="'各大洲分布情况'"
                    ></content-split>
                    <ContinentDate/>
                </el-main>
            </el-container>
        </el-container>
        
    </div>
    
    
</template>


<script setup >
import Container from '@/components/navigator/Container.vue'
import GlobalHeader from '@/components/navigator/GlobalHeader.vue'
import GlobalMain from '@/components/navigator/GlobalMain.vue'
import ContinentDate from './childs/ContinentDate.vue'
import Wait from '@/components/wait/Wait.vue';

import {ref} from 'vue'
import { getAllCountryData } from "@/api/worldReport"; // 网络请求
import {useStore} from "vuex"

</script>


<style scoped>
.global_header{
  position: relative;
  height: 170px ;
  margin: 0;
  padding: 0;
}

.global_main {
  padding: 0;
  margin: 0;
}

.split{
    padding-left: 20px;
    padding-top:30px;
}

</style>
