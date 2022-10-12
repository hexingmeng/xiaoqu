<template>
  <div>
    <el-form  ref="form" :inline="true" :model="value" class="demo-form-inline":rules="rules" >
      <template v-for="item in formList">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-input v-model="value[item.prop]" v-bind="item" :style="item.width"></el-input>
        </el-form-item>
      </template>
      <slot name="btn"></slot>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    formList: {
      type: Array,
      default: () => [],
    },
    rules:{
        type: Object,
      default: () => {},
    },
  },
  methods:{
    formScree() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log(valid);
          this.$emit('formScree',valid)
        } else {
            this.$emit('formScree',valid)
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel(){
         this.$refs["form"].resetFields();
    },
  },
};
</script>

<style>
.demo-form-inline{
    line-height: 40px;
}
</style>
