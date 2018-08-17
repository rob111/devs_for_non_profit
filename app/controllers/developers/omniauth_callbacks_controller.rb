class Developers::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def github
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @developer = Developer.from_omniauth(request.env["omniauth.auth"])

    if @developer.persisted?
      sign_in_and_redirect @developer, event: :authentication #this will throw if @developer is not activated
      set_flash_message(:notice, :success, kind: "Github") if is_navigational_format?
    else
      session["devise.github_data"] = request.env["omniauth.auth"]
      redirect_to new_developer_registration_url
    end
  end

  def failure
    redirect_to root_path
  end
end
