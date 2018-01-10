$(function(){
  function buildHTML(message){
    var image = message.image? `<img src=${message.image.url}>` : "";
    var html = `<div class="main-content__body__info">
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
});
