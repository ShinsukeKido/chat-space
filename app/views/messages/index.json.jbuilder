json.array! @new_messages do |message|
  json.name message.user.name
  json.date message.created_at.to_s(:default)
  json.content message.content
  json.image message.image
  json.id message.id
end
