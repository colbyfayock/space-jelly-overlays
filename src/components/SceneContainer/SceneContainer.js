import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/core';
import { FaDiscord } from 'react-icons/fa';

import useEvent from '@hooks/useEvent';
import useChatListener from '@hooks/useChatListener';

import SpaceJelly from '@components/SpaceJelly';
import Cosmo from '@components/Cosmo';
import TwitchChatBox from '@components/TwitchChatBox';
import SceneTimer from '@components/SceneTimer';

import styles from './SceneContainer.module.scss';

const CHAT_COMMANDS = {
  '!test': 'This is a test response from your chat command 👍',
};

const ALERT_TIMER = 4000;

const ACTIVE_THEME = 'colbyashimaru';

export default function SceneContainer({
  children,
  className,
  timer,
  ...rest
}) {
  let sceneClassName = styles.SceneContainer;

  if (className) {
    sceneClassName = `${sceneClassName} ${className}`;
  }

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

  return (
    <div className={sceneClassName} {...rest}>
      <div className={styles.SceneContainerBody}>{children}</div>
      <div className={styles.SceneContainerFooter}>
        <SpaceJelly theme={ACTIVE_THEME} />
        <TwitchChatBox messages={messages} />
        <div className={styles.SceneContainerFooterDiscord}>
          <FaDiscord />
          <p>
            <strong>Join the Discord</strong>
            <span>spacejelly.dev/discord</span>
          </p>
        </div>
        <div className={styles.SceneContainerFooterCosmo}>
          {timer && <SceneTimer />}
          <Cosmo theme={ACTIVE_THEME} />
        </div>
      </div>
      {!stale &&
        current &&
        toast({
          position: 'top',
          title: `${event.type} from ${event.from}`,
          duration: ALERT_TIMER,
          status: 'success',
        })}
    </div>
  );
}
