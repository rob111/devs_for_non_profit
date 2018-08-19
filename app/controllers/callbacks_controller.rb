class CallbacksController < Devise::OmniauthCallbacksController
  def github

    @developer = Developer.from_omniauth(request.env["omniauth.auth"])

    sign_in_and_redirect @developer, event: :authentication #this will throw if @developer is not activated
    set_flash_message(:notice, :success, :kind => "Github") if is_navigational_format?

  end
end
