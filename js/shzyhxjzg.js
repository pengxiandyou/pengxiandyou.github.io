/* 社会主体核心价值观效果 */
/*var a_idx = 0;
jQuery(document).ready(function ($) {
  $("body").click(function (e) {
    var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善");
    var $i = $("<span/>").text(a[a_idx]);
    a_idx = (a_idx + 1) % a.length;
    var x = e.pageX,
      y = e.pageY;
    $i.css({
      "z-index": 100000000,
      "top": y - 20,
      "left": x,
      "position": "absolute",
      "font-weight": "bold",
      "color": "#ff6651"
    });
    $("body").append($i);
    $i.animate({
      "top": y - 180,
      "opacity": 0
    }, 1500, function () {
      $i.remove();
    });
  });
});*/

/*// 社会主义核心价值观
(function() {
    var coreSocialistValues = ["富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善"],
    index = Math.floor(Math.random() * coreSocialistValues.length);
    document.body.addEventListener('click',
    function(e) {
        if (e.target.tagName == 'A') {
            return;
        }
        var x = e.pageX,
        y = e.pageY,
        span = document.createElement('span');
        span.textContent = coreSocialistValues[index];
        index = (index + 1) % coreSocialistValues.length;
        span.style.cssText = ['z-index: 9999999; position: absolute; font-weight: bold; color: #ff6651; top: ', y - 20, 'px; left: ', x, 'px;'].join('');
        document.body.appendChild(span);
        animate(span);
    });
    function animate(el) {
        var i = 0,
        top = parseInt(el.style.top),
        id = setInterval(frame, 16.7);
        function frame() {
            if (i > 180) {
                clearInterval(id);
                el.parentNode.removeChild(el);
            } else {
                i += 2;
                el.style.top = top - i + 'px';
                el.style.opacity = (180 - i) / 180;
            }
        }
    }
} ());
*/
(function() {
    'use strict';
    jQuery(document).ready(function($) {
        var e = {pageX:-10, pageY:-10};
        var strs = new Array("\u5bcc\u5f3a", "\u6c11\u4e3b", "\u6587\u660e", "\u548c\u8c10", "\u81ea\u7531", "\u5e73\u7b49", "\u516c\u6b63" ,"\u6cd5\u6cbb", "\u7231\u56fd", "\u656c\u4e1a", "\u8bda\u4fe1", "\u53cb\u5584");
        var str_index = 0;
        $("body").click(function(ele){
            e = ele;
            show(strs[str_index], e);
            str_index = (str_index + 1) % strs.length;
        });
        function show(str, e){
            var $i = $("<span/>").text(str);
            var x = e.pageX,
                y = e.pageY;
            $i.css({
                "pointer-events":'none',
                "z-index": 99999,
                "top": y - 20,
                "left": x,
                "position": "absolute",
                "font-weight": "bold",
                "color": "#c40000",
                "text-shadow":"0 0 3px white"
            });
            $("body").append($i);
            $i.animate({
                "top": y - 180,
                "opacity": 0
            },
                       1500,
                       function() {
                $i.remove();
            });
        }
    });
})();
