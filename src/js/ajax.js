$.ajax({
    url: '/api/list',
    dataType: 'json',
    success: function(res) {
        console.log(res)
    }
})