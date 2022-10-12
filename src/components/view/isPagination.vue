<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
    props:{
        currentPage:{
            type:Number
        },
         pageSizes:{
            type:Number
        },
         total:{
            type:Number
        },
         pageSizes:{
            type:Array,
            default:()=>[]
        },
    },
    methods: {
        handleSizeChange(val){
            console.log(val);
            this.$emit('handleSizeChange',val)
        },
        handleCurrentChange(val){
             this.$emit('handleCurrentChange',val)
        },
    },

}
</script>

<style>

</style>