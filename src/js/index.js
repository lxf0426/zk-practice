$(function() {

    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            filter(res.msg)
        }
    })

    function filter(data) {
        var str = '';
        data.forEach(function(file) {
            str += `<div class="swiper-slide">`
            str += filterList(file.list)
            str += `</div>`
        })
        $('.swiper-wrapper').html(str);
        new Swiper('.swiper-container');
    }

    function filterList(item) {
        return item.map(function(ele) {
            return `<dl>
                          <dt>
                              <img src="${ele.url}" alt="">
                         </dt>
                         <dd>${ele.title}</dd>
                     </dl>`
        }).join('')
    }
})