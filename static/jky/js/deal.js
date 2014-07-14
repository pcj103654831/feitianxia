// JavaScript Document
$(function() {
    var Paginator = {
        offset: 0,
        outHeight: 0,
        inHeight: 0,
        total: 1,
        init: function() {
            this.outHeight = $(".comment-container").height();
            this.inHeight = $("#comment-list").height();
            if (this.inHeight > 0 && this.outHeight > 0 && this.outHeight < this.inHeight) {
                this.total = Math.ceil(this.inHeight / this.outHeight);
                this.showPage(1);
            }
        },
        renderPages: function(current) {
            var _this = this;
            var last = current + 2;
            if (last < 5) {
                last = 5;
            }
            if (last > this.total) {
                last = this.total;
            }

            var first = current - 2;
            if (last - first < 4 && last - 4 > 1) {
                first = last - 4;
            }
            if (first < 1) {
                first = 1;
            }

            var prev = current - 1;
            if (prev < 1) {
                prev = 1;
            }

            var next = current + 1;
            if (next > last) {
                next = last;
            }

            var _s = '<ul><li><a href="javascript:void(0);"  onfocus="this.blur()" class="prev" data-page="' + prev + '">上一页</a></li>';
            for (var i = first; i <= last; i++) {
                if (i == current) {
                    _s += '<li class="current">' + i + '</li>';
                }
                else {
                    _s += '<li><a href="javascript:void(0);" onfocus="this.blur()" title="Page ' + i + '" ' + ' data-page="' + i + '">' + "" + i + "" + '</a></li>';
                }
            }
            _s += '<li><a href="javascript:void(0);"  onfocus="this.blur()" class="next" data-page="' + next + '">下一页</a></li></ul><div class="clear"></div>';
            $(".page-com").html(_s);
            $(".page-com a").click(function(event) {
                if (event.preventDefault) {
                    event.preventDefault();
                }
                else {
                    event.returnValue = false;
                }
                var page = parseInt($(this).attr('data-page'));
                if (page) {
                    _this.showPage(page);
                }
            });
        },
        showPage: function(page) {
            if (!page) {
                return false;
            }
            if (page < 1) {
                page = 1;
            }
            if (page > this.total) {
                page = this.total;
            }
            var _offset = parseInt(this.outHeight * (page - 1));
            $("#comment-list").css('top', -_offset);
            this.renderPages(page);
        }
    };
    Paginator.init();

    var funcIndexSlide = function() {
        var scrollClock = null;
        var curPic = 1;
        var lock = false;
        var ptype = null;
        var price = 0;
        var num = 0;
        var total = 0;
        var picBox = $('#pics ul');
        var goNext = function(n) {
            lock = true;
            if (n > 5) {
                n = 1;
            }
            var steps = n - curPic;
            if (steps < 0) {
                steps += 5;
            }
            var t_a = $('#free_title a');
            var p_t = $('#free_title');
            var t_s_d = $(".top_slide_desc:first");
            var step = function() {
                var during = 0;
                var marl = -(n - 1) * 250 + "px";
                var mart = -(n - 1) * 16 + "px";
                picBox.animate({
                    'marginLeft': marl
                },
                300, 
                function() {
                    steps -= 1;
                    if (steps > 0) {
                        step();

                    } else {
                        var spans = $('.switch li');
                        spans.removeClass('active');
                        spans.eq(n - 1).addClass('active');
                        t_a.hide();
                        t_a.eq((n - 1)).show();
                        t_s_d.find("p").hide();
                        t_s_d.find(".c_p_" + n).show();
                        lock = false;
                    }
                });
            };
            step();
            curPic = n;
            scrollClock = setTimeout(function() {
                goNext(curPic + 1)
            },
            4E3);
        };
        $('.switch li').click(function() {
            if (true) {
                clearTimeout(scrollClock);
                var picNum = $(".switch li").index($(this)) + 1;
                if (picNum != curPic) {
                    goNext(picNum);
                }
            }
        });
        $(".goods_info").mouseover(function() {}).mouseout(function() {});
        scrollClock = setTimeout(function() {
            goNext(curPic + 1)
        },
        5E3);
    };
    funcIndexSlide();
});

