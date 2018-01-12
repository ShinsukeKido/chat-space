$(function(){
  function buildHTML(message){
    var image = message.image? `<img src=${message.image.url}>` : "";
    var html = `<div class="main-content__body__content">
                  <div class="main-content__body__info">
                    <div class="main-content__body__info__name">
                      ${message.name}
                    </div>
                    <div class="main-content__body__info__time">
                      ${message.date}
                    </div>
                  </div>
                  <div class="main-content__body__message">
                    <p>
                      ${message.content}
                    </p>
                    <p>
                      ${image}
                    </p>
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-content__body').append(html);
      $('.main-content__body').animate({scrollTop: $('.main-content__body')[0].scrollHeight}, 'fast');
      $('.textform').val('');
    })
    .fail(function(){
      alert('error');
    })
    return false;
  })

  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var id = $('.main-content__body__content').last().data('message-id')
      $.ajax({
        url: location.href,
        data: { id: id },
        dataType: 'json',
      })
      .done(function(data) {
        data.forEach(function(message){
          var html = buildHTML(message);
          $('.main-content__body').append(html);
        });
      })
      .fail(function() {
        alert('error');
      })
    }
    else {
      clearInterval(interval);
    }
  }, 5000);
});
