import { promises as fs } from 'fs';
import matter from 'gray-matter';

import CameraContainer from '@components/CameraContainer';
import SceneContainer from '@components/SceneContainer';

import styles from '@styles/scenes/multi-discussion.module.scss'


export default function MultiDiscussion({ frontMatter }) {
  return (
    <SceneContainer className={styles.multiDiscussion}>
      {frontMatter.guests.map((guest) => {
        return <CameraContainer className={styles.multiDiscussionCameraContainer} key={guest.name} guest={guest} size="large" span={1} />;
      })}
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
