import CameraContainer from '@components/CameraContainer';

import styles from './Sidebar.module.scss';

const Sidebar = ({ guests = [], cameraSpan = 1}) => {
  return (
    <div className={styles.sidebar}>
      {guests.map((guest) => {
        return <CameraContainer className={styles.sidebarCameraContainer} key={guest.name} guest={guest} span={cameraSpan} />;
      })}
    </div>
  )
}

export default Sidebar;