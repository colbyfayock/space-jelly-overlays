import { promises as fs } from 'fs';
import matter from 'gray-matter';

import CameraContainer from '@components/CameraContainer';
import SceneContainer from '@components/SceneContainer';

import styles from '@styles/scenes/single-discussion.module.scss'


export default function SingleDiscussion({ frontMatter }) {
  return (
    <SceneContainer className={styles.singleDiscussion}>
      {frontMatter.guests.map((guest) => {
        return <CameraContainer className={styles.singleDiscussionCameraContainer} key={guest.name} guest={guest} size="xlarge" span={1} />;
      })}
    </SceneContainer>
  );
}

export async function getStaticProps() {
  const path = './src/scenes/single-discussion.mdx';
  const mdxSource = await fs.readFile(path);
  const { data } = matter(mdxSource);

  return {
    props: {
      frontMatter: data,
    },
  };
}
