$(window).load(function () {
    $("#small_basket_box").on("mouseenter", function() {
        var $target = $(".main");
        var margin = $('header').height() + 5;
        var root = '<div class="hover-menu" style="max-height:560px;overflow: auto;right: 10px;border: 1px solid lightgray;position: fixed; top: '+margin+'px;z-index: 9999999;background: white;color: black;"></div>';
        var $dom = $(root);
        $target.prepend($dom);
        $.get("https://salad.com.ua/personal/cart/", function(html) {
            var recdom = $(html);
            recdom = $("table", recdom).html();
            if (!recdom)
                return;
            $dom.html("<table>"+recdom+"</table>");

            $(".hover-menu td").css("padding","15px");
            $(".hover-menu td").css("vertical-align","middle");
            $(".hover-menu thead td").css("border-bottom","1px solid grey");
            $(".hover-menu thead td").css("text-align","center");
            $(".hover-menu").css("border-radius","10px");
            $(".hover-menu").css("border","1px solid gray");
            $(".hover-menu .item_quantity a").hide();
            $(".hover-menu .item_quantity input").prop("disabled", "disabled");

            $('.hover-menu .itemAction a').click(function(e){
                e.preventDefault();

                var url = this.href;
                var parent = $(this).parents("tr");

                $.get(url, function() {
                    var rowsCount = $(".hover-menu tbody tr").length;
                    parent.remove();
                    if (rowsCount == 1){
                        $(".hover-menu").remove();
                        $("#small_basket_box .desktop .quant").remove();
                    }
                    else
                        $("#small_basket_box .desktop .quant").html(rowsCount - 1);
                });

                return false;
            });
            $(".hover-menu").on("mouseleave", function() {
                $(".hover-menu").remove();
            });
        });
    });
});