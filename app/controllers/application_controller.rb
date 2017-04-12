class ApplicationController < ActionController::Base

  protect_from_forgery

  after_action :add_csrf_to_cookies

  def index
    @tl_authenticated = false
    if user_signed_in?
      @tl_authenticated = true
    end
  end

  protected

  def add_csrf_to_cookies
    cookies['CSRF-Token'] = form_authenticity_token
  end
end
