import { ref, update } from "firebase/database";
import { Entry } from "./Entry";
import type { DeviceType, PodType } from "./model";
import { PodsEntry } from "./PodsEntry";
import { database } from "./firebase";

interface ICard {
  device: DeviceType;
  pods: PodType[];
}

const excludeFields = ["id", "photo", "type", "brand", "model"];

export const Card = ({ device, pods }: ICard) => {
  const setValue = async (id: string, entryName: string, newValue: string) => {
    try {
      const podikRef = ref(database, `kochegar/podiki/${id}`);

      await update(podikRef, {
        [entryName]: newValue,
      });
      alert("обнови");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.photo}>
        <img
          src={device.photo}
          height={"100%"}
          object-fit={"cover"}
          style={{ borderRadius: "20px" }}
        />
      </div>
      <div style={styles.info}>
        <div style={styles.infoHeader}>
          <a>{device.brand + " " + device.model}</a>
        </div>
        <div style={styles.infoEntries}>
          {Object.entries(device)
            .filter(([key]) => !excludeFields.includes(key))
            .map(([key, value], index) => {
              if (!Array.isArray(value)) {
                return (
                  <Entry
                    key={index}
                    keyy={key}
                    value={value}
                    onValueChange={(e) => setValue(device.id, key, e)}
                  />
                );
              } else if (key === "pods") {
                return <PodsEntry names={value} pods={pods} />;
              }
            })}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "90%",
    height: "400px",
    borderRadius: "20px",
    backgroundColor: "grey",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  photo: {
    height: "100%",
    width: "40%",
  },
  info: {
    backgroundColor: "grey",
    height: "100%",
    width: "60%",
    display: "flex",
    flexDirection: "column",
  },
  infoHeader: {
    width: "100%",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  infoEntries: {
    width: "100%",
    flex: 1,
    overflowY: "auto",
    padding: "10px",
  },
};
