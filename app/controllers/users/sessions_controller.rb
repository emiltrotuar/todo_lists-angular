class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    if request.headers['X-TL-Client'] == 'extension'
      super do |current_user|
        env['rack.session.options'][:skip] = true
        headers['X-TL-Token'] = current_user.extension_token
        head :created and return
      end
    else
      super
    end
  end
end
