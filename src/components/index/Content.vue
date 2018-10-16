<template>
  <div class="cc_panel_wapper">
    <div class="cc_panel_detail" v-for="(item, index) in list" :key="index">
      <div class="cc_panel_detail_image_wapper">
        <img
          v-lazy="item.thumb"
          alt="预览图"
          class="image"
          width="250">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['list'],
  }
</script>

<style lang="less" rel="stylesheet/less">

  .cc_panel_wapper {
    padding: 10px;
    box-sizing: border-box;
    column-count:2;
		column-gap:2px;
		width:100%;
    &:after {
      content: "";
      display: block;
      clear: both;
    }

    .cc_panel_detail {
      width: 100%;
      font-size: 0;
      background:#fefefe;
			border:2px solid #fcfcfc;
			box-shadow:0px 2px 2px rgba(34, 25, 25, 0.4);
			margin:5px 2px 2px 2px;
			padding:1px;
			padding-bottom:5px;
			transition:opacity .4s ease-in-out;
			display:inline-block;
      &_image_wapper {
        margin-bottom: 5px;
        width: 100%;
        background: #f9f8fb;
        border-radius: 3px;
        
        .image{
        	width: 100%;
        }
      }
    }
  }
</style>
