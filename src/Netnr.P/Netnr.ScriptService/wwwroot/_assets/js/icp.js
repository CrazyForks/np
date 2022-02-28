﻿$(".nr-txt-search").keydown(function (e) {
    var keys = e.keyCode || e.which || e.charCode;
    if (keys == 13) {
        $(".nr-btn-search")[0].click();
    }
});

$(".nr-btn-search").click(function () {
    var val = $(".nr-txt-search").val();

    if (val == "") {
        bs.msg("<h4>请输入域名</h4>");
        return false;
    }

    ss.loading();
    ss.ajax({
        url: "https://whois.west.cn/icp/" + encodeURIComponent(val),
        success: function (data) {
            var jw = $(data);

            var v1 = jw.find('.info-table').first();
            v1.addClass('table table-bordered');
            if (v1.length) {
                $('#dn').html('').append(v1);
            } else {
                $('#dn').html('<p class="text-muted">无备案信息（' + val + '）</p>');
            }
        },
        error: function () {
            ss.loading(0);
            bs.msg("<h4>网络错误</h4>");
        },
        complete: function () {
            ss.loading(0);
        }
    }, 0)
});