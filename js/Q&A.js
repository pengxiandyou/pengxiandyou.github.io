$("div[name='QA']").on('keydown', async (event) => {
    if (event.isComposing || event.keyCode === 13) {
  		QA(event.currentTarget);
      }
     }
);

function QA(e){
    const Q = $($(e).find("span")[0]).text();
    const answer = $(e).attr("answer").split(",");
    // console.log(answer);
    // console.log($($(e).find("input")[0]).val());
    if($.inArray($($(e).find("input")[0]).val(),answer) >=0 ){
    	$(e).css("display","none");
    	$("div#"+Q).css("display","block");
    	// console.log("匹配");
    }else{
    	alert($(e).attr("data-wpm"));
    	// console.log("不匹配");
    }

}