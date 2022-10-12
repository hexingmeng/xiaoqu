<template>
  <div class="notices">
    <div class="notice_top">
      <isForm v-model.sync="table.page" :formList="topFormObj.topFormList">
        <template v-slot:btn="scope">
          <el-button icon="el-icon-search" size="mini" @click="quer">查询</el-button>
          <el-button style="color:#ff7670" icon="el-icon-close" size="mini" @click="reset">重置</el-button>
          <el-button icon="el-icon-plus" size="mini" type="primary" @click="newAdd">新增</el-button>
        </template>
      </isForm>
    </div>
    <isTable :list="noticeList" :listInfo="listInfo" :height="height">
      <template v-slot:btn="scope">
        <el-button icon="el-icon-edit" type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="delte(scope.row.noticeId)">删除</el-button>
      </template>
    </isTable>
    <isPagination :currentPage="table.page.currentPage" :pageSizes="pageSizes" :pageSize="table.page.pageSize" :total="table.page.total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></isPagination>

    <isDialog :title="dialog.title" :dialogVisible.sync="dialog.dialogVisible" :width="dialog.width">
      <template v-slot:form="scope">
        <isForm  ref="form" v-model.sync="dialog.form" :formList="dialog.dialogFormList" :rules="dialog.rules" @formScree="formScree">
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
import { getList,getNewAdd,getEdit,getDelte } from "@/api/noticeList/api";
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
            label: "标题",
            prop: "title",
            size: "mini",
            width: "width:184px",
          },
        ],
      },
      table: {
        page: {
          currentPage: 1,
          pageSize: 5,
          total: 0,
          title: "",
        },
      },
      noticeList: [],
      listInfo: [
        {
          type: "",
          label: "标题",
          prop: "title",
        },
        {
          type: "",
          label: "内容",
          prop: "noticeContent",
        },
        {
          type: "",
          label: "时间",
          prop: "createTime",
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
            type: "input",
            label: "标题",
            prop: "title",
            size: "small",
            width: "width:520px",
          },
          {
            type: "textarea",
            label: "内容",
            prop: "noticeContent",
            width: "width:520px",
          },
        ],
        form: {
          title: "",
          noticeContent: "",
          editType:'0',
          noticeId:'',
          userId:'',
        },
        rules: {
          title: [
            { required: true, message: "请输入标题", trigger: "blur" },
          ],
           noticeContent: [
            { required: true, message: "请输入内容", trigger: "blur" },
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
      this.dialog.title = "新增公告";
      this.dialog.dialogVisible = true;
      for (let i in this.dialog.form){
        this.dialog.form[i]=''
      }
    },
    //确认
    addOk(){
      this.$refs["form"].formScree()
      if (this.formFlag) {
        console.log(this.formFlag);
        if (this.dialog.form.editType==='1') {
          this.handeEdit()
        }else{
          this.handelNewAdd()
        }
      }
    },
    //校验
    formScree(val){
       console.log(val);
       this.formFlag = val
    },
    //取消
    cancel(){
      this.$refs['form'].cancel()
    },
    //新增确认AIP
   async handelNewAdd(){
      try {
        const res = await getNewAdd(this.dialog.form)
         this.handelList();
         this.dialog.dialogVisible=false
        console.log(res);
      } catch (error) {
        
      } 
    },
    //编辑
    edit(row){
      this.dialog.title="编辑公告"
      console.log(row);
      this.dialog.form = JSON.parse(JSON.stringify(row))
      this.dialog.form.editType='1'
      this.dialog.dialogVisible=true
    },
    //编辑接口
    async handeEdit(){
      try {
        const res = await getEdit(this.dialog.form)
        this.dialog.dialogVisible=false
        this.handelList();
        console.log(res);
      } catch (error) {
        
      }
    },
    //删除接口
    async handelDel(id){
      try {
        const res = await getDelte(id)
        this.handelList();
        console.log(res);
      } catch (error) {
        
      }
    },
    //删除
    delte(id){
      console.log(id);
      this.handelDel(id)
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
    margin-left: 20px;
    font-size: 700;
  }
}
</style>
