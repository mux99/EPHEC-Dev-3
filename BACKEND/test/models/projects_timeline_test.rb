require "test_helper"

class ProjectsTimelineTest < ActiveSupport::TestCase
  test 'normal cases' do
    timeline = ProjectsTimeline.create(project_id: projects(:proj2).id, timeline_id: timelines(:first_step).id)
    assert timeline.save
  end

  test 'missing params' do
    timeline_mm_missing_project = ProjectsTimeline.create(timeline_id: timelines(:first_step).id)
    assert_not timeline_mm_missing_project.save

    timeline_mm_missing_timeline = ProjectsTimeline.create(project_id: projects(:proj).id)
    assert_not timeline_mm_missing_timeline.save
  end

  test 'wrong params' do
    timeline_mm_wrong_proj = ProjectsTimeline.create(timeline_id: timelines(:first_step).id, project_id: 'invalid id')
    assert_not timeline_mm_wrong_proj.save

    timeline_mm_wrong_timeline = ProjectsTimeline.create(timeline_id: 'invalid id', project_id: projects(:proj).id)
    assert_not timeline_mm_wrong_timeline.save
  end
end
