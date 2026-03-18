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
      <img
        src={device.photo}
        style={styles.photo}
      />
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
                onValueChange={() => { }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '90%',
    height: "80vh",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    marginTop: "10px",
    borderRadius: '20px',
    backgroundColor: 'grey',
    flexShrink: 0,
  },
  photo: {
    width: "60%",
    height: "40%",
    objectFit: "fill",
    borderTopLeftRadius: "20px",
    borderBottomLeftRadius: "20px",
  },
  info: {
    backgroundColor: 'yellow',
    height: '60%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  infoHeader: {
    width: '100%',
    height: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "green"
  },
  infoEntries: {
    width: '100%',
    height: "90%",
    backgroundColor: "brown",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: "auto",
    boxSizing: "border-box",
    paddingTop: "7px",
    paddingBottom: "7px",
    gap: "7px",
    flexWrap: "nowrap"
  },
};
