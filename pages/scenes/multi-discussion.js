import { promises as fs } from 'fs';
import matter from 'gray-matter';

import CameraContainer from '@components/CameraContainer';
import SceneContainer from '@components/SceneContainer';

import styles from '@styles/scenes/multi-discussion.module.scss'


export default function Single({ frontMatter }) {
  return (
    <SceneContainer className={styles.multiDiscussion}>
      <div className={styles.multiDiscussionStage}>
        <div className={styles.multiDiscussionScreen} />
      </div>

      <div className={styles.multiDiscussionSidebar}>
        {frontMatter.guests.map((guest) => {
          return <CameraContainer key={guest.name} guest={guest} span={1} />;
        })}
      </div>
    </SceneContainer>
  );
}

export async function getStaticProps() {
  const path = './src/scenes/multi-discussion.mdx';
  const mdxSource = await fs.readFile(path);
  const { data } = matter(mdxSource);

  return {
    props: {
      frontMatter: data,
    },
  };
}
