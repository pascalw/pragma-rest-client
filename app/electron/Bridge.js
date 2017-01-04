import electron from 'electron';

const findDeepMenuEntry = function (menu, path = []) {
  const [node, ...otherNodes] = path;
  const entry = menu.items.find(i => i.label === node);

  if (otherNodes.length == 0)
    return entry;
  return findDeepMenuEntry(entry.submenu, otherNodes);
};

const bridge = {
  clickMenuEntry: function () {
    const Menu = electron.remote.Menu;
    const entry = findDeepMenuEntry(Menu.getApplicationMenu(), arguments);

    if (entry) entry.click();
  }
};

export default bridge;
