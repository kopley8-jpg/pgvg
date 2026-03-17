import { ref, update } from 'firebase/database';
import { Entry } from './Entry';
import type { DeviceType, PodType } from './model';
import { database } from './firebase';

interface ICard {
  device: DeviceType;
  pods: PodType[];
}

const excludeFields = ['id', 'photo', 'type', 'brand', 'model'];

export const Card = ({ device, pods }: ICard) => {
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
      <div style={styles.photo}>
        <img
          src={device.photo}
          height={'100%'}
          object-fit={'cover'}
          style={{ borderRadius: '20px' }}
        />
      </div>
      <div style={styles.info}>
        <div style={styles.infoHeader}>
          <a>{device.brand + ' ' + device.model}</a>
        </div>
        <div style={styles.infoEntries}>
          {Object.entries(device)
            .filter(([key]) => !excludeFields.includes(key))
            .map(([key, value], index) => (
              <Entry
                key={index}
                keyy={key}
                value={value}
                onValueChange={() => {}}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '80vw',
    height: '400px',
    borderRadius: '20px',
    backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'row',
  },
  photo: {
    height: '80vw',
    maxWidth: '40%',
    backgroundColor: 'yellow',
  },
  info: {
    backgroundColor: 'grey',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  infoHeader: {
    width: '100%',
    minHeight: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoEntries: {
    width: '100%',
    flex: 1,
    overflowY: 'auto',
    padding: '10px',
  },
};
