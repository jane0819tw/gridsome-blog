export const formatMixin = {
  methods: {
    //- date format
    getDate(dateStr) {
      let date = new Date(dateStr);
      return `${date.getMonth() + 1}/${date.getDate()},${date.getFullYear()}`;
    },
    // image format
    imgCss(url) {
      return {
        backgroundImage: `url(${url})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      };
    },
    // category format
    getMainStringCategory(str) {
      str = str.split("&")[0];
      // 找出 【.... 】
      let regex = new RegExp("^【.*】$");
      let result = str.match(regex)[0];
      return result;
    },
    toEngCategory(str) {
      let result = this.getMainStringCategory(str);
      // 取得英文 [a-zA-Z]+
      let engString = result
        .match(new RegExp("[a-zA-Z ]+"))[0]
        .toUpperCase()
        .trim();

      let res = engString
        .split(" ")
        .find(letter => letter.indexOf("thai") == -1);

      return res;
    },
    toChiCategory(str) {
      let result = this.getMainStringCategory(str);
      // ----------------- 顯示中文
      let res = result.match(new RegExp("[^a-zA-Z【】]+"))[0];
      return res;
    }
  }

}