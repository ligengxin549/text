"use strict";
var common_vendor = require("../../common/vendor.js");
var common_assets = require("../../common/assets.js");
if (!Array) {
  const _component_lebel = common_vendor.resolveComponent("lebel");
  _component_lebel();
}
const _sfc_main = {
  __name: "submit",
  setup(__props) {
    let worksTypeList = common_vendor.reactive([
      { id: "type1", label: "\u624B\u673A\u58C1\u7EB8" },
      { id: "type2", label: "\u5934\u50CF" },
      { id: "type3", label: "\u8868\u60C5" },
      { id: "type4", label: "\u80CC\u666F" },
      { id: "type5", label: "\u52A8\u6001\u58C1\u7EB8" },
      { id: "type6", label: "\u6587\u5B57\u6A21\u677F" }
    ]);
    let worksTypeValue = common_vendor.ref("\u624B\u673A\u58C1\u7EB8");
    function worksTypeChange(e) {
      worksTypeValue.value = e.detail.value;
    }
    let imgList = common_vendor.ref([]);
    async function chooseImage() {
      if (imgList.value.length >= 9)
        return;
      let res = await common_vendor.index.chooseImage({
        count: 9 - imgList.value.length
      });
      imgList.value = [...imgList.value, ...res.tempFilePaths];
    }
    function previewImage(current) {
      common_vendor.index.previewImage({
        current,
        urls: imgList.value,
        indicator: "number"
      });
    }
    let tagValue = common_vendor.ref("");
    let tagList = common_vendor.reactive([]);
    function addTag() {
      if (tagList.length >= 10) {
        common_vendor.index.showModal({
          title: "\u63D0\u793A",
          showCancel: false,
          confirmText: "\u6211\u77E5\u9053\u4E86",
          content: `\u6807\u7B7E\u6570\u91CF\u5DF2\u8FBE\u4E0A\u9650`
        });
        return;
      }
      if (tagValue.value == "") {
        common_vendor.index.showModal({
          title: "\u63D0\u793A",
          showCancel: false,
          confirmText: "\u6211\u77E5\u9053\u4E86",
          content: `\u60A8\u8FD8\u672A\u8F93\u5165\u6807\u7B7E\u5185\u5BB9`
        });
        return;
      }
      tagList.push(tagValue.value);
      tagValue.value = "";
    }
    let agree = common_vendor.ref(false);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(worksTypeList), (item, k0, i0) => {
          return {
            a: item.id,
            b: item.label,
            c: item.label == common_vendor.unref(worksTypeValue),
            d: item.label == common_vendor.unref(worksTypeValue) ? "rgb(108,92,217)" : "#fff",
            e: common_vendor.t(item.label),
            f: item.id,
            g: item.id
          };
        }),
        b: common_vendor.o(worksTypeChange),
        c: common_vendor.f(common_vendor.unref(imgList), (img, imgIndex, i0) => {
          return {
            a: img,
            b: common_vendor.o(($event) => previewImage(img)),
            c: imgIndex
          };
        }),
        d: common_vendor.unref(imgList).length < 9
      }, common_vendor.unref(imgList).length < 9 ? {
        e: common_vendor.o(chooseImage),
        f: common_assets._imports_0,
        g: common_vendor.unref(imgList).length == 0 ? "27vw" : "53vw"
      } : {}, {
        h: common_vendor.unref(tagValue),
        i: common_vendor.o(($event) => common_vendor.isRef(tagValue) ? tagValue.value = $event.detail.value : tagValue = $event.detail.value),
        j: common_vendor.t(common_vendor.unref(tagValue).length + "/16"),
        k: common_vendor.o(addTag),
        l: common_vendor.t(`\u4F5C\u54C1\u6807\u7B7E\uFF08${common_vendor.unref(tagList).length}/10\uFF09`),
        m: common_vendor.f(common_vendor.unref(tagList), (i, iIndex, i0) => {
          return {
            a: common_vendor.t(i)
          };
        }),
        n: common_vendor.unref(agree) ? "rgb(108,92,217)" : "#fff",
        o: common_vendor.o(($event) => common_vendor.isRef(agree) ? agree.value = !common_vendor.unref(agree) : agree = !common_vendor.unref(agree)),
        p: common_vendor.o(($event) => common_vendor.isRef(agree) ? agree.value = !common_vendor.unref(agree) : agree = !common_vendor.unref(agree))
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/vue3/uniapp/text/pages/submit/submit.vue"]]);
wx.createPage(MiniProgramPage);
