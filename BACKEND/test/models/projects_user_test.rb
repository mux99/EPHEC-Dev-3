require "test_helper"

class ProjectsUserTest < ActiveSupport::TestCase
  # test 'normal cases' do
  #   project_user = ProjectsUser.create(project_id: projects(:proj).id, user_id: users(:david_goodenough).id)
  #   assert project_user.save
  # end

  # test 'missing params' do
  #   proj_user_missing_proj = ProjectsUser.create(user_id: users(:david_goodenough).id)
  #   assert_not proj_user_missing_proj.save

  #   proj_user_missing_user = ProjectsUser.create(project_id: projects(:proj).id)
  #   assert_not proj_user_missing_user.save
  # end

  # test 'wrong params' do
  #   proj_user_wrong_proj = ProjectsUser.create(user_id: users(:jean_valjean).id, project_id: 'invalid id')
  #   assert_not proj_user_wrong_proj.save

  #   proj_user_wrong_user = ProjectsUser.create(user_id: 'invalid id', project_id: projects(:proj).id)
  #   assert_not proj_user_wrong_user.save
  # end
end
