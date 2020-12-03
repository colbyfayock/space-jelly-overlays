import { promises as fs } from 'fs';
import matter from 'gray-matter';

import CameraContainer from '@components/CameraContainer';
import SceneContainer from '@components/SceneContainer';

import styles from '@styles/scenes/single-presentation.module.scss'


export default function Single({ frontMatter }) {
  return (
    <SceneContainer className={styles.singlePresentation}>
      <div className={styles.singlePresentationStage}>
        <div className={styles.singlePresentationScreen} />
      </div>

      <div className={styles.singlePresentationSidebar}>
        {frontMatter.guests.map((guest) => {
          return <CameraContainer key={guest.name} guest={guest} span={2} />;
        })}
      </div>
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
