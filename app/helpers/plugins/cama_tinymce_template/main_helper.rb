module Plugins::CamaTinymceTemplate::MainHelper
  def self.included(klass)
    # klass.helper_method [:my_helper_method] rescue "" # here your methods accessible from views
  end

  # here all actions on going to active
  # you can run sql commands like this:
  # results = ActiveRecord::Base.connection.execute(query);
  # plugin: plugin model
  def cama_tinymce_template_on_active(plugin)
  end

  # here all actions on going to inactive
  # plugin: plugin model
  def cama_tinymce_template_on_inactive(plugin)
  end

  # here all actions to upgrade for a new version
  # plugin: plugin model
  def cama_tinymce_template_on_upgrade(plugin)
  end

  def cama_tinymce_admin_before_load
    append_asset_libraries({"cama_tinymce"=> { js: [plugin_asset("main")]}})
  end
end
