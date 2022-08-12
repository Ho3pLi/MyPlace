import Giscus from '@giscus/react';

export default function MyApp() {
  return (
    <Giscus
      id="comments"
      repo="Ho3pLi/MyPlace"
      repoId="R_kgDOHki-Dg"
      category="Announcements"
      categoryId="DIC_kwDOHki-Ds4CQxTd"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark"
      lang="en"
      crossorigin="anonymous"
    />
  );
}