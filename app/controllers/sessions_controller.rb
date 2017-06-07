class SessionsController < ApplicationController

  def new
    # render: new (automatically)
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:name],
      params[:user][:password]
    )

    if @user
      sign_in!(@user)
      #redirect_to homepage
    else
      flash.now[:errors] = ["Invalid username or password"]
      render :new
    end
  end

  def destroy
    sign_out!
    redirect_to new_session_url
  end
end
