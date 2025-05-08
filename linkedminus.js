(() => {
  let count = 0;
  function getAllButtons() {
    return document.querySelectorAll('button[aria-label^="Click to stop following"]') || [];
  }
  async function loadAll() {
    let lastHeight = 0;
    while (document.body.scrollHeight > lastHeight) {
      lastHeight = document.body.scrollHeight;
      window.scrollTo(0, lastHeight);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  async function unfollowAll() {
    const buttons = getAllButtons();
    for (let button of buttons) {
      count++;
      const ariaLabel = button.getAttribute('aria-label');
      const name = ariaLabel.replace('Click to stop following ', '');
      console.log(
        `%c #${count} %c 👋 Unfollowed %c ` + name + ` `,
        'color: #fff; background-color:#34495e',
        'color: #fff; background-color:#27ae60',
        'color: #000; background-color:#95a5a6'
      );
      window.scrollTo(0, button.offsetTop - 260);
      button.click();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  async function processTab(tabText) {
    const tabButton = Array.from(document.querySelectorAll('button.artdeco-tab')).find(b => b.innerText.trim() === tabText);
    if (tabButton) {
      tabButton.click();
      await new Promise(resolve => setTimeout(resolve, 1000));
      await loadAll();
      await unfollowAll();
    }
  }
  async function run() {
    await processTab('Following');
    await processTab('Followers');
    if (confirm('🥳 Done! We unfollowed ' + count + ' connections. Do you want to reload the page to update?')) {
      location.reload();
    }
  }
  if (confirm('👋 Hi, are you willing to clear up your feed and unfollow all of your connections in both tabs? Then press "OK".')) {
    run();
  }
})();
