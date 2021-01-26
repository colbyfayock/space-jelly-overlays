import { promises as fs } from 'fs';
import matter from 'gray-matter';

import SceneContainer from '@components/SceneContainer';
import Presentation from '@components/Presentation';
import Sidebar from '@components/Sidebar';

import styles from '@styles/scenes/multi-presentation.module.scss';

export default function MultiPresentation({ frontMatter }) {
  return (
    <SceneContainer className={styles.multiPresentation} timer={true}>
      <Presentation />
      <Sidebar guests={frontMatter.guests} cameraSpan={1} />
    </SceneContainer>
  );
}

export async function getStaticProps() {
  const path = './src/scenes/multi-presentation.mdx';
  const mdxSource = await fs.readFile(path);
  const { data } = matter(mdxSource);

  return {
    props: {
      frontMatter: data,
    },
  };
}
