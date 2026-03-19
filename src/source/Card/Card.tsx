import { ref, update } from 'firebase/database';
import { DefaultEntry } from './Entries/DefaultEntry';
import type { DeviceType, PlatformType, PodType } from '../model';
import { database } from '../firebase';
import { Entry } from './Entries/PlatformsEntry/PlatformsEntry';

interface ICard {
  device: DeviceType;
  pods: PodType[];
}

const excludeFields = ['id', 'photo', 'type', 'brand', 'model'];

export const Card = ({ device }: ICard) => {
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
      <img src={device.photo} style={styles.photo} />
      <div style={styles.info}>
        <div style={styles.infoHeader}>
          <a>{device.brand + ' ' + device.model}</a>
        </div>
        <div style={styles.infoEntries}>
          {Object.entries(device)
            .filter(([key]) => !excludeFields.includes(key))
            .map(([key, value], index) => (
              <>
                <Entry
                  key={index}
                  keyName={key}
                  value={value}
                />
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: '80vh',
    width: '90vw',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: '10px',
    flexShrink: 0,

    border: '2px solid white',
    borderRadius: '20px',
  },
  photo: {
    height: '100%',
    width: '30%',
    objectFit: "contain",
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
  },
  info: {
    height: '100%',
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#2a2a2a',
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
};
