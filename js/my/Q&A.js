$("div[name='QA']").on('keydown', async (event) => {
    if (event.isComposing || event.keyCode === 13) {
  		QA(event.currentTarget);
      }
     }
);

function QA(e){
    const $wrap = $(e);
    // 获取外层容器唯一ID
    const uid = $wrap.attr("id");
    const answer = $wrap.attr("answer").split(",");
    const inputVal = $wrap.find("input").val().trim();

    if($.inArray(inputVal, answer) >= 0 ){
        // 隐藏输入问答框
        $wrap.css("display","none");
        // 根据uid拼接内容容器ID，展示内容
        $(`#${uid}_content`).css("display","block");
    }else{
        alert($wrap.attr("data-wpm"));
        // 清空输入框
        $wrap.find("input").val("");
    }
}
function initQA() {
    $("div[name='QA']").off("keydown").on('keydown', function(event) {
        if (event.keyCode === 13) {
            QA(this);
        }
    });
}
$(document).ready(initQA);
$(document).on("pjax:complete", initQA);