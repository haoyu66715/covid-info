<template>
    <div class="reportTable">
      
        <div v-if="state.demosticList" class="report_basis_table">
            <div class="marginT table_top">
                <div class="confirmColor marginL basis_table_item">
                    <div class="table_item_title">现存确诊</div>
                    <div class="table_item_num">
                        {{ state.demosticList.chinaTotal.nowConfirm }}
                    </div>
                    <div class="table_item_add">
                        {{ addCount(state.demosticList.chinaAdd.nowConfirm)  }}
                    </div>
                </div>
                <div class="fectColor marginL basis_table_item">
                    <div class="table_item_title">现存无症状</div>
                    <div class="table_item_num">
                        {{ state.demosticList.chinaTotal.noInfect }}
                    </div>
                    <div class="table_item_add">
                        {{ addCount(state.demosticList.chinaAdd.noInfect)}}
                    </div>
                </div>
                <div class="suspectColor marginL basis_table_item">
                    <div class="table_item_title">现存疑似</div>
                    <div class="table_item_num">
                        {{ state.demosticList.chinaTotal.suspect}}
                    </div>
                    <div class="table_item_add">
                        {{addCount(state.demosticList.chinaAdd.suspect)}}
                    </div>
                </div>
                <div class="SevereColor basis_table_item">
                    <div class="table_item_title">现存确诊重症</div>
                    <div class="table_item_num">
                        {{ state.demosticList.chinaTotal.nowSevere }}
                    </div>
                    <div class="table_item_add">
                        {{addCount(state.demosticList.chinaAdd.nowSevere)  }}
                    </div>
                </div>
            </div>


            <div class="marginT table_bottom">
                <div class="confirmSumColor marginL basis_table_item">
                    <div class="table_item_title">累计确诊</div>
                    <div class="table_item_num">
                        {{state.demosticList.chinaTotal.confirm}}
                    </div>
                    <div class="table_item_add">
                        {{addCount(state.demosticList.chinaAdd.confirm)  }}
                    </div>
                </div>

                <div class="healSumColor marginL basis_table_item">
                    <div class="table_item_title">累计治愈</div>
                    <div class="table_item_num">
                        {{state.demosticList.chinaTotal.heal}}
                    </div>
                    <div class="table_item_add">
                        {{ addCount(state.demosticList.chinaAdd.heal) }}   
                    </div>
                </div>

                <div class="dealSumColor marginL basis_table_item">
                    <div class="table_item_title">累计死亡</div>
                    <div class="table_item_num">
                        {{state.demosticList.chinaTotal.dead}}
                    </div>
                    <div class="table_item_add">
                        {{ addCount(state.demosticList.chinaAdd.dead) }}
                    </div>
                </div>

                <div class="importedCaseSumColor basis_table_item">
                    <div class="table_item_title">累计境外输入</div>
                    <div class="table_item_num">
                        {{state.demosticList.chinaTotal.importedCase}}
                    </div>
                    <div class="table_item_add">
                        {{ addCount(state.demosticList.chinaAdd.importedCase)}}
                    </div>
                </div>

            </div>
        </div>
        <div v-if="state.demosticList" class="pushTime">统计截至：{{ state.demosticList. lastUpdateTime}}</div>
    </div>
</template>


<script setup>
import { getDemosticDetail } from "@/api/demosticReport"; // 网络请求
import {reactive,onMounted} from "vue";
import {useStore} from "vuex"

const state = reactive(
    {demosticList:null},
)
const store = useStore();



onMounted(async () =>{
    // DemosticDetail(state.demosticList);
    let res = await getDemosticDetail();
    store.state.demosticDetail = res.data.data.diseaseh5Shelf; 
    store.state.demosticList = store.state.demosticDetail;
    state.demosticList = res.data.data.diseaseh5Shelf;
    return {state}
})

function addCount(val){
     if (val > 0) {
      return '较昨日+' + val
    } else if (val == 0) {
      return '较昨日无新增'
    } else {
      return '较昨日' + val
    }
}
</script>

<style lang="less" scoped>


.reportTable{
    height: 235px;
}

.report_basis_table {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, .08);
}

.pushTime {
  margin-top: 8px;
  font-size: 15px;
  text-align: right;
  color: rgb(131, 131, 131);
//   margin-bottom: var(--marginB);
  margin-right: 8px;
  height: 20px;
  margin-bottom: 10px;
}

.marginL {
  margin-right: 1px;
}
.marginT {
  margin-top: 1px;
}

.table_top{
    height: 100px;
    display: flex;
    justify-content: space-around;
    .confirmColor{
        background-color: hsla(0, 100%, 64%, 0.11);
        .table_item_num{
            color: #ff4747;
        }
        
    }

    .fectColor{
        background-color: hsla(32, 100%, 65%, 0.11);
        .table_item_num{
            color: #ffac4e;
        }
        
    }
    .suspectColor{
        background-color: hsla(281, 100%, 73%, 0.11);
        .table_item_num{
            color: rgb(211, 116, 255);
        }
    }
    .SevereColor{
        background-color: hsla(295, 92%, 35%, 0.11);
        .table_item_num{
            color: #9c07aa;
        }
    }

    
}

.table_bottom{
    height: 100px;
    display: flex;
    justify-content: space-around;
    .confirmSumColor{
         background-color: hsla(0, 74%, 42%, 0.11);
         .table_item_num{
                color: #b91c1c;
         }
    }
    .healSumColor{
        background-color: hsla(115, 93%, 44%, 0.11);
        .table_item_num{
            color: #19d808;
        }
    }
    .dealSumColor{
         background-color: hsla(0, 0%, 51%, 0.11);
         .table_item_num{
            color: #838383;
         }
    }
    .importedCaseSumColor{
        background-color: hsla(29, 100%, 53%, 0.11);
        .table_item_num{
            color: #ff8411;
        }
    }


}


.basis_table_item {
  flex: 1;
  padding: 10px 4px;
}


.table_item_title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  letter-spacing: 0.5px;
  margin-bottom: 0.5px;
}
.table_item_num {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 0.5px;
}
.table_item_add {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #777777;
}

</style>