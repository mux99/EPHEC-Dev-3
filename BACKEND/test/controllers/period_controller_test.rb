require "test_helper"

class PeriodControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get period_new_url
    assert_response :success
  end

  test "should get show" do
    get period_show_url
    assert_response :success
  end

  test "should get update" do
    get period_update_url
    assert_response :success
  end

  test "should get destroy" do
    get period_destroy_url
    assert_response :success
  end
end
