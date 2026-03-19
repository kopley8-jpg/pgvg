import { ref, update } from 'firebase/database';
import type { DeviceType, PlatformType, PodType } from '../model';
import { database } from '../firebase';
import { createStyless } from '../lib';
import { ObjValueCase } from './Entries/DefaultEntry';

interface IDeviceCard {
  device: DeviceType;
  pods: PodType[];
}

const excludeFields = ['id', 'photo', 'type', 'brand', 'model'];

export const DeviceCard = ({ device }: IDeviceCard) => {
  const setValue = async (id: string, entryName: string, newValue: string) => {
    try {
      const podikRef = ref(database, `kochegar/podiki/${id}`);

      await update(podikRef, {
        [entryName]: newValue,
      });
      alert('обнови');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div style={styles.container}>
      <ObjValueCase headerTextDisplay={device.brand} photo={device.photo} value={device} ignoreKeyNames={["id", "photo", "type"]} />
    </div>
  );
};



const styles = createStyless({
  container: {
    width: '90vw',
    height: "30vh",
    marginTop: "5%"
  },
  photo: {
    width: '30%',
    objectFit: "contain",
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
  },
  info: {
    height: '100%',
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    overflowX: "auto",
    backgroundColor: '#858585',
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
  },
  infoHeader: {
    width: '100%',
    height: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: '20px',
    borderBottom: '2px solid #cecece',
    color: '#e1e1e1',
    fontWidth: '600',
  },
  infoEntries: {
    width: '100%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
    boxSizing: 'border-box',
    paddingTop: '7px',
    paddingBottom: '7px',
    gap: '7px',
    flexWrap: 'nowrap',
    borderBottomRightRadius: '20px',
  },
});
