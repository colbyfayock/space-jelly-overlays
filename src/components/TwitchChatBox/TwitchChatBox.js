import React from 'react';
import { Flex, Text } from '@chakra-ui/core';

import styles from './TwitchChatBox.module.scss';

const testMessages = [
  {
    user: 'colbyfayock',
    text: 'asod naosdklg naldxkgn aldk nalskdn alsdk ngalsdknga lsdk'
  },
  {
    user: 'colbyfayock',
    text: 'two'
  },
  {
    user: 'colbyfayock',
    text: 'three'
  },
  {
    user: 'colbyfayock',
    text: 'four'
  },
  {
    user: 'colbyfayock',
    text: 'five'
  },
]

export default function TwitchChatBox({ messages }) {
  const hasMessages = Array.isArray(messages) && messages.length > 0;
  return (
    <div className={styles.TwitchChatBox}>
      {hasMessages && (
        <ul>
          {messages.map((message, index) => {
            return (
              <li>
                <strong>{message.user}</strong>
                <span>{message.text}</span>
              </li>
            )
          })}
        </ul>
      )}
      {!hasMessages && (
        <p className={styles.TwitchChatBoxJoin}>
          Join the chat at twitch.tv/{process.env.CHANNEL}
        </p>
      )}
    </div>
  );
}
