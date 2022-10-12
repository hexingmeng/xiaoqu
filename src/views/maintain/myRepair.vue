<template>
  <div class="notices">
    <div class="notice_top">
      <isForm v-model.sync="table.page" :formList="topFormObj.topFormList">
        <template v-slot:btn="scope">
          <el-button icon="el-icon-search" size="mini" @click="quer">查询</el-button>
          <el-button style="color: #ff7670" icon="el-icon-close" size="mini" @click="reset">重置</el-button>
          <el-button icon="el-icon-plus" size="mini" type="primary" @click="newAdd">新增</el-button>
        </template>
      </isForm>
    </div>
    <isTable :list="noticeList" :listInfo="listInfo" :height="height">
      <template v-slot:btn="scope">
        <el-button icon="el-icon-edit" type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="delte(scope.row.repairId)">删除</el-button>
      </template>
    </isTable>
    <isPagination :currentPage="table.page.currentPage" :pageSizes="pageSizes" :pageSize="table.page.pageSize" :total="table.page.total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></isPagination>

    <isDialog :title="dialog.title" :dialogVisible.sync="dialog.dialogVisible" :width="dialog.width">
      <template v-slot:form="scope">
        <isForm ref="form" v-model.sync="dialog.form" :formList="dialog.dialogFormList" :rules="dialog.rules" @formScree="formScree">
        </isForm>
      </template>
      <template v-slot:btn="scope">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addOk">确 定</el-button>
      </template>
    </isDialog>
  </div>
</template>

<script>
import isForm from "@/components/view/isForm.vue";
import isTable from "@/components/view/isTable.vue";
import isPagination from "@/components/view/isPagination.vue";
import isDialog from "@/components/view/isDialog.vue";
import { getList, getNewAdd, getEdit, getDelte } from "@/api/maintain/reair";
import {getUserId} from '@/utils/auth'
export default {
  components: {
    isForm,
    isTable,
    isPagination,
    isDialog,
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
          userId: '',
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
          label: "报修地址",
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
      dialog: {
        title: "",
        dialogVisible: false,
        width: "620px",
        dialogFormList: [
          {
            type: "textarea",
            label: "维修内容",
            prop: "repairContent",
            width: "width:480px",
          },
          {
            type: "input",
            label: "维修地点",
            prop: "repairAddress",
            size: "small",
            width: "width:480px",
          },
          {
            type: "input",
            label: "联系电话",
            prop: "phone",
            size: "small",
            width: "width:480px",
          },
          
        ],
        form: {
          phone: "",
          repairAddress: "",
          editType: "0",
          repairContent: "",
          repairId: "",
          userId:"",
        },
        rules: {
          phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
          repairAddress: [
            { required: true, message: "请输入维修地址", trigger: "blur" },
          ],
          repairContent: [
            { required: true, message: "请输入维修内容", trigger: "blur" },
          ],
        },
      },
    };
  },
  methods: {
    //获取全部数据
    async handelList() {
      try {
        const { data } = await getList(this.table.page);
        this.noticeList = data.records;
        this.table.page.total = data.total;
        console.log(this.table.page.total);
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
      this.table.page.title = "";
      this.handelList();
    },
    //新增按钮
    newAdd() {
          for (let i in this.dialog.form) {
        this.dialog.form[i] = "";
      }
      this.dialog.form.editType="0"
      this.dialog.form.userId='4'
      this.dialog.title = "新增公告";
      console.log(this.dialog.form);
      this.dialog.dialogVisible = true;
  
    },
    //确认
    addOk() {
    
      this.$refs["form"].formScree();
      if (this.formFlag) {
        console.log(this.formFlag);
        if (this.dialog.form.editType === "1") {
          this.handeEdit();
        } else {
          this.handelNewAdd();
        }
      }
    },
    //校验
    formScree(val) {
      console.log(val);
      this.formFlag = val;
    },
    //取消
    cancel() {
       this.dialog.dialogVisible = false;
      this.$refs["form"].cancel();
    },
    //新增确认AIP
    async handelNewAdd() {
      try {
        const res = await getNewAdd(this.dialog.form);
        this.handelList();
        this.dialog.dialogVisible = false;
        console.log(res);
      } catch (error) {}
    },
    //编辑
    edit(row) {
      this.dialog.title="编辑维修"
      console.log(row);
      this.dialog.form = JSON.parse(JSON.stringify(row));
      this.dialog.form.editType = "1";
      this.dialog.dialogVisible = true;
    },
    //编辑接口
    async handeEdit() {
      try {
        const res = await getEdit(this.dialog.form);
        this.dialog.dialogVisible = false;
        this.handelList();
        console.log(res);
      } catch (error) {}
    },
    //删除接口
    async handelDel(id) {
      try {
        const res = await getDelte(id);
        this.handelList();
        console.log(res);
      } catch (error) {}
    },
    //删除
    delte(id) {
      console.log(id);
      this.handelDel(id);
    },
  },
  created() {
    this.table.page.userId = getUserId()
    this.handelList();
  },
};
</script>

<style lang="scss" scoped>
.notices {
  padding: 20px;
  .notice_top {
    margin-left: 20px;
    font-size: 700;
  }
}
</style>
