import SpaceJelly from '@components/SpaceJelly';
import Cosmo from '@components/Cosmo';

import styles from './SceneContainer.module.scss';

export default function SceneContainer({ children, className, ...rest }) {
  let sceneClassName = styles.SceneContainer

  if ( className ) {
    sceneClassName = `${sceneClassName} ${className}`;
  }

  return (
    <div className={sceneClassName} {...rest}>
      <div className={styles.SceneContainerBody}>
        {children}
      </div>
      <div className={styles.SceneContainerFooter}>
        <SpaceJelly />
        <Cosmo className={styles.SceneContainerFooterCosmo} />
      </div>
    </div>
  );
}
