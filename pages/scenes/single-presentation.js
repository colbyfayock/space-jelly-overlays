import { promises as fs } from 'fs';
import matter from 'gray-matter';

import SceneContainer from '@components/SceneContainer';
import Presentation from '@components/Presentation';
import Sidebar from '@components/Sidebar';

import styles from '@styles/scenes/single-presentation.module.scss'


export default function SinglePresentation({ frontMatter }) {
  return (
    <SceneContainer className={styles.singlePresentation}>
      <Presentation />
      <Sidebar guests={frontMatter.guests} cameraSpan={2} />
    </SceneContainer>
  );
}

export async function getStaticProps() {
  const path = './src/scenes/single-presentation.mdx';
  const mdxSource = await fs.readFile(path);
  const { data } = matter(mdxSource);

  return {
    props: {
      frontMatter: data,
    },
  };
}
