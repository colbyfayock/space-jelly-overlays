import { promises as fs } from 'fs';
import matter from 'gray-matter';
import { useRouter } from 'next/router';
import useChatListener from '@hooks/useChatListener';
import useEvent from '@hooks/useEvent';
import useTwitchHelix from '@hooks/useTwitchHelix';

import { Flex, Text, useToast } from '@chakra-ui/core';
import CameraContainer from '@components/CameraContainer';
import SceneContainer from '@components/SceneContainer';
import TwitchChatBox from '@components/TwitchChatBox';

import styles from '@styles/scenes/single-presentation.module.scss'

const CHAT_COMMANDS = {
  '!test': 'This is a test response from your chat command 👍',
};

const ALERT_TIMER = 4000;

export default function Single({ frontMatter, streamDetails }) {
  const { connectListener, messages } = useChatListener({
    channel: process.env.CHANNEL,
    commands: CHAT_COMMANDS,
  });

  const event = useEvent({
    disappear: ALERT_TIMER,
    channels: ['events'],
  });

  const [current, setCurrent] = React.useState(event);
  const [stale, setStale] = React.useState(false);
  const timeout = React.useRef();
  const toast = useToast();
  const router = useRouter();
  const urlRef = React.useRef(router.pathname);

  React.useEffect(() => {
    connectListener('on');
    return () => {
      if (urlRef.current !== router.pathname) {
        connectListener('off');
      }
    };
  }, [router.pathname]);

  React.useEffect(() => {
    if (current !== event) {
      clearTimeout(timeout.current);

      setStale(false);
      setCurrent(event);

      timeout.current = setTimeout(() => {
        setStale(true);
      }, ALERT_TIMER);
    }
  }, [event, current, stale, setStale, setCurrent]);

  console.log('frontMatter.guests', frontMatter.guests)

  return (
    <SceneContainer className={styles.singlePresentation}>
      {!stale &&
        current &&
        toast({
          position: 'top',
          title: `${event.type} from ${event.from}`,
          duration: ALERT_TIMER,
          status: 'success',
        })}
      <div className={styles.singlePresentationStage}>
        <div className={styles.singlePresentationScreen} />
      </div>
      <div className={styles.singlePresentationSidebar}>
        {frontMatter.guests.map((guest) => {
          return <CameraContainer key={guest.name} guest={guest} />;
        })}
      </div>

      {/* <TwitchChatBox
        direction="column"
        alignSelf="center"
        messages={messages}
      /> */}
    </SceneContainer>
  );
}

export async function getStaticProps() {
  const path = './src/scenes/single-presentation.mdx';
  const mdxSource = await fs.readFile(path);
  const { _, data } = matter(mdxSource);

  const config = {
    token: process.env.ACCESS_TOKEN,
    clientId: process.env.CLIENT_ID,
  };

  const currentUser = await useTwitchHelix({
    params: `/users?login=${process.env.CHANNEL}`,
    ...config,
  });

  const streamDetails = await useTwitchHelix({
    params: `/channels?broadcaster_id=${currentUser.data[0].id}`,
    ...config,
  });

  return {
    props: {
      currentUser: currentUser.data[0],
      streamDetails: streamDetails.data[0],
      frontMatter: data,
    },
  };
}
