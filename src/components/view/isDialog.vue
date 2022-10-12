<template>
  <div>
    <el-dialog :title="title" :visible.sync="Visible" :width="width" >

      <slot name="form"></slot>

      <span slot="footer" class="dialog-footer">
        <slot name="btn"></slot>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    width:{
        type:String,
    },
  },
  computed: {
    Visible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.$emit("update:dialogVisible", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header{
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    background-color: #1890ff;
}
::v-deep .el-dialog{
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
}
::v-deep  .el-dialog .el-dialog__footer{
    border-top: 1px solid #e8eaec!important;
    padding: 10px;
}
::v-deep .el-dialog__title{
    color: #fff;
}
::v-deep.el-dialog__headerbtn{
    color: #fff !important;
}
</style>
