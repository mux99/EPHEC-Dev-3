require "test_helper"

class TimelineTest < ActiveSupport::TestCase
  test 'normal cases' do
    timeline = Timeline.create(name: 'test', start: 175, end: 888, description: 'nice')
    assert timeline.save
  end

  test 'missing params' do
    timeline_missing_name = Timeline.create(start: 5161, end: 9999)
    assert_not timeline_missing_name.save

    timeline_missing_start = Timeline.create(end: 55, name: 'invalid')
    assert_not timeline_missing_start.save

    timeline_missing_end = Timeline.create(start: 200, name: 'something')
    assert_not timeline_missing_end.save
  end

  test 'wrong params' do
    timeline_bad_start = Timeline.create(name: 'stuff', start: 500, end: 430)
    assert_not timeline_bad_start.save
  end
end
