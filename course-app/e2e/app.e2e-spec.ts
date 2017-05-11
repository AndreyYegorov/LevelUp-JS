import { CourseAppPage } from './app.po';

describe('course-app App', function() {
  let page: CourseAppPage;

  beforeEach(() => {
    page = new CourseAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
