odoo.define('longnv_history_search.website_history_search', function(require) {
    "use strict";

    //import thư viện cần thiết
    var core = require('web.core');
    var utils = require('web.utils');
    var qweb = core.qweb;
    var _t = core._t;

    //import module cần thiết khi cài plugin này
    var publicWidget = require('web.public.widget');
    require('website_sale.website_sale');

    //extend sự kiện widget
publicWidget.registry.productsSearchBar.include({
    events: _.extend({}, publicWidget.registry.productsSearchBar.prototype.events, {
        // bắt sự kiện khi onclick
        'click .search-query': '_onClick',
        }),
    
    _onClick: function (ev) {
        //hàm add event return khi bắt sự kiện autocomplete
        if (!this.limit) {
            return;
        }
        if (utils.get_cookie('history_search')) {
            var history = utils.get_cookie('history_search').split('|');//xử lý chuỗi
            var res = {products: []}
            for (let i=0; i < history.length; i++){
                //xử lý bắt sự kiện của input khi nhập và tìm kiếm
                var $this = $(ev.delegateTarget);
                ev.preventDefault();
                var oldurl = $this.attr('action');
                oldurl += (oldurl.indexOf("?")===-1) ? "?" : "";
                var search = history[i];
                res['products'].push({
                        name: history[i],
                        website_url: oldurl + '&search=' + encodeURIComponent(search),
                        price: '<span class="fa fa-times o_history_delete_cross" data-name="'+history[i]+'"></span>'
                })
            }
            this.displayImage = false;
            this._render(res);
        }
    },
    //xử lý render
    _render: function (res) {
        var self = this;
        this._super.apply(this, arguments);
        if (!this.displayImage){
            //thêm sự kiện xóa gợi ý
            $('.o_history_delete_cross').click(function(e){
                e.preventDefault();
                var name_del = $(e.target).data('name');
                var history = utils.get_cookie('history_search').split('|');
                console.log(history);
                var res = "";
                for (let i=0; i < history.length; i++){
                    if (history[i] != name_del){
                        if (i !== history.length -1)
                            res +=history [i] + '|';
                        else
                            res +=history [i];
                    }
                }
                utils.set_cookie('history_search', res);
                $('.search-query').click();
            });
            this.displayImage = true;
        }
    },
})

// xử lý sự kiện click search
publicWidget.registry.WebsiteSale.include({
    _onSubmitSaleSearch: function (ev) {
       if (!this.$('.dropdown_sorty_by').length) {
            return;
        }
        var $this = $(ev.currentTarget);
        if (!ev.isDefaultPrevented() && !$this.is(".disabled")) {
            ev.preventDefault();
            //xử lý nối chuỗi search trên thanh url
            var oldurl = $this.attr('action');
            oldurl += (oldurl.indexOf("?")===-1) ? "?" : "";

            //xử lý lấy giá trị vừa tìm kiếm lưu vào cookie
            var search = $this.find('input.search-query');
            var get_data = utils.get_cookie('history_search');
            if (get_data)
                utils.set_cookie('history_search', search.val() + '|' + get_data);
            else
                utils.set_cookie('history_search', search.val());

            //điều hướng
            window.location = oldurl + '&' + search.attr('name') + '=' + encodeURIComponent(search.val());
        }
        
    },
})


});
