import musicBarHtml from './musicBar.html?raw';

const MusicBar = async () => {
  const templateFunction = new Function(
    `return \`${musicBarHtml}\`;`
  );

  return templateFunction();
}

export default MusicBar;
