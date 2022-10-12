<template>
  <div class="notices">
    <div class="notice_top">
      <isForm v-model.sync="table.page" :formList="topFormObj.topFormList">
        <template v-slot:btn="scope">
          <el-button icon="el-icon-search" size="mini" @click="quer">查询</el-button>
          <el-button style="color:#ff7670" icon="el-icon-close" size="mini" @click="reset">重置</el-button>
        </template>
      </isForm>
    </div>
    <isTable :list="noticeList" :listInfo="listInfo" :height="height">
      <template v-slot:btn="scope">
        <el-button icon="el-icon-edit" type="primary" size="mini" @click="dispose(scope.row.status)">处理</el-button>
      </template>
    </isTable>
    <isPagination :currentPage="table.page.currentPage" :pageSizes="pageSizes" :pageSize="table.page.pageSize" :total="table.page.total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></isPagination>

  </div>
</template>

<script>
import isForm from "@/components/view/isForm.vue";
import isTable from "@/components/view/isTable.vue";
import isPagination from "@/components/view/isPagination.vue";
import { getList} from "@/api/maintain/repair";
export default {
  components: {
    isForm,
    isTable,
    isPagination,
  },
  data() {
    return {
      topFormObj: {
        topFormList: [
          {
            type: "input",
            label: "报修内容",
            prop: "repairContent",
            size: "mini",
            width: "width:184px",
          },
        ],
      },
      table: {
        page: {
          total: 0,
          currentPage: 1,
          pageSize: 5,
          userId:'',
          repairContent: "",
        },
      },
      noticeList: [],
      listInfo: [
        {
          type: "",
          label: "报修内容",
          prop: "repairContent",
        },
        {
          type: "",
          label: "保修地址",
          prop: "repairAddress",
        },
        {
          type: "",
          label: "联系电话",
          prop: "phone",
        },
        {
          type: "status",
          label: "处理状态",
          prop: "status",
          callBack:(options)=>{
            console.log(options);
            return options=options==1?'已处理':'未处理'
          }
        },
        {
          type: "btn",
          label: "操作",
          width: 180,
        },
      ],
      height: 670,
      pageSizes: [5, 10, 15, 20],
    };
  },
  methods: {
    //获取全部数据
    async handelList() {
      try {
        const { data } = await getList(this.table.page);
        this.noticeList = data.records;
        this.table.page.total = data.total;
        console.log(this.noticeList);
      } catch (error) {
        console.log(error);
      }
    },
    //每页数量
    handleSizeChange(val) {
      this.table.page.pageSize = val;
      this.handelList();
    },
    //当前页数
    handleCurrentChange(val) {
      this.table.page.currentPage = val;
      this.handelList();
    },
    //查询
    quer() {
      this.handelList();
    },
    //重置
    reset() {
      this.table.page.repairContent = "";
      this.handelList();
    },
    //处理
    dispose(status){
      if (status==1) {
        this.$message.success('已处理，无法操作')
      }
    },
  },
  created() {
    this.handelList();
  },
};
</script>

<style lang="scss" scoped>
.notices {
  padding: 20px;
  .notice_top {
    margin-left: 40px;
  }
}
</style>
