describe('[E2E] Main Customer Journey', () => {
  let page;
  beforeAll(async () => {
    const { url } = global._E2ESERVER_;
    page = await global._BROWSER_.newPage();
    await page.setViewport({ width: 1000, height: 1000, isMobile: false });
    page.on('console', msg => {
      for (let i = 0; i < msg.args().length; ++i) console.log(msg.args()[i].toString()); // eslint-disable-line no-plusplus
    });

    await page.goto(url);
  });

  afterAll(async () => {
    // await page.close();
  });

  describe('Landing page', () => {
    it('should load landing page', async () => {
      await page.waitForSelector('#root');
    });

    it('should start game', async () => {
      await page.click('.start-game-button');
    });

    it(
      'should computer play',
      async () => {
        await page.click('.computerPlay');
        await page.click('.computerPlay');
        await page.click('.computerPlay');
        await page.click('.computerPlay');
        await page.click('.computerPlay');
      },
      10000,
    );

    it('should start game again', async () => {
      await page.click('.start-game-button');
    });

    it(
      'should computer play',
      async () => {
        await page.click('.computerPlay');
        await page.click('.computerPlay');
        await page.click('.computerPlay');
        await page.click('.computerPlay');
        await page.click('.computerPlay');
      },
      10000,
    );
  });
});
