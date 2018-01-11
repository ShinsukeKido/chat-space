$(function() {

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    $("#user_search_result").append(html);
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class='user_search_result_list'>${ user }</p>
                </div>`
    $("#user_search_result").append(html);
  }

  function appendAdd(user_name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $("#chat-group-users").append(html);
  }

  $(".chat-group-form__input.search").on("keyup", function() {
    var input = $(".chat-group-form__input.search").val();
    var blank = "";
    if (input != blank) {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $("#user_search_result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNoUser("一致するユーザーはいません");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    }
  });

  $("#user_search_result").on('click', ".user-search-add", function(){
    $(this).parent().remove();
    var user_name = $(this).data("user-name")
    var user_id = $(this).data("user-id")
    appendAdd(user_name, user_id);
  });

  $("#user_search_result").on('click', ".user-search-remove", function(){
    $(this).parent().remove();
  });
});
