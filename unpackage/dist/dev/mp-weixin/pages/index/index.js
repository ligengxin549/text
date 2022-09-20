"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    function lookRes() {
      common_vendor.index.navigateTo({
        url: "/pages/submit/submit"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(lookRes)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/vue3/uniapp/text/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
