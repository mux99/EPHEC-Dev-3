require "test_helper"

class ProjectTest < ActiveSupport::TestCase
  # test 'normal cases' do
  #   project = Project.create(name: 'test project', owner: users(:jean_valjean).id, visibility: true, description: 'test')
  #   assert project.save
  # end

  # test 'missing params' do
  #   proj_no_params = Project.new
  #   assert_not proj_no_params.save

  #   proj_missing_name = Project.create(owner: users(:david_goodenough).id, visibility: false)
  #   assert_not proj_missing_name.save

  #   proj_missing_owner = Project.create(name: 'this doesnt work', visibility: true)
  #   assert_not proj_missing_owner.save
  # end

  # test 'wrong params' do
  #   proj_wrong_user = Project.create(name: 'no user :(', owner: 'random_id', visibility: true)
  #   assert_not proj_wrong_user.save
  # end
end
